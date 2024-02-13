import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../../../shared/models/product';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly api = environment.api
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Hostname': this.getHostName(),
    'Access-Control-Allow-Origin': '**',
  })

  constructor(
    private http: HttpClient,
  ) { }

  private getHostName(): string {
    let hostname = location.hostname

    if (hostname == 'localhost') {
      hostname = 'localhost'
    }

    return hostname
  }

  private addAuthorizationHeader(): HttpHeaders {
    const authToken = this.getAccessToken()
    return authToken ? this.headers.set('Authorization',`Bearer ${authToken}`) : this.headers
  }

  private getAccessToken(): string | null {
    return localStorage.getItem('access_token')
  }

  getAll(): Observable<Product> {
    const headers = this.addAuthorizationHeader()
    return this.http.get<Product>(`${this.api}/minimarketapi/v1/product/all`, {
      headers: headers
    }).pipe(map	((response: any) => {
      if (response.status.code == 200) {
        return response.data
      }
    }), catchError((error: any) => {
      return throwError(() => new Error(error.error.status.message))
    }))
  }

  save(product: Product): Observable<Product> {
    const headers = this.addAuthorizationHeader()
    return this.http.post<Product>(`${this.api}/minimarketapi/v1/product`, product, {
      headers: headers
    }).pipe(map((response: any) => {
      if (response.status.code == 200) {
        return response.data
      }
    }), catchError((error: any) => {
      return throwError(() => new Error(error.error.status.message))
    }))
  }
}