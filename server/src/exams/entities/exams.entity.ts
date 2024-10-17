import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Score } from '../../scores/entities/scores.entity';
@Entity()
export class Exam {
  @PrimaryGeneratedColumn()
  examID: number;
  @Column()
  examName: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  examDate: Date;

  @OneToMany(() => Score, (score) => score.exam)
  scores: Score[]; // Đảm bảo thêm t
}
