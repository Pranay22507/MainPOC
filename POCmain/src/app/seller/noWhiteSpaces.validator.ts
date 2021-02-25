import { AbstractControl, ValidationErrors } from '@angular/forms';
export const noWhitespacesValidator = (
  control: AbstractControl
): ValidationErrors | null => {
  const sellerName = control.get('seller_Name');

  console.log(sellerName);

  const isWhitespace =
    ((sellerName.value && sellerName.value.toString()) || '').trim().length ===
    0;
  const isValid = !isWhitespace;

  //   sellerName.setValue(" ");

  return isValid ? null : { whiteSpacesNotAllowed: true };
};
