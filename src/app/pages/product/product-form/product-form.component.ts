import { Component, OnInit } from '@angular/core';
import { MainComponent } from '../../../shared/components/main/main.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { iconsfa } from '../../../shared/utils/font-awesome-icons';
import { InputValidationService } from '../../../shared/utils/input-validation.service';
import { Router } from '@angular/router';
import { FormControlValidationService } from '../../../shared/services/form-control-validation.service';
import { CategoryService } from '../../category/services/category.service';
import { Category } from '../../../shared/models/category';
import { ProductService } from '../services/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    MainComponent,
    FontAwesomeModule,
    ReactiveFormsModule,
],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent implements OnInit {
  form!: FormGroup
  
  back = iconsfa.back
  barcode = iconsfa.barcode
  text = iconsfa.text

  categories: Array<Category> = []
  formControlArray: Array<string> = [
    'barcode',
    'description',
    'perishable',
    'category',
    'unitofmeasurement',
    'purchasePrice',
    'salePrice',
  ];

  constructor(
    private formBuilder: FormBuilder,
    private inputValidationService: InputValidationService,
    private router: Router,
    private formControlValidationService: FormControlValidationService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.createForm()
    this.categoryService.getAll().subscribe((res) => {
      this.categories = res.productCategories
    })
  }

  createForm() {
    this.form = this.formBuilder.group({
      barcode: [null, [Validators.required]],
      categoryId: ['', [Validators.required]],
      description: [null, [Validators.required]],
      perishable: [null, [Validators.required]],
      unitofmeasurement: [null, [Validators.required]],
      purchasePrice: [null],
      salePrice: [null],
    })
  }

  goBack() {
    this.router.navigate(['/products'])
  }

  showError(controlName: string): boolean {
    return this.formControlValidationService.showError(controlName, this.form)
  }

  getErrorMessage(controlName: string): string {
    const formControl = this.form.get(controlName)
    return formControl?.hasError('required')
      ? 'Este campo es obligatorio.'
      : '';
  }

  save() {
    if (this.form.valid) {
      const product = {
        productId: 0,
        barcode: this.form.controls['barcode'].getRawValue(),
        categoryId: this.form.controls['categoryId'].getRawValue(),
        description: this.form.controls['description'].getRawValue(),
        perishable: this.form.controls['perishable'].getRawValue(),
        unitofmeasurement: this.form.controls['unitofmeasurement'].getRawValue(),
        purchasePrice: this.form.controls['purchasePrice'].getRawValue(),
        salePrice: this.form.controls['salePrice'].getRawValue(),
        statusId: 1,
      }
      this.productService.save(product).subscribe((response: any) => {
        this.toastr.success(
          "Producto registrado con éxito!",
          "Éxito!",
          {
            timeOut: 5000,
            closeButton: true,
            positionClass: 'toast-top-right',
          }
        )
        this.formControlValidationService.clearForm(this.form, this.formControlArray)
      }, (error: any) => {
        this.toastr.error(
          error.message,
          "¡Error!",
          {
            timeOut: 5000,
            closeButton: true,
            positionClass: 'toast-top-right',
          }
        )
      })
    }
  }
}
