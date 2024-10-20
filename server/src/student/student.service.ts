import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { Class } from '../class/entities/class.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const student = this.studentRepository.create(createStudentDto);
    return this.studentRepository.save(student);
  }

  async findAll(): Promise<any> {
    // return this.studentRepository.find();
    const students = await this.studentRepository.find({
      relations: ['class', 'exams', 'scores.exam'],
      // Nạp thông tin class liên kết
    });

    // Tạo ra mảng chứa thông tin cần trả về
    return students.map((student) => ({
      studentID: student.studentID,
      name: student.name,
      classID: student.class?.classID || null,
      className: student.className || null,
      scores:
        student.scores.map((score) => ({
          score: score.score,
          examName: score.exam?.examName || null,
        })) || [],
    }));
  }

  async findOne(studentID: number): Promise<any> {
    const student = await this.studentRepository.findOne({
      where: { studentID },
      relations: ['class', 'exams', 'scores.exam'],
    });
    if (!student) {
      throw new NotFoundException('student not found');
    }
    return student;
  }

  async update(
    id: number,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    // await this.studentRepository.update(id, updateStudentDto);
    // return this.findOne(id);
    // Tìm sinh viên cần cập nhật
    const student = await this.studentRepository.findOne({
      where: { studentID: id },
      relations: ['class', 'scores'],
    });

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    Object.assign(student, updateStudentDto);

    if (updateStudentDto.classID) {
      const classEntity = await this.classRepository.findOneBy({
        classID: updateStudentDto.classID,
      });
      if (!classEntity) {
        throw new NotFoundException('Class not found');
      }
      student.class = classEntity;
    }

    return this.studentRepository.save(student);
  }

  async remove(id: number): Promise<{ message: string }> {
    const stutenEntity = await this.findOne(id);
    if (!stutenEntity) {
      throw new NotFoundException('student not found');
    }
    await this.studentRepository.delete(id);
    return { message: 'delete success' };
  }
}
