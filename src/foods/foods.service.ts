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
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { validate as isUuid } from 'uuid';

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

  async findAll(pagination: PaginationDto) {
    const { limit = 7, page = 0 } = pagination;
    return await this.foodRepository.find({
      take: limit,
      skip: page,
    });
  }

  async findOne(param: string) {
    let findedFood: Food;

    if (isUuid(param)) {
      // Si es un UUID válido, busca por id
      findedFood = await this.foodRepository.findOneBy({ id: param });
    } else {
      // Si no es un UUID, busca por food_name
      const queryBuilder = this.foodRepository.createQueryBuilder();
      findedFood = await queryBuilder
        .where('food_name = :food_name', { food_name: param })
        .getOne();
    }

    if (!findedFood)
      throw new NotFoundException(`The food ${param} was not found`);

    return findedFood;
  }

  async update(id: string, updateFoodDto: UpdateFoodDto) {
    const food = await this.foodRepository.preload({
      id,
      ...updateFoodDto,
    });

    if (!food)
      throw new NotFoundException(`The food with id: ${id} was not found`);

    await this.foodRepository.save(food);
    return food;
  }

  async remove(id: string) {
    const findedFood = await this.findOne(id);
    await this.foodRepository.remove(findedFood);
  }
}
