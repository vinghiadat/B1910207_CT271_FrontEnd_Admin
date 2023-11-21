import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Contract } from 'src/app/Models/contract/contract';
import { User } from 'src/app/Models/user/user';
import { AppConfig } from 'src/app/config/AppConfig';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  constructor(private http: HttpClient, private router: Router) {}
  listQuantity: number[] = [];
  //lấy full đường dẫn
  private getFullUrl(endpoint: string): string {
    return `${AppConfig.baseUrl}/${endpoint}`;
  }
  addContract(contract: any): Observable<void> {
    return this.http.post<void>(this.getFullUrl('api/v1/contract'), contract);
  }
  getContractByUserId(id: number): Observable<Contract[]> {
    return this.http.get<Contract[]>(
      this.getFullUrl(`api/v1/contract/user/${id}`)
    );
  }
  getAllContract(): Observable<Contract[]> {
    return this.http.get<Contract[]>(this.getFullUrl(`api/v1/contract`));
  }
  updateContract(
    contractId: number,
    admin: User,
    status: number,
    note: string
  ): Observable<void> {
    return this.http.patch<void>(
      this.getFullUrl(`api/v1/contract/${contractId}`),
      {
        admin: admin,
        status: status,
        note: note,
      }
    );
  }
}
