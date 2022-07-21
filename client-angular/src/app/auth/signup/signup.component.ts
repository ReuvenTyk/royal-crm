import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/api.service';
import { RegisterUser } from 'src/app/shared/types';

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
    first_name: new FormControl('', {
      validators: Validators.required,
    }),
    last_name: new FormControl('', {
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

  constructor(private apiService: ApiService) {}
  onSubmit() {
    //console.log(this.signupForm.value);
    //console.log(this.validateDate());

    if (!this.validateDate()) {
      return;
    }
    const value: RegisterUser = this.signupForm.value;

    const details = {
      first_name: value.first_name,
      last_name: value.last_name,
      email: value.email,
      password: value.password,
    };

    this.apiService.register(this.signupForm.value).subscribe({
      next: (data) => {
        console.log('got in');
      },
      error: (err) => console.log(err),
    });
  }

  ngOnInit(): void {}
}
