"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class StudentMongo extends UuObjectDao {

  async createSchema(){
  }
  async create(student) {
    
    return await super.insertOne(student);
  }
}

module.exports = StudentMongo;
