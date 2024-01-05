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
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async create(signupDto: SignUpDto) {
    const hashedPassword = this.hashPassword(signupDto.password);
    try {
      const user = this.userRepository.create({
        ...signupDto,
        password: hashedPassword,
      });
      await this.userRepository.save(user);

      const { accessToken, refreshToken } = this.generateJwtTokens({
        id: user.id,
      });

      return { accessToken, refreshToken };
    } catch (error) {
      this.handleDbErrors(error);
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
      select: { id: true, email: true, password: true },
    });

    if (!user) throw new UnauthorizedException('Email or password invalid');

    const validPassword = bcrypt.compareSync(loginDto.password, user.password);

    if (!validPassword)
      throw new UnauthorizedException('Email or password invalid');

    const { accessToken, refreshToken } = this.generateJwtTokens({
      id: user.id,
    });

    return { accessToken, refreshToken };
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

  private generateJwtTokens(payload: JwtPayload) {
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: this.configService.get('JWT_REFRESHTOKEN_SECRET'),
    });
    return {
      accessToken,
      refreshToken,
    };
  }
}
