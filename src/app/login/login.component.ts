import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ToastrService } from 'ngx-toastr';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  email = ""
  password: string = ""
  msg = false

  constructor(
    private dataService: DataService,
    private toastr: ToastrService,
    private auth: AngularFireAuth
  ) { }

  ngOnInit(): void {

  }




  login() {

    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (this.email && this.password && this.email.match(validRegex)) {
      this.auth.fetchSignInMethodsForEmail(this.email).then((signInMethods) => {
        if (signInMethods.length > 0) {
          this.dataService.login({ email: this.email, password: this.password })
        }else console.log('error');
        
      })
    }
    else {
      this.toastr.error("L'email ou le mot de passe n'est pas valide!");
    }
  }
}




  