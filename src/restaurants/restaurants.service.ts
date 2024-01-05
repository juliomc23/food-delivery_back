import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Food, FoodImage } from 'src/foods/entities';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { User } from 'src/auth/entities/auth.entity';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
    @InjectRepository(Food) private readonly foodRepository: Repository<Food>,
    @InjectRepository(FoodImage)
    private readonly foodImageRepository: Repository<FoodImage>,
  ) {}
  async create(createRestaurantDto: CreateRestaurantDto, user: User) {
    const { foods, ...restRestaurantProperties } = createRestaurantDto;
    const restaurant = this.restaurantRepository.create({
      ...restRestaurantProperties,
      foods: foods.map((food) => {
        // Crea siempre una entidad FoodImage
        const foodImageEntity = this.foodImageRepository.create({
          url: food.food_image?.url || null, // Asigna la URL si existe, de lo contrario asigna null
        });

        return this.foodRepository.create({
          ...food,
          food_image: foodImageEntity,
        });
      }),
      user,
    });

    await this.restaurantRepository.save(restaurant);
    return restaurant;
  }

  findAll() {
    return `This action returns all restaurants`;
  }

  findOne(id: number) {
    return `This action returns a #${id} restaurant`;
  }

  update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    console.log(updateRestaurantDto);
    return `This action updates a #${id} restaurant`;
  }

  remove(id: number) {
    return `This action removes a #${id} restaurant`;
  }
}
