import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRolesGuard } from '../guards/user-roles/user-roles.guard';
import { ValidRoles } from '../interfaces/valid-roles.interface';
import { Roleprotected } from './roleprotected.decorator';

export const Auth = (...roles: ValidRoles[]) => {
  return applyDecorators(
    Roleprotected(...roles),
    UseGuards(AuthGuard(), UserRolesGuard),
  );
};
