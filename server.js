const http = require("http")
const fs = require("fs")
const path = require("path")

const mineTypeMap = {
  html: 'text/html;charset=utf-8',
  htm: 'text/html;charset=utf-8',
  xml: "text/xml;charset=utf-8",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  css: "text/css;charset=utf-8",
  txt: "text/plain;charset=utf-8",
  mp3: "audio/mpeg",
  mp4: "video/mp4",
  ico: "image/x-icon",
  tif: "image/tiff",
  svg: "image/svg+xml",
  zip: "application/zip",
  ttf: "font/ttf",
  woff: "font/woff",
  woff2: "font/woff2",
}

const baseConfig = JSON.parse(fs.readFileSync(path.resolve(__dirname, "./config.json")))

// const server = http.createServer((req, res) => {
//   const BaseUrl = "/code";
//   const filePath = path.resolve(__dirname, BaseUrl, req.url)
//   fs.stat(filePath, (err, stats) => {
//     if (stats.isDirectory) {

//     }
//   })
//   // const fileName=path.resolve(__dirname,"."+req.url);
//   //   const extName=path.extname(fileName).substr(1);

//   //   if (fs.existsSync(fileName)) { //判断本地文件是否存在
//   //       var mineTypeMap={
//   //           html:'text/html;charset=utf-8',
//   //           htm:'text/html;charset=utf-8',
//   //           xml:"text/xml;charset=utf-8",
//   //           png:"image/png",
//   //           jpg:"image/jpeg",
//   //           jpeg:"image/jpeg",
//   //           gif:"image/gif",
//   //           css:"text/css;charset=utf-8",
//   //           txt:"text/plain;charset=utf-8",
//   //           mp3:"audio/mpeg",
//   //           mp4:"video/mp4",
//   //           ico:"image/x-icon",
//   //           tif:"image/tiff",
//   //           svg:"image/svg+xml",
//   //           zip:"application/zip",
//   //           ttf:"font/ttf",
//   //           woff:"font/woff",
//   //           woff2:"font/woff2",

//   //       }
//   //       if (mineTypeMap[extName]) {
//   //           res.setHeader('Content-Type', mineTypeMap[extName]);
//   //       }
//   //       var stream=fs.createReadStream(fileName);
//   //       stream.pipe(res);
//   //     }

// }).listen(3001)