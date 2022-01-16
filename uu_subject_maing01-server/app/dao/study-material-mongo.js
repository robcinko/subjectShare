"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class StudyMaterialMongo extends UuObjectDao {

  async createSchema(){
  }
  
  async get(awid, id) {
    return await super.findOne({ id, awid });
  }
}

module.exports = StudyMaterialMongo;
