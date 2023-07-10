import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  public gifList: Gif[] = [];
  private _tagsHistory: string[] = [];
  private apiKey: string = '05mz3jb0JtHZZ0ArxQv2dlSkK0U0VHPl';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  private organizeTagsHistory(tag: string) {
    tag = tag.trim().toLowerCase();

    this._tagsHistory = this._tagsHistory.filter((t) => t !== tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('History', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('History')) return;

    this._tagsHistory = JSON.parse(localStorage.getItem('History')!) || [];
  }

  searchTag(tag: string) {
    if (tag.trim().length === 0) return;

    this.organizeTagsHistory(tag);

    this._tagsHistory.unshift(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag);

    this.http
      .get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe((resp) => {
        console.log(resp.data);
        this.gifList = resp.data;
      });
  }
}
