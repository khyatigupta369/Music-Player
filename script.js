const musicContainer = document.getElementById('music-container');
const cover = document.getElementById('cover');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');

// Song titles
const songs = ['blackpink-love to hate me','feelings' ,'mafia-Itzy' ];

// Keep track of song
let songIndex = 1;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
    title.innerText = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `img/${song}.jpeg`;
  }

  // Play song
function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
  
    audio.play();
  }
  
  // Pause song
  function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');

    audio.pause();
  }

//   prevsong
function prevSong() {

    songIndex--;

    if ( songIndex < 0 )
    songIndex = songs.length - 1;

    loadSong ( songs[songIndex] );

    playSong();
}

function nextSong() {
    songIndex++ ;

    if ( songIndex > songs.length -1 )
    songIndex = 0;

    loadSong ( songs[songIndex] );

    playSong();
}

function updateProgress(e) {
    const {duration,currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100 ;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = ( clickX/width ) * duration;
}

  // Event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
  
    if (isPlaying) {
      pauseSong();
    } else {
      playSong();
    }
  });

//   change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// progress
audio.addEventListener('timeupdate',updateProgress);

progressContainer.addEventListener('click',setProgress);

audio.addEventListener('ended',nextSong);