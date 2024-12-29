import { AbstractControl, ValidatorFn } from '@angular/forms';

export function passwordsMatchValidator(
  password: string,
  confirmPassword: string
): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const passwordControl = control.get(password);
    const confirmPasswordControl = control.get(confirmPassword);

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    if (
      confirmPasswordControl.errors &&
      !confirmPasswordControl.errors['passwordsMismatch']
    ) {
      // Return if another validator has already found an error on the confirmPasswordControl
      return null;
    }

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordsMismatch: true });
      return { passwordMismatch: true };
    } else {
      confirmPasswordControl.setErrors(null);
      return null;
    }
  };
}
