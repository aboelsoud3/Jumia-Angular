import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerApiService } from '../customer-api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss']
})
export class CustomerAddComponent implements OnInit {

  customerForm: FormGroup;
  name = '';
  phone = '';
  address = '';
  isloadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private api: CustomerApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.customerForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'phone' : [null, Validators.required],
      'address' : [null, Validators.required]
    });
  }

  onFormSubmit() {
    this.isloadingResults = true;
    this.api.addCustomer(this.customerForm.value)
      .subscribe((res: any) => {
          const id = res.id;
          this.isloadingResults = false;
          this.router.navigate(['/customer-details', id]);
        }, (err: any) => {
          console.log(err);
          this.isloadingResults = false;
        });
  }  

}
