import { InternalServerErrorException } from '@nestjs/common';

import { AnyParamConstructor } from '@typegoose/typegoose/lib/types';
import { ReturnModelType } from '@typegoose/typegoose';
import { MongoError } from 'mongodb';
import { Types } from 'mongoose';
import { Injectable } from '@nestjs/common';

import { BaseEntity } from 'src/core/entity/base.entity';
import { IPaginatedData } from 'src/core/interfaces/IPaginatedData';
import { IPaginatorParams } from 'src/core/interfaces/IPaginatorParams';

@Injectable()
export class BaseRepository<T extends BaseEntity> {
  protected model: ReturnModelType<AnyParamConstructor<T>>;

  constructor(model: ReturnModelType<AnyParamConstructor<T>>) {
    this.model = model;
  }

  protected static throwMongoError(err: MongoError): void {
    throw new InternalServerErrorException(err, err.errmsg);
  }

  protected static toObjectId(id: string): Types.ObjectId {
    try {
      return Types.ObjectId(id);
    } catch (e) {
      this.throwMongoError(e);
    }
  }

  createModel(doc?: Partial<T>): T {
    return new this.model(doc);
  }

  getModel(): ReturnModelType<AnyParamConstructor<T>> {
    return this.model;
  }

  async findPaginated(
    filter = {},
    paginator?: IPaginatorParams,
    populate?: any,
    select?: any,
    sort?: any,
  ): Promise<IPaginatedData<T>> {
    paginator = paginator ? paginator : { page: 1, limit: 25 };
    paginator.limit = paginator.limit ? paginator.limit : 25;
    const count = await this.model.countDocuments(filter);
    return {
      total: count,
      pages: Math.ceil(count / paginator.limit),
      currentPage: paginator.page,
      items: await this.model
        .find(filter)
        .limit(paginator.limit * 1)
        .select(select)
        .populate(populate)
        .sort(sort)
        .skip((paginator.page - 1) * paginator.limit)
        .lean(),
    };
  }

  async find(
    filter = {},
    populate?: any,
    select?: any,
    sort?: any,
    skip?: number,
    limit?: number,
  ): Promise<T[] | any> {
    return await this.model
      .find(filter)
      .select(select)
      .populate(populate)
      .sort(sort)
      .skip(skip || 0)
      .limit(limit || 0)
      .lean();
  }

  async findOne(filter = {}, populate?: any, select?: any): Promise<T> {
    return await this.model
      .findOne(filter)
      .select(select)
      .populate(populate);
  }

  async findById(id: string): Promise<T> {
    return await this.model.findById(id);
  }

  async create(item: T | any): Promise<T> {
    return await this.model.create(item);
  }

  async delete(filter = {}): Promise<{ ok?: number; n?: number }> {
    return await this.model.deleteMany(filter).exec();
  }

  async deleteOne(filter = {}): Promise<T | any> {
    return await this.model.findOneAndDelete(filter);
  }

  async deleteById(id: string): Promise<T> {
    return await this.model.findByIdAndDelete(id);
  }

  async updateOne(
    filter = {},
    item: T | any,
    upsert: boolean = false,
  ): Promise<T> {
    return await this.model.findOneAndUpdate(
      filter,
      { ...item },
      { new: true, upsert: upsert },
    );
  }

  async update(filter = {}, item: T | any): Promise<any> {
    return await this.model.updateMany(filter, { ...item });
  }

  async aggregate(pipe: any[]): Promise<any> {
    return await this.model.aggregate(...pipe);
  }

  async count(filter = {}): Promise<number> {
    return await this.model.countDocuments(filter);
  }
}
