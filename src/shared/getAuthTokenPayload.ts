import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthTokenPayload, PlatformRequest } from '../lib/types/type';

export const GetAuthPayload = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() as PlatformRequest;
    if (data) {
      
      const authPayloadProp = data as string;
      return request.authPayload ? request.authPayload[authPayloadProp] : request.authPayload;
    }

    return  request.authPayload;
  },
);


