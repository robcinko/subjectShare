"use strict";
const StudentAbl = require("../../abl/student-abl.js");

class StudentController {

  create(ucEnv) {
    return StudentAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(),ucEnv.getSession());
  }

}

module.exports = new StudentController();
