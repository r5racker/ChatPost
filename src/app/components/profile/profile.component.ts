import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/authentication.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private authService: AuthenticationService) { }


  ngOnInit(): void {
    let user;
    //console.log(JSON.parse(localStorage.getItem("user")).email)
    this.userService.getUser(JSON.parse(localStorage.getItem("user")).email).subscribe(data => {
      user = data
      //console.log(data)
      this.registerForm = this.formBuilder.group({
        imageUrl: user.imageUrl,
        FName: user.FName,
        LName: user.LName,
        phone: user.phone,
        email: user.email
      });
    })

  }
  logout() {
    this.authService.logout()
  }
}
