export class UpdatedCompanyEvent {
  constructor(public readonly id: string, public readonly version: number) {}
}
