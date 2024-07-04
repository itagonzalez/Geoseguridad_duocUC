import { Component, OnInit } from '@angular/core';
import { DbsqlService } from 'src/app/services/database/dbsql.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user: any = {};
  editMode: boolean = false;

  constructor(private router: Router, private dbsqlService: DbsqlService) {}

  ngOnInit() {
    this.loadUserData();
  }

  async loadUserData() {
    const username = localStorage.getItem('user');
    if (username) {
      try {
        this.user = await this.dbsqlService.getUser(username);
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    }
  }

  enableEdit() {
    this.editMode = true;
  }

  async saveChanges() {
    try {
      await this.dbsqlService.updateUser(this.user);
      this.editMode = false;
      console.log('Cambios guardados correctamente.');
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  }

  logOut() {
    this.router.navigate(['/login']);
  }
}
