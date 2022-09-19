import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class GeralService {
  private _loading = new BehaviorSubject<boolean>(false);
  public readonly loading = this._loading.asObservable();

  constructor() {}

  showLoading() {
    this._loading.next(true);
  }
  hideLoading() {
    this._loading.next(false);
  }
}
