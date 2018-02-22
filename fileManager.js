const fs = require('fs');
const path = require('path');

const WRITE_PATH = require('./.config').WRITE_PATH;

/**
 * writes a file to the filesystem
 * TODO: Needs validation to ensure the path is valid
 * @param {object} fileObject : contains the name of the file and the content to write 
 */
const appendFile = function(fileObject) {
    const fileName = fileObject.filename;
    const content = fileObject.content;
    if(fileName == null || content == null) {
        console.log('error appending file --> need better validation');
    }

    fs.appendFile(WRITE_PATH + fileName, content, function(err) {
        if(err) throw err;
        console.log('saved file');
    });
};

/**
 * Writes a new directory to the fileSystem based on the WRITE_PATH
 * TODO: Needs validation to ensure the path is valid
 * @param {object} fileObject : the name of the directory to write
 */
const createDirectory = function(fileObject) {
    const dirName = fileObject.dirname;
    
    fs.mkdir(WRITE_PATH + dirName, function(err) {
        if(err) {
            console.log(err);
        }
    });

}

module.exports = {
    appendFile,
    createDirectory
}