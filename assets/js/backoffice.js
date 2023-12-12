document.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault()
    // console.log("DOM fully loaded and parsed");
    let bottoneCreate = document.querySelector('#bottoneCreate')
    let bottoneList = document.querySelector('#bottoneList')

    bottoneCreate.addEventListener("click", funzioneCreazione);
  });


  function funzioneCreazione() {
    // console.log("ciao");
    let mainDiv = document.querySelector('main')
    mainDiv.innerHTML = `
    <div class="formInput container mt-5 ">
            <form class="w-50">
                <div class="form-group">
                    <label for="name">Name</label>
                    <small id="nameError" class="form-text text-danger"></small>
                    <input type="text" class="form-control mb-4" id="nameInput" placeholder="Enter name">
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <small id="descriptionError" class="form-text text-danger"></small>
                    <textarea class="form-control mb-4" id="descriptionInput" rows="3" placeholder="Enter description"></textarea>
                </div>
                <div class="form-group">
                    <label for="brand">Brand</label>
                    <small id="brandError" class="form-text text-danger"></small>
                    <input type="text" class="form-control mb-4" id="brandInput" placeholder="Enter brand">
                </div>
                <div class="form-group">
                    <label for="imageUrl">Image URL</label>
                    <small id="imageUrlError" class="form-text text-danger"></small>
                    <input type="url" class="form-control mb-4" id="imageUrlInput" placeholder="Enter image URL">
                </div>
                <div class="form-group">
                    <label for="price">Price</label>
                    <small id="priceError" class="form-text text-danger"></small>
                    <input type="number" class="form-control" id="priceInput" placeholder="Enter price">
                </div>
                <button id="submitInputForm" type="button" class="btn btn-primary my-4">Submit</button>
            </form>
        </div>`

    document.querySelector('#submitInputForm').addEventListener('click', () => {
        // Faccio un Controllo
        const imageUrl = document.querySelector('#imageUrlInput').value;
        const price = document.querySelector('#priceInput').value;
        const name = document.querySelector('#nameInput').value;
        const description = document.querySelector('#descriptionInput').value;
        const brand = document.querySelector('#brandInput').value;
        document.querySelector('#nameError').innerText = '';
        document.querySelector('#descriptionError').innerText = '';
        document.querySelector('#brandError').innerText = '';
        document.querySelector('#imageUrlError').innerText = '';
        document.querySelector('#priceError').innerText = '';
        
        let isValid = true;
        if (!isValidUrl(imageUrl)) {
            document.getElementById('imageUrlError').innerText = 'Please insert a valid URL eg. http://website.com/cat.jpeg';
            isValid = false;
        }
        if (isNaN(price) || price <= 0) {
            document.getElementById('priceError').innerText = 'Insert a valid numer eg. 25.2';
            isValid = false;
        }
        if (name.length < 3) {
            document.getElementById('nameError').innerText = 'Il nome deve contenere almeno 3 caratteri.';
            isValid = false;
        }
        if (description.length < 3) {
            document.getElementById('descriptionError').innerText = 'La descrizione deve contenere almeno 3 caratteri.';
            isValid = false;
        }
        if (brand.length < 3) {
            document.getElementById('brandError').innerText = 'Il marchio deve contenere almeno 3 caratteri.';
            isValid = false;
        }
        if (isValid) {
            fetchPost();
        } 
        //Fine controllo

        async function fetchPost() {
            const object = { 
                name: document.querySelector('#nameInput').value.toString(),
                description: document.querySelector('#descriptionInput').value,
                brand: document.querySelector('#brandInput').value,
                imageUrl: document.querySelector('#imageUrlInput').value,
                price: +document.querySelector('#priceInput').value
            };

            console.log(JSON.stringify(object));
            
            let risposta = null;
            await fetch('https://striveschool-api.herokuapp.com/api/product/', {
            method: 'POST',
            body: JSON.stringify(object),
            headers: {
                "Content-Type": "application/json",
                "User-Agent": "PostmanRuntime/7.35.0",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTc4NmU2MjI2NzYxNDAwMTgzYzMwYTMiLCJpYXQiOjE3MDIzOTE0MzMsImV4cCI6MTcwMzYwMTAzM30.Qlve07Xo6zzz5ZWmAGw1UHJ68fP2NcpMqwBEecxztRM"
            }
            }).then(response => response.json())
            .then(json => risposta = json)
            .catch(error => console.log(error))

            if(risposta !== null) {
                let rispostaH3 = document.createElement('h3')
                rispostaH3.innerText = `Element Created with ID --> ${risposta._id}`
                let main = document.querySelector('main')
                main.innerHTML = ''
                main.appendChild(rispostaH3) 
            } else {
                console.log("qualcosa è andato storto");
            }
        }


    })
 
  }


  function isValidUrl(string) {
    var regex = /^(http|https):\/\/[^ "]+$/;
    return regex.test(string);
  }