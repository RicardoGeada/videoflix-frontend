import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private activeRequests = 0;
  private isLoadingSubject = new BehaviorSubject<boolean>(false);

  isLoading$ = this.isLoadingSubject.asObservable();

  /**
   * Increments the number of active requests and updates the loading state.
   * This method is intended to be called when a request is initiated.
   */
  start(): void {
    this.activeRequests++;
    this.updateLoaderState();
  }

  /**
   * Decrements the number of active requests and updates the loading state.
   * This method is intended to be called when a request is completed.
   */
  stop(): void {
    if (this.activeRequests > 0) {
      this.activeRequests--;
    }
    this.updateLoaderState();
  }

  /**
   * Updates the loading state based on the number of active requests.
   * If there are any active requests, the loading state is set to true.
   * Otherwise, it is set to false.
   * 
   * @private
   */
  private updateLoaderState(): void {
    setTimeout(() => {
      this.isLoadingSubject.next(this.activeRequests > 0);
    }, 0);
  }
}
