import { Type } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';

export default function getOrderByByEnum<T>(
  object: Type<T>,
  enumValue: string,
): { [P in keyof T]: 'ASC' | 'DESC' } {
  const x = new User();
  console.log(Object.getOwnPropertyNames(x));
  const [propName, order] = enumValue.split('_');
  console.log(Object.keys(object));
  if (!Object.keys(object).find(key => key === propName)) {
    throw new Error(`${propName} isn't key of ${object.constructor.name}`);
  }
  if (order !== 'ASC' && order !== 'DESC') {
    throw new Error(`order: ${order} isn't 'ASC' or DESC`);
  }
  return { [`${propName}`]: order } as { [P in keyof T]: 'ASC' | 'DESC' };
}
