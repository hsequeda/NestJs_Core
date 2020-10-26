import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, ExecutionContext } from '@nestjs/common';
import { AuthService } from 'src/auth/services/auth.service';
import { GqlExecutionContext } from '@nestjs/graphql';

import { IJwtPayload } from '../interface/IJwtPayload';

import { jwtConstants } from '../constants/jwt.constants'


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret
        });
    }

    async validate(payload: IJwtPayload) {
        const user = await this.authService.validateUserByJwtPayload(payload);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }

    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;
      }
}
