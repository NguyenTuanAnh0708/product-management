import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoresController } from './scores.controller';
import { ScoresService } from './scores.service';
import { Score } from './entities/scores.entity';
import { Student } from 'src/student/entities/student.entity';
import { Exam } from 'src/exams/entities/exams.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Score, Student, Exam])],
  controllers: [ScoresController],
  providers: [ScoresService],
  exports: [ScoresService],
})
export class ScoresModule {}
