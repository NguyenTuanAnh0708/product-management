import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { Class } from 'src/class/entities/class.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Class])],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [TypeOrmModule],
})
export class StudentModule {}
