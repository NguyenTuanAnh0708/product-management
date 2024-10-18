import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  className?: string;

  @IsInt()
  @IsOptional()
  classID: number; // Liên kết với bảng Class
}
