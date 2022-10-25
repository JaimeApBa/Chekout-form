import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {
  validForm: boolean = false;
  today: string = new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate();

  notFocused = {
    fullName: false,
    cardNumber: false,
    expiration: false,
    cvv: false,
    zipCode: false
  };

  paymentForm = this.fb.group({
    fullName: ['', [Validators.required, Validators.pattern(/^(([a-z]{2,})\s?){2,3}$/i)]],
    cardNumber: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(20), Validators.pattern(/([0-9]{4}\s){3}([0-9]{4})/)]],
    expiration: ['', Validators.required],
    cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3), Validators.pattern(/[0-9]{3}/)]],
    zipCode: ['', Validators.required]
  });

  submitted: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {}

  get fullName() { return this.paymentForm.get('fullName')}
  get cardNumber() { return this.paymentForm.get('cardNumber')}
  get expiration() { return this.paymentForm.get('expiration')}
  get cvv() { return this.paymentForm.get('cvv')}
  get zipCode() { return this.paymentForm.get('zipCode')}

  onSubmit(){
    
    if(this.paymentForm.invalid) {
      this.submitted=false;
      return;
    }
    //console.log(this.paymentForm.value);

    this.submitted=true;
    //reset form
    this.paymentForm.reset();
    this.fullName?.setErrors(null);
    this.cardNumber?.setErrors(null);
    this.expiration?.setErrors(null);
    this.cvv?.setErrors(null);
    this.zipCode?.setErrors(null);
  }

  formatCardNumber() {
    const cardNumber = this.paymentForm.value.cardNumber?.replace(/\s+/g, '');
    
    if(cardNumber) {
     let number = '';
     for (let i = 0; i < cardNumber.length; i++) {
        if(i % 4 === 0) number += ' ';
        number += cardNumber[i];
     }
     this.cardNumber?.setValue(number)
     
    }   
    
  }

}
