import { HttpClient, } from '@angular/common/http';
import { Component, } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  myform = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    age: new FormControl(),
    hobbies: new FormControl(''),
    gender: new FormControl(''),
    city: new FormControl(''),
  });
  constructor(private http: HttpClient) { }

  submit(data: any) {
    data.preventDefault();
    console.log(this.myform.value);
    const formData = JSON.stringify(this.myform.value);
    this.http.post<any>('https://student-api.mycodelibraries.com/api/student/add', formData)
      .subscribe(response => {
        console.log('added');
        this.resetform();
      },
      );
  }
  resetform() {
    this.myform.reset();
  }


}

