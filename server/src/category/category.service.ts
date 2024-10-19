import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entities';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(
    createCategoryDto: CreateCategoryDto,
  ): Promise<{ category: Category; message: string }> {
    const category = this.categoryRepository.create(createCategoryDto);
    const savedCategory = await this.categoryRepository.save(category);
    return {
      category: savedCategory,
      message: 'Category created successfully',
    };
  }

  async findAll(
    page: number,
    limit: number,
  ): Promise<{ data: Category[]; pagination: any }> {
    const [result, total] = await this.categoryRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      data: result,
      pagination: {
        current_page: page,
        per_page: limit,
        total_pages: totalPages,
        total_items: total,
      },
    };
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<{ category: Category; message: string }> {
    await this.findOne(id); // Check if category exists
    await this.categoryRepository.update(id, updateCategoryDto);
    const updatedCategory = await this.findOne(id);
    return {
      category: updatedCategory,
      message: 'Category updated successfully',
    };
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id); // Check if category exists
    await this.categoryRepository.delete(id);
    return { message: 'Category deleted successfully' };
  }
}
