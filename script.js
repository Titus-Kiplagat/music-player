const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeElement = document.getElementById('current-time')
const durationElement= document.getElementById('duration')
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

//music
const songs = [
	{
		name: 'jacinto-1',
		displayName: 'electric chill machine',
		artist: 'jacinto design'
	},
	{
		name: 'jacinto-2',
		displayName: 'seven nation army',
		artist: 'jacinto design'
	},
	{
		name: 'jacinto-3',
		displayName: 'goodnight, disco queen',
		artist: 'jacinto design'
	},
	{
		name: 'metric-1',
		displayName: 'electric chill machine',
		artist: 'jacinto design'
	}
]

//check if playing
let isPlaying = false;

//play
function playMusic() {
	isPlaying = true;
	playBtn.classList.replace('fa-play', 'fa-pause');
	playBtn.setAttribute('title', 'pause');
	music.play();
}

//pause
function pauseMusic() {
	isPlaying = false;
	playBtn.classList.replace('fa-pause', 'fa-play')
	playBtn.setAttribute('title', 'play');
	music.pause();
}

//play and pause event listener
playBtn.addEventListener('click', () => (isPlaying ? pauseMusic() : playMusic()));

//current song
let songIndex = 0;

//previous song
function prevSong() {
	songIndex--;
	if (songIndex < 0) songIndex = songs.length - 1;
	loadSong(songs[songIndex]);
	playMusic();
}
//next song
function nextSong() {
	songIndex++;
	if (songIndex > songs.length - 1) songIndex = 0;
	loadSong(songs[songIndex]);
	playMusic();
}

//update the dom
function loadSong(song) {
	title.textContent = song.displayName;
	artist.textContent = song.artist;
	image.src = `img/${song.name}.jpg`;
	music.src = `music/${song.name}.mp3`;
}

function updateProgressBar(event) {
	event.preventDefault();
	if (isPlaying) {
		const { currentTime, duration } = event.srcElement;
		const percentageProgress = (currentTime / duration) * 100;
		progress.style.width = `${percentageProgress}%`;
		const durationMinutes = Math.floor(duration / 60);
		let durationSeconds = Math.floor(duration % 60);
		if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`	
		if (durationSeconds) {durationElement.textContent = `${durationMinutes}:${durationSeconds}`}
		
		const currentMinutes = Math.floor(currentTime / 60);
		let currentSeconds = Math.floor(currentTime % 60);
		if (currentSeconds < 10) currentSeconds = `0${currentSeconds}`;
		currentTimeElement.textContent = `${currentMinutes}:${currentSeconds}`;
	}
}

function setProgressBar(e) {
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const { duration } = music;
	music.currentTime = (clickX / width) * duration;
}

loadSong(songs[songIndex]);

//event listener
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);