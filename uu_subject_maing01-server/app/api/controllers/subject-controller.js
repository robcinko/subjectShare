"use strict";
const SubjectAbl = require("../../abl/subject-abl.js");

class SubjectController {

  feDataRemove(ucEnv) {
    return SubjectAbl.feDataRemove(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  studyMaterialToSubject(ucEnv) {
    return SubjectAbl.studyMaterialToSubject(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  studyMaterialGet(ucEnv) {
    return SubjectAbl.studyMaterialGet(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  studyMaterialAdd(ucEnv) {
    return SubjectAbl.studyMaterialAdd(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  load(ucEnv) {
    return SubjectAbl.load(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getAuthorizationResult());
  }

  get(ucEnv) {
    return SubjectAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession(), ucEnv.getAuthorizationResult());
  }

  list(ucEnv) {
    return SubjectAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  delete(ucEnv) {
    return SubjectAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession(), ucEnv.getAuthorizationResult());
  }
  
  create(ucEnv) {
    return SubjectAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getSession(), ucEnv.getAuthorizationResult());
  }

  update(ucEnv) {
    return SubjectAbl.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn(), ucEnv.getAuthorizationResult());
  }


}

module.exports = new SubjectController();
