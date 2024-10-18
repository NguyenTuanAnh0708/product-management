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

  async create(createClassDto: CreateClassDto): Promise<Class> {
    const classEntity = this.classRepository.create(createClassDto);
    return this.classRepository.save(classEntity);
  }

  async findAll(): Promise<Class[]> {
    return this.classRepository.find({ relations: ['students'] });
  }

  async findOne(classID: number): Promise<Class> {
    // return this.classRepository.findOneBy({classID: id });
    const classEntity = await this.classRepository.findOne({
      where: { classID: classID },
      relations: ['students'], // Giả sử 'students' là tên mối quan hệ trong entity Class
    });

    if (!classEntity) {
      throw new NotFoundException('Class not found');
    }

    return classEntity;
  }

  async update(id: number, updateClassDto: UpdateClassDto): Promise<Class> {
    await this.classRepository.update({ classID: id }, updateClassDto);
    console.log('upadate id:', id);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.classRepository.delete(id);
  }
}
