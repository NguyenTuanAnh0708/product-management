// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
// import { Exam } from '../../exams/entities/exams.entity';
// import { Student } from '../../student/entities/student.entity';
// @Entity()
// export class Score {
//   @PrimaryGeneratedColumn()
//   scoreID: number;

//   @ManyToOne(() => Student, (student) => student.scores)
//   @JoinColumn({ name: 'studentID' })
//   student: Student;

//   @ManyToOne(() => Exam, (exam) => exam.scores)
//   @JoinColumn({ name: 'examID' })
//   exam: Exam;

//   @Column()
//   score: number;
// }
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Student } from '../../student/entities/student.entity';
import { Exam } from '../../exams/entities/exams.entity';

@Entity()
export class Score {
  @PrimaryGeneratedColumn()
  scoreID: number;

  @Column()
  score: number;

  //   @Column()
  //   studentID:number;

  @ManyToOne(() => Student, (student) => student.scores)
  student: Student;

  @ManyToOne(() => Exam, (exam) => exam.scores)
  exam: Exam;
}
