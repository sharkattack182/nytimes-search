// setting up a function to run on the click of the search button
$("#search").on("click", function() {
    event.preventDefault();
    console.log("clicked");

    // setting the api and query string for the ajax call
    var apiKey = "VMU7yTXM4dOt0QRT8qkBXND2EMSS6od6";
    var queryUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=" + apiKey;

    // grabbing the number of articles requested by the user
    var numberQuery = $(".form-select").children("option:selected").val();
    console.log(numberQuery);

    // run the ajax call
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){
        var docs = response.response.docs;
        console.log(docs);

        // for loop runs the number of articles requested
        for (var i = 0; i < numberQuery; i++) {
            var article = docs[i];
            var numeral = i + 1;
            console.log(numeral)

            console.log(article)

            var newCard = $("<div>");
            newCard.attr("class", "card text-center result");
            var newHeader = $("<div>");
            newHeader.attr("class", "card-header blue");
            newHeader.text("Featured")
            newCard.append(newHeader);
            var newBody = $("<div>");
            newBody.attr("class", "card-body");
            newCard.append(newBody);
            var newHeadline = $("<h5>");
            newHeadline.attr("class", "card-title");
            newHeadline.text(article.headline.main);
            newBody.append(newHeadline);
            var newByline = $("<p>");
            newByline.attr("class", "card-text");
            newByline.text(article.byline.original);
            newBody.append(newByline);

            $(".results-body").prepend(newCard);
        }
    })
})

$("#clear").on("click", function() {
    $(".results-body").empty();
})