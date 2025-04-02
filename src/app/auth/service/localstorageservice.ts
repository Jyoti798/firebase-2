import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private EMPLOYEE_REQUESTS_KEY = 'employeeRequests';
  private ADMIN_REQUESTS_KEY = 'adminRequests';

  constructor() {}

  /** ✅ Utility: Fetch and parse data safely */
  private getParsedData(key: string): any[] {
    try {
      const data = JSON.parse(localStorage.getItem(key) || '[]');
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error(`Error parsing ${key}:`, error);
      return [];
    }
  }

  /** ✅ Utility: Save data to local storage */
  private saveData(key: string, data: any[]): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  /** ✅ Save or update an employee’s attendance request */
  saveEmployeeRequest(request: any) {
    let employeeRequests = this.getParsedData(this.EMPLOYEE_REQUESTS_KEY);

    // ✅ Find existing request by name & date
    const existingIndex = employeeRequests.findIndex(
      req => req.date === request.date && req.name === request.name
    );

    if (existingIndex !== -1) {
      // ✅ Update existing request
      employeeRequests[existingIndex] = request;
    } else {
      // ✅ Add new request
      employeeRequests.push(request);
    }

    this.saveData(this.EMPLOYEE_REQUESTS_KEY, employeeRequests);
    this.saveAdminRequest(request); // ✅ Sync with admin records
  }

  /** ✅ Save or update request in admin records */
  saveAdminRequest(request: any) {
    let adminRequests = this.getParsedData(this.ADMIN_REQUESTS_KEY);

    const existingIndex = adminRequests.findIndex(
      req => req.date === request.date && req.name === request.name
    );

    if (existingIndex !== -1) {
      adminRequests[existingIndex] = request; // ✅ Update existing admin request
    } else {
      adminRequests.push(request); // ✅ Add new admin request
    }

    this.saveData(this.ADMIN_REQUESTS_KEY, adminRequests);
  }

  /** ✅ Fetch all requests for a specific employee */
  getEmployeeRequests(employeeName: string): any[] {
    return this.getParsedData(this.EMPLOYEE_REQUESTS_KEY).filter(req => req.name === employeeName);
  }

  /** ✅ Fetch all admin requests */
  getAllRequests(): any[] {
    // ✅ Fetch all admin requests that are "Pending"
    return this.getParsedData(this.ADMIN_REQUESTS_KEY).filter(req => req.status === 'Pending');
  }

  /** ✅ Update request status (Admin approval/rejection) */
  updateRequestStatus(employeeName: string, date: string, status: string) {
    let adminRequests = this.getParsedData(this.ADMIN_REQUESTS_KEY);
    let employeeRequests = this.getParsedData(this.EMPLOYEE_REQUESTS_KEY);

    let updated = false;

    // ✅ Update request in admin records
    adminRequests.forEach(req => {
      if (req.name === employeeName && req.date === date) {
        req.status = status;
        updated = true;
      }
    });

    // ✅ Update request in employee records
    employeeRequests.forEach(req => {
      if (req.name === employeeName && req.date === date) {
        req.status = status;
        updated = true;
      }
    });

    if (updated) {
      this.saveData(this.ADMIN_REQUESTS_KEY, adminRequests);
      this.saveData(this.EMPLOYEE_REQUESTS_KEY, employeeRequests);
    } else {
      console.warn(`No matching request found for ${employeeName} on ${date}`);
    }
  }
}
