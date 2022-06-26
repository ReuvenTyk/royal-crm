import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, AfterViewInit {
  @ViewChild('first') firstField!: ElementRef;

  ngAfterViewInit(): void {
    this.firstField.nativeElement.focus();
  }

  signupForm = new FormGroup({
    firstName: new FormControl('', {
      validators: Validators.required,
    }),
    lastName: new FormControl('', {
      validators: Validators.required,
    }),
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
    retypePassword: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  validateDate(): boolean {
    if (!this.signupForm.valid) {
      return false;
    }

    const password = this.signupForm.get('password');
    const retypePassword = this.signupForm.get('retypePassword');

    if (
      !password ||
      !retypePassword ||
      password.value !== retypePassword.value
    ) {
      return false;
    }

    return true;
  }

  onSubmit() {
    console.log(this.signupForm.value);
    console.log(this.validateDate());

    if (!this.validateDate()) {
      return;
    }
  }
  constructor() {}

  ngOnInit(): void {}
}
