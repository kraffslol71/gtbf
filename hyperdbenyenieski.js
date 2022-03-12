const fs = require("fs")
const fsget = require("fs").promises
const path = require('path')

const validName = /^(\w+\.?)*\w+$/ // not completed

class Collection{
  constructor(name){
    this.url = path.join(__dirname, "hyperdb", name)
  }
  
  set(key, value){
    return new Promise((resolve, reject) => {
      fs.readFile(this.url, "utf8", (err, data) => {
        data = JSON.parse(data)
                
        data[key] = value
        
        let stringData = JSON.stringify(data)
        fs.writeFile(this.url, stringData, (err) => {
          if(err){
            reject({ message: err })
          }else{
            resolve(data[key])
          }
        })
      })
    })
  }
  
  async get(key){
    //return new Promise((resolve, reject) => {
      //fs.readFile(this.url, "utf8", (err, data) => {
        let data = await fsget.readFile(this.url, "binary");
        data = JSON.parse(data)

        let result = data[key]

        if(!result){
          return
          //reject({ result: "could not find key" })
        }

        return result
        //resolve(result)
      //})
    //})
  }

  getAll(){
    return new Promise((resolve, reject) => {
      fs.readFile(this.url, "utf8", (err, data) => {
        data = JSON.parse(data)

        let result = []

        Object.keys(data).forEach((key) => {
          result.push({ [key]: data[key] })
        })

        resolve(result)
      })
    })
  }

  delete(key){
    return new Promise((resolve, reject) => {
      fs.readFile(this.url, "utf8", (err, data) => {
        data = JSON.parse(data)

        if(!data[key]){
          reject({ result: "could not find key" })
        }
        delete data[key]
        data = JSON.stringify(data)
        fs.writeFile(this.url, data, (err) => {
          if(err){
            reject({ err: err })
          }
          resolve({ result: "deleted" })
        })
      })
    })
  }

  deleteAll(){
    return new Promise((resolve, reject) => {
      fs.writeFile(this.url, "{}", (err) => {
        resolve({ result: "all entries deleted" })
      })
    })
  }
}

exports.open = (name) => {
  createFolder()
  return getCollection(name)
  
}


function createFolder(){
  if(!fs.existsSync(path.join(__dirname, "hyperdb"))){
    fs.mkdirSync(path.join(__dirname, "hyperdb"))
  }
}

function getCollection(name){
  if(!fs.existsSync(path.join(__dirname, "hyperdb", name))){
    
    fs.writeFileSync(path.join(__dirname, "hyperdb", name), "{}")
  }
  return new Collection(name)
}