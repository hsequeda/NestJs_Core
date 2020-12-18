export class DeletedCompanyEvent {
  constructor(public readonly id: string, public readonly version: number) {}
}
