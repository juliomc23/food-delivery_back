import { SetMetadata } from '@nestjs/common';
import { ValidRoles } from 'src/auth/interfaces/valid-roles.interface';

export const ROLES_KEY = 'roles';

export const Roleprotected = (...args: ValidRoles[]) =>
  SetMetadata(ROLES_KEY, args);
