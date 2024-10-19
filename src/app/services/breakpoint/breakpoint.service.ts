import { Injectable } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {

  constructor(private breakpointObserver: BreakpointObserver) { }

  
  public observeBreakpoint(breakpoints: string | string[]): Observable<BreakpointState> {
    return this.breakpointObserver.observe(breakpoints);
  }


  public isMobile(): Observable<BreakpointState> {
    return this.observeBreakpoint('(max-width: 768px)');
  }
}
