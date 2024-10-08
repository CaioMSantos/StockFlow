import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { User } from './models/User.model';


@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private readonly API_URL = 'https://stockflowapi.onrender.com';
    private isLoadingSubject = new BehaviorSubject<boolean>(false);  // Para controlar o estado de carregamento

    constructor(private http: HttpClient, 
        private router: Router
    ) {}

    login(userLogin: User): Observable<any> {
        this.isLoadingSubject.next(true);
        return this.http.post<any>(`${this.API_URL}/auth/login`, userLogin)
            .pipe(
                map((auth: User) => {
                    debugger
                    return this.setAuthFromLocalStorage(auth);
                }),
                catchError((err) => {
                    console.error('Error during login request:', err);
                    return throwError(() => new Error('Login failed. Please try again later.'));
                }),
                finalize(() => this.isLoadingSubject.next(false)) 
            );
    }

    private setAuthFromLocalStorage(auth: User): any {
        localStorage.setItem('authToken', auth.token);
        return auth;
    }

    logout() {
        localStorage.removeItem('authToken');
        this.router.navigate(['/login']);
      }
      
}
