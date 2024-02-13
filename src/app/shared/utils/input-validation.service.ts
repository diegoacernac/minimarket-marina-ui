import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class InputValidationService {
  constructor() {}
  
  onlyLetters() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const onlyLettersRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/u;

      if (control.value && !onlyLettersRegex.test(control.value)) {
        return { onlyLetters: true };
      }

      return null;
    };
  }
}
