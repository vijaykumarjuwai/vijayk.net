import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
    blogs: any;
    constructor(
        private blogApi: BlogService,
        private auth: AuthService,
        private router: Router
    ) {}

    ngOnInit() {
        this.fetchData();
    }

    fetchData() {
        this.blogApi.getBlogPosts().subscribe(res => {
            this.blogs = res;
        });
    }

    deleteBlog(id) {
        if (this.auth.isLoggedIn()) {
            this.blogApi.deleteBlogpost(id).subscribe(res => {
                this.fetchData();
                console.log(res);
            });
        }
    }
}
