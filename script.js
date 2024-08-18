const httpRest = () => {
    let verda = "";

    fetch('https://pokeapi.co/api/v2/pokemon?limit=51')
        .then(response => response.json())
        .then(data => {
            console.log(data);

            data.results.forEach(pokemon => {
                // Haciendo una nueva solicitud para obtener detalles de cada Pokémon
                fetch(pokemon.url)
                    .then(response => response.json())
                    .then(details => {
                        // Accede a la URL de la imagen del frente del Pokémon
                        const imageUrl = details.sprites.front_default;
                        const stats = [];

                        details.stats.forEach(stat => {
                            stats[stats.length] = `${stat.stat.name}: ${stat.base_stat}`;
                        });

                        const statsString = stats.join(', ');
                        verda += `<div class="col-4">
                          <div class="card" style="width: 18rem; box-shadow: 15px 6px 10px rgba(0, 0, 0, 0.5);">
                              <img src="${imageUrl}" class="card-img-top" alt="...">
                              <div class="card-body">
                                  <h5 class="card-title">${pokemon.name}</h5>
                                  <p class="card-text">Altura: ${details.height} | Peso: ${details.weight} </p>
                                  <p class="card-text"> ${statsString}</p>
                                  <hr>
                              </div>
                          </div>
                        </div>`;


                        document.getElementById("cuerpo").innerHTML = verda;
                    });
            });
        });
}

httpRest();