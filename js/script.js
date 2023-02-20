const STContainer = document.querySelector(".stinfo")

function startLoad() {
    STContainer.innerHTML = `<img class="loadingGif" src="./resources/loading.gif"></img>`
}

async function STDetails() {
    console.log("Getting details...")
    const url = "http://stapi.co/api/v1/rest/season/search";
    startLoad()
    try {
        const response = await fetch(url); 
        const res = await response.json();   
        STContainer.innerHTML = "" 

        let results = res.seasons

        results = results.sort(function(a, b){
            return a.seasonNumber - b.seasonNumber;
        })

        for (var i = 0; i < res.seasons.length; i++ ) {     
            var seasonNumber = results[i].seasonNumber
            var title = results[i].series.title
            var uid = results[i].uid


            STContainer.innerHTML += `
            <span>${title}</span> <br>
            <a href="./details.html?uid=${uid}"> Season ${seasonNumber} </a><br><br>
            `
        }
    } catch (error) {
        STContainer.innerHTML = "" 
        STContainer.innerHTML = error
    }
}

STDetails();