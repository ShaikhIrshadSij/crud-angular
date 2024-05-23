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

  submit(data: any) {
    data.preventDefault();
    const formData = this.myform.value;
    if (formData.id) {
      this.http.post<any>('https://student-api.mycodelibraries.com/api/student/update', formData)
        .subscribe(response => {
          this.fetchData();
          this.myform.reset();
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
        this.fetchData();
        this.myform.reset();
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
    this.myform.patchValue({
      id: item._id,
      firstName: item.firstName,
      lastName: item.lastName,
      age: item.age,
      gender: item.gender,
      city: item.city,
    });
    const hobbiesArray = this.myform.get('hobbies') as FormArray;
    hobbiesArray.clear();

    if (item.hobbies && item.hobbies.length > 0) {
      const hobbies = item.hobbies.split(',');

      hobbies.forEach((hobby: any) => {
        hobbiesArray.push(new FormControl(hobby.trim()));
      });
    }
  }


  onchange(e: any) {
    const checkvalue = e.target.value;
    const checked = e.target.checked;
    const checkedArray = this.myform.get('hobbies') as FormArray;

    if (checked) {
      checkedArray.push(new FormControl(checkvalue));
    } else {
      const index = checkedArray.controls.findIndex(control => control.value === checkvalue);
      if (index >= 0) {
        checkedArray.removeAt(index);
      }
    }
  }

  isHobbySelected(hobby: string): boolean {
    const hobbiesArray = this.myform.get('hobbies') as FormArray;
    return hobbiesArray.controls.some(control => control.value === hobby);
  }


  deleteData(id: any) {
    this.http.delete(`https://student-api.mycodelibraries.com/api/student/delete?id=${id}`, this.data).subscribe(
      (response: any) => {
        this.fetchData();
      },
    );
  }

}



