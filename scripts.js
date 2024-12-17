// منوی همبرگری
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// فیلتر آهنگ‌ها بر اساس ژانر
const genreLinks = document.querySelectorAll('.genres ul li a');
const tracks = document.querySelectorAll('.track');

genreLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const genre = link.textContent.toLowerCase();

        tracks.forEach(track => {
            if (genre === 'all' || track.dataset.genre.includes(genre)) {
                track.style.display = 'block';
            } else {
                track.style.display = 'none';
            }
        });
    });
});

// ساخت پلی‌لیست داینامیک
const playlist = [];
const playlistContainer = document.querySelector('.playlists');
const addToPlaylistButtons = document.querySelectorAll('.add-to-playlist');

addToPlaylistButtons.forEach(button => {
    button.addEventListener('click', () => {
        const trackTitle = button.dataset.title;

        if (!playlist.includes(trackTitle)) {
            playlist.push(trackTitle);
            updatePlaylistUI();
        } else {
            alert('This track is already in your playlist!');
        }
    });
});

function updatePlaylistUI() {
    const playlistHTML = playlist.map(title => `<div>${title}</div>`).join('');
    playlistContainer.innerHTML = `<h2>Your Playlist</h2>${playlistHTML}`;
}

// پلیر پیشرفته (پخش پشت سر هم آهنگ‌ها)
let currentTrackIndex = 0;
const audioPlayer = document.querySelector('audio');
const playNextButton = document.querySelector('.play-next');

playNextButton.addEventListener('click', () => {
    if (currentTrackIndex < tracks.length - 1) {
        currentTrackIndex++;
    } else {
        currentTrackIndex = 0;
    }
    const nextTrack = tracks[currentTrackIndex].querySelector('audio source').src;
    audioPlayer.src = nextTrack;
    audioPlayer.play();
});

// ذخیره اطلاعات پلی‌لیست در LocalStorage
window.addEventListener('beforeunload', () => {
    localStorage.setItem('playlist', JSON.stringify(playlist));
});

window.addEventListener('load', () => {
    const savedPlaylist = JSON.parse(localStorage.getItem('playlist'));
    if (savedPlaylist) {
        savedPlaylist.forEach(track => playlist.push(track));
        updatePlaylistUI();
    }
});

// افکت‌های انیمیشنی برای دکمه‌ها
const buttons = document.querySelectorAll('button, a');

buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
        button.style.transition = 'transform 0.3s';
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const dropdownToggle = document.querySelector('.dropdown-toggle');

    dropdownToggle.addEventListener("click", (e) => {
        e.preventDefault();
        const dropdownMenu = dropdownToggle.nextElementSibling;
        dropdownMenu.classList.toggle("show");
    });
});

// آرایه برای ذخیره آهنگ‌های پلی‌لیست
let userPlaylist = [];

// فانکشن برای افزودن آهنگ به پلی‌لیست
function addToPlaylist(title, artist, src) {
    // چک کن آهنگ تکراری نباشه
    const exists = userPlaylist.some(track => track.src === src);
    if (!exists) {
        userPlaylist.push({ title, artist, src });
        renderPlaylist();
    } else {
        alert("This track is already in your playlist!");
    }
}

// فانکشن برای نمایش پلی‌لیست در صفحه
function renderPlaylist() {
    const playlistContainer = document.getElementById("playlist-tracks");
    playlistContainer.innerHTML = ""; // پاک کردن پلی‌لیست قبلی

    userPlaylist.forEach(track => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <strong>${track.title}</strong> - ${track.artist}
            <audio controls>
                <source src="${track.src}" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
        `;
        playlistContainer.appendChild(listItem);
    });
}

// اضافه کردن Event Listener برای دکمه‌های "افزودن به پلی‌لیست"
document.addEventListener("DOMContentLoaded", () => {
    const addToPlaylistButtons = document.querySelectorAll(".add-to-playlist");

    addToPlaylistButtons.forEach(button => {
        button.addEventListener("click", () => {
            const title = button.dataset.title;
            const artist = button.dataset.artist;
            const src = button.dataset.src;

            addToPlaylist(title, artist, src);
        });
    });
});

// آرایه برای ذخیره آهنگ‌های مورد علاقه
let favoriteTracks = [];

// فانکشن برای اضافه کردن آهنگ به لیست مورد علاقه
function addToFavorites(title, artist, src, heartElement) {
    // چک کردن اینکه آهنگ قبلاً اضافه نشده باشه
    const exists = favoriteTracks.some(track => track.src === src);

    if (!exists) {
        favoriteTracks.push({ title, artist, src });
        heartElement.classList.add("liked"); // قلب قرمز می‌شود
        renderFavorites();
    } else {
        // حذف آهنگ از لیست در صورت کلیک مجدد
        favoriteTracks = favoriteTracks.filter(track => track.src !== src);
        heartElement.classList.remove("liked");
        renderFavorites();
    }
}

// فانکشن برای نمایش آهنگ‌های مورد علاقه
function renderFavorites() {
    const favoritesContainer = document.getElementById("favorite-tracks");
    favoritesContainer.innerHTML = ""; // پاک کردن لیست قبلی

    favoriteTracks.forEach(track => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <strong>${track.title}</strong> - ${track.artist}
            <audio controls>
                <source src="${track.src}" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
        `;
        favoritesContainer.appendChild(listItem);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const hearts = document.querySelectorAll(".heart"); // قلب‌ها

    hearts.forEach(heart => {
        heart.addEventListener("click", () => {
            const title = heart.dataset.title;
            const artist = heart.dataset.artist;
            const src = heart.dataset.src;

            addToFavorites(title, artist, src, heart);
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const hearts = document.querySelectorAll(".heart");

    hearts.forEach(heart => {
        heart.addEventListener("click", () => {
            heart.classList.toggle("favorite");
            heart.textContent = heart.classList.contains("favorite") ? "❤️" : "♡";
            console.log("Added to favorites:", heart.dataset.title);
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const addFavButtons = document.querySelectorAll(".add-fav-btn");

    addFavButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const trackElement = button.closest(".track");
            const trackName = trackElement.querySelector("h3").innerText;
            const trackSrc = trackElement.querySelector("audio source").src;

            const favoriteTrack = {
                name: trackName,
                src: trackSrc
            };

            // خواندن لیست قبلی از LocalStorage
            let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

            // بررسی عدم تکراری بودن آهنگ
            const isDuplicate = favorites.some(track => track.src === trackSrc);

            if (!isDuplicate) {
                favorites.push(favoriteTrack);
                localStorage.setItem("favorites", JSON.stringify(favorites));
                alert(`${trackName} added to favorites!`);
            } else {
                alert("This track is already in your favorites!");
            }
        });
    });
});
