import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {

  customerForm: FormGroup;
  id = '';
  name = '';
  phone = '';
  address = '';
  isloadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private route: ActivatedRoute, private api: CustomerApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getCustomer(this.route.snapshot.params['id']);
    this.customerForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'phone' : [null, Validators.required],
      'address' : [null, Validators.required]
    });
  }

  getCustomer(id: any) {
    this.api.getCustomer(id).subscribe((data: any) => {
      this.id = data.id;
      this.customerForm.setValue({
        name: data.name,
        phone: data.phone,
        address: data.address
      });
    });
  }

  onFormSubmit() {
    this.isloadingResults = true;
    this.api.updateCustomer(this.id, this.customerForm.value)
      .subscribe((res: any) => {
          const id = res.id;
          this.isloadingResults = false;
          this.router.navigate(['/customer-details', id]);
        }, (err: any) => {
          console.log(err);
          this.isloadingResults = false;
        }
      );
  }

  customerDetails() {
    this.router.navigate(['/customer-details', this.id]);
  }


}
