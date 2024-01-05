import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';

export const RequiredUser = createParamDecorator(
  (data, executionContext: ExecutionContext) => {
    const request = executionContext.switchToHttp().getRequest();
    const user = request.user;

    if (!user)
      throw new InternalServerErrorException(
        'User not found, provide in request',
      );
    return !data ? user : user[data];
  },
);
