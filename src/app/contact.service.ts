import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,of,throwError } from 'rxjs';
import { Contact } from './contact';
import { catchError, retry, tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private baseUrl = 'http://localhost:9090';

  constructor(private http: HttpClient) { }

  getContact(contactId: number): Observable<Contact> {
    let url = `${this.baseUrl}/getcontact/${contactId}`;
    return this.http.get<Contact>(url).pipe(
      retry(5),
      catchError(this.handleError<Contact>('findAll-contacts',{"contactId":1,"contactName":"MALINI","contactNumber":87451236912,"contactEmail":"MALINI.S@GMAIL.COM","activeSw":"Y"}))
    );
  }

  createContact(contact: Contact): Observable<Contact> {
    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Cache-Control': 'no-cache'
    });
    return this.http.post(`${this.baseUrl}/saveContact`, contact,
    { headers: httpHeaders }).pipe(
      map(this.extractData),
      catchError(this.handleErrorObservable)
      
    );
  }
  private extractData(res: any) {
    let body = res;
    return body;
  }
  private handleErrorObservable(error: any) {
    console.error(error.message || error);
    return throwError(error);
  }

  updateContact(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/saveContact`, value);
    
  }

  deleteContact(id: number,flag :any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}/${flag}`, { responseType: 'text' });
  }

  getContactsList(): Observable<Contact[]> {
    let url = `${this.baseUrl}/viewContacts`;
    return this.http.get<Contact[]>(url).pipe(
      retry(5),
      catchError(this.handleError<Contact[]>('findAll-contacts', this.fallback()))
    );
  }
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    }
  }
    private fallback() {
      return [{"contactId":1,"contactName":"MALINI","contactNumber":87451236912,"contactEmail":"MALINI.S@GMAIL.COM","activeSw":"Y"}];
    }
}
