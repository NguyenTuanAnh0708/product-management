import { Module, OnModuleInit, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { ClassController } from './class/class.controller';
// import { StudentController } from './student/student.controller';
import { ClassModule } from './class/class.module';
// import { StudentModule } from './student/student.module';
// import { ExamsController } from './exams/exams.controller';
// import { ScoresController } from './scores/scores.controller';
// import { ScoresService } from './scores/scores.service';
// import { ScoresModule } from './scores/scores.module';

// import { ExamsModule } from './exams/exams.module';
// import { StudentService } from './student/student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entity/user.entity';
import { Class } from './class/entities/class.entity';
import { Exam } from './exams/entities/exams.entity';
import { Score } from './scores/entities/scores.entity';
import { Student } from './student/entities/student.entity';
import { ScoresModule } from './scores/scores.module';
import { ExamsModule } from './exams/exams.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'sa',
      password: 'test01',
      database: 'test01',
      // entities: [User],
      entities: [Class, Exam, Score, Student, User],
      // synchronize: true,
      synchronize: false,
      options: {
        encrypt: false,
        trustServerCertificate: true,
      },
    }),

    // ScoresModule,
    // ExamsModule,
    // // StudentModule,
    ClassModule,
    UserModule,
    ScoresModule,
    ExamsModule,
    StudentModule,
  ],
  controllers: [
    AppController,
    // ClassController,
    // StudentController,
    // ExamsController,
    // ScoresController,
  ],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  private readonly logger = new Logger(AppModule.name);

  onModuleInit() {
    this.logger.log(
      'AppModule initialized. Database connection should be established by TypeOrmModule.',
    );
  }
}
// import { Module, OnModuleInit, Logger } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { DatabaseModule } from './configdatabase/database.module'; // Nhập module cấu hình cơ sở dữ liệu
// import { AppDataSource } from './configdatabase/data-source'; // Nhập DataSource

// @Module({
//   imports: [
//     DatabaseModule, // Sử dụng DatabaseModule
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule implements OnModuleInit {
//   private readonly logger = new Logger(AppModule.name);

//   async onModuleInit() {
//     await AppDataSource.initialize();
//     this.logger.log('AppModule initialized. Database connection established.');
//   }
// }
