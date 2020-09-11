const postCharacter = () => {
    let name = $("#name").val()
    let gender = $("#gender").val()
    let country = $("#country").val()
    let birth = $("#birth").val()
    let review = $("#review").val()
    let photo = $("#photo").val()

    let character = { name, gender, country, birth, review, photo }

    $.ajax({
        type: "POST",
        url: "https://ajaxclass9g.firebaseio.com/hatoma/historicCharacters/.json",
        data: JSON.stringify(character),
        success: ( response ) => {
            console.log(`${name} ha sido Guardado`)
            getCharacters()
        },
        error: ( response ) => {console.error("No se ha guardado el personaje")
        }
    })
}




const getCharacters = () => {
    $.ajax({
        url: `https://ajaxclass9g.firebaseio.com/hatoma/historicCharacters/.json`,
        method:"GET",
        success: ( response ) => {
            // console.log( response )
            let characters = response;
            $("#character-list").empty();
            for( fbkey in characters ){
                let { name, gender, country, birth, review, photo } = characters[fbkey]
                $("#character-list").append(`
                <div class="card" style="width: 18rem;">
                <img class="card-img-top" src="${photo}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${name}</h5>
                    <p class="card-text">${review}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">${birth}</li>
                    <li class="list-group-item">${gender}</li>
                    <li class="list-group-item">${country}</li>
                </ul>
                <div class="card-body">
                    <button type="button" class="btn btn-danger btn-delete" data-llave-personaje=${fbkey}>Borrar</button>
                </div>
            </div>
                `)
            }
            $(".btn-delete").click(( event )=>{
                let fbkey = $(event.target).data("llave-personaje")
                $.ajax({
                    url: `https://ajaxclass9g.firebaseio.com/hatoma/historicCharacters/${fbkey}.json`,
                    method:"DELETE",
                    success: ( response )=>{
                        console.log(`${fbkey} fue eliminado`)
                        getCharacters();
                    },
                    error: ( error ) => {
                        console.log(error)
                    }
                });
            })
        }
    });
}

$( "#save-form" ).click(postCharacter)
getCharacters()