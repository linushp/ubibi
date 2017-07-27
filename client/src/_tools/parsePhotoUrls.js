var fs = require('fs');
var path = require('path');



function parseOneTxt(resultObj,filePath,fileName){

    fileName = fileName.replace(/\.txt/,'');

    var fileData = fs.readFileSync(filePath,'utf-8');

    var fileResultObj = [];

    //console.log(fileData)
    var fileDataLineList = fileData.split('\n');

    for (var i = 0; i < fileDataLineList.length; i++) {
        var obj = fileDataLineList[i];
        var keyPoint = 'oss://ubibi-photos/luan';
        var indexOfOss = obj.indexOf(keyPoint);
        if(indexOfOss>0){
            var mm = obj.substring(indexOfOss + keyPoint.length + fileName.length + 2 ,obj.length);
            if(/png$/i.test(mm) || /mp4$/i.test(mm) || /jpg$/i.test(mm)) {
                fileResultObj.push(mm);
            }
        }
    }

    resultObj[fileName] = fileResultObj;

}

function main(targetDir,outPutDir){
    var resultObj = {};
    var dirPath = path.resolve(__dirname,targetDir);
    var files = fs.readdirSync(dirPath);
    files.forEach(function(file){
        var filePath = path.resolve(dirPath,file);
        console.log(filePath);
        parseOneTxt(resultObj,filePath,file);
    });

    var outPutDirPath = path.resolve(__dirname,outPutDir);
    fs.writeFileSync(outPutDirPath,JSON.stringify(resultObj));
}


//./ossutilmac64 ls oss://ubibi-photos/luan/20170614002/  > 20170614002.txt
main('../kaihe/data','../kaihe/images.json');