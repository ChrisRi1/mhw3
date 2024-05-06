//modal//
document.addEventListener('DOMContentLoaded', function() {
    const sidebarTweetButton = document.querySelector('.sidebar_tweet');

    if (sidebarTweetButton) {
        sidebarTweetButton.addEventListener('click', function() {
            const modal = document.createElement('div');
            modal.classList.add('modal');
            modal.innerHTML = `
                <div class="modal-content">
                    <h2>Crea un nuovo post</h2>
                    <textarea id="postContent" placeholder="Inserisci il contenuto del post..."></textarea>
                    <button id="submitPost">Condividi</button>
                    <button id="closeModal">Chiudi</button>
                </div>
            `;
            
            document.body.appendChild(modal);

            document.getElementById('submitPost').addEventListener('click', function() {
                const postContent = document.getElementById('postContent').value;
                alert('Hai condiviso il post: ' + postContent);
                modal.remove();
            });

            document.getElementById('closeModal').addEventListener('click', function() {
                modal.remove();
            });
        });
    } else {
        console.error('Elemento con classe .sidebar_tweet non trovato.');
    }
});
// end//

// hidden menu //
const moreOption = document.getElementById('moreOption'); 
const dropdownMenu = document.getElementById('dropdownMenu'); 

if (moreOption && dropdownMenu) {
    moreOption.addEventListener('click', function() {
        
        if (dropdownMenu.style.display === 'none' || dropdownMenu.style.display === '') {
            dropdownMenu.style.display = 'block';
        } else {
            dropdownMenu.style.display = 'none';
        }
    });
} else {
    console.error('Elementi non trovati per aggiungere il menu a tendina.');
}
// fine//

//form//
document.querySelector('.tweetBox form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    
    const tweetContent = document.querySelector('.tweetBox_input input').value;

 
    if (tweetContent.trim() !== '') {
        alert('Hai twittato: ' + tweetContent);
       
        document.querySelector('.tweetBox_input input').value = '';
    } else {
        alert('Il contenuto del tweet non può essere vuoto.');
    }
});
// end//


// API//
/*const API_KEY = '';
const API_SECRET_KEY = '';


function getToken() {
  // Dati dell'applicazione Twitter
  
  const auth_url = 'https://api.twitter.com/oauth2/token';
  
  // Codifica le credenziali di autenticazione
  const credentials = btoa(`${API_KEY}:${API_SECRET_KEY}`);
  
  // Dati per la richiesta di token
  const tokenData = new URLSearchParams();
  tokenData.append('grant_type', 'client_credentials');
  
 
  fetch(auth_url, {
     method: 'POST',
     headers: {
        'Authorization': 'Basic ' + credentials,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
     },
     body: tokenData
  })
  .then(response => {
     if (!response.ok) {
        throw new Error('Errore durante il recupero del token di accesso');
     }
     return response.json();
  })
  .then(data => {
     const accessToken = data.access_token;
     
     const searchButtonLeft = document.querySelector('#search-button');
     searchButtonLeft.addEventListener('click', () => searchProfiles(accessToken));
  })
  .catch(error => {
     console.error('Si è verificato un errore:', error);
  });
}


function searchProfiles(accessToken) {
  
  const username = document.querySelector('#search-input').value;
  
  
  fetch(`https://api.twitter.com/2/users/by/username/${username}`, {
     method: 'GET',
     headers: {
        'Authorization': 'Bearer ' + accessToken
     }
  })
  .then(response => {
     if (!response.ok) {
        throw new Error('Errore durante la ricerca del profilo utente');
     }
     return response.json();
  })
  .then(data => {
     
     displayUserProfile(data);
  })
  .catch(error => {
     console.error('Si è verificato un errore:', error);
  });
}
*/


//Ns0EGOA32wmY3hosPLEd7ZgO5mOZ0Vzx//

function searchCityWeather() {
    const cityInput = document.querySelector('#city-input').value.trim();
    if (cityInput === '') {
        alert('Please enter a city name.');
        return;
    }

    const apiKey = 'Ns0EGOA32wmY3hosPLEd7ZgO5mOZ0Vzx';

    fetch(`https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${cityInput}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found.');
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                throw new Error('City not found.');
            }
            const cityKey = data[0].Key;
            return fetch(`https://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${apiKey}`);
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Weather data not available.');
            }
            return response.json();
        })
        .then(data => {
            displayWeatherInfo(data);
        })
        .catch(error => {
            alert(error.message);
        });
}

function displayWeatherInfo(data) {
    
    const weatherInfo = data[0];
    const temperature = weatherInfo.Temperature.Imperial.Value;
    const condition = weatherInfo.WeatherText;
    const city = weatherInfo.LocalizedName;

    const weatherInfoContainer = document.querySelector('#weather-info');
    weatherInfoContainer.innerHTML = `
        <h2>Current Weather in ${city}</h2>
        <p>Temperature: ${temperature} °F</p>
        <p>Condition: ${condition}</p>
    `;
}


const citySearchButton = document.querySelector('#city-search-button');
citySearchButton.addEventListener('click', searchCityWeather);
