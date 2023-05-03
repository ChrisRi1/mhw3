var inputval = document.querySelector('#cityinput')
var btn = document.querySelector('#add');
var city = document.querySelector('#cityoutput')
var descrip = document.querySelector('#description')
var temp = document.querySelector('#temp')
var wind = document.querySelector('#wind')

 
apik = "80f112075ad026d2852b907f503a08f9"

//convertitore
function convertion(val){
    return (val - 273).toFixed(2)
}
    btn.addEventListener('click', function(){
        fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputval.value+'&appid='+apik)
        .then(res => res.json())
         .then(data => {
            var nameval = data['name']
            var descrip = data['weather']['0']['description']
            var tempature = data['main']['temp']
            var wndspd = data['wind']['speed']

            city.innerHTML=`Condizioni <span>${nameval}<span>`
            temp.innerHTML = `Temperatura: <span>${ convertion(tempature)} C</span>`
            description.innerHTML = `Cielo: <span>${descrip}<span>`
            wind.innerHTML = `Vento: <span>${wndspd} km/h<span>`

        })

        .catch(err => alert('Errore,città non trovata'))
    })
