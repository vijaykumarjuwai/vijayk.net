import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
// import { Blogpost } from '../models/Blog';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogs: any;
  constructor(private blogApi: BlogService) { }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.blogApi.getBlogPosts().subscribe((res) => {
      this.blogs = res;
    });
  }

  deleteBlog(id) {
    this.blogApi.deleteBlogpost(id).subscribe((res) => {
      this.fetchData();
      console.log(res);
    });
  }

}
