export interface IUseCase<IRequest, IResponse> {
  execute(request: IRequest, ...rest: any): Promise<IResponse> | IResponse;
}
