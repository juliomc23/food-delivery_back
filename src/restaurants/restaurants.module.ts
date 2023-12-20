import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { Food, FoodImage } from 'src/foods/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, Food, FoodImage])],

  controllers: [RestaurantsController],
  providers: [RestaurantsService],
})
export class RestaurantsModule {}
