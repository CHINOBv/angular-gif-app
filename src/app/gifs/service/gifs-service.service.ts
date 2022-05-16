import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { IGif, SearchGifResponse } from '../interfaces/gif.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  public gifs: IGif[] = [];
  private _history: string[] = [];

  private readonly apiKey = 'FTORX0MB41NNJmbIQvJZCTPUvvY7TtEz';
  private readonly serviceUrl = 'https://api.giphy.com/v1/gifs';

  get history(): string[] {
    return [...this._history];
  }

  public search(terms: string = '') {
    terms = terms.trim().toLowerCase();
    if (!terms.trim().length) {
      return;
    }
    localStorage.setItem('history', JSON.stringify(this.history));

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q', terms)
      .set('limit', '10');

    this.http
      .get<SearchGifResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe((res) => {
        this.gifs = res.data;
        localStorage.setItem(
          'gifs',
          JSON.stringify(
            this.gifs.map((gif) => ({
              id: gif.id,
              title: gif.title,
              images: {
                downsized_medium: { url: gif.images.downsized_medium.url },
              },
            }))
          )
        );
      });
    if (this.history.includes(terms)) {
      return;
    }
    if (this.history.length >= 10) {
      this._history.pop();
    }

    this._history.unshift(terms);
  }

  public getInitialGifs() {
    this.http
      .get<SearchGifResponse>(
        `https://api.giphy.com/v1/gifs/trending?api_key=${this.apiKey}&q=ang&limit=25&offset=0&rating=g&lang=en`
      )
      .subscribe((res) => (this.gifs = res.data));
  }

  constructor(private http: HttpClient) {
    if (localStorage.getItem('history')) {
      this._history = JSON.parse(localStorage.getItem('history')!);
    }
    if (localStorage.getItem('gifs')) {
      this.gifs = JSON.parse(localStorage.getItem('gifs')!);
    }
  }
}
