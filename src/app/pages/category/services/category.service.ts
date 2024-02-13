import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../../../shared/models/category';
import { environment } from '../../../../environments/environment.development';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly api = environment.api
  /* private */ 

  constructor(
    private http: HttpClient,
  ) {}

  /* private getHostName(): string {
    let hostname = location.hostname

    if (hostname == 'localhost') {
      hostname = 'localhost'
    }

    return hostname
  } */

  private addAuthorizationHeader(): HttpHeaders {
    const authToken = this.getAccessToken()
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    })
    return authToken ? headers.set('Authorization',`Bearer ${authToken}`) : headers
  }

  private getAccessToken(): string | null {
    return localStorage.getItem('access_token')
  }

  getAll() {
    const headers = this.addAuthorizationHeader()
    return this.http.get<Category>(`${this.api}/minimarketapi/v1/categorias/all`, {
      headers: headers
    }).pipe(map((response: any) => {
      if (response.status.code == 200) {
        return response.data
      }
    }),
    catchError((error: any) => {
      return throwError(() => new Error(error.error.status.message))
    }))
  }
}
