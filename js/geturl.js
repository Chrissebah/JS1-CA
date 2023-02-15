const urlParams = new URLSearchParams(window.location.search);
const uid = urlParams.get("uid");
const STContainer = document.querySelector(".stinfo")
const STEplist = document.querySelector(".eplist")

function startLoad() {
    STContainer.innerHTML = `<img class="loadingGif" src="./resources/giphy.gif"></img>`
}


async function CallMeAgain() {
    console.log("Getting details... again?")
    startLoad()
    const url = `http://stapi.co/api/v1/rest/season?uid=${uid}`
    try {
        const response = await fetch(url); 
        const res = await response.json()
        
        let results = res.season

        results = results.episodes.sort(function(a, b){
            return a.episodeNumber - b.episodeNumber;
        })
        
        document.title = res.season.series.title + " Season " + res.season.seasonNumber

        STContainer.innerHTML = "" 
        STContainer.innerHTML += `
            Season 1 of ${res.season.series.title} <br>
            Number of Episodes: ${res.season.numberOfEpisodes} <br><br>

            Episodes list: <br>
        `
        for (var i = 0; i < res.season.episodes.length; i++ ) {     
            var epname = res.season.episodes[i].title
            var airdate = res.season.episodes[i].usAirDate


            STEplist.innerHTML += `
            <ul> Episode number ${i + 1}: ${epname} which aired ${airdate}</ul>
            `
        }
 

    } catch (error) {
        STContainer.innerHTML = "" 
        STContainer.innerHTML = error
    }
}

CallMeAgain()