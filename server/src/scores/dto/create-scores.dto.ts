// import { ApiProperty } from '@nestjs/swagger';
// import { IsString, IsOptional, IsNumber } from 'class-validator';

// export class CreateScorsDto {
//   @ApiProperty()
//   // @IsNumber()
//   // scoreID: number;
//   @IsNumber()
//   studentID: number;


//   @ApiProperty()
//   @IsNumber()
//   examID: number;

//   @IsString()
//   @IsOptional()
//   className?: string;
//   @ApiProperty()
//   @IsNumber()
//   @IsOptional()
//   score: number;
//   @IsString()
//   @IsOptional()
//   teacher?: string;

//   // @IsString()
//   // @IsOptional()
//   // className?: string;
//   // @IsString()
//   // @IsOptional()
//   // teacher?: string;
// }
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateScorsDto {
  @ApiProperty()
  @IsNumber()
  studentID: number; // ID của sinh viên

  @ApiProperty()
  @IsNumber()
  examID: number; // ID của bài kiểm tra

  @ApiProperty()
  @IsNumber()
  score: number; // Điểm số

  @IsString()
  @IsOptional()
  className?: string;

  @IsString()
  @IsOptional()
  teacher?: string;
}