import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @IsOptional()
  nameStudent?: string;
  @IsInt()
  @IsOptional()
  classID: number;
}
