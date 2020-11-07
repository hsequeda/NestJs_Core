import { getFieldOptions } from 'src/core/interfaces/IFieldOptions';
import { InputType } from '@nestjs/graphql';

@InputType()
export class BooleanFieldOptions extends getFieldOptions(Boolean) {}
