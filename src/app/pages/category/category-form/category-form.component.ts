import { Component, OnInit } from '@angular/core';
import { MainComponent } from '../../../shared/components/main/main.component';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { iconsfa } from '../../../shared/utils/font-awesome-icons';
import { InputValidationService } from '../../../shared/utils/input-validation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    MainComponent, 
    ReactiveFormsModule, 
    FontAwesomeModule
  ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css',
})
export class CategoryFormComponent implements OnInit {
  form!: FormGroup
  text = iconsfa.text
  back = iconsfa.back

  constructor(
    private formBuilder: FormBuilder,
    private inputValidationService: InputValidationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      description: [null, [Validators.required, this.inputValidationService.onlyLetters()]],
    });
  }

  goBack() {
    this.router.navigate(['/categories'])
  }

  save() {
    console.log('Hola');
  }
}
