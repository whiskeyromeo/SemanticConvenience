const moment = require('moment');

function watch() {
    if (process.env.NODE_ENV === 'production') {
        return;
    }

    const chokidar = require('chokidar');
    const watcher = chokidar.watch('.');

    watcher.on('ready', function () {
        watcher.on('all', function (event, path) {
            console.log('Clearing cache', moment().format('hh:mm:ss a'));
            Object.keys(require.cache).forEach(function (id) {
                //console.log('watcher cache id: ', id);
                if (/[\/\\]app[\/\\]/.test(id)) delete require.cache[id];

            })
        });

        watcher.on('unlinkDir', function(event) {
            console.log(event);
        });

    });



    
}

module.exports = watch;