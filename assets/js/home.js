document.addEventListener('DOMContentLoaded', function() {

    setTimeout(function() {
      loadImmagini();
    }, 1500);
  
    const loginButton = document.getElementById('loginButton');

    loginButton.addEventListener('click', function() {
        console.log("Bottone Login cliccato");

        const username = document.getElementById('usernameInput').value;
        const password = document.getElementById('passwordInput').value;

        const existingError = document.querySelector('.login-error');
        if (existingError) {
            existingError.remove();
        }

        if (username === 'admin' && password === 'password') {
            console.log("Accesso effettuato");
            window.location.href = 'backoffice.html';
        } else {
            const errorMessage = document.createElement('span');
            errorMessage.classList.add('login-error', 'text-danger');
            errorMessage.textContent = 'LOGIN ERRATO';

            const secondFormGroup = document.querySelectorAll('.form-group')[1];
            secondFormGroup.appendChild(errorMessage);
        }
    });
});


function loadImmagini() {

    let Url = 'https://striveschool-api.herokuapp.com/api/product/'
    
    fetch(Url, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "User-Agent": "PostmanRuntime/7.35.0",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4NmU2MjI2NzYxNDAwMTgzYzMwYTMiLCJpYXQiOjE3MDIzOTE0MzMsImV4cCI6MTcwMzYwMTAzM30.Qlve07Xo6zzz5ZWmAGw1UHJ68fP2NcpMqwBEecxztRM"
        }
        })
    .then(response => response.json())
    
    .then(json => {
        console.log(json);
        
        let divPadre = document.querySelector('#padreCard');
        divPadre.innerHTML = '';
        json.forEach(element => {
            let divCol = document.createElement('div');
            divCol.className = 'cardsingola col-md-4 d-flex align-items-stretch img-fluid';
            divCol.innerHTML = `<div class="card mb-4 shadow-sm">
            <img src="${element.imageUrl}" alt="foto">
            <div class="card-body">
              <h5 class="card-title">${element.name}</h5>
              <p class="card-text">
              ${element.description}
              </p>
              <div class="d-flex justify-content-center align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-success text-white btn-outline-secondary">
                    View Details
                  </button>
                </div>
                <small class="text-muted" style="display:none">${element._id}</small>
              </div>
            </div>
          </div>`
        divPadre.appendChild(divCol)
        });
    })
    .catch(error => console.log(error + " c'è un errore nella creazione delle cards"))
    
    inizioEventListner()

} 

function inizioEventListner() {
  let divContenitore = document.querySelector('main')
  divContenitore.addEventListener('click', (e) => {
    e.preventDefault();
    if(e.target.className === 'btn btn-sm btn-success text-white btn-outline-secondary') {
      let idElemento = e.target.parentNode.parentNode.childNodes[3].innerText;

      sessionStorage.setItem('details', idElemento)
      window.location.href = "details.html";
    }
  })
}