import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { CustomerApiService } from '../customer-api.service';
import { Customer } from '../customer';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {

  customer: Customer = {id: null, name: '', phone: '',validPhoneNumber:false, phoneDetails:null};
  isloadingResults = true;

  constructor(private route: ActivatedRoute, private api: CustomerApiService, private router: Router) { }

  ngOnInit() {
    this.getCustomerDetails(this.route.snapshot.params.id);
  }

  getCustomerDetails(id: any) {
    console.log('getCustomerDetails , id =', id);
    this.api.getCustomer(id)
      .subscribe((data: any) => {
        this.customer = data;
        console.log('getCustomerDetails , ', this.customer);
        this.isloadingResults = false;
      });
  }

  deleteCustomer(id: any) {
    this.isloadingResults = true;
    this.api.deleteCustomer(id)
      .subscribe(res => {
        this.isloadingResults = false;
        this.router.navigate(['/customers']);
      }, (err) =>{
        console.log('deleteCustomer error : ',err);
        this.isloadingResults = false;
      });
  }

}
