import {
  ICompanyRepository,
  OrderCompany,
  WhereCompany,
  WhereUniqueCompany,
} from '../../domain/interfaces/IRepository';
import { PaginatorParams } from 'src/shared/core/PaginatorParams';
import { ICompany } from '../../domain/interfaces/ICompany';
import { PayloadResult } from 'src/shared/core/PayloadResult';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from '../entities/company.entity';

export class CompanyRepository implements ICompanyRepository {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly _companyRepository: Repository<CompanyEntity>,
  ) {}

  async find(where?: WhereCompany[]): Promise<ICompany[]> {
    throw new Error('Method not implemented.');
  }

  async findOne(whereUnique: WhereUniqueCompany): Promise<ICompany> {
    const company = await this._companyRepository.findOne({
      id: whereUnique.id,
    });

    if (!company) {
      throw new Error('Company not found');
    }

    return company;
  }

  async paginatedFind(
    paginatorParams: PaginatorParams,
    where?: WhereCompany[],
    order?: OrderCompany,
  ): Promise<PayloadResult<ICompany>> {
    throw new Error('Method not implemented.');
  }

  async create(company: ICompany): Promise<void> {
    await this._companyRepository
      .create({
        id: company.id,
        code: company.code,
        name: company.name,
      })
      .save();
  }

  async update(
    where: WhereUniqueCompany,
    data: Partial<ICompany>,
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async delete(where: WhereUniqueCompany): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
