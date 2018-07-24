const API_KEY = 'fd58e48d';
const URL = `http://www.omdbapi.com/?apikey=${API_KEY}`;
const form = document.forms.search_form;
//const radio = document.getElementById("btn1")

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = form.title.value.trim();
    if (!value) {
        form.title.classList.add('error');
        setVisibility(form.querySelector('.error-message'), true);
    } else {
        fetch(`${URL}&s=${value}`)
            .then(response => response.json())
            .then(data => generateResultCards(data))//generateResultCards вставить вместо консоль лога
        form.title.classList.remove('error');
        setVisibility(form.querySelector('.error-message'), false);
    } 
});

function setVisibility(element, isError) {
    isError ?
        element.classList.add('visible1') :
        element.classList.remove('visible');
}

function generateResultCards(data) {
    const search = data.Search ? data.Search : data ;
    var resultArray = search.map(stack =>`<div class="card" style="width: 18rem;">
    <img class="card-img-top" src="${stack.Poster}" alt="Card image cap">
    <div class="card-body">
    <p> ${stack.Title} <p><br>
    <p> ${stack.imdbID}</p><br>
    <p> ${stack.Type}</p>
    </div>
  </div>`).join('');
  return document.getElementById('1').innerHTML = resultArray
  
}


document.getElementById("btn1").addEventListener('click', (event) => {
    event.preventDefault();
    const value = form.title.value.trim(); 
    fetch(`${URL}&s=${value}`)
            .then(response => response.json())
            .then(data => filterResult(data))
        form.title.classList.remove('error');
        setVisibility(form.querySelector('.error-message'), false);
    })


function filterResult(data) {
    const typesearch = data.Search;
    const filmtype = typesearch.filter(function(moviefilms){
        return moviefilms.Type == 'movie'

    })
    generateResultCards(filmtype)
}


document.getElementById("btn2").addEventListener('click', (event) => {
    event.preventDefault();
    const value = form.title.value.trim(); 
    fetch(`${URL}&s=${value}`)
            .then(response => response.json())
            .then(data => filterResultSer(data))
        form.title.classList.remove('error');
        setVisibility(form.querySelector('.error-message'), false);
    })


function filterResultSer(data) {
    const typesearch = data.Search;
    const seriestype = typesearch.filter(function(seriesfilms){
        return seriesfilms.Type == 'series'
    })
    generateResultCards(seriestype)
}

document.getElementById("btn3").addEventListener('click', (event) => {
    event.preventDefault();
    const value = form.title.value.trim(); 
    fetch(`${URL}&s=${value}`)
            .then(response => response.json())
            .then(data => filterResultEpi(data))
        form.title.classList.remove('error');
        setVisibility(form.querySelector('.error-message'), false);
    })


function filterResultEpi(data) {
    const typesearch = data.Search;
    const episodetype = typesearch.filter(function(episodefilms){
        return episodefilms.Type == 'episodes'
    })
    generateResultCards(episodetype)
}
