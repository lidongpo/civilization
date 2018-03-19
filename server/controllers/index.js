const fs = require('fs');
const path = require('path');
let fn_index = async(ctx, next) => {
    ctx.response.type = 'json';
    let cv = new GetData(ctx.request.querystring);
    let data = await cv.readFiles().then(function(res) {
        return cv.handelData()
    });
    ctx.response.body = data

}

class GetData {
    constructor(arg) {
        this.parmas = arg;
        this.doc = null;
        this.dataName = '';
        this.len = 0;
        this.result = [];
    }

    readFiles() {
        let _that = this;
        return new Promise(function(resolve, reject) {
            fs.readFile(path.resolve(__dirname, '../data/data.json'), { encoding: 'utf-8' }, function(err, doc) {
                _that.doc = doc;
                resolve(doc)
            })
        })
    }
    handelData() {
        let res = JSON.parse(this.doc);
        let data = res.GameData.LocalizedText.Replace;
        for (let i = 0; i < data.length; i++) {
            this.dataName = data[i].$.Tag;
            this.len = data[i]['$']['Tag'].split("_").length;
            //start
            if (this.parmas == 'start' && this.dataName.includes('LOC_PEDIA_CONCEPTS_PAGE_INTRO_CHAPTER_INTRO_PARA_1')) {
                this.result.push({
                    type: 'start',
                    text: data[i].Text
                })
            }

            //导航
            if (this.parmas == 'index' && this.len == 4 && this.dataName.indexOf('LOC_PEDIA_') == 0 && this.dataName.indexOf('_TITLE')) {
                let name = '';
                switch (this.dataName.split('_')[2]) {
                    case 'GREATPEOPLE':
                        name = 'GREAT_PERSON'
                        break;
                    default:
                        name = this.dataName.split('_')[2];
                }
                this.result.push({
                    type: name,
                    text: data[i].Text,
                })
            }
            // sub_概念
            if (this.dataName.startsWith(`LOC_PEDIA_${this.parmas}_PAGEGROUP`) && this.dataName.endsWith('_NAME')) {
                this.result.push({
                    type: this.dataName.split('_')[4],
                    text: data[i].Text
                })
            }

            //sub_概念 金币
            if (this.dataName.startsWith(`"LOC_PEDIA_CONCEPTS_PAGE_${this.parmas}"`) && this.dataName.endsWith(`CHAPTER_CONTENT_TITLE`)) {
                this.result.push({
                    type: this.dataName.split('_')[4],
                    text: data[i].Text
                })
            }
            // sub_伟人
            if (this.dataName.startsWith(`LOC_${this.parmas}_CLASS`)) {
                this.result.push({
                    type: this.dataName.split('_')[4],
                    text: data[i].Text
                })
            }



        }
        return this.result;
    }
}

module.exports = {
    'GET /api/home': fn_index
}