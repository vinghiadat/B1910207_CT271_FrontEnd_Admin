import { Component, OnInit } from '@angular/core';
import { Room } from '../Models/room/room';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from '../Services/room/room.service';
import { ContractService } from '../Services/contract/contract.service';
import Swal from 'sweetalert2';
import { Admin } from '../Models/admin/admin';
import { AdminService } from '../Services/admin/admin.service';
import { AuthService } from '../Services/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from '../Models/user/user';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],
})
export class RoomsComponent implements OnInit {
  rooms: Room[] = [];
  errorMessage: string = '';
  students: User[] = [];
  id!: number;
  nowDate: Date = new Date();
  roomId: number | null = null;
  finalWater: number | null = null;
  finalElectricity: number | null = null;
  admin!: User;
  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private contractService: ContractService,
    private adminService: AdminService,
    private authService: AuthService,
    private spinner: NgxSpinnerService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];

      //Danh sách room
      this.roomService.getAllRoomByRoomType_Id(this.id).subscribe({
        next: (response: Room[]) => {
          this.rooms = response;
        },
        error: (error) => {
          if (error.error) {
            this.errorMessage = 'Không có loại phòng này. Quay lại ';
          }
        },
      });
    });
    this.authService
      .getUserByUsername(this.authService.getUsername())
      .subscribe({
        next: (response: User) => {
          this.admin = response;
        },
        error: (error) => {},
      });
  }
  
  
  getRoomId(r: Room) {
    this.roomId = r.id;
  }
  updateEnable(r: Room) {
    r.enable = !r.enable;
    this.roomService.updateRoom(r.id, r).subscribe({
      next: (response: void) => {
        Swal.fire('Thành công', 'Bạn đã cập nhật thành công', 'success');
      },
      error: (error) => {
        Swal.fire('Có lỗi xảy ra', error.error.message, 'error');
      },
    });
  }
}
