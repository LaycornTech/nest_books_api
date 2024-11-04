import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthTokenPayload, PlatformRequest } from 'src/lib/types/type';

export class IsAuthenticated implements CanActivate {
  constructor() {
    //
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return this.checkUserAccess(context);
  }

  private checkUserAccess(context: ExecutionContext) {
    const userData = this.getContextData(
      context,
    ) as AuthTokenPayload;
    const isAuthenticated = !!userData && !!userData.user.id;

    return isAuthenticated;
  }

  private getContextData(
    context: ExecutionContext,
  ) {
    const req = context.switchToHttp().getRequest() as PlatformRequest;
    const authPayload = req.authPayload;
    return authPayload;
  }
}
