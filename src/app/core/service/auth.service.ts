import {Injectable} from '@angular/core';
import {User} from '../model/user';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USERS_KEY = 'loggedUser';
  private readonly USERS: User[] = [
    {id: 1, username: 'admin', password: 'admin123', name: 'Admin User'},
    {id: 2, username: 'user', password: 'user123', name: 'First User'},
    {id: 3, username: 'test', password: 'test123', name: 'Second User'}
  ];

  constructor(private readonly storageService: StorageService) {
  }

  public login(username: string, password: string): User | null {
    const user = this.USERS.find(
      u => u.username === username && u.password === password
    );

    if (user) {
      this.storageService.setItem(this.USERS_KEY, user);
      return user;
    }

    return null;
  }

  public logout(): void {
    this.storageService.removeItem(this.USERS_KEY);
  }

  public isAuthenticated(): boolean {
    return this.getLoggedUser() !== null;
  }

  public getAllUsers(): User[] {
    return this.USERS;
  }

  public getLoggedUser(): User | null {
    return this.storageService.getItem<User>(this.USERS_KEY);
  }
}
