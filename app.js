
const searchSongs = async() =>{
    const searchText = document.getElementById('input-field').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`;
    showSpinner();
    // this alternative of .catch 
   try {
    const response = await fetch(url);
    const data = await response.json();
    
    displaySongs(data.data);
    
   }
   catch {
    getError('boss wait please')  
   }
    
   
}


const displaySongs = songs => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = "";
   
    songs.forEach(song => {
        const div = document.createElement('div');
        div.className = "single-result row align-items-center my-3 p-3";
        div.innerHTML = ` 
        <div class="col-md-9">
           <h3 class="lyrics-name">${song.title}</h3>
           <p class="author lead">Album by <span>${song.artist.name}</span></p>
           <audio controls>
           <source type="audio/ogg">
           </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
           <button onclick ='getLyric("${song.artist.name}","${song.title}")' class="btn btn-success">Get Lyrics</button>
        </div>`;
        songContainer.appendChild(div);
        showSpinner();
        document.getElementById('input-field').value= '';
    });
}
const getLyric = (artist, title) =>{ //extra async
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    fetch(url)
    .then(response => response.json())
    .then (data => showLyrics(data.lyrics))
    .catch(error => getError("wait a bit"))
    // const response = await fetch(url);
    // const data = await response.json();
    // showLyrics(data.lyrics);
    
}
const showLyrics = lyrics =>{
  const lyricsDiv =  document.getElementById('lyrics');
  lyricsDiv.innerText = lyrics;
}
const getError = error =>{
    const h1 = document.getElementById('h1');
    h1.innerText = error;
}
const showSpinner = () => {
    const spinner = document.getElementById("spinner");
    const songDiv = document.getElementById("song-container");
    spinner.classList.toggle('d-none')
    songDiv.classList.toggle('d-none')
}
const enterKey = () => {
    // Get the input field
const input = document.getElementById("input-field");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", (event) => {
  // Number 13 is the "Enter" key on the keyboard
  if (event.key === 'Enter') {
    // Trigger the button element with a click
    document.getElementById("search-btn").click();
  }
})
}
enterKey()