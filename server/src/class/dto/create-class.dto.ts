import { IsString, IsOptional } from 'class-validator';

export class CreateClassDto {
  @IsString()
  @IsOptional()
  className?: string;

  @IsString()
  @IsOptional()
  teacher?: string;
}
