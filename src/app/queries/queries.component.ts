import { Component, OnInit } from '@angular/core';
import { QueriesServiceService } from '../services/queries-service.service';

@Component({
  selector: 'app-queries',
  templateUrl: './queries.component.html',
  styleUrls: ['./queries.component.css']
})
export class QueriesComponent implements OnInit {

  queries: any;
  constructor(private queriesService: QueriesServiceService) { }

  ngOnInit(): void {
    this.queriesService.loadData().subscribe(val => {
      this.queries = val;
    })
  }

  onDelete(subscriberId: string) {
    this.queries.deleteData(subscriberId);
  }

}
