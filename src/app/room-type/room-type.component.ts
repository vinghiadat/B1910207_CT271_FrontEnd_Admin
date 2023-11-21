import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RoomType } from '../Models/roomtype/room-type';
import Swal from 'sweetalert2';
import { RoomlistService } from '../Services/roomtype/roomlist.service';
import { ImageService } from '../Services/image/image.service';

@Component({
  selector: 'app-room-type',
  templateUrl: './room-type.component.html',
  styleUrls: ['./room-type.component.css']
})
export class RoomTypeComponent implements OnInit {
  listRoomType: RoomType[] = [];
  imageUrls: string[] = [];
  imageUrl: string = '';
  selectedEnable!: number;
  showPrice: boolean = true;
  constructor(
    private roomListService: RoomlistService,
    private imageService: ImageService,
    private detect: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.getAllRoomType();
  }

  getAllRoomType(): void {
    this.roomListService.getAllRoomType().subscribe({
      next: (response: any) => {
        this.listRoomType = response;
        console.log("listrrooom type " +this.listRoomType);
        this.imageUrls = [];
        this.listRoomType.map((roomType) => {
          this.imageService
            .getImage(roomType.images[0].name)
            .subscribe((response) => {
              this.imageUrl = URL.createObjectURL(response.body!);
              this.imageUrls.push(this.imageUrl);
              // this.displayImage(response.body!);
              
            });
        });
      },
      error: (error) => {
        if (error.status === 401) {
        }
      },
    });
  }
  // displayImage(imageData: Blob) {
  //   this.imageUrl = URL.createObjectURL(imageData);
  //   // Sử dụng imageUrl để hiển thị ảnh trong template của bạn
  // }
  updateEnable(r: RoomType) {
    r.enable = !r.enable;
    this.roomListService.updateRoomType(r.id!, r).subscribe({
      next: (response: any) => {
        Swal.fire('Thành công', 'Bạn đã cập nhật thành công', 'success');
        
      },
      error: (error) => {
        Swal.fire('Có lỗi xảy ra', error.error.message, 'error');
      },
    });
  }
  changePrice() {
    this.showPrice = false;
  }
}
