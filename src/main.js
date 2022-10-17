
const API_URL_RANDOM = 'https://api.thedogapi.com/v1/images/search?limit=5';
const API_URL_FAVORITES = 'https://api.thedogapi.com/v1/favourites';
const API_URL_DELETE_FAVORITES = (id) => `https://api.thedogapi.com/v1/favourites/${id}`;
const API_UPLOAD_URL = 'https://api.thedogapi.com/v1/images/upload';


const random_dogs_btn = document.querySelector('#get-a-dog');
random_dogs_btn.addEventListener('click',randomDogs);
const uploadBtn = document.querySelector('#uploadBtn');
uploadBtn.addEventListener('click', uploadDoggoPicture);


const spanError = document.querySelector('span');
const spanSave = document.querySelector('#saved');
const spanDelete = document.querySelector('#deleted');
const spanUpload = document.querySelector('#upload');

// const filePreview = document.getElementById('file').files[0];
//   filePreview.addEventListener('change', () => {previewImage})
 


async function randomDogs () {
    const response = await fetch(API_URL_RANDOM)
    const data = await response.json()
    console.log(data)
    console.log('aqui')

    if(response.status !== 200){
      spanError.textContent = `Ooops! There is an error: ${response.status}`
    } else {

        spanError.innerText = '';
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const img3 = document.getElementById('img3');
        const img4 = document.getElementById('img4');
        const img5 = document.getElementById('img5');

        const bt1 = document.querySelector('#btn1');
        const bt2 = document.querySelector('#btn2');
        const bt3 = document.querySelector('#btn3');
        const bt4 = document.querySelector('#btn4');
        const bt5 = document.querySelector('#btn5');

        img1.src = data[0].url
        img2.src = data[1].url
        img3.src = data[2].url
        img4.src = data[3].url
        img5.src = data[4].url

        bt1.onclick = () => saveFavouritesDogs(data[0].id);
        bt2.onclick = () => saveFavouritesDogs(data[1].id);
        bt3.onclick = () => saveFavouritesDogs(data[2].id);
        bt4.onclick = () => saveFavouritesDogs(data[3].id);
        bt5.onclick = () => saveFavouritesDogs(data[4].id);
    }
        
        
}

async function loadFavouritesDogs () {
  const res = await fetch(API_URL_FAVORITES, {
    method: 'GET',
    headers: {
      'x-api-key': API_KEY,
    }
  });
  const data = await res.json()
  console.log(data)
  console.log('favoritos')

  if(res.status !== 200) {
    spanError.textContent = `Ooops! There is an error: ${res.status} ohh no! ${data.message}`
    console.log('not favorites')
  } else {
    const section = document.getElementById('favoriteDoggos');
    section.innerHTML = '';
    const div = document.createElement('div')
    const h2 = document.createElement('h2');
    const h2Text = document.createTextNode('Your favorites');
    h2.appendChild(h2Text);
    div.appendChild(h2);
    div.id = 'h2-favorites-container';
    section.appendChild(div);


    data.forEach(doggo => {
      const figure = document.createElement('figure');
      figure.classList.add('favoriteDoggos-img-container')
      const img = document.createElement('img')
      const btn = document.createElement('button');
      const btnText = document.createTextNode('X');
      
      btn.appendChild(btnText);
      img.src = doggo.image.url;
      figure.appendChild(img);
      btn.onclick = () => deleteFavouritesDogs(doggo.id);
      btn.id = 'remove-btn'
      figure.appendChild(btn);
      section.appendChild(figure);
      

    })
  }
      
}

async function saveFavouritesDogs (id) {
  
  const response = await fetch(API_URL_FAVORITES, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    },
    body: JSON.stringify({
      image_id: id
    }),
  });
  const data = response.json();
  console.log(data)

  

  if(response.status !== 200) {
    spanError.textContent = `Ooops! There is an error: ${response.status} hmm...${data.error}`
    console.log('Not not');
  } else {
    loadFavouritesDogs();
    console.log('saved');
  }
      
}

async function deleteFavouritesDogs (id) {
  const response = await fetch(API_URL_DELETE_FAVORITES(id), {
    method: 'DELETE',
    headers: {
      'x-api-key': API_KEY,
    }
    
  });
  const data = response.json();
  console.log(data)

  if(response.status !== 200) {
    spanError.textContent = `Ooops! There is an error: ${response.status} hmm...${data.error}`
    console.log('Not not');
  } else {
    
    loadFavouritesDogs();
    console.log('Deleted');
  }
}

async function uploadDoggoPicture () {
  const form = document.querySelector('#uploadForm');
  const formData = new FormData(form);

  console.log(formData.get('file'))

  const response = await fetch(API_UPLOAD_URL, {
    method: 'POST', 
    headers: {
      'x-api-key': API_KEY
    },
    body: formData,
  })
  const data = await response.json()

  if(response.status !== 201) {
    spanError.textContent = `Ooops! There was an error: ${response.status} hmm...${data.error}Try later`
    console.log('Not not');
  } else {
    spanUpload.textContent = `Upload succesful! Check in your favorites`
    console.log(data);
    console.log(data.url);
    saveFavouritesDogs(data.id)
    loadFavouritesDogs();
    console.log('Updated');
  }

}
 function previewImage () {
  const IMG = document.querySelector('#newDogPreview');
  const reader = new FileReader();
  const filePreview = document.querySelector('#newFile').files[0];
  reader.addEventListener('load', () => {

    IMG.src = reader.result; }, false);

    if(filePreview) {
      reader.readAsDataURL(filePreview)
    }

}

loadFavouritesDogs();
 randomDogs();