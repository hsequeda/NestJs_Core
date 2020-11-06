/* export interface StrFieldOptions { */
/*   starts_with?: string; */
/*   end_with?: string; */
/*   contains?: string; */
/* } */

/* export interface Field {} */
/* export interface IWhere {} */

export interface IWhereInput {
  AND?: [IWhereInput];
  OR?: [IWhereInput];
  NOT?: [IWhereInput];
  id_in?: string[];
  createdAt_lt?: Date;
  createdAt_gte?: Date;
  createdAt_lte?: Date;
  createdAt_gt?: Date;
  updatedAt_lt?: Date;
  updatedAt_gte?: Date;
  updatedAt_lte?: Date;
  updatedAt_gt?: Date;
}
