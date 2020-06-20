import { Component } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { matchValidator } from './match-fields.validator';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  constructor(private fb: FormBuilder) {}
  title = 'reactive-forms';

  get firstName() {
    return this.registrationForm.get('firstName');
  }

  get lastName() {
    return this.registrationForm.get('lastName');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get userId() {
    return this.registrationForm.get('userId');
  }

  forbiddenNameValidator(forbiddenName: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = forbiddenName.test(control.value);
      return forbidden ? { forbiddenName: { value: control.value } } : null;
    };
  }

  registrationForm = this.fb.group(
    {
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          this.forbiddenNameValidator(/password/)
        ]
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          this.forbiddenNameValidator(/password/)
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          this.forbiddenNameValidator(/password/)
        ]
      ],
      userId: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          this.forbiddenNameValidator(/password/)
        ]
      ]
    },
    { validator: matchValidator }
  );
}
