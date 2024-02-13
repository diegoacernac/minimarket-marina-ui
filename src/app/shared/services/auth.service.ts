import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login/login-request';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly api = environment.api
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Hostname': this.getHostName(),
    'Access-Control-Allow-Origin': '**',
  })

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

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

  private addDataLocalStorage(responseData: any): void {
    localStorage.setItem('access_token', responseData.data.token)
    localStorage.setItem('user_data', JSON.stringify(responseData.data.usuario))
    localStorage.setItem('user_menus', JSON.stringify(responseData.data.menus))
  }

  getToken() {
    return localStorage.getItem('access_token')
  }

  getUserData() {
    let data = JSON.parse(localStorage.getItem('user_data')!)
    return data
  }

  getUserMenus() {
    let menus = JSON.parse(localStorage.getItem('user_menus')!)
    return menus
  }
  
  login(loginRequest: LoginRequest): Observable<any> {
    const headers = this.addAuthorizationHeader()
    return this.http.post<LoginRequest>(`${this.api}/minimarketapi/v1/auth/login`, loginRequest, { 
      headers: headers 
    }).pipe(
      map((response: any) => {
        if (response.status.code == 200) {
          this.addDataLocalStorage(response)
        }
      }),
      catchError((error: any) => {
        return throwError(() => new Error(error.error.status.message))
      }),
    )
  }

  logOut(): void {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user_data')
    localStorage.removeItem('user_menus')
    this.router.navigate(['/login'])
  }
}
