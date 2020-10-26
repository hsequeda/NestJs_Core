import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UserService } from 'src/user/services/user.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './passport/local.strategy';
import { JwtStrategy } from './passport/jwt.strategy';
import { AuthController } from './controllers/auth.controller';
import { jwtConstants } from './constants/jwt.constants'
import { NotificationModule } from 'src/notification/notification.module';
import { AuthResolver } from './resolvers/auth.resolver';


@Module({
  imports: [UserModule, NotificationModule, PassportModule.register({ defaultStrategy: 'jwt', session: true }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),],
  providers: [AuthService, LocalStrategy, JwtStrategy, AuthResolver],
  exports: [AuthService],
  controllers: [AuthController]
})

export class AuthModule { }
