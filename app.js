const express = require('express')
const browserSync = require('browser-sync')
const connectBrowserSync = require('connect-browser-sync')
const fsevents = require('fsevents')
const http = require('http')
const path = require('path')

const watchDir = process.env.WATCH_DIR
if (typeof watchDir !== 'string' || watchDir.length < 1) {
  console.log ('`WATCH_DIR` environment variable not specified!\nExiting.')
  process.exit(0)
}

const app = express()
const bs = browserSync.create().init({
  logSnippet: false,
  notify: false
})
let imageFileName = path.join(__dirname, 'default.png')

app.set('views', __dirname)
app.set('view engine', 'hbs')
app.use(connectBrowserSync(bs))
app.get('/', (req, res) => res.render('index'))
app.get('/image', (req, res) => res.sendFile(imageFileName))

const port = 3000
http.createServer(app).listen(port, function () {
  console.log('Listening on port ' + port + '...')
})

const watcher = fsevents(watchDir)
watcher.on('change', (path, info) => {
  if (info && info.event === 'moved-in') {
    imageFileName = path
    setTimeout(() => bs.publicInstance.reload('/image'), 1000)
  }
})
watcher.start()
console.log(`Watching for changes in ${watchDir}`)

const shutDown = (msg, code) => {
  return () => {
    watcher.stop()
    console.log(`\n${msg}\nExiting app (${code})\n`)
    process.exit(code)
  }
}
process.on('SIGTERM', shutDown('Terminated (SIGTERM)', 2));
process.on('SIGINT', shutDown('Interrupted (SIGINT)', 15));
