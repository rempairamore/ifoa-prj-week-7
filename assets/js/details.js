//Faccio in check per vedere se c'è un prodotto selezionato
if(sessionStorage.getItem('details') === null) {
    window.location.replace("index.html");
}

let id = sessionStorage.getItem('details')



document.addEventListener('DOMContentLoaded', function() {

    grepElement(id)
    
    async function grepElement(idElemento) {
        let oggettoJson = null;
        let Url = `https://striveschool-api.herokuapp.com/api/product/${idElemento}`
        await fetch(Url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "User-Agent": "PostmanRuntime/7.35.0",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4NmU2MjI2NzYxNDAwMTgzYzMwYTMiLCJpYXQiOjE3MDIzOTE0MzMsImV4cCI6MTcwMzYwMTAzM30.Qlve07Xo6zzz5ZWmAGw1UHJ68fP2NcpMqwBEecxztRM"
        }
        }).then(response => response.json())
        .then(json => oggettoJson = json)
        .catch(error => console.log(error))

        console.log(oggettoJson);
        const dateStringCreato = oggettoJson.createdAt;
        const dateCreato = new Date(dateStringCreato);
        const formattedDate = dateCreato.toLocaleDateString('it-IT');
        const formattedTime = dateCreato.toLocaleTimeString('it-IT');
        console.log(`Data creato: ${formattedDate}, Ora Creato:  ${formattedTime}`);

        const dateStringUpdate = oggettoJson.updatedAt;
        const dateUpdate = new Date(dateStringUpdate);
        const formattedDateUpdate = dateUpdate.toLocaleDateString('it-IT');
        const formattedTimeUpdate = dateUpdate.toLocaleTimeString('it-IT');
        console.log(`Data update: ${formattedDateUpdate}, Ora Update:  ${formattedTimeUpdate}`);


        let divMain = document.querySelector('main');
        divMain.innerHTML = `
          <div id="contenitorePrincipale" class="container d-flex">
            <div class="sinistra m-4">
              <img src="${oggettoJson.imageUrl}" alt="${oggettoJson.name}">
            </div>
            <div class="destra m-4 d-flex row justify-content-between">
              <div class="nomeOggetto">
                  <span>${oggettoJson.name}</span>
                  <p>Brand: ${oggettoJson.brand}</p>
              </div>
              <div class="dettagliOggetto w-75">
                <span>${oggettoJson.description}</span>
              </div>
              <div class="prezzoOggetto">
                <span>Price:  ${oggettoJson.price}\$</span>
              </div>
            </div>
          </div>
          <div class="container otherDetails">
            <span>Created at: ${formattedDate} ${formattedTime}</span>
            <br>
            <span>Last Update: ${formattedDateUpdate} ${formattedTimeUpdate}</span>
          </div>
        `
    }

   


})
