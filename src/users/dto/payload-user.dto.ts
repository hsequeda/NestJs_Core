import { ObjectType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import PayloadData from 'src/shared/dto/base-payload.dto';

@ObjectType()
export class PayloadUser extends PayloadData(User) {}
