import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormControlValidationService } from '../../shared/services/form-control-validation.service';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { iconsfa } from '../../shared/utils/font-awesome-icons';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  formControlArray: Array<string> = ['username', 'password'];
  user = iconsfa.user
  password = iconsfa.password

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private formControlValidationService: FormControlValidationService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.createForm()
  }

  createForm(): void {
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]]
    })
  }

  login(): void {
    if (this.loginForm.valid) {
      let loginRequest = {
        username: this.loginForm.controls['username'].getRawValue(),
        password: this.loginForm.controls['password'].getRawValue()
      }

      this.authService.login(loginRequest).subscribe({
        next: (response: any) => {
          this.toastr.success(
            'Bienvenido', 
            'Inicio de sesión exitoso',
            {
              timeOut: 3000,
              closeButton: true,
              positionClass: 'toast-top-right',
            }
          )
          
          this.formControlValidationService.clearForm(this.loginForm, this.formControlArray)  
          this.router.navigate(['/home'])
        },
        error: (error: any) => {
          this.toastr.error(
            error.message,
            "¡Error!",
            {
              timeOut: 3000,
              closeButton: true,
              positionClass: 'toast-top-right',
            }
          )
          this.formControlValidationService.clearForm(this.loginForm, this.formControlArray)
        }
      })
    }
  }

  showError(formControlName: string): boolean {
    return this.formControlValidationService.showError(formControlName, this.loginForm)
  }

  getErrorMessage(formControlName: string): string {
    const formControl = this.loginForm.get(formControlName)
    return formControl?.hasError('required') 
      ? 'Campo obligatorio.'
      : formControl?.hasError('email')
      ? 'Ingrese un email válido.'
      : formControl?.hasError('minlength')
      ? `La contraseña debe tener al menos ${formControl.getError('minlength').requiredLength} caracteres.`
      : ''
  }
}
