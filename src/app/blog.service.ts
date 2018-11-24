import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Blogpost } from './models/Blog';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  blogApiUrl = '/api/blog';

  constructor(private http: HttpClient) { }

  getBlogPosts(): Observable<Blogpost> {
    return this.http.get<Blogpost>(this.blogApiUrl, httpOptions);
  }

  postBlogPost(blogpost): Observable<Blogpost> {
    return this.http.post<Blogpost>(this.blogApiUrl, blogpost, httpOptions);
  }

  editBlogpost(blogpost, id): Observable<Blogpost> {
    const editUrl = this.blogApiUrl + '/' + id;
    return this.http.patch<Blogpost>(editUrl, blogpost, httpOptions);
  }

  deleteBlogpost(id): Observable<Blogpost> {
    const deleteUrl = this.blogApiUrl + '/' + id;
    return this.http.delete<Blogpost>(deleteUrl, httpOptions);
  }
}
