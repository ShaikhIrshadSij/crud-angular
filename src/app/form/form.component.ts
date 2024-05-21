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

  updateData(item: any) {
    this.myform.setValue({
      firstName: item.firstName,
      lastName: item.lastName,
      age: item.age,
      hobbies: item.hobbies,
      gender: item.gender,
      city: item.city,
    });
    this.http.post('https://student-api.mycodelibraries.com/api/student/update', this.data).subscribe(
      (response: any) => {
        console.log('edit data');
      }
    )
  }
  deleteData(id: any) {
    // Find the index of the item with the specified ID
    let index = this.data.findIndex((item: any) => item.id === id);

    // If the item is found, remove it from the data array
    if (index !== -1) {
      this.data.splice(index, 1);
      this.http.delete('https://student-api.mycodelibraries.com/api/user/delete?id=${id}').subscribe(
        (response: any) => {
          console.log('Item deleted successfully');
        },
      );
    } else {
      console.error('Item not found for deletion');
    }

    // Optionally, you can send a request to the server to delete the item
  }

}

