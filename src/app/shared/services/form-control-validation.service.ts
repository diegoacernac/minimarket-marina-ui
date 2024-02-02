import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormControlValidationService {
  constructor() {}

  showError(formControlName: string, form: FormGroup): boolean {
    const formControl = form.get(formControlName)
    return formControl!.invalid && (formControl!.dirty || formControl!.touched)
  }

  clearForm(form: FormGroup, formControlArray: Array<string>): void {
    formControlArray.forEach(controls => {
      form.get(controls)?.setValue('')
    })
    form.markAsPristine()
    form.markAsUntouched()
  }
}
