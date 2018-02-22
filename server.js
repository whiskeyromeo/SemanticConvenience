const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const moment = require('moment')
const store = require('./store');
const config = require('./.config');
const app = express();

const fileManager = require('./fileManager');
const partialManager = require('./partialManager');

const partialRoutes = require('./routes/partialRoutes');
const eventRoutes = require('./routes/eventRoutes');
const systemRoutes = require('./routes/systemRoutes');

app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.set('views', path.join(__dirname, 'public/views'));

console.log('platform : ', process.platform);

const watcher = require('./watcher');
watcher();

app.use('/partials', partialRoutes);
app.use('/events', eventRoutes);
app.use('/system', systemRoutes);

app.get('/', async (req, res) => {
    // using await partialList for Promise-based method of rendering the paths
    const partials = await partialManager.walkSyncObject;
    res.render('pages/index.ejs', { data: JSON.stringify({partials, message: 'Successful return from index' })});
});

app.get('/reviews', (req, res) => {
    res.render('pages/review.ejs', { message: 'Successful return from reviews' });
});

app.get('*', (req, res) => {
    res.status(404).send('WAT?');
});

const PORT = 7000 || process.env.PORT;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
