import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Roleprotected } from './decorators/roleprotected.decorator';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { UserRolesGuard } from './guards/user-roles/user-roles.guard';
import { ValidRoles } from './interfaces/valid-roles.interface';
import { Auth } from './decorators/auth.decorator';
import { RequiredUser } from './decorators/required-user.decorator';
import { User } from './entities/auth.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  create(@Body() signupDto: SignUpDto) {
    return this.authService.create(signupDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('private')
  @Roleprotected(ValidRoles.admin, ValidRoles.superUser)
  @UseGuards(AuthGuard(), UserRolesGuard)
  privateEndpoint() {
    return {
      ok: true,
      message: 'Authenticated user',
    };
  }

  @Get('sensible')
  @Auth(ValidRoles.user, ValidRoles.admin)
  sensibleDataEndPoint(@RequiredUser('id') userId: User) {
    return {
      ok: true,
      message: 'Sensible data',
      userId,
    };
  }
}
