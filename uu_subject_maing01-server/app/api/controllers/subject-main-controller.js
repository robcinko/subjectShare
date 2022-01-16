"use strict";
const SubjectMainAbl = require("../../abl/subject-main-abl.js");

class SubjectMainController {

  sayHello(ucEnv) {
    return SubjectMainAbl.sayHello(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  init(ucEnv) {
    return SubjectMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
}

module.exports = new SubjectMainController();
