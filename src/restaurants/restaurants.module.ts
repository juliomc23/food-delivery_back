import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { Food } from 'src/foods/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, Food])],

  controllers: [RestaurantsController],
  providers: [RestaurantsService],
})
export class RestaurantsModule {}
