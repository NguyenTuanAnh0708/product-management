import { IsString, IsOptional, IsDate, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateExamDto {
  @IsString()
  @IsOptional()
  examName?: string;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  examDate?: Date;
  @IsInt()
  @IsOptional()
  classID: number;
}
