import { IsString, IsOptional, IsDate, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExamDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  examName?: string;
  @ApiProperty()
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  examDate?: Date;
  @ApiProperty()
  @IsInt()
  @IsOptional()
  classID: number; // Liên kết với bảng Class
}
