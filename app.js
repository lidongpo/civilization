const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const app = new Koa();
const bodyPrser = require('koa-bodyparser');
const controllers = require('./server/controllers')

app.use(bodyPrser())
app.use(controllers())

app.listen(9000)
console.warn('success prot:' + 9000)