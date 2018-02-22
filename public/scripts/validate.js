// Requires jQuery due to the rather inflexible renderMessage function at the bottom

function isString(value) {
    return typeof value === 'string' || value instanceof String;
}

function isNumber(value) {
    return typeof value === 'number' && isFinite(value);
}

function isArray(value) {
    return value && typeof value === 'object' && value.constructor === Array;
}

function isFunction(value) {
    return typeof value === 'function';
}

function isObject(value) {
    return value && typeof value === 'object' && value.constructor === Object;
}

function isNull(value) {
    return value === null;
};

function isUndefined(value) {
    return typeof value === 'undefined';
}

function isBoolean(value) {
    return typeof value === 'boolean';
}

/**
 * Method to validate inputs on various methods.
 * @param {any} input 
 * @param {any} expectedType 
 */
function validateInput(input, method, origin) {
    if (!method(input)) {
        renderMessage(
            `Input (${String(input)}) did not match expected type,
            instead received type of ${typeof input} in method ${origin}`
        );
        return false;
    }
    return true;
}

function validateFileExtension(filename, supportedExtensions) {
    const regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(" + supportedExtensions.join('|') + ")$");
    if(!regex.test(filename.toLowerCase())) {
        return false;
    }
    console.log('all good');
    return true;
}

/**
 * Rather inflexible method to present a message
 * @param {string} message : The message to pass to the message box
 * @param {string} classTags : Optional class tags to pass into the message box to customize the appearance
 */
function renderMessage(message, classTags='') {
    console.log('hit renderMessage');
    var messageHTML = `
        <div class="ui info message floating transition ${classTags}">
            <i class="close icon"></i>
            <div class="header">${message}</div>
        </div>
    `;
    $('#message').prepend(messageHTML);
    
    // Allow manual removal of message
    $('.close.icon').on('click', function () {
        $(this)
            .closest('.message')
            .transition('fade');
    });
}




