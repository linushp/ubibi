


//toIntegerConversion('1000',10,36) ; //rs
function toIntegerConversion(sourceString,sourceScale,targetScale){
    var sourceNumber = parseInt(sourceString,sourceScale);
    return sourceNumber.toString(targetScale);
}