import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.css']
})
export class BlogFormComponent implements OnInit {

  myForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      title: '',
      author: '',
      body: '',
      categories: this.fb.array([]),
    });

    this.myForm.valueChanges.subscribe(console.log);
  }

  get blogCategory() {
    return this.myForm.get('categories') as FormArray;
  }

  addCategory() {
    const blogType = this.fb.group({
      category: '',
      genre: '',
      tags: []
    });

    this.blogCategory.push(blogType);
  }

  deleteCategory(i) {
    this.blogCategory.removeAt(i);
  }

//   const blogSchema = mongoose.Schema({
//     title: { type: String, required: true },
//     author: { type: String, required: true },
//     body: { type: String, required: true },
//     blogType: [{ category: String, genre: String, tags: [String]}],
//     comments: [{ body: String, date: Date }],
//     date: { type: Date, default: Date.now },
//     hidden: Boolean
// });
}
