import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from '../../student/entities/student.entity';

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  classID: number;

  //   @Column()
  //   classID: number;

  @Column()
  className: string;

  @Column()
  teacher: string;

  @OneToMany(() => Student, (student) => student.class)
  @JoinColumn({ name: 'studentID' })
  students: Student[];
}
