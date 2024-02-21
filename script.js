const songs = [
    {
        songName: "Tera Ban Jaunga",
        imgUrl: "./images/tera_ban_jaunga.png",
        songPath: "./songs/tera_ban_jaunga.mp3",
        artistName: "Akhil Sachdeva",
        MovieName: "Kabir Singh",
        liked: false,
        duration: "4:16"
    },
    {
        songName: "Pehle Bhi Main",
        imgUrl: "./images/pehle_bhi_main.png",
        songPath: "./songs/pehle_bhi_main.mp3",
        artistName: "Vishal Mishra",
        MovieName: "Animal",
        liked: false,
        duration: "4:08"
    },
    {
        songName: "Tu Hai Kahan",
        imgUrl: "./images/tu_hai_kahan.png",
        songPath: "./songs/tu_hai_kahan.mp3",
        artistName: " Usama Ali, Ahad Khan",
        MovieName: "Album",
        liked: false,
        duration: "4:23"
    },
    {
        songName: "Hass Hass",
        imgUrl: "./images/hass_hass.png",
        songPath: "./songs/hass_hass.mp3",
        artistName: " Diljit X Sia",
        MovieName: "Album",
        liked: false,
        duration: "2:32"
    },
    {
        songName: "Paisa Hai Toh",
        imgUrl: "./images/paisa_hai_toh.png",
        songPath: "./songs/paisa_hai_toh.mp3",
        artistName: "Vishal Dadlani, MellowD, Sachin-Jigar",
        MovieName: "Farzi",
        liked: false,
        duration: "2:39"
    },
];

const music = new Audio();
var nowSong = 0;
var isPlay = false;
var isLooping = false;

function search(){
    var search = document.querySelector('.search input');

    search.addEventListener('focus',()=>{
        document.querySelector('#shadow').style.display = 'block';
        document.querySelector('.search-result').style.display = 'block';
    });

    search.addEventListener('blur',()=>{
        document.querySelector('#shadow').style.display = 'none';
        document.querySelector('.search-result').style.display = 'none'; 
    });

};

function displaySongs() {

    var buffer = '';

    songs.forEach((song, index)=>{
        buffer += `<div class="song" id= ${index}>
                        <div class="song-info">
                            <h3>${song.songName}</h3>
                            <p>${song.MovieName}</p>
                        </div>
                        <div class="song-detail">
                        ${song.liked ? '<i class="ri-heart-fill" title="Love"></i>' : '<i class="ri-heart-line" title="Love"></i>'}
                            <p>${song.duration}</p>
                        </div>
                    </div>`;
    });
    document.querySelector('.list-song').innerHTML = buffer;
};


function playNextSong() {
    nowSong++;
    if (nowSong >= songs.length &&  isLooping) {
        nowSong = 0;
    }
    if (nowSong <= songs.length) {
        playSong(songs[nowSong]);
    }
    nowSong = 0;
};

function playSong(songNo){
    
    // document.querySelector('html , body').style.backgroundImage = `url(${songNo.imgUrl})`;

    document.querySelector('.current-song-detail').innerHTML = `
        <h2>${songNo.songName}</h2>
        <div class="details">${songNo.MovieName} . ${songNo.artistName}</div>`;
    
    document.querySelector('.pic').innerHTML = `
        <img src="${songNo.imgUrl}" alt="">
        ${songNo.liked ? '<i class="ri-heart-fill" title="Love"></i>' : '<i class="ri-heart-line" title="Love"></i>'}`;

    document.querySelector('#play-pause').innerHTML = `<i class="ri-pause-circle-line" title="Pause/Play"></i>`;
    
    music.src = songNo.songPath;
    
    music.play();
    isPlay = true;

    music.addEventListener('ended', playNextSong);
}

function selectSong(){

    let selectedSong;
    if (isPlay){
        music.pause();
        document.querySelector('.list-song').addEventListener('click', (dets)=>{

            nowSong = dets.target.id;
            selectedSong = songs[nowSong];
            playSong(selectedSong);
    
        });        
    }

    document.querySelector('.list-song').addEventListener('click', (dets)=>{

        nowSong = dets.target.id;
        selectedSong = songs[nowSong];
        playSong(selectedSong);

    });

};

function getRandomSongIndex() {
    const songsArraySize = songs.length;
    const randomIndex = Math.floor(Math.random() * songsArraySize);
    return randomIndex;
}

function controls(){

    let play_pause = document.querySelector('#play-pause');
    play_pause.addEventListener('click', ()=>{
        if (isPlay) 
        {
            document.querySelector('#play-pause').innerHTML = `<i class="ri-play-circle-line" title="Pause/Play"></i>`;
            music.pause();
            isPlay = false;
        }
        else
        {
            playSong(songs[nowSong]);
        }
    });

    var next = document.querySelector('#next');
    next.addEventListener('click', () => {
        nowSong++;
        if(nowSong >= songs.length){
            nowSong = 0;
        };
        playSong(songs[nowSong])
    });

    var prev = document.querySelector("#prev");
    prev.addEventListener("click", function() {
        nowSong--;
        if(nowSong < 0) {
            nowSong = songs.length - 1;
        };
        playSong(songs[nowSong]);
    });

    var random = document.querySelector('#random');
    random.addEventListener("click", function() {
        playSong(songs[getRandomSongIndex()]);
    });

    var repeat = document.querySelector('#repeat');
    repeat.addEventListener("click", function() {
        if(!isLooping) {
            isLooping = true;
            document.querySelector('#repeat i').style.backgroundColor = 'gray';
            document.querySelector('#repeat i').style.color = 'white';

        }
        else {
            isLooping = false;
            document.querySelector('#repeat i').style.backgroundColor = 'transparent';
            document.querySelector('#repeat i').style.color = 'black';
        }
    });

};

search();
displaySongs();
selectSong();
controls();