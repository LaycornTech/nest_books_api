import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { AuthTokenPayload } from 'src/lib/types/type';
import { DataSource, EntityManager } from 'typeorm';

@Injectable()
export class SharedService {
  
    constructor(private config: ConfigService, private jwtService: JwtService ){}
     
    async hashPassword(data: string | Buffer) {
        const saltRounds = Number(this.config.get('HASH_SALT_ROUNDS') || 10);
        const hashedPassword = await hash(data, saltRounds);
        return hashedPassword;
      }
    
      async veryfyJwtToken(token: string): Promise<Record<string, unknown>> {
        const payload = await this.jwtService.verify(token, {
          secret: 'thisisthesecret'
        });
        return payload;  
      }
    
      signPayload(
        payload: string | Buffer | AuthTokenPayload,
        // expiresIn?: string | number | JwtSignOptions,
      ): string {
        const stringifiedPayload =
          typeof payload === 'string' ? payload : JSON.stringify(payload);
        const token = this.jwtService.sign(stringifiedPayload, {
          secret: 'thisisthesecret',
        });
        return token;
      }
    
      async comparePassword(password: string, hashedPassword: string) {
        // hash password and compare with the one in the database
        const isPasswordCorrect = await compare(password, hashedPassword);
        return isPasswordCorrect;
      }
}
