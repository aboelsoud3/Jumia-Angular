import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerApiService} from '../customer-api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Customer } from '../customer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  
  displayedColumns: string[] = ['country', 'code', 'phone','isValid'];
  data: Customer[] = [];
  totalItems = 0;
  totalPages = 1;
  currentPage = 0;
  pageSize=5;
  filterBy = "name";
  sortBy = "id";
  sortDirection = "asc";

  isloadingResults = true;
  myGroup = new FormGroup({
    filter: new FormControl()
 });
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private api: CustomerApiService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getCustomers();
  }

  setData(result: any){
    if(!result) 
    {
        this.setDefalutData();
    }
    else {
      this.data = result.customers;
      this.totalItems = result.totalItems;
      this.totalPages = result.totalPages;
      this.currentPage = result.currentPage;
    }

  }
  setDefalutData(){
    this.data = [];
    this.totalItems = 0;
    this.totalPages = 1;
    this.currentPage = 0;
    this.pageSize=5;
    this.filterBy = "name";    
    this.sortBy = "id";
    this.sortDirection = "asc";    
  }
  getCustomers(){
    this.api.getCustomerList(this.currentPage, this.pageSize ,this.sortBy, this.sortDirection)
    .subscribe((res: any) => {
      this.setData(res);
      console.log('customerList = ',this.data);
      this.isloadingResults = false
    }, err => {
      console.log(err);
      this.setDefalutData();
      this.isloadingResults = false;

    });
  }

  applyFilter(filterValue: string){
    this.api.filterCustomerList(this.filterBy, filterValue)
      .subscribe((res: any) => {
        this.setData(res);
        console.log('customerList = ',this.data);
        this.isloadingResults = false
      }, err => {
        console.log(err);
        this.setDefalutData();
        this.isloadingResults = false;

      });    
  }

  sortByName() {
    this.sortBy = "phoneDetails.countryName";
    this.changeSortDirection();
    console.log('sortDirection : ', this.sortDirection);
    this.getCustomers();
  }  

  changeSortDirection(){
    if(this.sortDirection === "asc")
    {
      this.sortDirection= "desc"
    }
    else{
      this.sortDirection= "asc"
    }
  }
  onChangePagination(pageData: PageEvent){
    this.currentPage = pageData.pageIndex;
    this.pageSize = pageData.pageSize;
    this.getCustomers();
  }

  sortByPhone() {
    this.sortBy = "phone";
    this.changeSortDirection();
    console.log('sortDirection : ', this.sortDirection);
    this.getCustomers();
  }

  sortByCode() {
    this.sortBy = "phoneDetails.countryCode";
    this.changeSortDirection();
    console.log('sortDirection : ', this.sortDirection);
    this.getCustomers();
  }
  
}
