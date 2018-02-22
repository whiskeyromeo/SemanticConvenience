// Requires validate.js to operate


const dataFromServer = document.getElementById('main-js').getAttribute('ejs-data');
const data = JSON.parse(dataFromServer);
const ROOT_TAG = 'partials';
const SUPPORTED_FILETYPES = ['.ejs'];

function renderFileView(dir, file) {
    if(!validateInput(dir, isString, 'renderFileView')) return;
    if(!validateInput(file, isString, 'renderFileView')) return;
    const fileName = file.slice(0, -4);
    return `
        <div class="item">
            <i class="file icon"></i>
            <div class="content">
                <a class="header" id="${fileName}_header" data-loaded=false onclick="renderPartial('${dir}', '${file}');">${file}</a>
            </div>
            <div class="description">
                <div class="partial_container" id="${dir}_${fileName}_display"></div>
            </div>
        </div>`; 
}

/**
 * Renders the views of the directory
 */
function renderDirectoryView(dir, filesView) {
    if(!validateInput(filesView, isString, 'renderDirectoryView')) return;
    if (!validateInput(dir, isString, 'renderDirectoryView')) return;
    const dirView = `
        <div class="${dir} item">
            <i class="folder icon"></i>
            <div class="directory content">
                <div id="${dir}_select" class="header">
                    ${dir.charAt(0).toUpperCase() + dir.slice(1)}
                </div>
                <div class="ui list">
                    ${filesView}
                </div>
            </div>
            <div class="description">
                <div class="partial_container ui fluid accordian" id="${dir}_display"></div>
            </div>
        </div>
        `;
    return dirView;
}

function renderPartialView(partialObject) {
    if(!validateInput(partialObject, isObject, 'renderPartialView')) return;
    const value = partialObject.value;
    const res = partialObject.res;
    var partialView = `
        <div class="item">
            <i onclick="toggleString('${value}');" class="circular code outline icon right floated"></i>
            <div class="option content ui segment">            
                <div id="${value}" class="header">
                    <div>${res}</div>
                </div>
            </div>
            <script>
                $('.ui.accordian').accordion();
            </script>
        </div>
        `
    return partialView;
}


/**
 *  This should be rewritten into a recursive solution.
 *  This will require a slight rewrite of writeSync, where the initial object
 *  output is an object with the same properties as the children.
 * @param {*} data 
 */
function renderAsList(partials) {
    if(!validateInput(partials, isObject, 'renderAsList')) return;
    options = '';
    partials.files.forEach(function (partial) {
        if (typeof partial == 'string') {
            options += renderFileView(partials.dir, partial);
        } else if (typeof partial == 'object') {
            partial.dir = `${partials.dir}/${partial.dir}`;
            options += renderAsList(partial);
        }
    });
    if(partials.dir === '') {
        partials.dir = ROOT_TAG;
    }
    var listView = renderDirectoryView(partials.dir, options);
    return listView;
}

// TODO : Need to pass in the parent directory
function renderPartial(dir, value) {
    if(!validateFileExtension(value, SUPPORTED_FILETYPES)) {
        renderMessage("Cannot render partials of this type");
        return;
    }
    var fileName = value.slice(0, -4);
    var include_str = `/partials/${dir}/${value}`;
    var file_display = document.getElementById(`${dir}_${fileName}_display`);
    var display_header = document.getElementById(`${fileName}_header`);
    file_display.innerHTML = '';
    if((value.length > 0) && display_header.dataset.loaded == 'false') {
        $.get(include_str,function (res) {
            //console.log(res);
            var partial = renderPartialView({value, res});
            file_display.innerHTML = partial;
            display_header.dataset.loaded = true;
        });
    } else {
        display_header.dataset.loaded = false;
    }
}


// Toggles the view of the component and the string view
function toggleString(value) {
    if(!validateInput(value, isString, 'toggleString')) return;
    var el = document.getElementById(value);
    var child = el.children[0];
    if(child) {
        el.replaceChild(document.createTextNode(el.innerHTML), child);
    } else {
        el.innerHTML = el.innerText;
    }
}

$(document).ready(function () {
    var app = document.getElementById('app');
    app.innerHTML = renderAsList(data.partials);

    $('.ui.dropdown').dropdown();
    $('.ui.dropdown .delete.icon').on('click', function(e) {
        $(this).parent('.dropdown').dropdown('clear');
        e.stopPropagation();
    });

    window.addEventListener('keydown', function(event) {
        if (event.ctrlKey || event.metaKey) {
            switch(String.fromCharCode(event.which).toLowerCase()) {
            case 's':
                event.preventDefault();
                alert('Afraid I cannot save anything here at the moment...');
                break;
            }
        }
    })

});

