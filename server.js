const cluster = require('cluster');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const moment = require('moment')
const store = require('./store');
const app = express();

const fileManager = require('./fileManager');

app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'public/views'));

const partialList = require('./partial-manager').walkSyncObject;
// console.log('partialList: ', partialList);

const partialListObject = require('./partial-manager').walkSyncObject;

// ---- Hot-Reloading Script as nodemon is Broken --------
if (process.env.NODE_ENV !== 'production') {
    const chokidar = require('chokidar');
    const watcher = chokidar.watch('.');

    watcher.on('ready', function () {
        watcher.on('all', function () {
            console.log('Clearing cache', moment().format('hh:mm:ss a'));
            Object.keys(require.cache).forEach(function (id) {
                if (/[\/\\]app[\/\\]/.test(id)) delete require.cache[id]
            })
        });
    });

}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - -


app.get('/partials/*?', function(req, res) {
    res.render(`partials/${req.params[0]}`, {layout: false});
});

app.get('/', async (req, res) => {
    const partials = await partialList;
    res.render('pages/index.ejs', { data: JSON.stringify({partials, message: 'Successful return from index' })});
});

app.post('/createFile', (req, res) => {
    console.log('createFile Hit: ', req.body);
    res.send(req.body);
    fileManager.appendFile(req.body);
});

app.post('/createDirectory', (req, res) => {
    console.log('createDirectory Hit: ', req.body);
    res.send(req.body);
    fileManager.createDirectory(req.body);
});



app.get('/reviews', (req, res) => {
    res.render('pages/review.ejs', { message: 'Successful return from reviews' });
});

app.get('/events/upcoming', (req, res) => {
    res.status(200).send({message: 'Successful return'})
});

app.get('/events/archive', (req, res) => {
    res.status(200).send({message: 'Successful return'})
});

app.get('*', (req, res) => {
    res.status(404).send('WAT?');
});


const PORT = 7000 || process.env.PORT;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
