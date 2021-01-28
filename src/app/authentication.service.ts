import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from './config/api';
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  loginUrl = baseUrl + '/user/login';
  registerUrl = baseUrl + '/user/register'
  uploadUrl = baseUrl + '/user/upload'
  constructor(private http: HttpClient) { }

  register(userData) {
    userData['imageUrl'] = "/assets/images/1.png" //TODO profile image
    console.log(userData)
    return this.http.post(this.registerUrl, userData)
  }

  uploadImg(img) {
    const data = new FormData();
    data.append('image', img);
    return this.http.post(this.uploadUrl, data)
  }

  login(credentials) {
    //credentials {email,password}
    return this.http.post(this.loginUrl, credentials).pipe(
      map(data => {
        localStorage.setItem('user', JSON.stringify(data));
        return data
      })
    )
  }

  logout() {
    localStorage.removeItem("user");
  }

  getUser() {
    return localStorage.getItem("user");
  }

  checkUser() {
    if (localStorage.getItem("user") != null) {
      return true;
    }
    else {
      return false;
    }
  }
}
