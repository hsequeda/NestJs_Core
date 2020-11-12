import { registerEnumType } from '@nestjs/graphql';
export enum BaseEntityEnum {
  ID_ASC = 'id_ASC',
  ID_DESC = 'id_DESC',
  CRATEDAT_ASC = 'cratedAt_ASC',
  CRATEDAT_DESC = 'cratedAt_DESC',
  UPDATEDAT_ASC = 'updatedAt_ASC',
  UPDATEDAT_DES = 'updatedAt_DES',
}

registerEnumType(BaseEntityEnum, { name: 'BaseEntityEnum' });
