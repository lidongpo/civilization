const fs = require('fs');

function addMapping(router, mapping) {
    for (let url in mapping) {
        //判断请求方法
        if (url.startsWith('GET ')) {
            let path = url.substring(4)
            console.log(path)
            router.get(path, mapping[url])
            console.log(`request method : ${path}`)

        } else if (url.startsWith('POST ')) {
            let path = url.substring(5);
            router.post(path, mapping[url])
            console.log(`request method : ${path}`)
        } else {
            console.log(`invalid URL: ${url}`);

        }
    }
}

function addControllers(router, dir) {
    let files = fs.readdirSync(__dirname + `/${dir}`);
    let files_filter = files.filter(f => {
        return f.endsWith('.js')
    })
    for (let f of files) {
        console.log(`file ${f}...`)
        let mapping = require(__dirname + '/controllers/' + f)
        addMapping(router, mapping)
    }

}
module.exports = function(dir) {
    let controllers_dir = dir || 'controllers',
        router = require('koa-router')();
    addControllers(router, controllers_dir)
    return router.routes();
}