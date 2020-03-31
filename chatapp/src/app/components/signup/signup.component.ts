import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
declare var fun:any;
declare var fun1:any;

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
	signupForm: FormGroup;
	errorMessage: String;
	showSpinner: boolean = false;
	message:any;

	constructor(
		private authService: AuthService,
		private fb: FormBuilder,
		private router: Router,
		private tokenService: TokenService,
		private service:UsersService
	) {}
	signup()
	{
		fun();
	}
	login()
	{
		fun1();
	}

	ngOnInit(): void {
		this.init();
	}

	init() {
		this.signupForm = this.fb.group({
			username: ['', Validators.required],
			email: ['', [Validators.email, Validators.required]],
			password: ['', Validators.required]
		});
	}

	signupUser() {
		this.showSpinner = true;
		this.authService.registerUser(this.signupForm.value).subscribe(
			data => {
				this.tokenService.SetToken(data.token);
				this.signupForm.reset();
				setTimeout(() => {
					this.router.navigate(['streams']);
				}, 2000);
			},
			err => {
				this.showSpinner = false;
				//console.log(err);
				if (err.error.msg) {
					this.errorMessage = err.error.msg[0].message;
				}
				if (err.error.message) {
					this.errorMessage = err.error.message;
				}
			}
		);
	}
	registerProcess(form)
	{ 
		if(form.valid == true){
	  console.log(form.valid);
	  let response = this.service.doRegistration(form.value);
	  response.subscribe((result) => {
	  this.message = result;
	  //console.log(form);
	  this.authService.registerUser(form.value).subscribe(data=>{
		  console.log(data);
		  this.tokenService.SetToken(data.token);
		  this.router.navigate(['streams']);
	  },err=> console.log(err))
  
	  });
		}
		else
		{
			alert("Please enter all fields");
		}
	}
	onRegister(form)
  {

    if(form.valid == true)
    { 
		
    //   this.auth.flag = true;
     // this.loginFlag.emit(this.flag);
    //   this.router.navigate(['/login'],{ skipLocationChange: true });
    }
  }
}
