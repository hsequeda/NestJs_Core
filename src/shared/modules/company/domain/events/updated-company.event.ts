interface UpdateCompanyEventParams {
  id: string;
  version: number;
  name?: string;
  code?: string;
}

export class UpdatedCompanyEvent {
  readonly id: string;
  readonly version: number;
  readonly name?: string;
  readonly code?: string;
  constructor(data: UpdateCompanyEventParams) {
    this.id = data.id;
    this.version = data.version;
    this.name = data.name;
    this.code = data.code;
  }
}
