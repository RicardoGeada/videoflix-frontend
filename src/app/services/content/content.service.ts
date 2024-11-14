import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient) { }

  /**
   * Retrieves a list of available genres.
   *
   * @returns {Promise<any>} A promise that resolves with the list of genres from the API.
   */
  getGenres(): Promise<any> {
    const url = environment.baseURL + '/api/genres/';
    return lastValueFrom(this.http.get(url));
  }

  /**
   * Retrieves a paginated list of videos for a specified genre.
   *
   * @param {number} genreId - The ID of the genre to filter videos by.
   * @param {number} limit - The maximum number of videos to retrieve.
   * @param {number} offset - The starting index for pagination.
   * @returns {Promise<any>} A promise that resolves with the list of videos in the specified genre.
   */
  getGenreVideos(genreId:number, limit: number, offset: number): Promise<any> {
    let params = new HttpParams()
      .set('genre', genreId.toString())
      .set('limit', limit.toString())
      .set('offset', offset.toString())

    const url = environment.baseURL + '/api/videos/';
    return lastValueFrom(this.http.get(url, { params }));
  }


  /**
   * Retrieves details of a specific video by its ID.
   *
   * @param {string} id - The unique identifier for the video.
   * @returns {Promise<any>} A promise that resolves with the details of the specified video.
   */
  getVideo(id: string): Promise<any> {
    const url = environment.baseURL + '/api/videos/' + id + '/';
    return lastValueFrom(this.http.get(url));
  }


  /**
   * Retrieves the featured billboard video.
   *
   * @returns {Promise<any>} A promise that resolves with the featured billboard video data.
   */
  getBillboardVideo(): Promise<any> {
    const url = environment.baseURL + '/api/videos/billboard/';
    return lastValueFrom(this.http.get(url));
  }

}
