import { ContextService } from './../../shared/context.service';
import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loading: boolean = false;
  errorMsg: string | undefined;

  loginForm: FormGroup = new FormGroup({
    userControl: new FormControl('', [Validators.required]),
    passwordControl: new FormControl('', [Validators.required])
  });

  constructor(
    private service: LoginService,
    private context: ContextService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  login() {
    if (this.loginForm.valid) {

      this.loading = true;

      this.service.login(
        this.loginForm.get('userControl')!.value,
        this.loginForm.get('passwordControl')!.value
      ).subscribe({
        next: (response) => {
          if (response?.token) {
            this.context.saveUserData(response.token);
            this.router.navigate(['']);
          }
        },
        error: (error) => {
          console.error(error);
          this.loading = false;
          this.errorMsg = 'Usuário e/ou senha inválido(s)';
        },
        complete: () => this.loading = false
      });

    } else {
      this.errorMsg = 'É necessário preencher os campos de Usuário e Senha com dados válidos';
    }
  }

}