import { Injectable } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {

  constructor(private breakpointObserver: BreakpointObserver) { }

  /**
   * Observes specified breakpoints and returns an observable of the breakpoint state.
   *
   * @param {string | string[]} breakpoints - A single or multiple CSS media queries to observe.
   * @returns {Observable<BreakpointState>} An observable containing the state of the specified breakpoints.
   */
  public observeBreakpoint(breakpoints: string | string[]): Observable<BreakpointState> {
    return this.breakpointObserver.observe(breakpoints);
  }

  /**
   * Checks if the screen size matches the mobile breakpoint (max-width of 768px).
   *
   * @returns {Observable<BreakpointState>} An observable containing the state of the mobile breakpoint.
   */
  public isMobile(): Observable<BreakpointState> {
    return this.observeBreakpoint('(max-width: 768px)');
  }
}
