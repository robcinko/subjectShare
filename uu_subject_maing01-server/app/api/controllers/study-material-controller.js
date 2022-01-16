"use strict";
const StudyMaterialAbl = require("../../abl/study-material-abl.js");

class StudyMaterialController {

  get(ucEnv) {
    return StudyMaterialAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new StudyMaterialController();
