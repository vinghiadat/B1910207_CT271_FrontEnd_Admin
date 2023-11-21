import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth/auth.service';
import { AdminService } from '../Services/admin/admin.service';
import { Admin } from '../Models/admin/admin';
import { RoomType } from '../Models/roomtype/room-type';
import { Image } from '../Models/image/image';
import Swal from 'sweetalert2';
import { RoomlistService } from '../Services/roomtype/roomlist.service';

@Component({
  selector: 'app-add-room-type',
  templateUrl: './add-room-type.component.html',
  styleUrls: ['./add-room-type.component.css'],
})
export class AddRoomTypeComponent implements OnInit {
  roomType: RoomType = {
    id: null,
    name: '',
    numberOfAdult: 0,
    numberOfChild: 0,
    bedType: '',
    price: 0,
    description: '',
    isFull: false,
    enable: true,
    createdDate: null,
    updatedDate: null,
    images: [],
  }; // Model for room type
  selectedImage: File | null = null;
  constructor(private roomTypeService: RoomlistService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  handleFileInput(e: Event) {
    const inputElement: HTMLInputElement = e.target as HTMLInputElement;
    const files: FileList | null = inputElement.files;

    if (files && files.length > 0) {
      this.selectedImage = files[0];
      console.log(this.selectedImage);
    }
  }

  submitForm() {
    if (
      !this.selectedImage ||
      this.roomType.name == '' ||
      this.roomType.numberOfAdult == 0 ||
      this.roomType.numberOfChild == 0 ||
      this.roomType.bedType == '' ||
      this.roomType.price == 0 ||
      this.roomType.description == '' 
    ) {
      Swal.fire('Có lỗi !', 'Vui lòng nhập đầy đủ thông tin', 'error');
      return;
    }
    this.roomTypeService
      .addRoomTypeWithImages(this.selectedImage, this.roomType)
      .subscribe({
        next: (response) => {
          Swal.fire('Thành công', 'Bạn đã thêm phòng thành công', 'success');
          this.roomType.name = '';
          this.roomType.numberOfAdult = 0;
          this.roomType.numberOfChild = 0;
          this.roomType.bedType = '';
          this.roomType.price = 0;
          this.roomType.description = '';
          this.selectedImage = null;
        },
        error: (error) => {
          Swal.fire('Thất bại', error.error.message, 'error');
        },
      });
  }
}
