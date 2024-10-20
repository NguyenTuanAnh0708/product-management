
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateScoreDto } from './dto/create-scores.dto';
import { UpdateScoreDto } from './dto/update-scores.dto';
import { Score } from './entities/scores.entity';
import { Student } from 'src/student/entities/student.entity';
import { Exam } from 'src/exams/entities/exams.entity';

@Injectable()
export class ScoreService {
  constructor(
    @InjectRepository(Score)
    private scoreRepository: Repository<Score>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(Exam)
    private examRepository: Repository<Exam>,
  ) { }

  async create(createScoreDto: CreateScoreDto): Promise<Score> {
    // const score = this.scoreRepository.create(createScoreDto);
    // return this.scoreRepository.save(score);
    const score = this.scoreRepository.create(createScoreDto);

    // Tìm kiếm sinh viên
    const student = await this.studentRepository.findOne({
      where: { studentID: createScoreDto.studentID },
    });
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    score.student = student;

    // Tìm kiếm kỳ thi
    const exam = await this.examRepository.findOne({
      where: { examID: createScoreDto.examID },
    });
    if (!exam) {
      throw new NotFoundException('Exam not found');
    }
    score.exam = exam;

    return this.scoreRepository.save(score);
  }

  async findAll(): Promise<Score[]> {
    return this.scoreRepository.find({ relations: ['student', 'exam'] });
  }

  async findOne(id: number): Promise<Score> {
    const score = await this.scoreRepository.findOne({
      where: { scoreID: id },
      relations: ['student', 'exam'],
    });
    if (!score) {
      throw new NotFoundException('Score not found');
    }
    return score;
  }

  async update(id: number, updateScoreDto: UpdateScoreDto): Promise<Score> {
    // await this.scoreRepository.update(id, updateScoreDto);
    // return this.findOne(id);
    const score = await this.scoreRepository.findOne({
      where: { scoreID: id },
      relations: ['student', 'exam'],
    });
    if (!score) {
      throw new NotFoundException('Score not found');
    }

    if (updateScoreDto.studentID) {
      const student = await this.studentRepository.findOne({
        where: { studentID: updateScoreDto.studentID },
      });
      if (!student) {
        throw new NotFoundException('Student not found');
      }
      score.student = student;
    }

    if (updateScoreDto.examID) {
      const exam = await this.examRepository.findOne({
        where: { examID: updateScoreDto.examID },
      });
      if (!exam) {
        throw new NotFoundException('Exam not found');
      }
      score.exam = exam;
    }

    Object.assign(score, updateScoreDto);
    return this.scoreRepository.save(score);
  }

  async remove(id: number): Promise<{ message: string }> {
    const score = await this.findOne(id);
    if (!score) {
      throw new NotFoundException('score not found');
    }
    await this.scoreRepository.delete(id);
    return { message: 'delete success' };
  }
}
