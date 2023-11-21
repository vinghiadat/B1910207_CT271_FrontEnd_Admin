import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, tap } from 'rxjs';
import { RoomType } from 'src/app/Models/roomtype/room-type';
import { AppConfig } from 'src/app/config/AppConfig';

@Injectable({
  providedIn: 'root',
})
export class RoomlistService {
  constructor(private http: HttpClient, private router: Router) {}
  listQuantity: number[] = [];
  //lấy full đường dẫn
  private getFullUrl(endpoint: string): string {
    return `${AppConfig.baseUrl}/${endpoint}`;
  }
  updateRoomType(id: number, r: RoomType): Observable<void> {
    return this.http.patch<void>(this.getFullUrl(`api/v1/roomtype/${id}`), r);
  }
  getRoomTypeByName(name: string): Observable<RoomType> {
    return this.http.get<RoomType>(
      this.getFullUrl(`api/v1/roomtype/name/${name}`)
    );
  }
  getRoomTypeById(id: number): Observable<RoomType> {
    return this.http.get<RoomType>(this.getFullUrl(`api/v1/roomtype/${id}`));
  }
  //---------------------Nhiệm vụ bộ lọc
  getAllRoomType(): Observable<RoomType[]> {
    return this.http.get<RoomType[]>(this.getFullUrl(`api/v1/roomtype`));
  }
  //Only 1
  getAllRoomTypeByMaxQuantity(quantity: number): Observable<RoomType[]> {
    return this.http.get<RoomType[]>(
      this.getFullUrl(`api/v1/roomtype/max-quantity/${quantity}`)
    );
  }
  getAllRoomTypeByIsCooked(isCooked: boolean): Observable<RoomType[]> {
    return this.http.get<RoomType[]>(
      this.getFullUrl(`api/v1/roomtype/is-cooked/${isCooked}`)
    );
  }
  getAllRoomTypeByIsAirConditioned(
    isAirConditioned: boolean
  ): Observable<RoomType[]> {
    return this.http.get<RoomType[]>(
      this.getFullUrl(`api/v1/roomtype/air-conditioned/${isAirConditioned}`)
    );
  }
  //2
  getAllRoomTypeByMaxQuantityAndIsCooked(
    quantity: number,
    isCooked: boolean
  ): Observable<RoomType[]> {
    return this.http.get<RoomType[]>(
      this.getFullUrl(
        `api/v1/roomtype/max-quantity/${quantity}/is-cooked/${isCooked}`
      )
    );
  }
  getAllRoomTypeByMaxQuantityAndIsAirConditioned(
    quantity: number,
    isAirConditioned: boolean
  ): Observable<RoomType[]> {
    return this.http.get<RoomType[]>(
      this.getFullUrl(
        `api/v1/roomtype/max-quantity/${quantity}/air-conditioned/${isAirConditioned}`
      )
    );
  }
  getAllRoomTypeByIsCookedAndIsAirConditioned(
    isCooked: boolean,
    isAirConditioned: boolean
  ): Observable<RoomType[]> {
    return this.http.get<RoomType[]>(
      this.getFullUrl(
        `api/v1/roomtype/is-cooked/${isCooked}/air-conditioned/${isAirConditioned}`
      )
    );
  }

  getAllRoomTypeByMaxQuantityAndIsCookedAndIsAirConditioned(
    quantity: number,
    isCooked: boolean,
    isAirConditioned: boolean
  ): Observable<RoomType[]> {
    return this.http.get<RoomType[]>(
      this.getFullUrl(
        `api/v1/roomtype/max-quantity/${quantity}/is-cooked/${isCooked}/air-conditioned/${isAirConditioned}`
      )
    );
  }
  //--------------Hết bộ lọc
  addRoomTypeWithImages(file: File, roomType: RoomType): Observable<void> {
    const formData = new FormData();

    // Append other fields
    formData.append('name', roomType.name);
    formData.append('numberOfAdult', roomType.numberOfAdult.toString());
    formData.append('numberOfChild', roomType.numberOfChild.toString());
    formData.append('bedType', roomType.bedType);
    formData.append('description', roomType.description);
    formData.append('price', roomType.price.toString());
    formData.append('images', file, file.name);
    // Append each image blob

    return this.http.post<void>(
      this.getFullUrl(`api/v1/roomtype/add`),
      formData
    );
  }
}
