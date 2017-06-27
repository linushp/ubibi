var fs = require('fs');
var path = require('path');

var arguments = process.argv.splice(2);

var entryFileName = arguments[0];

var tmp_path = path.join(__dirname,"../tmp/assets_"+entryFileName+".json");

var data = fs.readFileSync(tmp_path, 'utf-8');

var mm = JSON.parse(data);
var name = mm.assetsByChunkName.main;

if(Array.isArray(name)){
    name = name[0];
}



var html = '<script src="/static/assets/js/'+name+'"></script>';

var out_path = "/server/views/"+entryFileName+"/assets.js.html";

var out_path1 =  path.join(__dirname,".."+ out_path);

fs.writeFileSync(out_path1, html);

console.log("build OK :"+ out_path);