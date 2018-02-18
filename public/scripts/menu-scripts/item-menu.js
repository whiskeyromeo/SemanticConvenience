const editorialLink = document.querySelector(".editorial-link");
const reviewLink = document.querySelector(".review-link");
const upcomingEventLink = document.querySelector(".upcoming-event-link");
const archiveEventLink = document.querySelector(".event-archive-link");


editorialLink.addEventListener('click', (e) => {
    get('/');
});

reviewLink.addEventListener('click', (e) => {
    get('/reviews');
});

reviewLink.addEventListener('click', (e) => {
    get('/events/upcoming');
});

reviewLink.addEventListener('click', (e) => {
    get('/events/archive');
});


function get(path, data) {
    return window.fetch(path,  {
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