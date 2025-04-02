import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/service/auth.service';
import { LocalStorageService } from '../auth/service/localstorageservice';
import { ManageService } from '../auth/service/manage.service';
import { User } from '../models/user/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  user: any;
  date: string = '';
  checkIn: string = '';
  checkOut: string = '';
  records: any[] = [];

  // Request Form State
  showRequestForm = false;
  selectedRecord: any = null;
  requestReason: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private localStorageService: LocalStorageService,
    private manageSer:ManageService 
  ) {
    this.user = this.manageSer.getUser();
    this.loadEmployeeRequests(); // ✅ Load all previous attendance records
  }

  /** ✅ Load all attendance records for logged-in employee */
  loadEmployeeRequests() {
    this.records = this.localStorageService.getEmployeeRequests(this.user.name);
  }

  /** ✅ Submit new attendance record */
  submitAttendance() {
    if (!this.date || !this.checkIn || !this.checkOut) {
      alert("Please fill all fields!");
      return;
    }

    // ✅ Check if attendance for the same date already exists
    const existingRecord = this.records.find(record => record.date === this.date);
    if (existingRecord) {
      alert("Attendance for this date already exists!");
      return;
    }

    const newRecord = { 
      name: this.user.name, 
      date: this.date, 
      checkIn: this.checkIn, 
      checkOut: this.checkOut, 
      status: 'Pending', 
      reason: "No reason provided"
    };

    this.localStorageService.saveEmployeeRequest(newRecord);
    this.loadEmployeeRequests(); // ✅ Refresh records list after adding new entry
    this.resetFormFields(); // ✅ Clear form fields
  }

  /** ✅ Reset form fields after submission */
  resetFormFields() {
    this.date = '';
    this.checkIn = '';
    this.checkOut = '';
  }

  /** ✅ Open request form (modal behavior) */
  openRequestForm(index: number) {
    this.selectedRecord = { ...this.records[index] }; // Clone record
    this.showRequestForm = true;
  }

  /** ✅ Close request form */
  closeRequestForm() {
    this.showRequestForm = false;
    this.requestReason = '';
    this.selectedRecord = null;
  }

  /** ✅ Submit change request to admin */
  submitRequest() {
    if (!this.requestReason.trim()) {
      alert("Please enter a reason!");
      return;
    }

    const updatedRequest = { 
      ...this.selectedRecord, 
      status: 'Pending', 
      reason: this.requestReason 
    };

    this.localStorageService.saveEmployeeRequest(updatedRequest);
    this.closeRequestForm();
    this.loadEmployeeRequests(); // ✅ Refresh records list
    this.router.navigate(['/user']); // Redirect to dashboard
  }


}
