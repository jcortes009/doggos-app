const api = axios.create({
    baseURL: 'https://api.thedogapi.com/v1',
    headers: {'x-api-key': API_KEY}
  })

  async function saveFavouritesDogs (id) {
    const {data, status} = await api.post('/favourites', {
      image_id: id,
    })

    if(status !== 200) {
      spanError.textContent = `Ooops! There is an error: ${status} hmm...${data.error}`
      console.log('Not not');
    } else {
      spanSave.textContent = `Added to my favorites`
      loadFavouritesDogs();
      console.log('saved');
    }
        
  }

  //no necesita json.stringify()


  //ad this lina to th html
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>