import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as $ from 'jquery'
import { AuthenticationService } from '../authentication.service';
import { passMatch } from './reg-validators';

@Component({
  selector: 'app-login-reg',
  templateUrl: './login-reg.component.html',
  styleUrls: ['./login-reg.component.css']
})
export class LoginRegComponent implements OnInit {

  registerForm: FormGroup;
  loginModel: any = {};
  LoginId: string = "";
  LoginPass: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) { }


  buildRegForm() {
    this.registerForm = this.formBuilder.group({
      imageUrl: '',
      FName: ['f', { validators: [Validators.required, Validators.pattern("[a-zA-Z]*")] }],
      LName: ['l', { validators: [Validators.required] }],
      phone: ['1', { validators: [Validators.required] }],
      email: ['@', { validators: [Validators.required, Validators.email] }],
      password: ['p', { validators: [Validators.required, Validators.minLength(4)] }],
      confPassword: ['p', { validators: [Validators.required, Validators.minLength(4)] }],
    },
      { validators: [passMatch] });
  }

  ngOnInit(): void {
    this.buildRegForm();
    $(document).ready(
      function () {
        $('#togglecheck').click(function (e) {
          if ($('#togglecheck').html() == 'Log in') {
            $('.signupbox').slideUp();
            $('#togglecheck').html('Sign up');
            console.log("login");
            $('.loginbox').slideDown();
            $('.useravatar').fadeIn()
          } else {
            $('.loginbox').slideUp();
            $('.useravatar').fadeOut()
            $('#togglecheck').html('Log in');
            $('.signupbox').fadeIn("slow");
          }
        });
      }
    )
  }

  Register() {
    this.authService.register(this.registerForm.value).subscribe((data) => {
      console.log(data);
      this.router.navigate(['/login-reg']);
    }, () => { })
  }

  uploadImg(event) {
    console.log(event.target.files[0])

    this.authService.uploadImg(event.target.files[0]).subscribe((data: any) => {
      console.log("image saved:", data.imageUrl)
      //console.log("success upload")
    })
    return false
  }

  login() {
    this.loginModel = { email: this.LoginId, password: this.LoginPass }
    this.authService.login(this.loginModel).subscribe(() => {
      this.router.navigate(['/home']);
    }, (err) => {
      alert("invalid credentials")
    });
  }
}