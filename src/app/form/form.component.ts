import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms'

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
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    age: new FormControl(''),
    hobbies: new FormControl(''),
    gender: new FormControl(''),
    city: new FormControl(''),
  });


  submit(data: any) {
    data.preventDefault();
    const formData = this.myform.value;
    this.http.post<any>('https://student-api.mycodelibraries.com/api/student/add', formData)
      .subscribe(response => {
        this.myform.reset();
        this.fetchData();
      },
      );
  }

  fetchData() {
    this.http.get('https://student-api.mycodelibraries.com/api/student/get').subscribe(
      (fetch: any) => {
        this.data = fetch.data;
      }
    )
  }

  updateData() {
    this.myform.setValue({firstName: '#firstName'});
    this.http.post('https://student-api.mycodelibraries.com/api/student/update', this.data).subscribe(
      (response: any) => {
        console.log('edit data');
      }
    )

  }


  deleteData(id: any) {
    this.http.delete('https://student-api.mycodelibraries.com/api/student/delete').subscribe(
      (response: any) => {
        console.log('delete');

      }
    )

  }
}

