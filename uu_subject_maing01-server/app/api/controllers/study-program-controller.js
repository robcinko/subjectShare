"use strict";
const StudyProgramAbl = require("../../abl/study-program-abl.js");

class StudyProgramController {

  get(ucEnv) {
    return StudyProgramAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  delete(ucEnv) {
    return StudyProgramAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession(), ucEnv.getAuthorizationResult());
  }

  list(ucEnv) {
    return StudyProgramAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  load(ucEnv) {
    return StudyProgramAbl.load(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return StudyProgramAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

}

module.exports = new StudyProgramController();
