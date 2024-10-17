import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Class } from 'src/class/entities/class.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
  ) { }
  // async create(createStudentDto: CreateStudentDto): Promise<Student> {
  //   // const newStudent = this.studentRepository.create(createStudentDto);
  //   // console.log(newStudent);
  //   // return await this.studentRepository.save(newStudent);
  //   const { nameStudent } = createStudentDto;
  //   // Tìm class từ classID
  //   // const classEntity = await this.classRepository.findOne({
  //   //   where: { classID },
  //   // });
  //   // if (!classEntity) {
  //   //   throw new Error('Class not found');
  //   // }
  //   const student = this.studentRepository.create({
  //     nameStudent,
  //     // class: classEntity, // Sử dụng đối tượng Class
  //   });
  //   console.log(student);
  //   return this.studentRepository.save(student);
  // }
  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const { nameStudent, classID } = createStudentDto;
    const classEntity = await this.classRepository.findOne({
      where: { classID },
    });
    if (!classEntity) {
      throw new Error('Class not found');
    }
    const student = this.studentRepository.create({
      nameStudent: createStudentDto.nameStudent,
    });

    try {
      return await this.studentRepository.save(student);
    } catch (error) {
      console.error('Error saving student:', error);
      throw new Error('Could not save student');
    }
  }
  findAll(): Promise<Student[]> {
    return this.studentRepository.find();
  }
  finOne(id: number): Promise<Student> {
    return this.studentRepository.findOneBy({ studentID: id });
  }
  async update(
    id: number,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    const updateStudent = await this.studentRepository.findOneBy({ studentID: id });

    if (!updateStudent) {
      throw new Error(`Student with id ${id} not found`);
    }

    Object.assign(updateStudent, updateStudentDto);
    console.log('Update data:', updateStudentDto);
    console.log('Current student data:', updateStudent);

    try {
      return await this.studentRepository.save(updateStudent);
    } catch (error) {
      console.error('Error updating student:', error);
      throw new Error('Could not update student');
    }
  }
  async remove(id: number): Promise<{ message: string }> {
    await this.studentRepository.delete({ studentID: id });
    return { message: 'delete cuccess ' }
  }
}
