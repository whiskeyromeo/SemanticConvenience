
/**
 * Returns a boolean based on whether or not the form is valid
 * based on the regexps
 * @param {object} inputs 
 * @param {array} regexps [{input:/regexp/, input2:/regexp}, {input2: regexp2}...]
 */
function validateForm(inputs, regexps=[]) {
    let valid = true;
    regexps.forEach(function(regexp) {
        var key;
        for (key in regexp) {
            if(!regexp[key].test(inputs[key])) {
                valid = false;
            }
        }
    })
    return valid;
}

/**
 * generate an object based on the names of the inputs in the form
 * @param {HTMLObject} form : The form to get the names from
 * @param {Array} inputNames : An array of strings representing the names of the inputs
 */
function getFormInputs(form, inputNames) {
    const inputs = {}
    inputNames.forEach(function(name) {
         inputs[name] = form.elements.namedItem(name).value;
    })
    return inputs;
}

/**
 * Performs the validation and submission of the form
 * @param {Object} formObject : Contains all of the information needed to validate and submit the form via ajax
 */
function onFormSubmit(formObject) {
    const createFileForm = document.getElementById(formObject.formId);
    createFileForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const inputs = getFormInputs(this, formObject.inputNames);
        const valid = validateForm(inputs, formObject.validators);
        console.log('inputs :', inputs);
        $.ajax({
            url: formObject.path,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(inputs),
            success: function(data) {
                console.log('success data: ', data);
            },
            error: function(err) {
                console.log('error data: ', err);
            }
        });
    })
}

