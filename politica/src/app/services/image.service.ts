import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/api/files';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }
  
  get(name: any): Observable<any> {
    return this.http.get(`${baseUrl}/${name}`, {responseType: 'arraybuffer'});
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(baseUrl);
  }
}