import { AbstractControl, ValidationErrors } from '@angular/forms';
export const atLeastOneDealtypeReq = (
  control: AbstractControl
): ValidationErrors | null => {
  const bidded = control.get('bidded');

  const guaranteed = control.get('guaranteed');

  return bidded.value || guaranteed.value ? null : { DealSelected: true };
};
