import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Food } from './entities/food.entity';

@Injectable()
export class FoodsService {
  constructor(
    @InjectRepository(Food) private readonly foodRepository: Repository<Food>,
  ) {}
  async create(createFoodDto: CreateFoodDto) {
    try {
      const newFood = this.foodRepository.create(createFoodDto);
      await this.foodRepository.save(newFood);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async findAll() {
    return await this.foodRepository.find();
  }

  async findOne(id: string) {
    const findedFood = await this.foodRepository.findOneBy({ id });
    if (!findedFood)
      throw new NotFoundException(`The food with id ${id} was not found`);
    return findedFood;
  }

  update(id: number, _updateFoodDto: UpdateFoodDto) {
    return `This action updates a #${id} food`;
  }

  async remove(id: string) {
    const findedFood = await this.findOne(id);
    await this.foodRepository.remove(findedFood);
  }
}
