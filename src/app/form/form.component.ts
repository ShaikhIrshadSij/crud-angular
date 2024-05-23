import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { response } from 'express';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, HttpClientModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  data: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchData();
  }

  myform = new FormGroup({
    id: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    age: new FormControl(''),
    hobbies: new FormArray([]),
    gender: new FormControl(''),
    city: new FormControl(''),
  });


  onchange(e: any) {
    let checkvalue = e.target.value;
    let checked = e.target.checked
    // console.log(checkvalue, checked);
    let checkedArray = this.myform.get('hobbies') as FormArray;
    if (checked) {
      checkedArray.push(new FormControl(checkvalue));
    }
    // this.myform.reset();
  }

  submit(data: any) {
    data.preventDefault();
    const formData = this.myform.value;
    if (formData.id) {
      this.http.post<any>('https://student-api.mycodelibraries.com/api/student/update', formData)
        .subscribe(response => {
          this.myform.reset();
          this.fetchData();
        },
        );
    } else {
      this.addData(data)
    }
  }

  addData(data: any) {
    data.preventDefault();
    const formData = this.myform.value;
    this.http.post('https://student-api.mycodelibraries.com/api/student/add', formData).subscribe
      (response => {
        console.log(formData);
        this.myform.reset();
        // this.myform.controls.hobbies.setValue([])
        this.fetchData();
      })
  }

  fetchData() {
    this.http.get('https://student-api.mycodelibraries.com/api/student/get').subscribe(
      (fetch: any) => {
        this.data = fetch.data;
      }
    )
  }

  updateData(item: any) {
    this.myform.setValue({
      id: item._id,
      firstName: item.firstName,
      lastName: item.lastName,
      age: item.age,
      hobbies: item.hobbies,
      gender: item.gender,
      city: item.city,
    });
  }


  deleteData(id: any) {
    this.http.delete(`https://student-api.mycodelibraries.com/api/student/delete?id=${id}`, this.data).subscribe(
      (response: any) => {
        console.log('Item deleted successfully');
        console.log(id);
        this.fetchData();
      },
    );
  }

}

