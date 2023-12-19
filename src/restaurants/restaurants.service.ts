import { Injectable } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { Repository } from 'typeorm';
import { Food } from 'src/foods/entities';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
    @InjectRepository(Food) private readonly foodRepository: Repository<Food>,
  ) {}
  async create(createRestaurantDto: CreateRestaurantDto) {
    const { foods, ...restRestaurantProperties } = createRestaurantDto;
    const restaurant = this.restaurantRepository.create({
      ...restRestaurantProperties,
      foods: foods.map((food_name) =>
        this.foodRepository.create({ food_name }),
      ),
    });

    await this.restaurantRepository.save(restaurant);
    return 'This action adds a new restaurant';
  }

  findAll() {
    return `This action returns all restaurants`;
  }

  findOne(id: number) {
    return `This action returns a #${id} restaurant`;
  }

  update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    return `This action updates a #${id} restaurant`;
  }

  remove(id: number) {
    return `This action removes a #${id} restaurant`;
  }
}
