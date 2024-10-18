import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsInt } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  className?: string;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  classID: number; // Liên kết với bảng Class
}
