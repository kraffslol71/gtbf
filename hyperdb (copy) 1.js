//fs = require('fs');
//const fs = require('fs');
const fs = require('graceful-fs');
const {readFile , writeFile , appendFile} = require('fs/promises');
const readline = require('readline');



module.exports = {
  set: async function (key, newvalue) {
    if (typeof key == 'undefined' || typeof key == 'null')
    {
      console.log("No key specified.");
      return 
    }

    if (typeof newvalue == 'undefined' || typeof newvalue == 'null')
    {
      console.log("No new value specified.");
      return 
    }

    if(typeof newvalue == 'object')
      newvalue = JSON.stringify(newvalue)

    const data = await readFile('./hyper.db','binary')
    
    if(!data.includes(key))
    {
      appendFile('./hyper.db', key+"->"+newvalue.toString()+"\n", function (err) {if (err) return console.log(err);});
      return
    }

    let finder = async function (key) {
  const fileStream = fs.createReadStream('./hyper.db');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  for await (const line of rl) {
    if(line.substring(0, line.lastIndexOf("->"))==key)
      return line.substring(line.lastIndexOf("->")+2, line.length)
  }
}
    let value = await finder(key) || 0;
    
  await fs.readFile('./hyper.db', 'utf8', async function(err, data) {
  let searchString = key+"->"+value.toString();
  //let re = new RegExp('^.*' + searchString + '.*$', 'gm');
  let formatted = data.replace(searchString, key+"->"+newvalue.toString());

  await writeFile('./hyper.db', formatted, 'utf8', function(err) {
    if (err) return console.log(err);
  });
});
    
  },
  fetch: async function (key) {
    if (typeof key == 'undefined' || typeof key == 'null')
    {
      console.log("No key specified.");
      return 
    }
    const data = await readFile('./hyper.db','binary')
    
    if(!data.includes(key))
      return null

    let finder = async function (key) {
  const fileStream = fs.createReadStream('./hyper.db');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  for await (const line of rl) {
    if(line.substring(0, line.lastIndexOf("->"))==key)
      return line.substring(line.lastIndexOf("->")+2, line.length)
  }
}
    let value = await finder(key)
    if (!value) return null;

    value = JSON.parse(value)
    return value;
  },
  add: async function (key, addition) {
    if (typeof key == 'undefined' || typeof key == 'null')
    {
      console.log("No key specified.");
      return 
    }

    if (typeof addition == 'undefined' || typeof addition == 'null')
    {
      console.log("No addition specified.");
      return 
    }
    
    const data = await readFile('./hyper.db','binary')
    
    if(!data.includes(key))
    {
      appendFile('./hyper.db', key+"->"+addition.toString()+"\n", function (err) {if (err) return console.log(err);});
      return
    }

    let finder = async function (key) {
  const fileStream = fs.createReadStream('./hyper.db');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  for await (const line of rl) {
    if(line.substring(0, line.lastIndexOf("->"))==key)
      return line.substring(line.lastIndexOf("->")+2, line.length)
  }
}
    let value = await finder(key) || 0;
    let newvalue=parseInt(value)+addition;
    
  await fs.readFile('./hyper.db', 'utf8', async function(err, data) {
  let searchString = key+"->"+value.toString();
  //let re = new RegExp('^.*' + searchString + '.*$', 'gm');
  let formatted = data.replace(searchString, key+"->"+newvalue.toString());

  await writeFile('./hyper.db', formatted, 'utf8', function(err) {
    if (err) return console.log(err);
  });
});
  }
};