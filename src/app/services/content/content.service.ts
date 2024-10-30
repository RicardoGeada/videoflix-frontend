import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient) { }

  getGenres() {
    const url = environment.baseURL + '/api/genres/';
    return lastValueFrom(this.http.get(url));
  }

  getGenreVideos(genreId:number, limit: number, offset: number) {
    let params = new HttpParams()
      .set('genre', genreId.toString())
      .set('limit', limit.toString())
      .set('offset', offset.toString())

    const url = environment.baseURL + '/api/videos/';
    return lastValueFrom(this.http.get(url, { params }));
  }

  getVideo(id: string) {
    const url = environment.baseURL + '/api/videos/' + id + '/';
    return lastValueFrom(this.http.get(url));
  }


}
