let term = '';
const songContainer = document.getElementById('songs');

const updateTerm = () => {
    term = document.getElementById('searchInput').value;

    if (!term || term === '') {
        alert('The Search bar is empty');
    } else {

        while (songContainer.firstChild) {
            songContainer.removeChild(songContainer.firstChild);
        }


        const url = `https://itunes.apple.com/search?media=music&term=${term}`
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                const artists = data.results;
                return artists.map(result => {

                    const article = document.createElement('article'),
                        artist = document.createElement('p'),
                        song = document.createElement('p'),
                        img = document.createElement('img'),
                        audio = document.createElement('audio'),
                        audioSource = document.createElement('source')

                    artist.innerHTML = result.artistName
                    song.innerHTML = result.trackName
                    img.src = result.artworkUrl100
                    audioSource.src = result.previewUrl
                    audio.setAttribute('controls', '')

                    article.appendChild(img)
                    article.appendChild(artist)
                    article.appendChild(song)
                    article.appendChild(audio)
                    audio.appendChild(audioSource)

                    songContainer.appendChild(article)
                    article.style.backgroundColor = '#3e3f40';
                    article.style.borderRadius = '4px';
                    article.style.paddingTop = '10px';
                    artist.style.fontWeight = '900';


                })
            })
            .catch(error => console.log('Request failed: ', error));
    }
}

const searchBtn = document.querySelector('button')
searchBtn.addEventListener('click', updateTerm)
document.addEventListener('play', event => {
    const audio = document.getElementsByTagName('audio');
    for(let i=0;i<audio.length;i++){
        if(audio[i] != event.target){
            audio[i].pause();
            
        }
    }
}, true)


//Trigger search bar on Enter 

var input = document.getElementById("searchInput");
// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
     document.getElementById("search").click();
  }
});

