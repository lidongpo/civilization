/**
 * Created by harry on 2018/3/10.
 */
const xml2js=require('xml2js');
const fs =require('fs');
const path=require('path');
//xml2js默认会把子子节点的值变为一个数组, explicitArray设置为false
var xmlParser = new xml2js.Parser({explicitArray : false, ignoreAttrs : false})
var jsonBuilder = new xml2js.Builder();

fs.readFile(path.resolve(__dirname,'Vanilla_zh_Hans_CN.xml'),{encoding: 'utf-8'},function (err,doc) {
    if(err) return console.error( '读取文件失败');
    xmlParser.parseString(doc,function (err,result) {
        fs.writeFile('data.json',JSON.stringify(result),function (err,doc) {
            if (err) throw Error()
            console.log('写入成功');
        })
    })
})