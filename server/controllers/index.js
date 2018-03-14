const fs = require('fs');
const path = require('path');
let fn_index = async(ctx, next) => {
    ctx.response.type = 'json';
    let data = await handelData().then((doc) => {
        console.log(ctx.request.querystring)
        return home(doc, ctx.request.querystring)
    })
    ctx.response.body = data

}

function handelData() {
    return new Promise(function(resolve, reject) {
        fs.readFile(path.resolve(__dirname, '../data/data.json'), { encoding: 'utf-8' }, function(err, doc) {
            resolve(doc)
        })
    })
}

function home(doc, parmas) {
    let obj = []
    let state = []
    let res = JSON.parse(doc);
    let data = res.GameData.LocalizedText.Replace;
    //二级 LOC_PEDIA_+parmas_PAGEGROUP
    let nav2 = `LOC_PEDIA_${parmas}_PAGEGROUP`;
    let nav3 = `LOC_PEDIA_CONCEPTS_PAGE_${parmas}`
    for (let i = 0; i < data.length; i++) {
        let field = data[i]['$']['Tag'];
        let fieldLen = data[i].$.Tag.split("_").length;
        //获取概念二级组
        if (parmas === 'CONCEPTS') {
            if (fieldLen == 6 && field.indexOf(nav2) == 0) {
                obj.push({
                    [data[i].$.Tag.split("_")[4]]: data[i].Text
                })
            }
        } else if (parmas == 'INDEX') {
            //获取概念一级组
            if (fieldLen == 4 && field.startsWith('LOC_PEDIA_') && field.endsWith('_TITLE')) {
                obj.push({
                    [data[i].$.Tag.split("_")[2]]: {
                        name: data[i].Text,
                        PAGEGROUP: []
                    }
                })

            }
        } else {
            if (field.startsWith(nav3) && field.endsWith('CHAPTER_CONTENT_TITLE')) {
                obj.push({
                    [data[i].$.Tag.split("_")[4]]: data[i].Text
                })
            }
        }

    }
    return obj

}
module.exports = {
    'GET /api/home': fn_index
}