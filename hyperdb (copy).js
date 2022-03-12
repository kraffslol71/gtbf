fs = require('fs');
const lineReader = require('line-reader');

async function readFile(path, key) {
  return new Promise((resolve, reject) => {
    fs.readFile("./hyper.db", function (err, data) {
      if (err) throw err;
      if(!data.includes(key)){

        return 0
      }
    else {
      lineReader.eachLine('./hyper.db',(line,last)=>{
        if(line.substring(0, line.lastIndexOf("->"))==key)
        {
          return line
        }
      })
    }
    });
  });      
}

module.exports = {
  set: function (key, value) {
    lineReader.eachLine('./hyper.db',(line,last)=>{
      if(line.substring(0, line.lastIndexOf("->"))==key)
      {
        console.log(line)
        return
      }
    })

    //let initializeUser=`id=${id}|ses=0|chat=0|davet=0|kayit=0`
    
    //fs.appendFile('hyper.db', sayi.toString(), function (err) {if (err) return console.log(err);});
  },
  fetch: async function (key) {
    if (!key)
    {
      console.log("No key specified.");
      return 
    }
    
    return await readFile("./hyper.db", key);
  },
  add: function (key, value) {
  }
};