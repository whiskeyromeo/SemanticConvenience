const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const moment = require('moment')
const store = require('./store');
const app = express();

app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'public/views'));

const partialList = require('./partial-manager');
console.log('partialList: ', partialList);

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
        })
    })
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - -



app.get('/', (req, res) => {
    console.log('getting the index');
    res.render('pages/index.ejs');
    //res.status(200).send({message: 'Successful return from reviews'})
});

app.get('/reviews', (req, res) => {
    console.log('getting the reviews');
    res.render('pages/index');
    //res.status(200).send({message: 'Successful return from reviews'})
});

app.get('/events/upcoming', (req, res) => {
    res.status(200).send({message: 'Successful return'})
});

app.get('/events/archive', (req, res) => {
    res.status(200).send({message: 'Successful return'})
});


const PORT = 7000 || process.env.PORT;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
