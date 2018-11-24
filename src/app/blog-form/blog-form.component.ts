import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { BlogService } from '../blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css']
})
export class BlogFormComponent implements OnInit {

  myForm: FormGroup;

  constructor(private fb: FormBuilder,
              private blogApi: BlogService,
              private router: Router ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      body: ['', Validators.required],
      category: ['', Validators.required],
      hidden: false
    });
    // this.myForm.valueChanges.subscribe(console.log);
  }

  submitHandler() {
    const formVal = this.myForm.value;
    const jsonVal = JSON.stringify(formVal);
    this.blogApi.postBlogPost(jsonVal).subscribe((res) => {
      this.router.navigate(['/blog']);
    });
  }
// const blogSchema = mongoose.Schema({
//   title: { type: String, required: true },
//   author: { type: String, required: true },
//   body: { type: String, required: true },
//   category: { type: String, required: true },
//   comments: [{ body: String, date: { type: Date, default: Date.now }, userName: String }],
//   date: { type: Date, default: Date.now },
//   hidden: Boolean
// });
}
