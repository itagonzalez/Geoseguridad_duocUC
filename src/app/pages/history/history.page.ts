import { Component, OnInit } from '@angular/core';
import { RegisterHistoryService } from '../../services/history/register-history.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  historyTimestamps: any[] = [];
  userName: string = '';

  constructor(private router: Router, private historyService: RegisterHistoryService) {}

  ngOnInit() {
    this.userName = localStorage.getItem('user') || 'user';
    this.historyTimestamps = this.historyService.getHistory();
  }

  logOut() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
