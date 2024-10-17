import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from './entities/class.entity';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class)
    private classRepository: Repository<Class>,
  ) {}

  async create(
    createClassDto: CreateClassDto,
  ): Promise<{ message: string; class: Class }> {
    const newClass = this.classRepository.create(createClassDto);
    console.log(newClass.classID);

    await this.classRepository.save(newClass);
    console.log(newClass);
    return { message: 'Class created successfully', class: newClass };
  }

  findAll(): Promise<Class[]> {
    return this.classRepository.find();
  }

  async findOne(classID: number): Promise<{ message: string; class: Class }> {
    const classFound = await this.classRepository.findOneBy({ classID });
    if (!classFound) {
      throw new NotFoundException(`Class with id ${classID} not found`);
    }
    return { message: 'Class success', class: classFound };
  }

  async update(
    classID: number,
    updateClassDto: UpdateClassDto,
  ): Promise<{ message: string; class: Class | void }> {
    const updateclass = await this.classRepository.findOneBy({ classID });
    if (!updateclass) {
      throw new NotFoundException(`class width id ${classID} not found`);
    }
    Object.assign(updateclass, updateClassDto);

    await this.classRepository.save(updateclass);
    return { message: 'Class updated successfully', class: updateclass };
  }

  async remove(id: number): Promise<{ message: string }> {
    const classIndex = await this.classRepository.delete(id);
    if (classIndex.affected === 0) {
      throw new Error(`class with ${id} not fund`);
    }
    return { message: 'Class removed successfully' };
  }
}
