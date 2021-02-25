import { AbstractControl, ValidationErrors } from '@angular/forms';
export const noWhitespacesValidator = (
  control: AbstractControl
): ValidationErrors | null => {
  const sellerName = control.get('seller_Name');

  const isWhitespace =
    ((sellerName.value && sellerName.value.toString()) || '').trim().length ===
    0;
  const isValid = !isWhitespace;


  return isValid ? null : { whiteSpacesNotAllowed: true };
};
