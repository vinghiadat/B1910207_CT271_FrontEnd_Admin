import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/config/AppConfig';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from 'src/app/Models/room/room';
@Injectable({
  providedIn: 'root',
})
export class RoomService {
  constructor(private http: HttpClient, private router: Router) {}
  listQuantity: number[] = [];
  //lấy full đường dẫn
  private getFullUrl(endpoint: string): string {
    return `${AppConfig.baseUrl}/${endpoint}`;
  }
  getAllRoomByRoomType_Id(id: number): Observable<Room[]> {
    return this.http.get<Room[]>(this.getFullUrl(`api/v1/room/${id}`));
  }
  getRoomByIdAndRoomType_Id(id: number, roomTypeId: number): Observable<Room> {
    return this.http.get<Room>(
      this.getFullUrl(`api/v1/room/${id}/roomType/${roomTypeId}`)
    );
  }
  updateRoom(id: number, r: Room): Observable<void> {
    return this.http.patch<void>(this.getFullUrl(`api/v1/room/${id}`), r);
  }
  createRoom(room: any): Observable<void> {
    return this.http.post<void>(this.getFullUrl(`api/v1/room`), room);
  }
}
