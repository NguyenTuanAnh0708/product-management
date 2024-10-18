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
