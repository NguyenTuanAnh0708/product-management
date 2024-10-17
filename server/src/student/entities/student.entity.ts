import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Class } from '../../class/entities/class.entity';
import { Score } from '../../scores/entities/scores.entity';
@Entity()
export class Student {
  @PrimaryGeneratedColumn({ name: 'StudentID' })
  studentID: number;

  @Column()
  nameStudent: string;

  @Column({ name: 'classID' })
  classID: number;

  @ManyToOne(() => Class, (classEntity) => classEntity.students)
  @JoinColumn({ name: 'classID' }) // Chỉ định rõ tên cột
  class: Class;

  @OneToMany(() => Score, (score) => score.student)
  @JoinColumn({ name: 'scoreID' })
  scores: Score[];
}
