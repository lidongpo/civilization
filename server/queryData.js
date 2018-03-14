/**
 * Created by harry on 2018/3/11.
 */
/**
 * Created by harry on 2018/3/10.
 */
let fs = require('fs');
let path = require('path');

/*
 * 概述 LOC_DIPLOMACY_INTEL_OVERVIEW_COLON_TOOLTIP
 *     概述内容组  LOC_PEDIA_CONCEPTS_PAGEGROUP +名称
 *       内容标题  LOC_PEDIA_CONCEPTS_PAGE_ +名称
 *
 *
 * 文明/领袖 LOC_MULTIPLAYER_CIV_LEADER_HEADER
 *
 * 城邦
 * 区域
 * 建筑
 * 奇观项目
 * 单位
 * 单位强化
 * 伟人
 * 科技
 * 市政
 * 政体和政策
 * 宗教
 * 地形和地貌
 * 资源
 * 改良设置和路线
 * 总督
 * 历史时刻
 *
 *  */
let obj = []
let flag = false
let state = []
let num = 0;
fs.readFile(path.resolve(__dirname, 'data/data.json'), { encoding: 'utf-8' }, function(err, doc) {
    let res = JSON.parse(doc);
    console.log(res)
    let data = res.GameData.LocalizedText.Replace;
    for (let i = 0; i < data.length; i++) {
        let field = data[i].$.Tag;
        let fieldLen = data[i].$.Tag.split("_").length;
        if (fieldLen == 4 && field.indexOf('LOC_PEDIA_') == 0) {
            obj.push({
                [data[i].$.Tag.split("_")[2]]: {
                    name: data[i].Text,
                    PAGEGROUP: Array.from(state)
                }
            })
            flag = true
        }

        if (fieldLen == 6 && field.indexOf('LOC_PEDIA_CONCEPTS_PAGEGROUP') == 0) {
            state.push({
                [data[i].$.Tag.split("_")[4]]: data[i].Text })
        }


        if (field.indexOf('LOC_PEDIA_CONCEPTS_PAGE_WORLD_') == 0 && field.indexOf('_CHAPTER_CONTENT_TITLE') != -1) {
            num++
            state.push({
                    ['WORLDCONTENTTITLE' + num]: data[i].Text
                })
                // console.log(data[i])
        }

    }
    console.log(obj[0].CONCEPTS.PAGEGROUP)
})