import { HttpClient, HttpClientModule, } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { response } from 'express';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [HttpClientModule, FormComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {

  data: any;

  constructor(private https: HttpClient) { }

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.https.get('https://student-api.mycodelibraries.com/api/student/get').subscribe(
      (fetch: any) => {
        console.log(fetch);
        this.data = fetch.data;
      }
    )
  }

  // fatchData();

  // editItem: any;
  updateData() {
    this.data.forEach((item: any) => {
      item.firstname = '#firstname';
      item.lastname = '#lastname';
      item.hobbies = '#hobbies';
      item.gender = '#gender';
      item.city = '#city';
      item.age = '#age';
    });
    this.https.post('https://student-api.mycodelibraries.com/api/student/update', this.data).subscribe(
      (response: any) => {
        console.log('edit data');
      }
    )

  }

  deleteData(id: any) {
    this.https.delete('https://student-api.mycodelibraries.com/api/student/delete').subscribe(
      (response: any) => {
        console.log('delete');

      }
    )

  }

}
