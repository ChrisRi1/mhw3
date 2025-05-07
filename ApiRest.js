// Geolog
let latitude;
let longitude;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;

        const apiKey = 'secret';
        const apiUrl = 'http://api.positionstack.com/v1/reverse?access_key=' + apiKey + '&query=' + latitude + ',' + longitude;

fetch(apiUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        if (data && data.data && data.data.length > 0) {
            const result = data.data[0];
            
           
            let fullAddress = '';
            
            if (result.name) {
                fullAddress += result.name + ', ';
            }
            
            if (result.street) {
                fullAddress += result.street + ', ';
            }
            
            if (result.number) {
                fullAddress += result.number + ', ';
            }
            
            if (result.locality) {
                fullAddress += result.locality;
            }
            
            
            fullAddress = fullAddress.replace(/, $/, '');

           
            const inputElement = document.getElementById('searchInput');
            if (inputElement) {
                inputElement.value = fullAddress;
                /*box per indirizzo */
               // document.getElementById('addressSpan').textContent = fullAddress;

            } else {
                console.error('Elemento input non trovato');
            }
        } else {
            console.error('Nessun dato trovato nella risposta');
        }
    })
    .catch(function(error) {
        console.error('Errore nella chiamata API:', error);
    });
});
} else {
    console.error('Geolog non supportata');
}


 


/* trad */
function translatePage(targetLang) {
    const elements = document.querySelectorAll('h1, h2, h3, p, a, li,span:not(.material-symbols-outlined)');

    elements.forEach(function(el) {
        const originalText = el.innerText.trim();

        if (originalText.length > 0) {
            var url = "https://api.mymemory.translated.net/get?q=" + encodeURIComponent(originalText) + "&langpair=it|" + targetLang;

            fetch(url)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                if (data.responseData && data.responseData.translatedText) {
                    el.innerText = data.responseData.translatedText;
                }
            })
            .catch(function(error) {
                console.error("Errore nella traduzione:", error);
            });
        }
    });
}







      








