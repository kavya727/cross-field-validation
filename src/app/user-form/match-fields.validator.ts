import { ValidatorFn, FormGroup } from '@angular/forms';

export const matchValidator: ValidatorFn = (
  control: FormGroup
): { [key: string]: boolean } | null => {
  const email = control.get('email');
  const emailText = email ? email.value.split('@') : null;
  const userId = control.get('userId');
  if (email.pristine || userId.pristine) {
    return null;
  }
  return email &&
    userId &&
    (email.value == userId.value || emailText[0] == userId.value)
    ? { mismatch: true }
    : null;
};
