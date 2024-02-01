


document.getElementById('addbtn').addEventListener('click', function () {
    const songsListForm = document.getElementById('songs-list-form');

    const titleInput = document.getElementById('songs-title');
    const artistInput = document.getElementById('songs-artist');

    const errorTitle = document.getElementById('errorMsgTitle');
    const errorArtist = document.getElementById('errorMsg');

    errorTitle.innerHTML = '';
    errorArtist.innerHTML = '';

    const title = titleInput.value;
    const artist = artistInput.value;

    if (title !== '' && artist !== '') {
        var songsContainer = document.createElement('div');
        songsContainer.id = 'songsdata';
        songsContainer.style.display = 'block';
        songsContainer.style.padding = '0.5rem';
        songsContainer.style.margin = '1rem';
        songsContainer.style.backgroundColor = '#ffffff';
        songsListForm.appendChild(songsContainer);

        var titleName = document.createElement('p');
        titleName.textContent = `Title: ${title}`;
        var artistName = document.createElement('p');
        artistName.textContent = `Artist: ${artist}`;
        songsContainer.appendChild(titleName);
        songsContainer.appendChild(artistName);

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
});

if ('serviceWorker' in navigator){
    navigator.serviceWorker.register('/service-worker.js')
    .then((registration) => {
        console.log('Registration successful', registration);
    })
    .catch((error) => {
        console.log('Service Worker not found');
    });
}
else {
    console.log('Service Worker not available');
}

