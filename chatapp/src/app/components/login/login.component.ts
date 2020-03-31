import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from './../../services/users.service';
@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	errorMessage: string;
	showSpinner: boolean = false;

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private router: Router,
		private tokenService: TokenService,
		private service:UsersService
	) {}
	credentials:any;
	flag:any;
	
	ngOnInit(): void {
		this.init();
	}

	init() {
		this.loginForm = this.fb.group({
			username: ['', Validators.required],
			password: ['', Validators.required]
		});
	}

	loginUser() {
		this.showSpinner = true;
		this.authService.loginUser(this.loginForm.value).subscribe(
			data => {
				this.tokenService.SetToken(data.token);
				this.loginForm.reset();
				setTimeout(() => {
					this.router.navigate(['streams']);
				}, 2000);
			},
			err => {
				this.showSpinner = false;
				if (err.error.message) {
					this.errorMessage = err.error.message;
				}
			}
		);
	}
	onLogin(form)
{
	if(form.value.email!="" && form.value.password!=""){
		if(form.valid == true){
let response = this.service.gettingCredentials();
response.subscribe((data) => this.credentials = data);
let email:String = form.value.email;
let password:String = form.value.password
for(let i=0;i<this.credentials.length;i++){
console.log(form.valid);
if( email == this.credentials[i].email && bcrypt.compareSync(password,this.credentials[i].password))
{
//   this.auth.flag = true;
  this.flag=1;
  //alert("Credentials Verified");
  this.router.navigateByUrl('/streams');
  break;
}
else {
//   this.auth.flag = false;
//   console.log(this.credentials[i].password);
  this.flag = 0;
}
}
if(this.flag == 0)
{
  alert("Invalid Credentials");
}
}
else{
	alert("Pls enter all fields correctly");
}
}
else
{
	alert("Pls enter all fields");
}
}
}
