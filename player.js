const player = document.querySelector('.player'),
playBtn = document.querySelector('.play'),
prevBtn = document.querySelector('.prev'),
nextBtn = document.querySelector('.next'),
audio = document.querySelector('.audio'),
progressContainer = document.querySelector('.progress_container'),
progress = document.querySelector('.progress'),
title = document.querySelector('.song'),
cover = document.querySelector('.cover_img'),
imgSrc = document.querySelector('.img_src');

// названия песен
const songs = ['plenka - Call Me (Slowed)', 'Mareux - The Perfect Girl']

// песня по умолчанию
let songIndex = 1

// Init 
function loadSong(song) {
   title.innerHTML = song
   audio.src = `music/${song}.mp3`
   cover.src = `img/cover${songIndex + 1}.svg`
}
loadSong(songs[songIndex])

// time
// function updateTime() {
//    let e = player.currentTime;
//    current.innerHTML = timeFormat(e);
//  }
 
//  function timeFormat(e) {
//    hour = Math.floor(e / 60 % 60);
//    minutes = Math.floor(e / 60);
//    seconds = Math.floor(e % 60);
 
//    if (seconds < 10) { // типо 01 02, а не 1 2 
//      seconds = "0" + seconds;
//    }
 
//    if (minutes > 59) {
//      return hour + ":" + minutes + ":" + seconds;
//    }
//    else {
//      return minutes + ":" + seconds;
//    }
   
//  }

// play 
function playSong(){
   player.classList.add('play')
   cover.classList.add('active')
   imgSrc.src = 'img/pause-button.png'
   audio.play()
}

// pause 
function pauseSong(){
   player.classList.remove('play')
   cover.classList.remove('active')
   imgSrc.src = 'img/play-button.png'
   audio.pause()
}
playBtn.addEventListener('click', () => {
   const isPlaying = player.classList.contains('play')
   if(isPlaying){
      pauseSong()
   }
   else{
      playSong()
   }
})

// next song
function nextSong() {
   songIndex++

   if(songIndex > songs.length -1) {
      songIndex = 0
   }

   loadSong(songs[songIndex])
   playSong()
}
nextBtn.addEventListener('click', nextSong)

// prev song
function prevSong() {
   songIndex--

   if(songIndex < 0) {
      songIndex = songs.length -1
   }
   loadSong(songs[songIndex])
   playSong()

}
prevBtn.addEventListener('click', prevSong)

// прогресс бар
function updateProgress(e) {
   const {duration, currentTime} = e.srcElement
   const progressPercent = (currentTime / duration) * 100
   progress.style.width = `${progressPercent}%`
}
audio.addEventListener('timeupdate', updateProgress)

// set progress
function setProgress(e) {
   const width = this.clientWidth
   const clickX = e.offsetX
   const duration = audio.duration

   audio.currentTime = (clickX / width) * duration
}
progressContainer.addEventListener('click', setProgress)

// autoplay
audio.addEventListener('ended', nextSong)

playBtn.addEventListener("click", playpause);