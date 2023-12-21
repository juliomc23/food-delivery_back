import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
  create(signupDto: SignUpDto) {
    return 'This action adds a new auth';
  }
}
