// @Injectable()
// export class ScoreService {
//   constructor(
//     @InjectRepository(Score)
//     private scoreRepository: Repository<Score>,
//     @InjectRepository(Student)
//     private studentRepository: Repository<Student>,
//     @InjectRepository(Exam)
//     private examRepository: Repository<Exam>,
//   ) {}

//   async create(createScoreDto: CreateScoreDto): Promise<Score> {
//     const score = this.scoreRepository.create(createScoreDto);

//     // Liên kết với Student
//     const student = await this.studentRepository.findOneBy({ studentID: createScoreDto.studentID });
//     if (!student) {
//       throw new NotFoundException('Student not found');
//     }
//     score.student = student;

//     // Liên kết với Exam
//     const exam = await this.examRepository.findOneBy({ examID: createScoreDto.examID });
//     if (!exam) {
//       throw new NotFoundException('Exam not found');
//     }
//     score.exam = exam;

//     return this.scoreRepository.save(score);
//   }

//   async findAll(): Promise<Score[]> {
//     return this.scoreRepository.find({
//       relations: ['student', 'exam'],  // Lấy luôn thông tin Student và Exam
//     });
//   }

//   async findOne(id: number): Promise<Score> {
//     return this.scoreRepository.findOne({
//       where: { scoreID: id },
//       relations: ['student', 'exam'],  // Lấy thông tin Student và Exam
//     });
//   }

//   async update(id: number, updateScoreDto: UpdateScoreDto): Promise<Score> {
//     const score = await this.scoreRepository.findOneBy({ scoreID: id });
//     if (!score) {
//       throw new NotFoundException('Score not found');
//     }

//     const student = await this.studentRepository.findOneBy({ studentID: updateScoreDto.studentID });
//     if (!student) {
//       throw new NotFoundException('Student not found');
//     }
//     score.student = student;

//     const exam = await this.examRepository.findOneBy({ examID: updateScoreDto.examID });
//     if (!exam) {
//       throw new NotFoundException('Exam not found');
//     }
//     score.exam = exam;

//     Object.assign(score, updateScoreDto);

//     return this.scoreRepository.save(score);
//   }

//   async remove(id: number): Promise<void> {
//     await this.scoreRepository.delete(id);
//   }
// }
// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Score } from './entity/score.entity';
// import { CreateScoreDto } from './dto/create-score.dto';
// import { UpdateScoreDto } from './dto/update-score.dto';

// @Injectable()
// export class ScoreService {
//   constructor(
//     @InjectRepository(Score)
//     private scoreRepository: Repository<Score>,
//   ) {}

//   async findAll(): Promise<Score[]> {
//     return await this.scoreRepository.find();
//   }

//   async findOne(id: number): Promise<Score> {
//     const found = await this.scoreRepository.findOne({ where: { scoreID: id } });
//     if (!found) {
//       throw new NotFoundException(`Score with ID ${id} not found`);
//     }
//     return found;
//   }

//   async create(createScoreDto: CreateScoreDto): Promise<Score> {
//     const newScore = this.scoreRepository.create(createScoreDto);
//     return await this.scoreRepository.save(newScore);
//   }

//   async update(id: number, updateScoreDto: UpdateScoreDto): Promise<Score> {
//     const scoreToUpdate = await this.findOne(id);
//     Object.assign(scoreToUpdate, updateScoreDto);
//     return await this.scoreRepository.save(scoreToUpdate);
//   }

//   async remove(id: number): Promise<void> {
//     const result = await this.scoreRepository.delete(id);
//     if (result.affected === 0) {
//       throw new NotFoundException(`Score with ID ${id} not found`);
//     }
//   }
// }
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
  ) {}

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
    return await this.scoreRepository.findOne({
      where: { scoreID: id },
      relations: ['student', 'exam'],
    });
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

  async remove(id: number): Promise<void> {
    await this.scoreRepository.delete(id);
  }
}
