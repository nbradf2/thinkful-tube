$(document).ready(function () {

    // STEP 1 - Get input from user

    $('#search-form').submit(function (event) {
        // If page refreshes when you submit the form use "preventDefault()" to force JS to handle the form submission
        event.preventDefault();
        // Get value from the input box
        let userInput = $('#query').val();
        // Use that value to call the getResults function defined below
        getResults(userInput);
    });

    // STEP 2 - Using input from the user (query) make the API call to get the JSON response
    function getResults(userSearchTerm) {
        $.getJSON("https://www.googleapis.com/youtube/v3/search", {
                part: "snippet", // Youtube API special paramter
                maxResults: 20, // Number of results per page
                key: "AIzaSyCrGFyqH3k1epbj2LLoN-dFHvQ01u2ki40",
                q: userSearchTerm, // Search query from the user
                type: "video" // Only return videos so we can take the video ID and link back to YouTube
            },
            function (receivedApiData) {
                // Show the JSON array received from the API call
                console.log(receivedApiData);
                // If there are no results, show an error
                if (receivedApiData.pageInfo.totalResults == 0) {
                    alert("No videos found!");
                }
                // If there are results, call the displaySearchResults
                else {
                    displaySearchResults(receivedApiData.items);
                }
            });
    }

    // STEP 3 - Using the JSON response (videos), populate the relevant part of your HTML with the variable inside the JSON
    function displaySearchResults(videosArray) {

        // Create an empty variable to store one LI for each of the results
        let buildHtmlOutput = '';

        $.each(videosArray, function (videosArrayKey, videosArrayValue) {
            // Create and populate one LI for each of the results
            buildHtmlOutput += "<li>";
            buildHtmlOutput += "<p>" + videosArrayValue.snippet.title + "</p>"; // output video title
            buildHtmlOutput += "<a href='https://www.youtube.com/watch?v=" + videosArrayValue.id.videoId + "' target='blank'>"; // Target 'blank' is going to open the video in a new window
            buildHtmlOutput += "<img src='" + videosArrayValue.snippet.thumbnails.high.url + "'/>"; // display video's thumbnail
            buildHtmlOutput += "</a>";
            buildHtmlOutput += "</li>";
        });

        // Use the HTML output to show it in the index.html
        $("#search-results ul").html(buildHtmlOutput);
    }

});
