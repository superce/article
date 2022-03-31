const express = require("express")
const app = express()
const request = require('request')
const fs = require('fs')
function getVideo(){
  const url = 'https://v26-web.douyinvod.com/5fb4abf191292fe270a9422931c876af/62452e94/video/tos/cn/tos-cn-ve-15c001-alinc2/a917aee91e4f4974a867adac2f770a31/?a=6383&br=1713&bt=1713&cd=0%7C0%7C0%7C0&ch=5&cr=0&cs=0&cv=1&dr=0&ds=4&er=&ft=5q_lc5mmnPK~2Tt7bhWwkXAGfdH.C9MlsbZc&l=2022033111310801020914617026392261&lr=all&mime_type=video_mp4&net=0&pl=0&qs=0&rc=amhpNmg6Zm1kPDMzNGkzM0ApaDlpPDc5Z2U3NzY5NWU0N2cwMTUycjQwZC5gLS1kLS9zc15iLjYvNi4xLS8uYjEwMGI6Yw%3D%3D&vl=&vr='
  request(url)
    .pipe(fs.createWriteStream(`${__dirname}/video/ss.mp4`).on('close', function (res) {
      console.log('pic saved!----------', res, )
      return res
  }))
}
app.get('/', (req, res) => {
  console.log(__dirname);
  const v = getVideo()
  res.send(v)
})
const server = app.listen(1000, () => {
  const host = server.address().address
  const port = server.address().port
  console.log('example app listenting at http://%s:%s', host, port);
})