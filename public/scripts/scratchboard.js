
/**
 * Works with AttachButtonListeners to create a more easily navigable setup between components
 * 
 * TODO: Complete
 * @param {*} data 
 */
export function renderAsButtons(data) {
    const partials = data.partials;
    var pageContent = '';
    partials.forEach(function (partial) {
        var options = '';
        var counter = 0;
        partial.files.forEach(function (file) {
        });
        var selectDiv = `
            <div class="ui divided items">
                <div class="${partial.dir}">
                    <div class="ui sub header">${partial.dir}</div>
                        <button id="${partial.dir}_next" class="ui right floated button">Next</button>
                        <button id="${partial.dir}_prev" class="ui left floated button">Previous</button>
                </div>
                    <br>
                <div class="partial_container" id="${partial.dir}_display"></div>
            </div>
            `;
        pageContent += selectDiv;

    });
    return pageContent;
}

/**
 * The idea is to set this up as a type of carousel, need to have a counter
 * instance which is called upon for each set of components passed in. 
 * TODO: Finish construction
 * @param {*} data 
 */
export function attachButtonListeners(data) {
    const partials = data.partials;
    partials.forEach(function (partial) {
        var nextButton = document.getElementById(`${partial.dir}_next`);
        var prevButton = document.getElementById(`${partial.dir}_prev`);
        if (nextButton === null || prevButton === null) {
            return;
        }
        nextButton.addEventListener('click', function (event) {

        });

        prevButton.addEventListener('click', function (event) {
            console.log('prev');
        });
    })
}


// toggles the view of the component on the page
function toggleComponent(value) {
    console.log('toggleComponent : ', typeof value);
    var el = document.getElementById(value);
    if (!el.classList.contains('hidden')) {
        el.classList.add('hidden');
    } else {
        el.classList.remove('hidden');
    }
}

function renderAsSelect(data) {
    if (typeof partial == 'string') {
        console.log(partial);
        return;
    }
    const partials = data.partials;
    var pageContent = '';
    partials.forEach(function (partial) {
        var options = '';
        partial.files.forEach(function (file) {
            options += `<option value="${file}">${file}</option>`
        });
        var selectDiv = `
                <div class="${partial.dir} item">
                    <div class="content">
                        <select id="${partial.dir}_select" multiple="" onchange="renderPartial('${partial.dir}');" class="ui fluid invert dropdown">
                            <option value="">${partial.dir.charAt(0).toUpperCase() + partial.dir.slice(1)}</option>
                            ${options}
                        </select>
                        <div class="description">
                            <div class="ui list partial_container" id="${partial.dir}_display"></div>
                        </div>
                    </div>
                </div>
                
            `;
        pageContent += selectDiv;
    });
    return pageContent;
}

function renderPartial(dir) {
    var values = $(`#${dir}_select`).dropdown("get value");
    var include_str = `/partials/${dir}/`;
    $(`#${dir}_display`).html('');
    if (values.length > 0) {
        var selectedComponents;
        values.forEach(async function (value) {
            $.get((include_str + value), function (res) {
                var render = renderPartialView({ dir, value, res });
                $(`#${dir}_display`).append(render);
            })
        });
    }
}


