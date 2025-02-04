import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../services/user-profile.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  imports: [FormsModule, NgIf],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  user: any = null;
  newUser = { name: '', email: '', phone: '' };

  constructor(private userProfileService: UserProfileService) { }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.userProfileService.getUserProfile(userId).subscribe((data) => {
        this.user = data;
      });
    }
  }

  createUser() {
    this.userProfileService.createUserProfile(this.newUser).subscribe((data) => {
      localStorage.setItem('userId', data);
      this.loadUserProfile();
    });
  }

  editProfile() {
    alert('Edit Profile Feature Coming Soon!');
  }
}
