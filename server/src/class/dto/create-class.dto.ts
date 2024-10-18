import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateClassDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  className?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  teacher?: string;
}
