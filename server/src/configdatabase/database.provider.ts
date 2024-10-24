// ];
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { Class } from '../class/entities/class.entity';
import { Exam } from '../exams/entities/exams.entity';
import { Score } from '../scores/entities/scores.entity';
import { Student } from '../student/entities/student.entity';
import { Category } from 'src/category/entities/category.entities';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mssql',
  host: 'localhost',
  port: 1433,
  username: 'sa',
  password: 'test01',
  database: 'test02',
  entities: [User, Class, Exam, Score, Student, Category],
  synchronize: true,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};
