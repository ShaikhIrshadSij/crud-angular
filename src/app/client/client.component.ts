import { HttpClient, HttpClientModule, } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit {

  data: any;

  constructor(private https: HttpClient) { }

  ngOnInit(): void {
    this.fatchData();
  }

  fatchData() {
    this.https.get('https://student-api.mycodelibraries.com/api/student/get').subscribe(
      (fetch: any) => {
        console.log(fetch);
        this.data = fetch.data;
      }
    )
  }


}
