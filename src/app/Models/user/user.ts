export class User {
  constructor(
    public id: number | null,
    public username: string = '',
    public password: string = '',
    public name: string = '',
    public phone: string = '',
    public email: string = '',
    public gender: number,
    public birthday: Date,
    public address: string
  ) {}
}
