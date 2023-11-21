import { Image } from '../image/image';

export class RoomType {
  constructor(
    public id: number | null,
    public name: string,
    public numberOfAdult: number,
    public numberOfChild: number,
    public bedType: string,
    public price: number,
    public description: string,
    public isFull: boolean,
    public enable: boolean,
    public createdDate: string | null,
    public updatedDate: string | null,
    public images: Image[]
  ) {}
}
