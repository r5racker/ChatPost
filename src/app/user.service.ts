import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../assets/classes/IUser'
import { Observable } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class UserService {


  userId: string;
  nonoUsr: IUser = { _id: "0", FName: "none", email: "none", imageUrl: "", lastSeen: null };
  AllFriends: IUser[] = []//for left side panel

  DestinationId: string = "0"
  DestinationInfo: IUser = this.nonoUsr // info of currently displayed user

  currentUserInfo: IUser = this.nonoUsr //logged-in user information

  private _url = "http://localhost:3000/user"
  constructor(private http: HttpClient) {
  }

  getFriends(id: string): Observable<IUser[]> {
    return this.http.get<any>(this._url + "/getAll")//_url+"/"+id
  }

  getUser(id: string): Observable<any> {
    return this.http.post<any>(this._url + "/get", { email: id })
  }

}
