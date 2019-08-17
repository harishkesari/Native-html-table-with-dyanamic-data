import { Component, OnInit } from '@angular/core';
import { UserStatusModel } from './models/user_status_update.model';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  rows = [10, 25, 50, 100, 125, 150, 175, 200];
  sampleJsonData: any;
  selectedRowCount: any = '';
  numOfPages: any = [];
  range = 20;
  selectedPage = 1;
  selectedUser: any;
  error_message: string;
  loadSampleData: any = [];
  constructor(private appService: AppService) {
  }

  ngOnInit() {
    this.error_message = '';
    this.getSampleData();
  }

  getSampleData() {
    this.appService.getData().subscribe(res => {
      this.loadSampleData = res;
      this.sampleJsonData = res;
      this.loadPageNumbers();
      this.selectedPage = this.numOfPages[0];
      this.loadPage(this.selectedPage);
    }, err => {
      this.error_message = 'Unable to load sample data, please replace data with same file name in src--> assets --> data';
    });

  }

  loadPageNumbers() {
    this.numOfPages = [];
    const noOfPages = Math.ceil(this.loadSampleData.length / this.range);
    for (let i = 1; i <= noOfPages; i++) {
      this.numOfPages.push(i);
    }
  }

  changeRowCount(item) {
    this.selectedRowCount = item;
    this.selectedPage = 1;
    this.sampleJsonData = this.loadSampleData.slice(0, this.selectedRowCount);
    this.range = item;
    this.loadPageNumbers();
  }

  loadPage(pageNum) {
    this.selectedPage = pageNum;
    const startRange = pageNum * this.range - this.range;
    const endRange = this.range * pageNum;
    this.sampleJsonData = this.loadSampleData.slice(startRange, endRange);
  }

  updateScroll(scrollOne: HTMLElement, scrollTwo: HTMLElement) {
    scrollOne.scrollLeft = scrollTwo.scrollLeft;
  }

  submitRow(id, status) {
    this.selectedUser = new UserStatusModel(id, status);
    console.log(this.selectedUser)
    this.appService.postStatus(this.selectedUser).subscribe(data => {
      // success response copied
    });
  }
}
