import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(signupDto: SignUpDto) {
    const hashedPassword = this.hashPassword(signupDto.password);
    try {
      const user = this.userRepository.create({
        ...signupDto,
        password: hashedPassword,
      });
      await this.userRepository.save(user);

      return user;
    } catch (error) {
      this.handleDbErrors(error);
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
      select: { email: true, password: true },
    });

    if (!user) throw new UnauthorizedException('Email or password invalid');

    const validPassword = bcrypt.compareSync(loginDto.password, user.password);

    if (!validPassword)
      throw new UnauthorizedException('Email or password invalid');

    return user;
  }

  private handleDbErrors(error: any): void {
    if (error.code === '23505') {
      throw new ConflictException(error.detail);
    }
    console.log(error);

    throw new InternalServerErrorException('Please check server logs');
  }

  private hashPassword(password: string) {
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
  }
}
