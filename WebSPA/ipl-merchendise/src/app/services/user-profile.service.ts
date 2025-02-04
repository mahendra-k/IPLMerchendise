import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from '../models/user-profile.model';
import { environment } from '../../environments/environment';  // Import environment

@Injectable({
    providedIn: 'root'
})
export class UserProfileService {
    private apiUrl = `${environment.apiBaseUrl}/userProfile`; // Update with actual API URL

    constructor(private http: HttpClient) { }

    // Get User Profile
    getUserProfile(userId: string): Observable<UserProfile> {
        return this.http.get<UserProfile>(`${this.apiUrl}/${userId}`);
    }

    // Create User Profile
    createUserProfile(user: any): Observable<any> {
        return this.http.post(`${this.apiUrl}`, user);
    }
}
