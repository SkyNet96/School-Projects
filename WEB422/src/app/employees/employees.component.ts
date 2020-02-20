import { Component, OnInit } from '@angular/core';
import { Employee } from '../data/employee';
import { EmployeeService } from '../data/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[];
  filteredEmployees: Employee[];
  getEmployeesSub;
  loadingError: boolean = false;

  constructor(private empService: EmployeeService, private router:Router) { }

  ngOnInit() {
    this.getEmployeesSub = this.empService
    .getEmployees().subscribe(data => {
      this.employees = data;
      this.filteredEmployees = data;
    },
    function(e){this.loadingError = true;
    });
  }

  routeEmployee(id:string){
    this.router.navigate(['/employee', id]);
  }

  onEmployeeSearchKeyUp(event: any) {
    let substring: string = event.target.value.toLowerCase();
    this.filteredEmployees = this.employees.filter((emps) => 
    ((emps.FirstName.toLowerCase().indexOf(substring) != -1) || 
    (emps.LastName.toLowerCase().indexOf(substring) != -1) ||
    (emps.Position["PositionName"].toLowerCase().indexOf(substring) != -1)))

  }

  ngOnDestroy() {
    if (this.getEmployeesSub != 'undefined') {
      this.getEmployeesSub.unsubscribe();
    }
  }
}