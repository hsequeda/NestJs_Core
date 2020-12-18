export class CreatedCompanyEvent {
  constructor(public readonly id: string, public readonly version = 1) {}
}
