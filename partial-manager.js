const fs = require('fs');
const path = require('path');
const PARTIALS_PATH = './public/views/partials/';

/**
 * Filters out the files in the path passed in and returns
 * an array of the parsed subdirectories
 * @param {String} basePath : The path to the parent directory of the individual partial folders
 * 
 */
function getPartials(basePath) {
    return new Promise(function(resolve, reject) {
        fs.readdir((basePath), (err, files) => {
            resolve(files.filter((file) => {
                return file ? path.extname(file).toLowerCase() !== '.ejs' : ''
            }));
        });
    }).then((partialDirs) => {
        // console.log(partialDirs);
        return Promise.all(partialDirs.map(requestPartials)).then((res) => {
            // console.log(res);
            return res;
        })
    });
}

/**
 * Returns the array of objects
 * @param {String} dir : The directory to get the filenames from
 * @returns {Object} : { dir : '<subdirectory_filename>', files : [array, of, files, within]} 
 */
function requestPartials(dir) {
    return new Promise(function(resolve, reject) {
        fs.readdir((basePath + dir), (err, files) => {
            resolve({dir, files});
        })
    }).then((res) => {
        return res; 
    });
}

module.exports = getPartials(PARTIALS_PATH);


