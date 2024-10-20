import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoreService } from './score.service';
import { ScoreController } from './score.controller';
import { Score } from './entities/scores.entity';
import { Exam } from '../exams/entities/exams.entity'; // Import Exam entity
import { Student } from '../student/entities/student.entity'; // Import Student entity

@Module({
  imports: [
    TypeOrmModule.forFeature([Score, Exam, Student]), // Kết nối với Score, Exam, và Student
  ],
  controllers: [ScoreController],
  providers: [ScoreService],
})
export class ScoreModule {}
