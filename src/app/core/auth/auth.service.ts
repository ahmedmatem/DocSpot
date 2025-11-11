import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';

type LogintDto = { 
  email: string; 
  password: string; 
};
type LoginResponse = { 
  accessToken: string; 
  refreshToken?: string;
  user: { id: string; email: string; role: 'admin' | 'user'; };
 }

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly ACCESS_KEY = 'access_token';
  private readonly REFRESH_KEY = 'refresh_token';
  private readonly USER_KEY = 'user_data';

  user = signal<LoginResponse['user'] | null>(this.getStoredUser());


  constructor(private http: HttpClient) { }

  login(dto: LogintDto) {
    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/auth/login`, dto);
  }

  handleLogin(res: LoginResponse) {
    console.log('Handling login, storing tokens and user data', res);
    localStorage.setItem(this.ACCESS_KEY, res.accessToken);
    localStorage.setItem(this.USER_KEY, JSON.stringify(res.user));
    if (res.refreshToken) {
      localStorage.setItem(this.REFRESH_KEY, res.refreshToken);
    }
    this.user.set(res.user);
  }

  logout() {
    localStorage.removeItem(this.ACCESS_KEY);
    localStorage.removeItem(this.REFRESH_KEY);
    localStorage.removeItem(this.USER_KEY);
    this,this.user.set(null);
  }

  get accessToken(): string | null {
    return localStorage.getItem(this.ACCESS_KEY);
  }

  get refreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_KEY);
  }

  get isLoggedIn(): boolean {
    return !!this.accessToken;
  }

  hasRole(role: 'admin' | 'user'): boolean {
    return this.user()?.role === role;
  }
  
  private getStoredUser(): LoginResponse['user'] | null {
    const raw = localStorage.getItem(this.USER_KEY);
    try { 
      return raw ? JSON.parse(raw) : null; 
    } catch { 
      return null;
     }
  }
}
