
import { Module, OnModuleInit } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { Student } from './student/entities/student.entity';
import { Class } from './class/entities/class.entity';
import { Exam } from './exams/entities/exams.entity';
import { Score } from './scores/entities/scores.entity';
import { ClassModule } from './class/class.module';
import { StudentModule } from './student/student.module';
import { ExamModule } from './exams/exam.module';
import { ScoreModule } from './scores/score.module';
import { CategoryModule } from './category/category.module';
import { Category } from './category/entities/category.entities';

@Module({
  imports: [


    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get<string>('DATABASE_HOST'),
        port: parseInt(configService.get<string>('PORT_SQL'), 10),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [Student, Class, Exam, Score, Category],
        synchronize: true,
        options: {
          encrypt: false,
        },
      }),
    }),
    StudentModule,
    ClassModule,
    ExamModule,
    ScoreModule,
    CategoryModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(private dataSource: DataSource) { }

  async onModuleInit() {
    // Kiểm tra nếu kết nối đã được khởi tạo
    if (this.dataSource.isInitialized) {
      console.log('Database connection established successfully!');
    } else {
      try {
        await this.dataSource.initialize();
        console.log('Database connection initialized successfully!');
      } catch (error) {
        console.error('Database connection failed!', error);
      }
    }
  }
}
