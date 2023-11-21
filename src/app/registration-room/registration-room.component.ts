import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import DataTable from 'datatables.net-bs4';
import { ContractService } from '../Services/contract/contract.service';
import { Contract } from '../Models/contract/contract';
import { User } from '../Models/user/user';
import { UserService } from '../Services/user/user.service';
import { AuthService } from '../Services/auth/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { RegisterServiceRespone } from '../Models/register-service/register-service-respone';
import { RegisterServicesService } from '../Services/register-services/register-services.service';
import { error } from 'jquery';
@Component({
  selector: 'app-registration-room',
  templateUrl: './registration-room.component.html',
  styleUrls: ['./registration-room.component.css'],
})
export class RegistrationRoomComponent implements OnInit {
  contracts: Contract[] = [];
  admin!: User;
  isShow: boolean = false;
  myForm: any;
  selectedStatus!: number;
  registers: RegisterServiceRespone[] = [];
  selectedRegister: RegisterServiceRespone[] = [];
  constructor(
    private contractService: ContractService,
    private userService: UserService,
    private authService: AuthService,
    private detectChange: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private registerService: RegisterServicesService
  ) {
    this.myForm = this.formBuilder.group({
      reason: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    this.userService
      .getUserByUsername(this.authService.getUsername())
      .subscribe({
        next: (response: User) => {
          this.admin = response;
        },
        error: (error) => {},
      });
    this.getAllContract();
    this.getAllRegister();
  }
  getAllRegister() {
    this.registerService.getAllRegister().subscribe({
      next: (response: RegisterServiceRespone[]) => {
        this.registers = response;
      },
      error: (error) => {},
    });
  }
  details(c: Contract) {
    this.selectedRegister = [];
    this.registers.map((r) => {
      if (r.contractId == c.id) {
        this.selectedRegister.push(r);
      }
    });
  }
  getAllContract() {
    this.contractService.getAllContract().subscribe({
      next: (response: Contract[]) => {
        this.contracts = response;

        this.detectChange.detectChanges();
      },
      error: (error) => {},
    });
  }
  handleAccept(id: number) {
    this.contractService.updateContract(id, this.admin, 1, '').subscribe({
      next: (response: any) => {
        Swal.fire('Thành công', 'Bạn đã xác nhận thành công', 'success');
        this.getAllContract();
      },
      error: (error) => {
        Swal.fire('Thất bại', error.error.message, 'error');
      },
    });
  }
  // handleCancel(id: number) {}
  // onChange() {
  //   this.isShow = !this.isShow;
  // }
  // handleReason(id: number) {
  //   if (this.myForm.value.reason == '') {
  //     return;
  //   }
  //   Swal.fire({
  //     title: 'Bạn có chắc chắn hủy bỏ',
  //     showDenyButton: true,
  //     confirmButtonText: 'OK',
  //     denyButtonText: `Quay lại`,
  //   }).then((result) => {
  //     /* Read more about isConfirmed, isDenied below */
  //     if (result.isConfirmed) {
  //       this.contractService
  //         .updateContract(id, this.admin, 2, this.myForm.value.reason)
  //         .subscribe({
  //           next: (response: any) => {
  //             Swal.fire('Thành công', 'Bạn đã hủy bỏ thành công', 'success');
  //             this.getAllContract();
  //           },
  //           error: (error) => {
  //             Swal.fire('Thất bại', error.error.message, 'error');
  //           },
  //         });
  //     }
  //   });
  //   this.getAllContract();
  // }
  updateStatus(e: Event, c: Contract) {
    // Lấy giá trị được chọn từ sự kiện change
    const selectedValue = (e.target as HTMLSelectElement).value;
    // Cập nhật selectedStatus bằng giá trị mới
    this.selectedStatus = parseInt(selectedValue, 10);
    c.note = '';
    if (this.selectedStatus == 2) {
      c.note = 'Không liên hệ được';
    }
    this.contractService
      .updateContract(c.id, this.admin, this.selectedStatus, c.note)
      .subscribe({
        next: (response: void) => {
          Swal.fire('Thành công', 'Cập nhật thành công', 'success');
          this.getAllRegister();
           this.getAllContract();
        },
        error: (error) => {},
      });
  }
}
