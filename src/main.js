const API_KEY = 'fd58e48d';
const URL = `http://www.omdbapi.com/?apikey=${API_KEY}`;
const form = document.forms.search_form;
const radio = document.getElementsByName("optradio")

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
    const search = data.Search;
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


radio.addEventListener('click', (event) => {
    event.preventDefault();
    const value = form.title.value.trim();
    if (!value) {
        form.title.classList.add('error');
        setVisibility(form.querySelector('.error-message'), true);
    } else {
        fetch(`${URL}&type=${value}`)
            .then(response => response.json())
            .then(data => filterResult(data))//generateResultCards вставить вместо консоль лога
        form.title.classList.remove('error');
        setVisibility(form.querySelector('.error-message'), false);
    }
})


function filterResult(data) {
    const typesearch = data.Search;
    const choosetype = typesearch.filter(typeresult => typesearch.Type)
    console.log(choosetype)

}
