import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
// import { RequestService } from './request/request.service';
// import { HelpersService } from './helpers/helpers.service';
// import { ProfileService } from './profile/profile.service';
// import { HttpModule } from '@nestjs/axios';
import { SharedService } from './shared.service';
@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      async useFactory() {
        // await ConfigModule.envVariablesLoaded;

        return {
          signOptions: {
            expiresIn: '8h',
          },
          secret: 'thisisthesecret',
        };
      },
      // inject: [ConfigService],
    }),
    // HttpModule,
  ],
  providers: [
    SharedService,
    JwtService,
    // RequestService,
    // HelpersService,
    // ProfileService,
    ConfigService,
  ],
  exports: [
    SharedService,
    JwtService,
    // HelpersService,
    // ProfileService,
    // RequestService,
  ],
})
export class SharedModule {}
