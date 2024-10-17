import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exam } from './entities/exams.entity';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';

@Injectable()
export class ExamsService {
  constructor(
    @InjectRepository(Exam)
    private ExamRepository: Repository<Exam>,
  ) {}

  async create(createExamDto: CreateExamDto): Promise<Exam> {
    const newExam = await this.ExamRepository.create(createExamDto);
    return await this.ExamRepository.save(newExam);
  }
  findAll(): Promise<Exam[]> {
    return this.ExamRepository.find();
  }
  findOne(examID: number): Promise<Exam | null> {
    return this.ExamRepository.findOneBy({ examID });
  }
  async update(
    examID: number,
    updateExamDto: UpdateExamDto,
  ): Promise<{ message: string; exam: Exam }> {
    const update = await this.ExamRepository.findOneBy({ examID });
    if (!update) {
      throw new Error(`exam is ${examID} not fund`);
    }
    Object.assign(update, updateExamDto);

    await this.ExamRepository.save(update);
    return { message: 'Update updated successfully', exam: update };
  }
  async remove(id: number): Promise<{ message: string }> {
    const res = await this.ExamRepository.delete(id);
    if (res.affected === 0) {
      throw new Error(`User with ${id} not fund`);
    }
    return { message: 'Class removed successfully' };
  }
}
