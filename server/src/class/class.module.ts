import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { Class } from './entities/class.entity';
import { Student } from '../student/entities/student.entity'; // Import Student entity
import { Exam } from '../exams/entities/exams.entity'; // Import Exam entity

@Module({
  imports: [
    TypeOrmModule.forFeature([Class, Student, Exam]), // Kết nối với Class, Student, và Exam
  ],
  controllers: [ClassController],
  providers: [ClassService],
})
export class ClassModule {}
