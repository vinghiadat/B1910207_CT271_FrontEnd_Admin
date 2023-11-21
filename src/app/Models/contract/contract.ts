import { User } from '../user/user';

export class Contract {
  constructor(
    public id: number,
    public customer: User, // Điều chỉnh User cho phù hợp với mô hình User của bạn
    public admin: User | null, // Điều chỉnh User cho phù hợp với mô hình User của bạn
    public totalPrice: number,
    public checkinDate: Date,
    public checkoutDate: Date,
    public roomType: string,
    public numberRoom: number,
    public floor: number,
    public status: number = 0,
    public note: string = '',
    public createdDate: Date
  ) {
    // Khởi tạo giá trị mặc định cho các trường nếu cần
  }
}
