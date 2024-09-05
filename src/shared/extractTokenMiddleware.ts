import {
    HttpException,
    HttpStatus,
    Injectable,
    NestMiddleware,
  } from '@nestjs/common';
  import { AuthTokenPayload, PlatformRequest } from 'src/lib/types/type';
  import { SharedService } from './shared.service';
  
  @Injectable()
  export class ExtractTokenMiddleWare implements NestMiddleware {
    constructor(private sharedService: SharedService) {
      //
    }
    async use(req: PlatformRequest, _: Response, next: (error?: any) => void) {
      try {
        const authTokenString = req.headers['authorization'] || '';
  
        if (authTokenString.length > 0) {
          const authToken = authTokenString.split(' ')[1];
          if (authToken !== 'undefined') {
            const authPayload = await this.sharedService.veryfyJwtToken(
              authToken,
            ) as unknown as AuthTokenPayload;
  
            if (authPayload) {
              if ('user' in authPayload && 'id' in authPayload.user) {
                req.authPayload = authPayload;
              }
            }
          }
        }
  
        // * Pass control to the next function.
        next();
      } catch (error) {
        // catch all errors
        throw new HttpException(error.message, HttpStatus.FORBIDDEN);
      }
    }
  }
  