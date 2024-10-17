import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { StudentService } from './student.service';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentSevice: StudentService) { }

  @Post()
  async create(@Body() createStudentDto: CreateStudentDto) {
    return await this.studentSevice.create(createStudentDto);
  }
  @Get()
  findAll() {
    return this.studentSevice.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.studentSevice.finOne(id);
  }
  @Put(':id')
  async update(
    @Param() id: number,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentSevice.update(id, updateStudentDto);
  }
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.studentSevice.remove(id);
  }
}
