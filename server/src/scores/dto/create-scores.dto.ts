
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export class CreateScoreDto {
  @ApiProperty()
  @IsInt()
  @IsOptional()
  score?: number;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  studentID: number; // Liên kết với bảng Student

  @ApiProperty()
  @IsInt()
  @IsOptional()
  examID: number; // Liên kết với bảng Exams
}
