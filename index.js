const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'assets/1.mp3',
        displayName: 'Louca Encubada',
        cover: 'assets/1.jpeg',
        artist: 'Dj Samir, Rodricci, Launch13',
    },
    {
        path: 'assets/2.mp3',
        displayName: 'AUTOMOTIVO PEGA 1.0',
        cover: 'assets/2.jpeg',
        artist: 'TOO MANY',
    },
    {
        path: 'assets/3.mp3',
        displayName: 'CUTE DEPRESSED',
        cover: 'assets/3.jpeg',
        artist: 'Dyan Dxddy',
    },
    {
        path: 'assets/4.mp3',
        displayName: 'SLAY',
        cover: 'assets/4.jpeg',
        artist: 'Eternxlkz',
    },
    {
        path: 'assets/5.mp3',
        displayName: '✻h+3+яд✻7lucjlot6',
        cover: 'assets/5.jpeg',
        artist: 'vyrval',
    },
    {
        path: 'assets/6.mp3',
        displayName: 'DERNIERE DANCE FUNK',
        cover: 'assets/6.jpeg',
        artist: 'ZODIVK, YXUNGXROTICA, MC KRAKEN',
    },
    {
        path: 'assets/7.mp3',
        displayName: 'MONTAGEM CORAL',
        cover: 'assets/7.jpeg',
        artist: 'TOO MANY',
    },
    {
        path: 'assets/8.mp3',
        displayName: 'Wada Well V2',
        cover: 'assets/8.jpeg',
        artist: 'Young Madz',
    },
    {
        path: 'assets/9.mp3',
        displayName: 'Har Fan Maula X Money in the Grave',
        cover: 'assets/9.jpeg',
        artist: 'Aprilwalayarr',
    },
    {
        path: 'assets/10.mp3',
        displayName: 'Big Dawgs',
        cover: 'assets/10.jpeg',
        artist: 'Hanumankind, Kalmi',
    },
    {
        path: 'assets/11.mp3',
        displayName: 'FUNK ESTRANHO',
        cover: 'assets/11.jpeg',
        artist: 'Astora',
    },
    {
        path: 'assets/12.mp3',
        displayName: 'DNA',
        cover: 'assets/12.jpeg',
        artist: 'LXNGVX, VISXGE',
    },
    {
        path: 'assets/13.mp3',
        displayName: 'Mexican Phonk Eki',
        cover: 'assets/13.jpeg',
        artist: 'NUEKI, TOLCHONOV',
    },
    {
        path: 'assets/14.mp3',
        displayName: 'X-SLIDE - Ultra Slowed',
        cover: 'assets/14.jpeg',
        artist: '2KE, 808iuli',
    },
    {
        path: 'assets/15.mp3',
        displayName: 'EMPIRE',
        cover: 'assets/15.jpeg',
        artist: 'Ogryzek',
    },
    {
        path: 'assets/16.mp3',
        displayName: 'FUNK DO BOUNCE',
        cover: 'assets/16.jpeg',
        artist: 'Ariis',
    }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);