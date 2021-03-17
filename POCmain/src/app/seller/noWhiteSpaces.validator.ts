import { AbstractControl, ValidationErrors } from '@angular/forms';
export const noWhitespacesValidator = (
  control: AbstractControl
): ValidationErrors | null => {
    //The g modifier is used to perform a global match (find all matches rather than stopping after the first match).
if (control && control.value && !control.value.replace(/\s/g, '').length) {
    control.setValue('');
  }
  return null;
};
