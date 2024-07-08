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
  userId: number = 0;

  constructor(private router: Router, private historyService: RegisterHistoryService) {}

  ngOnInit() {
    this.userName = localStorage.getItem('user') || 'user';
    this.userId = parseInt(localStorage.getItem('userId') || '0', 10);
    this.loadHistory();
  }

  async loadHistory() {
    try {
      this.historyTimestamps = await this.historyService.getHistory(this.userId);
      this.historyTimestamps.sort((a, b) => {
        // Ordenar primero por fecha (descendente)
        if (b.date > a.date) return 1;
        if (b.date < a.date) return -1;
  
        // Si las fechas son iguales, ordenar por hora (descendente)
        if (b.checkIn > a.checkIn) return 1;
        if (b.checkIn < a.checkIn) return -1;
  
        return 0;
      });
    } catch (error) {
      console.error('Error al obtener el historial:', error);
    }
  }
  

  logOut() {
    this.router.navigate(['/login']);
  }
}
