/*********************************************************************************
* WEB322 – Assignment 03
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
*
* Online (Heroku) Link: https://boiling-island-25068.herokuapp.com/
*
********************************************************************************/ 

var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
var path = require("path");
var dataService = require("./data-service.js");
var multer = require("multer");
const fs = require("fs");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");

//listening on port message
function onHttpStart() {
  console.log("Express http server listening on port " + HTTP_PORT);
}

app.engine('.hbs', exphbs({
  extname: 'hbs',
  defaultLayout: 'main',
  helpers: {
    navLink: function (url, options) {
      return '<li' +
        ((url == app.locals.activeRoute) ? ' class="active" ' : '') +
        '><a href="' + url + '">' + options.fn(this) + '</a></li>';
    },
    equal: function (lvalue, rvalue, options) {
      if (arguments.length < 3)
        throw new Error("Handlebars Helper equal needs 2 parameters");
      if (lvalue != rvalue) {
        return options.inverse(this);
      } else {
        return options.fn(this);
      }
    }
  }
}));

app.set('view engine', '.hbs')

//storage
const storage = multer.diskStorage({
  destination: "./public/images/uploaded",
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req,res,next){
  let route = req.baseUrl + req.path;
  app.locals.activeRoute = (route == "/") ? "/" : route.replace(/\/$/, "");
  next();
});

//css
app.use(express.static("public"));

//home
app.get("/", function(request, response) {
  response.render("home");
});

//about
app.get("/about", function(request, response) {
  response.render("about");
});

//_______________________________EMPLOYEES______________________________
//employees
app.get("/employees", function (request, response) {
  if (request.query.status) {
    dataService.getEmployeesByStatus(request.query.status)
      .then(function (data) {
        response.render("employees", { employees: data });
      }).catch(function (error) {
        response.render({ message: "no results" });
      })
  }
  else if (request.query.department) {
    dataService.getEmployeesByDepartment(request.query.department)
      .then(function (data) {
        response.render("employees", { employees: data });
      }).catch(function (error) {
        response.render({ message: "no results" });
      })
  }
  else if (request.query.manager) {
    dataService.getEmployeesByManager(request.query.manager)
      .then(function (data) {
        response.render("employees", { employees: data });
      }).catch(function (error) {
        response.render({ message: "no results" });
      })
  }
  else {
    dataService.getAllEmployees()
    .then(function (data) {
      response.render("employees", { employees: data });
    }).catch(function (error) {
      response.render({ message: "no results" });
    })
  }
});

//employee/:employeeNum
app.get("/employee/:employeeNum", function (req, res) {
  dataService.getEmployeesByNum(req.params.employeeNum)
    .then(function (data) {
      res.render("employee", { employee: data });
    })
    .catch(function (err) {
      res.render("employee", { message: "no results" });
    });
});

//employees/add GET
app.get("/employees/add", function(request, response) {
  response.render("addEmployee");
});

//employees/add POST
app.post("/employees/add", function (request, response) {
  dataService.addEmployee(request.body).then(function () {
    response.redirect("/employees")
  })
    .catch(function (err) {
      res.send(err);
    });
});

//employee/update POST
app.post("/employee/update", function (req, res) {
  dataService.updateEmployee(req.body)
    .then(function () {
      res.redirect("/employees")
    })
    .catch(function (err) {
      res.render("employee", { message: "no results" });
    })
});

//_______________________________MANAGERS________________________________
//managers
app.get("/managers", function(request, response) {
  dataService.getManagers().then(function(data) {
    response.render("manager", {manager: data});
  });
});

//______________________________DEPARTMENTS_______________________________
//departments
app.get("/departments", function (request, response) {
  dataService.getDepartments().then(function (data) {
    response.render("departments", { departments: data });
  });
});

//________________________________IMAGES__________________________________
//images/add GET
app.get("/images/add", function(request, response) {
  response.render("addImage");
});

//images/add POST
app.post("images/add", upload.single("imageFile"), function(request, response) {
  response.redirect("/images");
});

//images GET
app.get("/images", function (request, response) {
  var path_new = path.join(__dirname, "/public/images/uploaded");
  fs.readdir("./public/images/uploaded", function (error, items) {
  response.render("images", {images: files});
  });
});

//________________________________404 PAGE_________________________________
//error 404 page
app.use(function(request, response) {
  response.status(404);
  response.sendFile(__dirname, "/views/404error.html");
});

dataService
  .initialize()
  .then(app.listen(HTTP_PORT, onHttpStart))
  .catch(function() {
    console.log("There was an error reading the file");
  });
