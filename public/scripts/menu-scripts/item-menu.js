var editorialLink = document.querySelector(".editorial-link");
var reviewLink = document.querySelector(".review-link");
var upcomingEventLink = document.querySelector(".upcoming-event-link");
var archiveEventLink = document.querySelector(".event-archive-link");


editorialLink.addEventListener('click', (e) => {
    e.preventDefault();
    alert('clicked on the editorial Link')
});

reviewLink.addEventListener('click', (e) => {
    e.preventDefault();
    alert('clicked on the review link')
});

upcomingEventLink.addEventListener('click', (e) => {
    e.preventDefault();
    alert('clicked on the upcoming event link')
});

archiveEventLink.addEventListener('click', (e) => {
    e.preventDefault();
    alert('clicked on the archived events link')
});


function get(path, data) {
    return fetch(path,  {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

function post(path, data) {
    console.log('in get');
    return window.fetch(path,  {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}