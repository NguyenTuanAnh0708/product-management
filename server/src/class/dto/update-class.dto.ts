import { PartialType } from '@nestjs/mapped-types';
import { CreateClassDto } from './create-class.dto';
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateClassDto extends CreateClassDto {
  // @ApiProperty({
  //     description: 'Tên lớp học',
  //     required: false,
  // })
  // @IsString()
  // @IsOptional()
  // className?: string;
  // @ApiProperty({
  //     description: 'Tên giáo viên',
  //     required: false,
  // })
  // @IsString()
  // @IsOptional()
  // teacher?: string;
}
