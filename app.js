let play = document.getElementById('play')
let range1 = document.getElementById('range1')
let audio = new Audio('Audios/1.mp3')

play.addEventListener('click',()=>{
    if(audio.paused || audio.currentTime==0){
        audio.play()
        play.classList.remove('fa-circle-play')
        play.classList.add('fa-circle-pause')
    }else{
        audio.pause()
        play.classList.remove('fa-circle-pause')
        play.classList.add('fa-circle-play')
    }
})

audio.addEventListener('timeupdate',()=>{
    let range = (audio.currentTime/audio.duration) * 100
    range1.value = range
    range1.style.background = `linear-gradient(to right, rgba(18, 81, 44, 1) ${range}%, rgba(11, 11, 11, 1) ${range}%)`
})

range1.addEventListener('input',function(){
    let value = this.value
    // audio.currentTime = (value/100) * audio.duration
    audio.currentTime = (value * audio.duration) / 100
    this.style.background = `linear-gradient(to right, rgba(18, 81, 44, 1) ${value}%, rgba(11, 11, 11, 1) ${value}%)`
})



// Handle play button click inside Trending & Albums
document.addEventListener("click", (e) => {
    const playBtn = e.target.closest(".play-music");
    if (!playBtn) return;

    const songIndex = parseInt(playBtn.dataset.index);
    const songCategory = playBtn.dataset.category;

    let selectedSong;

    if (songCategory === "trending") {
        selectedSong = trendingSongs[songIndex];
    } 
    else if (songCategory === "albums") {
        selectedSong = popularAlbums[songIndex];
    }

    if (!selectedSong) return;

    currentTrackIndex = songIndex;
    currentCategory = songCategory;

    // Load and play song
    audio.src = selectedSong.file;
    audio.play();

    updatePlayerUI(selectedSong);

    showPlayerSection();

    play.classList.remove("fa-circle-play");
    play.classList.add("fa-circle-pause");
});




let currentTrackIndex = null;
const playBtn = document.getElementById("play");
const progressBar = document.getElementById("range1");

document.addEventListener("click", (e) => {
    const row = e.target.closest(".track-list-item");
    if (!row) return;

    currentTrackIndex = parseInt(row.dataset.index);

    const selectedSong = artist.songs[currentTrackIndex];
    audio.src = selectedSong.file; 
    audio.play();

    updatePlayerUI(selectedSong);

    playBtn.classList.replace("fa-circle-play", "fa-circle-pause");
});


function updatePlayerUI(song){
    const playerSection = document.querySelector(".player-first-section");
    playerSection.innerHTML = `
        <img src="${song.img}" class="rounded float-start" alt="">
        <div class="player-img-details">
            <p id="p1">${song.name || song.title}</p>
            <p id="p2">${song.details}</p>
        </div>
    `;
}



// update progress bar
audio.addEventListener("timeupdate", () => {
    let value = (audio.currentTime / audio.duration) * 100;
    progressBar.value = value;
});

// playing hoding footer
const playerSection = document.getElementById("player-section");
const previewFooter = document.getElementById("preview-footer");

function showPlayerSection() {
    playerSection.style.display = "block";
    previewFooter.style.display = "none";
}

function showPreviewFooter() {
    playerSection.style.display = "none";
    previewFooter.style.display = "block";
}

// When music starts -> show player bar
audio.addEventListener("play", () => {
    showPlayerSection();
});

// When music pauses or stops -> show preview footer
audio.addEventListener("pause", () => {
    if (audio.currentTime === 0) {
        showPreviewFooter();
    }
});

audio.addEventListener("ended", () => {
    showPreviewFooter();
});

