import musicAppDb from "./music-app-db.js";


musicAppDb.open()
    .then(() => {
        //This is used to get data from the firebase database
        musicAppDb.getAll().then((musics) => {
            displayData(musics)
        })
    })
    .catch((error) => {
        console.log("Error Occurred: ", error)
    })

document.getElementById('addbtn').addEventListener('click', function () {
    addNewSong();
});

function addNewSong() {

    const titleInput = document.getElementById('songs-title');
    const artistInput = document.getElementById('songs-artist');

    const errorTitle = document.getElementById('errorMsgTitle');
    const errorArtist = document.getElementById('errorMsg');

    errorTitle.innerHTML = '';
    errorArtist.innerHTML = '';

    const title = titleInput.value;
    const artist = artistInput.value;

    if (title !== '' && artist !== '') {

        musicAppDb.add(title, artist)

        titleInput.value = '';
        artistInput.value = '';



    } else {
        if (title === '') {
            errorTitle.innerHTML = 'Title is required.';
            errorTitle.style.display = 'block';
            errorTitle.style.color = 'red';
            errorTitle.style.fontWeight = 'bold';


        }
        if (artist === '') {
            errorArtist.innerHTML = 'Artist is required.';
            errorArtist.style.display = 'block';
            errorArtist.style.color = 'red';
            errorArtist.style.fontWeight = 'bold';
        }
    }
}


function displayData(musicList) {
    const songsListForm = document.getElementById('songs-list-form');

    if (musicList === 0) {
        songsListForm.innerHTML = `<h1> Musics not found </h1>`
    }

    musicList.forEach(music => {
        var timestamp = Date.now();
        var songsContainer = document.createElement('div');
        songsContainer.id = 'songsdata-' + timestamp;
        songsContainer.style.display = 'block';
        songsContainer.style.padding = '0.5rem';
        songsContainer.style.margin = '1rem';
        songsContainer.style.backgroundColor = '#ffffff';
        songsListForm.appendChild(songsContainer);

        /* Creating new container for the title and the likes */

        var nameContainer = document.createElement('div');
        nameContainer.id = 'songsFormat';
        nameContainer.style.display = 'flex';
        nameContainer.style.justifyContent = 'space-between';
        songsContainer.appendChild(nameContainer);

        var songDetails = document.createElement('div');
        songDetails.id = 'songs-details';

        var titleName = document.createElement('p');
        titleName.textContent = `${music.title}`;
        titleName.style.fontSize = '20px';
        titleName.style.fontWeight = '600';

        var artistName = document.createElement('p');
        artistName.textContent = `${music.artist}`;
        artistName.style.fontWeight = '300';
        artistName.style.opacity = '0.5';


        var likeContainer = document.createElement('div');
        likeContainer.id = 'like-detail';
        var like = document.createElement('p');
        like.textContent = `Likes: ${music.likes}`;
        like.style.margin = '1rem 2rem 0 0';
        likeContainer.appendChild(like);

        /* Creating container for button */

        var newContainer = document.createElement('div');
        newContainer.id = 'buttondata';
        newContainer.style.display = 'flex';
        newContainer.style.justifyContent = 'space-between'
        songsContainer.appendChild(newContainer);

        /* Creating and styling remove button */

        var removeButton = document.createElement('button');
        removeButton.id = 'removeBtn';
        removeButton.style.display = 'block';
        removeButton.textContent = 'Remove'
        removeButton.style.width = '7rem';
        removeButton.style.margin = '1rem 0 0.2rem 0rem';
        removeButton.style.textAlign = 'center';
        removeButton.style.borderRadius = '5px';
        removeButton.style.color = '#ffffff';
        removeButton.style.backgroundColor = '#FF0303';

        /* Creating and styling like button */

        var likeButton = document.createElement('button');
        likeButton.id = 'likeBtn';
        likeButton.style.display = 'block';
        likeButton.textContent = '+1 Like';
        likeButton.style.width = '7rem';
        likeButton.style.margin = '1rem 0 0.2rem 0rem';
        likeButton.style.textAlign = 'center';
        likeButton.style.borderRadius = '5px';
        likeButton.style.color = '#ffffff';
        likeButton.style.backgroundColor = '#387ADF';

        removeButton.dataset.songsContainerId = songsContainer.id;

        // Add event listener for remove button click
        removeButton.addEventListener('click', function () {
            var containerToRemove = document.getElementById(removeButton.dataset.songsContainerId);
            if (containerToRemove) {
                musicAppDb.delete(music.id);
                containerToRemove.remove();

            }
        });

        // Add event listener for like button click

        likeButton.addEventListener('click', function (event) {
            musicAppDb.update(music.id, ++music.likes-1).then(() => {
                like.textContent = 'Likes: ' + music.likes;
            }).catch((error) => {
                console.log("Error occurred");
            });

            event.preventDefault();

        });

        nameContainer.appendChild(songDetails);
        nameContainer.appendChild(likeContainer);
        songDetails.appendChild(titleName);
        songDetails.appendChild(artistName);
        newContainer.appendChild(removeButton);
        newContainer.appendChild(likeButton);
    });


}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js', {
        scope: '/'
    })
        .then((registration) => {
            // console.log('Registration successful', registration);
        })
        .catch((error) => {
            // console.log('Service Worker not found');
        });
} else {
    // console.log('Service Worker not available');
}
