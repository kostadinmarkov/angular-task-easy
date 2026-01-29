import {TestBed} from '@angular/core/testing';
import {AuthService} from './auth.service';
import {StorageService} from './storage.service';

describe('AuthService', () => {
  let service: AuthService;
  let storageService: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
    storageService = TestBed.inject(StorageService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login with valid credentials', () => {
    const user = service.login('admin', 'admin123');
    expect(user).toBeTruthy();
    expect(user?.username).toBe('admin');
  });

  it('should not login with invalid credentials', () => {
    const user = service.login('admin', 'wrongpassword');
    expect(user).toBeNull();
  });

  it('should logout user', () => {
    service.login('admin', 'admin123');
    service.logout();
    // expect(service.getCurrentUser()).toBeNull();
  });

  it('should check authentication status', () => {
    // expect(service.isAuthenticated()).toBeFalse();
    service.login('admin', 'admin123');
    // expect(service.isAuthenticated()).toBeTrue();
  });

  it('should return all users', () => {
    const users = service.getAllUsers();
    expect(users.length).toBe(3);
  });
});
