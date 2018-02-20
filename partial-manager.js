const fs = require('fs');
const path = require('path');
const PARTIALS_PATH = './public/views/partials/';
const VIEW_TAG = '.ejs'

/**
 * Recursive, synchronous solution to retrieving the files for viewing.
 */
function walkSync(dir, fileList=[]) {
    var fs = fs || require('fs');
    var files = fs.readdirSync(dir);
    fileList = fileList || [];
    files.forEach(function(file) {
        if(fs.statSync(dir + '/' + file).isDirectory()) {
            var local = [];
            var local = walkSync(dir + '/' + file);
            console.log(`dir: ${file}, files:`, local);
            fileList.push({dir: file, files: local});
        } else {
            if(path.extname(file).toLowerCase() === VIEW_TAG) {
                fileList.push(file);
            }
        }
    });
    return fileList;
}


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
                return file ? path.extname(file).toLowerCase() !== VIEW_TAG : ''
            }));
        });
    }).then((partialDirs) => {
        // console.log(partialDirs);
        return Promise.all(partialDirs.map(requestPartials)).then((res) => {
            console.log(res);
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
        fs.readdir((PARTIALS_PATH + dir), (err, files) => {
            resolve({dir, files});
        })
    }).then((res) => {
        return res; 
    });
}

module.exports = {
    getPartials : getPartials(PARTIALS_PATH),
    walkSync : walkSync(PARTIALS_PATH)
}

// module.exports = getPartials(PARTIALS_PATH);


