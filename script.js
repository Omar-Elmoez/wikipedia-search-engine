let resultsContainer = document.querySelector(".container");

function debounce(func, time) {
    let timer;

    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => func(...args), time);
    }
}

const generateResults = (searchValue) => {
    fetch(
        "https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch="
        + searchValue
    )
    .then(response => response.json())
    .then(data => {
        let results = data.query.search;
        let numberOfResults = results.length;
        resultsContainer.innerHTML = ""
        for(let i=0; i<numberOfResults; i++) {
            let result = document.createElement("div")
            result.classList.add("results")
            result.innerHTML = `
            <div>
                <h3>${results[i].title}</h3>
                <p>${results[i].snippet}</p>
            </div>
            <a href="https://en.wikipedia.org/?curid=${results[i].pageid}" target="_blank">Read More</a>
            `
            resultsContainer.appendChild(result)
        }
    })
    if(searchValue === '') resultsContainer.innerHTML = "<p>Type something in the above search input</p>";
}

const fetchData = debounce((Val) => generateResults(Val), 500)