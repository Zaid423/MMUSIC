// Sample playlist (replace with your MP3 files)
const playlist = [
  {
    title: "Sample Song 1",
    artist: "Artist 1",
    cover: "https://placehold.co/150",
    audio: "YOUR_MP3_LINK_1_HERE"
  },
  {
    title: "Sample Song 2",
    artist: "Artist 2",
    cover: "https://placehold.co/150",
    audio: "YOUR_MP3_LINK_2_HERE"
  }
];

// DOM Elements
const musicGrid = document.querySelector('.music-grid');
const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const songTitle = document.getElementById('song-title');
const artist = document.getElementById('artist');
const coverArt = document.getElementById('cover-art');

let currentSongIndex = 0;

// Render playlist
function renderPlaylist() {
  musicGrid.innerHTML = '';
  playlist.forEach((song, index) => {
    const songCard = document.createElement('div');
    songCard.className = 'song-card';
    songCard.innerHTML = `
      <img src="${song.cover}" alt="${song.title}">
      <h3>${song.title}</h3>
      <p>${song.artist}</p>
    `;
    songCard.addEventListener('click', () => playSong(index));
    musicGrid.appendChild(songCard);
  });
}

// Play song
function playSong(index) {
  currentSongIndex = index;
  const song = playlist[index];
  audioPlayer.src = song.audio;
  songTitle.textContent = song.title;
  artist.textContent = song.artist;
  coverArt.src = song.cover;
  audioPlayer.play();
  playBtn.textContent = '⏸';
}

// Event listeners
playBtn.addEventListener('click', () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playBtn.textContent = '⏸';
  } else {
    audioPlayer.pause();
    playBtn.textContent = '▶';
  }
});

nextBtn.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex + 1) % playlist.length;
  playSong(currentSongIndex);
});

prevBtn.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
  playSong(currentSongIndex);
});

// Update progress bar
audioPlayer.addEventListener('timeupdate', () => {
  progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
});

progressBar.addEventListener('input', () => {
  audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
});

// Initialize
renderPlaylist();
