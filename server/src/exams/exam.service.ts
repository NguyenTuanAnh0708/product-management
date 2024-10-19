// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Exam } from './entity/exam.entity';
// import { CreateExamDto } from './dto/create-exam.dto';
// import { UpdateExamDto } from './dto/update-exam.dto';

// @Injectable()
// export class ExamService {
//   constructor(
//     @InjectRepository(Exam)
//     private examRepository: Repository<Exam>,
//   ) {}

//   async findAll(): Promise<Exam[]> {
//     return await this.examRepository.find();
//   }

//   async findOne(id: number): Promise<Exam> {
//     const found = await this.examRepository.findOne({ where: { examID: id } });
//     if (!found) {
//       throw new NotFoundException(`Exam with ID ${id} not found`);
//     }
//     return found;
//   }

//   async create(createExamDto: CreateExamDto): Promise<Exam> {
//     const newExam = this.examRepository.create(createExamDto);
//     return await this.examRepository.save(newExam);
//   }

//   async update(id: number, updateExamDto: UpdateExamDto): Promise<Exam> {
//     const examToUpdate = await this.findOne(id);
//     Object.assign(examToUpdate, updateExamDto);
//     return await this.examRepository.save(examToUpdate);
//   }

//   async remove(id: number): Promise<void> {
//     const result = await this.examRepository.delete(id);
//     if (result.affected === 0) {
//       throw new NotFoundException(`Exam with ID ${id} not found`);
//     }
//   }
// }
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExamDto } from './dto/create-exam.dto';
import { UpdateExamDto } from './dto/update-exam.dto';
import { Exam } from './entities/exams.entity';

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(Exam)
    private examRepository: Repository<Exam>,
  ) {}

  async create(createExamDto: CreateExamDto): Promise<Exam> {
    const exam = this.examRepository.create(createExamDto);
    return this.examRepository.save(exam);
  }

  async findAll(): Promise<Exam[]> {
    return this.examRepository.find({ relations: ['scores'] });
  }

  async findOne(id: number): Promise<Exam> {
    const exam = await this.examRepository.findOne({
      where: { examID: id },
      relations: ['scores'],
    });
    if (!exam) {
      throw new NotFoundException(`Exam with ID ${id} not found`);
    }
    return exam;
  }

  async update(
    id: number,
    updateExamDto: UpdateExamDto,
  ): Promise<{ exam: Exam; message: string }> {
    const examid = await this.findOne(id);
    if (!examid) {
      throw new NotFoundException('Class not found');
    }
    await this.examRepository.update(id, updateExamDto);
    const exams = await this.findOne(id);
    return { message: 'update exam success', exam: exams };
  }

  async remove(id: number): Promise<{ message: string }> {
    const examid = await this.findOne(id);
    if (!examid) {
      throw new NotFoundException('exam not found');
    }
    await this.examRepository.delete(id);
    return { message: 'delete success' };
  }
}
