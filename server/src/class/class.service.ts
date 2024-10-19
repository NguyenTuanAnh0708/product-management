import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { Class } from './entities/class.entity';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
  ) {}

  async create(
    createClassDto: CreateClassDto,
  ): Promise<{ class: Class; message: string }> {
    const classEntity = this.classRepository.create(createClassDto);

    const savedClass = await this.classRepository.save(classEntity);
    return { class: savedClass, message: 'Class created successfully' };
  }

  async findAll(): Promise<Class[]> {
    return this.classRepository.find({ relations: ['students'] });
  }

  async findOne(id: number): Promise<Class> {
    // return this.classRepository.findOneBy({classID: id });
    const classEntity = await this.classRepository.findOne({
      where: { classID: id },
      relations: ['students'], // Giả sử 'students' là tên mối quan hệ trong entity Class
    });

    if (!classEntity) {
      throw new NotFoundException('Class not found');
    }

    return classEntity;
  }

  async update(
    id: number,
    updateClassDto: UpdateClassDto,
  ): Promise<{ class: Class; message: string }> {
    const classEntity = await this.findOne(id);
    if (!classEntity) {
      throw new NotFoundException('Class not found');
    }
    await this.classRepository.update({ classID: id }, updateClassDto);
    // console.log('upadate id:', id);

    const classUpdate = await this.findOne(id);
    return { message: 'update class success', class: classUpdate };
  }

  async remove(id: number): Promise<{ message: string }> {
    const classEntity = await this.findOne(id);
    if (!classEntity) {
      throw new NotFoundException('Class not found');
    }
    await this.classRepository.delete(id);
    return { message: 'delete success' };
  }
}
