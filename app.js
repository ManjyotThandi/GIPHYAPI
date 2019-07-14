// create strings which will then be turned into buttons
var topics = ["KobeBryant", "LeBronJames", "KevinDurant ", "StephenCurry"]


// create buttons using the strings in topics
function createButtons() {
    $("#buttons").empty()
    for (i = 0; i < topics.length; i++) {
       // $("#buttons").append(`<button>${topics[i]}</button>`)
       var button = $("<button>")
       button.attr("id",topics[i])
       $("#buttons").append(button)
       button.text(topics[i])
    }

}
// function to send request to GIPHY API
function sendRequest(name) {
    let myURL = "https://api.giphy.com/v1/gifs/search?api_key=KFGYD45UWz3Temu8o3X4H0ST70dGuP3A&q=" + name + "&limit=10&offset=0&rating=G&lang=en"

    //API call

    $.ajax({
        url: myURL,
        method: "GET"
    }).then(function (response) {
        for(i=0; i < 10; i++) {
            $("#GIFS").append(`<img src=${response.data[i].images.fixed_width_still.url} data-still=${response.data[i].images.fixed_width_still.url} data-animate=${response.data[i].images.preview_gif.url} data-state="still" class="gif">`)
            $("#GIFS").append(`<p>Rating:${response.data[i].rating}</p>`)
        }
    })
    
}


// when you click on a gif change the state from still to animate or animate to still 
function changeState(){
$("#GIFS").on("click", ".gif", function() {
    var state = $(this).attr("data-state")
    if(state === "still") {
        $(this).attr("src",$(this).attr("data-animate"))
        $(this).attr("data-state", "animate")
    }
    else {
        $(this).attr("src",$(this).attr("data-still"))
        $(this).attr("data-state", "still")
    }
})
}

// When clicking on Submit, append to variable topics
function addButton() {
$("#submit").click(function(event){
    event.preventDefault()
    var inputValue = $("#input").val()
    //oneWord(inputValue)
    topics.push(inputValue)
    createButtons()
})
}

// Put the Input into one work for the search
function oneWord(input) {
    return input.split(" ").join("+")
}
//-----------------------------------------CODE-------------------------------------------------------------------------
createButtons()
addButton()
// when you click on a button, get the response
$("#buttons").click(function(event){
    $("#GIFS").empty()
    var name = event.target.id
    sendRequest(name)
    changeState()
    
})






