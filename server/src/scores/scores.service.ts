import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Score } from './entities/scores.entity';
import { CreateScorsDto } from './dto/create-scores.dto';
import { Student } from 'src/student/entities/student.entity';
import { Exam } from 'src/exams/entities/exams.entity';
// import { UpdateClassDto } from 'src/class/dto/update-class.dto';
@Injectable()
export class ScoresService {
  //   constructor(
  //     @InjectRepository(Score)
  //     private scoreRepository: Repository<Score>,
  //   ) {}
  //   async create(createScorsDto: CreateScorsDto): Promise<Score> {
  //     const newScore = await this.scoreRepository.create(createScorsDto);
  //     return await this.scoreRepository.save(newScore);
  //   }
  constructor(
    @InjectRepository(Score)
    private readonly scoreRepository: Repository<Score>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Exam)
    private readonly examRepository: Repository<Exam>,
  ) { }
  async createScore(createScorsDto: CreateScorsDto): Promise<Score> {
    const student = await this.studentRepository.findOne({
      where: { studentID: createScorsDto.studentID },
    });

    const exam = await this.examRepository.findOne({
      where: { examID: createScorsDto.examID },
    });

    if (!student || !exam) {
      throw new HttpException('Student or Exam not found', HttpStatus.NOT_FOUND);
    }

    const newScore = this.scoreRepository.create({
      student: student,
      exam: exam,
      score: createScorsDto.score,
    });

    return await this.scoreRepository.save(newScore);
  }
  // async createScore(createScorsDto: CreateScorsDto): Promise<Score> {
  //   const student = await this.studentRepository.findOne({
  //     where: { studentID: createScorsDto.studentID },
  //   });

  //   const exam = await this.examRepository.findOne({
  //     where: { examID: createScorsDto.examID },
  //   });

  //   if (!student || !exam) {
  //     throw new HttpException('Student or Exam not found', HttpStatus.NOT_FOUND);
  //   }

  //   const newScore = this.scoreRepository.create({
  //     student: student,
  //     exam: exam,
  //     score: createScorsDto.score,
  //   });

  //   return await this.scoreRepository.save(newScore);
  // }
  // async createScore(createScorsDto: CreateScorsDto): Promise<Score> {
  //   // Tìm thực thể Student từ studentId
  //   // const student = await this.studentRepository.findOne({
  //   //   where: { studentID: createScorsDto.studentId },
  //   // });
  //   // // Tìm thực thể Exam từ examId
  //   // const exam = await this.examRepository.findOne({
  //   //   where: { examID: createScorsDto.examId },
  //   // });
  //   // // Kiểm tra xem có tìm thấy student và exam không
  //   // if (!student || !exam) {
  //   //   throw new HttpException(
  //   //     'Student or Exam not found',
  //   //     HttpStatus.NOT_FOUND,
  //   //   );
  //   // }
  //   // // Tạo thực thể Score mới bằng cách truyền vào thực thể student và exam
  //   const newScore = await this.scoreRepository.create(createScorsDto);
  //   //   s: student, // Gán thực thể Student
  //   //   exam: exam, // Gán thực thể Exam
  //   //   score: createScorsDto.score, // Gán điểm số
  //   // });
  //   // // Lưu thực thể mới vào database
  //   console.log(newScore)
  //   return await this.scoreRepository.save(newScore);
  // }

  finAll(): Promise<Score[]> {
    return this.scoreRepository.find();
  }
  async findOne(id: number): Promise<Score> {
    // return this.scoreRepository.findOneBy({ scoreId: id });
    const score = await this.scoreRepository.findOne({
      where: { scoreID: id },
      relations: ['student', 'exam'],
    });
    if (!score) {
      throw new HttpException('Score not found', HttpStatus.NOT_FOUND);
    }

    return score;
  }
  //   async update(
  //     scoreID: number,
  //     updateScoreDto: Partial<CreateScorsDto>,
  //   ): Promise<Score> {
  //     const score = await this.scoreRepository.findOne({ where: { scoreID } });

  //     if (!score) {
  //       throw new HttpException('Score not found', HttpStatus.NOT_FOUND);
  //     }

  //     // Nếu có cập nhật studentId, tìm student mới
  //     if (updateScoreDto.studentId) {
  //       const student = await this.studentRepository.findOne({
  //         where: { studentID: updateScoreDto.studentId },
  //       });
  //       if (!student) {
  //         throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
  //       }
  //       score.student = student;
  //     }

  //     // Nếu có cập nhật examId, tìm exam mới
  //     if (updateScoreDto.examId) {
  //       const exam = await this.examRepository.findOne({
  //         where: { examID: updateScoreDto.examId },
  //       });
  //       if (!exam) {
  //         throw new HttpException('Exam not found', HttpStatus.NOT_FOUND);
  //       }
  //       score.exam = exam;
  //     }

  //     // Cập nhật điểm số (nếu có)
  //     if (updateScoreDto.score) {
  //       score.score = updateScoreDto.score;
  //     }

  //     return this.scoreRepository.save(score);
  //   }

  async remove(id: number): Promise<void> {
    await this.scoreRepository.delete(id);
  }
}
