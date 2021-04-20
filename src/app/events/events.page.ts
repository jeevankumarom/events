import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {

  constructor(public http:HttpClient) { }

  ngOnInit() {
  }

  event_insert(eventname,eventstartdate,eventenddate,eventstarttime,eventendtime,eventdescriptions){
    var ins={eventname,eventstartdate,eventenddate,eventstarttime,eventendtime,eventdescriptions}

    this.http.post('http://localhost:3300/',ins).subscribe(result =>{
      console.log(result)
    })
  }

}
