/* eslint-disable no-console */
const API = 'https://itunes.apple.com/search';

const audioTag = document.querySelector('audio');
const searchInput = document.querySelector('#search');
const searchBtn = document.querySelector('.search-container .btn');
const songsList = document.querySelector('.results');

/**
 * Fetch iTunes API with HTTP GET
 * return JSON
 * @param {string} term
 */
const fetchItunesSongs = async (term) => {
	try {
		const url = `${API}?term=${term}`;
		const response = await fetch(url);
		console.log(response);
		const responseJson = await response.json();
		return responseJson;
	} catch (err) {
		console.log(err);
		throw err;
	}
};

/**
 * Handle click on the <ul> results list
 * Get the corresponding <li>, and the data attribute attached
 * Play the song
 * @param {object} event
 */
const handleClickSong = (event) => {
	// on utilise currentTarget pour être sur d'avoir le DIV
	// même si on a cliqué sur un des enfants (le h1 par ex)
	const target = event.currentTarget;
	console.log(target);
	if (target.tagName !== 'LI' && !target.getAttribute('data-preview')) {
		return;
	}
	audioTag.setAttribute('src', target.getAttribute('data-preview'));
	audioTag.play();
};

/**
 * From a song object returned by the API, create a <li> tag
 * @param {object} s
 */
const createSongLI = (s) => {
	const li = document.createElement('li');
	const h1 = document.createElement('h1');
	const span = document.createElement('span');
	h1.textContent = s.artistName;
	span.textContent = s.trackName;
	li.id = s.trackId;
	li.setAttribute('data-preview', s.previewUrl);
	li.addEventListener('click', handleClickSong);
	li.appendChild(h1);
	li.appendChild(span);
	return li;
};

/**
 * Perform a search request + add the results to the DOM
 */
const search = async () => {
	let searchValue = searchInput.value.trim();
	if (!searchValue) return;
	songsList.innerHTML = '';

	searchValue = searchValue.replace(' ', '+');
	let response;
	try {
		response = await fetchItunesSongs(searchValue);
	} catch (err) { // affichage des erreurs éventuelles
		document.querySelector('.error').style.display = 'block';
		document.querySelector('.no-result').style.display = 'none';
		return;
	}
	if (response.resultCount) {
		document.querySelector('.error').style.display = 'none';
		document.querySelector('.no-result').style.display = 'none';
		const songs = response.results.filter((r) => r.kind === 'song');
		const ul = document.createElement('ul');
		songs.forEach((s) => {
			ul.appendChild(createSongLI(s));
		});
		songsList.appendChild(ul);
	} else {
		document.querySelector('.no-result').style.display = 'block';
		document.querySelector('.error').style.display = 'none';
	}
};

/**
 * Bind keypress event on input to catch the enter key event
 */
searchInput.addEventListener('keypress', (e) => {
	if (e.key === 'Enter') {
		search();
	}
});
// bind the click on button
searchBtn.addEventListener('click', search);
// bind the click on result list
songsList.addEventListener('click', handleClickSong);
