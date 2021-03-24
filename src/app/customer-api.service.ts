import { Injectable } from '@angular/core';
import { Observable, of , throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Customer } from './customer';

const httpOptions = {
  headers: new HttpHeaders({'content-type':'application/json'})
};
const apiUrl = 'http://localhost:8080/customer/';
@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }

  getCustomerList(pageNumber: number, pageSize: number , sortBy: string, sortDirection: string): Observable<Customer[]> {
    const url = `${apiUrl}?page=${pageNumber}&size=${pageSize}&sortBy=${sortBy}&sortDirection=${sortDirection}`;
    return this.http.get<Customer[]>(url).pipe(
      tap(customer => console.log('get Customer List')),
      catchError(this.handleError('getCustomerList',[]))
    );
  }

  getCustomer(id: any): Observable<Customer>{
    const url = `${apiUrl}${id}`;
    console.log('getCustomerUrl = ',url);
    return this.http.get<Customer>(url).pipe(
      tap(_ => console.log(`get customer with id=${id}`)),
      catchError(this.handleError<Customer>('getCustomer'))
    );
  }
  
  addCustomer(customer: Customer): Observable<Customer>{
    return this.http.post<Customer>(apiUrl, customer, httpOptions).pipe(
      tap((comp: any) => console.log(`new customer added wi id=${comp.id}`)),
      catchError(this.handleError<Customer>('addCustomer'))
    );
  }

  updateCustomer(id: any, customer: Customer): Observable<any>{
    const url = `${apiUrl}${id}`;
    return this.http.put(url, customer,httpOptions).pipe(
      tap(_ => console.log(`customer updated with id=${id}`)),
      catchError(this.handleError<any>('updateCustomer'))
    );
  }

  deleteCustomer(id: any): Observable<Customer>{
    const url = `${apiUrl}${id}`;

    return this.http.delete<Customer>(url, httpOptions).pipe(
      tap(_ => console.log(`customer deleted with id=${id}`)),
      catchError(this.handleError<any>('updateCustomer'))
    );
  }

  filterCustomerList(filterBy: string, filterValue: string): Observable<Customer[]> {    
    const url = `${apiUrl}?${filterBy}=${filterValue}`;
    
    return this.http.get<Customer[]>(url).pipe(
      tap(customer => console.log('filter Customer List')),
      catchError(this.handleError('filterCustomerList',[]))
    );
  }

  sortByName(): Observable<Customer[]> {    
    const url = `${apiUrl}sortByName`;
    return this.http.get<Customer[]>(url).pipe(
      tap(customer => console.log('get Customer List')),
      catchError(this.handleError('getCustomerList',[]))
    );
  }  
}
