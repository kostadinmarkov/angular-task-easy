import {TestBed} from '@angular/core/testing';
import {StorageService} from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store and retrieve items', () => {
    const testData = {name: 'Test', value: 123};
    service.setItem('test', testData);
    const retrieved = service.getItem('test');
    expect(retrieved).toEqual(testData);
  });

  it('should return null for non-existent items', () => {
    const result = service.getItem('nonexistent');
    expect(result).toBeNull();
  });

  it('should remove items', () => {
    service.setItem('test', 'data');
    service.removeItem('test');
    expect(service.getItem('test')).toBeNull();
  });

});
