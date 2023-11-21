export class Room {
  constructor(
    public id: number,
    public numberRoom: number,
    public isBooked: boolean,
    public enable: boolean,
    public floor: number,
    public gender: number
  ) {}
}
