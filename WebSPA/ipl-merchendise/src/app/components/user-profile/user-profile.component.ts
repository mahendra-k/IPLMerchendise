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
  user: any = null;  // Holds user details if exists
  newUser = { name: '', email: '', phone: '' }; // Form model

  constructor(private userProfileService: UserProfileService) { }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  // Load user profile if exists
  loadUserProfile() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.userProfileService.getUserProfile(userId).subscribe((data) => {
        this.user = data;
      });
    }
  }

  // Create new user
  createUser() {
    this.userProfileService.createUserProfile(this.newUser).subscribe((data) => {
      localStorage.setItem('userId', data); // Store userId in localStorage
      this.loadUserProfile(); // Reload page to show user details
    });
  }

  // Edit profile action (Future implementation)
  editProfile() {
    alert('Edit Profile Feature Coming Soon!');
  }
}
