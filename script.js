// setting up a function to run on the click of the search button
$("#search").on("click", function() {
    event.preventDefault();
    console.log("clicked");

    var startYear = parseInt($(".start-year").val());
    var endYear = parseInt($(".end-year").val());

    if(startYear > 2020 || startYear < 1930) {
        $(".start-year").val("")
    }

    
    if(endYear > 2020 || endYear < 1930) {
        $(".end-year").val("")
    }



    var searchQuery = $(".search-query").val().trim();
    console.log(searchQuery)
    // setting the api and query string for the ajax call
    // if statement depending on the users reuest values
    var apiKey = "VMU7yTXM4dOt0QRT8qkBXND2EMSS6od6";

    console.log(jQuery.type(startYear));

    if($(".start-year").val() == "" && $(".end-year").val() == "") {
        console.log("no years selected");
        var queryUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchQuery + "&api-key=" + apiKey;
    } else if ($(".start-year").val() == "") {
        console.log("no start year");
        var queryUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchQuery + "&end_date=" + endYear + "1231&api-key=" + apiKey;
    } else if ($(".end-year").val() == "") {
        console.log("no end year");
        var queryUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchQuery + "&begin_date=" + startYear + "0101&api-key=" + apiKey;
    } else {
        console.log("all queries selected");
        var queryUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchQuery + "&begin_date=" + startYear + "0101&end_date=" + endYear + "1231&api-key=" + apiKey;
    }
    
    // var queryUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=" + apiKey;
    // var queryUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&begin_date=" + startYear + "0101&end_date=" + endYear + "1231&api-key=" + apiKey;
    // https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&begin_date=20120101&end_date=20180101&api-key=

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