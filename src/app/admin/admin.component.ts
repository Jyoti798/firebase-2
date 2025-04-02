import { Component } from '@angular/core';
import { AuthService } from '../auth/service/auth.service';
import { LocalStorageService } from '../auth/service/localstorageservice';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  allRequests: any[] = [];

  constructor(
    public authService: AuthService, 
    private localStorageService: LocalStorageService
  ) {
    this.loadRequests(); // ✅ Load requests on initialization
  }

  approveRequest(index: number) {
    const request = this.allRequests[index]; // ✅ Use 'allRequests' instead of 'requests'
    this.localStorageService.updateRequestStatus(request.name, request.date, 'Approved');
    this.loadRequests(); // ✅ Refresh the list after update
  }

  rejectRequest(index: number) {
    const request = this.allRequests[index]; // ✅ Use 'allRequests' instead of 'requests'
    this.localStorageService.updateRequestStatus(request.name, request.date, 'Rejected');
    this.loadRequests(); // ✅ Refresh the list after update
  }

  loadRequests() {
    this.allRequests = this.localStorageService.getAllRequests();
  }
}
