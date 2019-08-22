export class BodyResponse {
  constructor(
    public status: string,
    public message?: string,
    public results?: any,
    public errors?: string[]
  ) {}
}
