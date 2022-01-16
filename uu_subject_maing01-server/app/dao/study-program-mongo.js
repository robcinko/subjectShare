"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;
const { ObjectId } = require("mongodb")

class StudyProgramMongo extends UuObjectDao {

  async createSchema(){
    
  }
  async create(studyProgram) {
    
    return await super.insertOne(studyProgram);
  }

  async listByIdList(awid, idList) {
    return await super.find({awid, id:{$in: idList.map((id)=>new ObjectId(id)) }} );
  }
  
  async list(awid, pageInfo) {
    const filter = { awid };
    return await super.find(filter, pageInfo);
  }
  
  async delete(awid, id) {
    
    return await super.deleteOne({awid, id});
  }
 

  async get(awid, id) {
    return await super.findOne({ id, awid });
  }

}

module.exports = StudyProgramMongo;
