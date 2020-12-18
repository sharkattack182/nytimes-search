
$("#search").on("click", function() {
    event.preventDefault();
    console.log("clicked");

    var apiKey = "VMU7yTXM4dOt0QRT8qkBXND2EMSS6od6";
    var queryUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=" + apiKey;

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){
        var docs = response.response.docs;
        console.log(docs);
    })
})