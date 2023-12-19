import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { validate as isUuid } from 'uuid';
import { Food, FoodImage } from './entities';
import { Restaurant } from 'src/restaurants/entities/restaurant.entity';

@Injectable()
export class FoodsService {
  constructor(
    @InjectRepository(Food) private readonly foodRepository: Repository<Food>,
    @InjectRepository(FoodImage)
    private readonly foodImageRepository: Repository<FoodImage>,
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
    private readonly dataSource: DataSource,
  ) {}
  async create(createFoodDto: CreateFoodDto) {
    const { food_image, restaurant, ...restFood } = createFoodDto;
    try {
      const newFood = this.foodRepository.create({
        ...restFood,
        food_image: this.foodImageRepository.create({ url: food_image }),
        restaurant: this.restaurantRepository.create({ name: restaurant }),
      });
      await this.foodRepository.save(newFood);
      return { ...newFood, food_image };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async findAll(pagination: PaginationDto) {
    const { limit = 10, page = 0 } = pagination;
    return await this.foodRepository.find({
      take: limit,
      skip: page,
      relations: { food_image: true },
    });
  }

  async findOne(param: string) {
    let findedFood: Food;

    if (isUuid(param)) {
      // Si es un UUID válido, busca por id
      findedFood = await this.foodRepository.findOneBy({ id: param });
    } else {
      // Si no es un UUID, busca por food_name
      const queryBuilder = this.foodRepository.createQueryBuilder('food');
      findedFood = await queryBuilder
        .where('food_name = :food_name', { food_name: param })
        .leftJoinAndSelect('food.food_image', 'food_image')
        .getOne();
    }

    if (!findedFood)
      throw new NotFoundException(`The food ${param} was not found`);

    return findedFood;
  }

  async update(id: string, updateFoodDto: UpdateFoodDto) {
    const { food_image, restaurant, ...restFood } = updateFoodDto;

    const food = await this.foodRepository.preload({
      id,
      ...restFood,
    });

    if (!food)
      throw new NotFoundException(`The food with id: ${id} was not found`);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (food_image) {
        await queryRunner.manager.delete(FoodImage, { food: { id } });
        food.food_image = this.foodImageRepository.create({ url: food_image });
      }

      if (restaurant) {
        await queryRunner.manager.delete(Food, { restaurant: { id } });
        food.restaurant = this.restaurantRepository.create({
          name: restaurant,
        });
      }

      await queryRunner.manager.save(food);
      await queryRunner.commitTransaction();
      await queryRunner.release();

      return food;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
    }
  }

  async remove(id: string) {
    const findedFood = await this.findOne(id);
    await this.foodRepository.remove(findedFood);
  }
}
