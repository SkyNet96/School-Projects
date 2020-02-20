var employees = [];
var departments = [];
const fs = require("fs");

module.exports.initialize = function () {
    return new Promise(function (resolve, reject) {
        fs.readFile("./data/employees.json", function (err, data) {
            if (err)
                reject(err);
            else {
                employees = JSON.parse(data);
                resolve();
            }
        })
    }).then(function () {
        return new Promise(function (resolve, reject) {
            fs.readFile("./data/departments.json", function (err, data) {
                if (err)
                    reject(err);
                else {
                    departments = JSON.parse(data);
                    resolve();
                }
            })
        })
    }).then(function () {
        return new Promise(function (resolve, reject) {
            resolve();
        })
    })
}

module.exports.getAllEmployees = function() {
    return new Promise(function(resolve, reject) {
        if (employees.length > 0)
            resolve(employees);
        else
            reject("no results returned");
    })
}

module.exports.getAllManagers = function() {
    return new Promise(function(resolve, reject) {
        if (employees.length > 0 && employees.isManager === true) {
            resolve(employees);
        }
        else {
            reject("no results returned");
        }
    })
}

module.exports.getDepartments = function() {
    return new Promise(function(resolve, reject) {
        if (departments.length > 0)
            resolve(departments);
        else 
            reject("no results returned");
    })
}

module.exports.addEmployee = function (employeeData) {
    return new Promise(function (resolve, reject) {
        if (employeeData.isManager == null) {
            employeeData.isManager == false;
            employeeData.employeeNum = employees.length + 1;
            employees.push(employeeData);
            resolve(employees);
        }
        else {
            employeeData.isManager = true;
            employeeData.employeeNum = employees.length + 1;
            employees.push(employeeData);
            resolve(employees);
        }
    });
}

module.exports.getEmployeesByStatus = function (status) {
    return new Promise(function (resolve, reject) {
        var statusEmployees = [];
        for (var i = 0; i < employees.length; i++) {
            if (employees[i].status == status)
                statusEmployees.push(employees[i]);
        }
        if (employeeStatus.length > 0)
            resolve(employeeStatus);
        else
            reject("no results returned");
    });
}

module.exports.getEmployeesByDepartment = function(department){
    return new Promise(function(resolve, reject){
        var departmentList = [];
        for(var i = 0; i < employees.length; i++){
            if(employees[i].department == department)
                departmentList.push(employees[i]);
        }
        if(departmentList.length > 0)
            resolve(departmentList); 
        else
            reject("Nothing found");    
    });
}

module.exports.getEmployeesByManager = function(manager) {
    return new Promise(function(resolve, reject) {
        var employeeManager = employees.filter(function(employee) {
            employee.employeeManagerNum == manager;
            if (employeeManager.length > 0)
                resolve(employeeManager);
            else   
                reject("no results returned");
        })
    })
};

module.exports.getEmployeesByNum = function (num) {
    return new Promise(function (resolve, reject) {
        var empNumlist = [];
        for (var i = 0; i < employees.length; i++) {
            if (employees[i].employeeNum == num)
                empNumlist.push(employees[i]);
        }
        if (empNumlist.length > 0)
            resolve(empNumlist);
        else
            reject("no results returned");
    })
};

module.exports.updateEmployee = function (employeeData) {
    return new Promise(function (resolve, reject) {
        for (var i = 0; i < employees.length; i++) {
            if (employees[i].employeeNum == employeeData.employeeNum) {
                employees[i] = employeeData;
                resolve();
            }
        }
    })
}
