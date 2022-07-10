import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { ButtonComponent } from './button/button.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PhonePipe } from './pipes/phone.pipe';

@NgModule({
  declarations: [ButtonComponent, HeaderComponent, FooterComponent, PhonePipe],
  imports: [CommonModule, AppRoutingModule, ReactiveFormsModule],
  exports: [ButtonComponent, HeaderComponent, FooterComponent, PhonePipe],
})
export class SharedModule {}
