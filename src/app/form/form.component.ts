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
    console.log(this.myform.value);
    const formData = this.myform.value;
    this.http.post<any>('https://student-api.mycodelibraries.com/api/student/add', formData)
      .subscribe(response => {
        console.log('added');
        this.resetform();
        this.fetchData();
      },
      );
  }
  resetform() {
    this.myform.reset();
  }

  fetchData() {
    this.http.get('https://student-api.mycodelibraries.com/api/student/get').subscribe(
      (fetch: any) => {
        console.log(fetch);
        this.data = fetch.data;
      }
    )
  }

  updateData() {
    this.data.forEach((item: any) => {
      item.firstname = '#firstname';
      item.lastname = '#lastname';
      item.hobbies = '#hobbies';
      item.gender = '#gender';
      item.city = '#city';
      item.age = '#age';
    });
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

