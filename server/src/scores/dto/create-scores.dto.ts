// import { ApiProperty } from '@nestjs/swagger';
// import { IsString, IsOptional, IsNumber } from 'class-validator';

// export class CreateScorsDto {
//   @ApiProperty()
//   @IsNumber()
//   studentID: number; // ID của sinh viên

//   @ApiProperty()
//   @IsNumber()
//   examID: number; // ID của bài kiểm tra

//   @ApiProperty()
//   @IsNumber()
//   score: number; // Điểm số

//   @IsString()
//   @IsOptional()
//   className?: string;

//   @IsString()
//   @IsOptional()
//   teacher?: string;
// }
import { IsInt, IsOptional } from 'class-validator';

export class CreateScoreDto {
  @IsInt()
  @IsOptional()
  score?: number;

  @IsInt()
  @IsOptional()
  studentID: number; // Liên kết với bảng Student

  @IsInt()
  @IsOptional()
  examID: number; // Liên kết với bảng Exams
}
