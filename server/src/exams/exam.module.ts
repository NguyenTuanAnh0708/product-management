import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamService } from './exam.service';
import { ExamController } from './exam.controller';
import { Exam } from './entities/exams.entity';
import { Class } from '../class/entities/class.entity';
import { Score } from '../scores/entities/scores.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Exam, Class, Score]), // Kết nối với Exam, Class, và Score
  ],
  controllers: [ExamController],
  providers: [ExamService],
})
export class ExamModule { }
