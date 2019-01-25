$(document).ready(function(){
    var artist = getQueryParameter("term");
    var song = getQueryParameter("song");
    console.log(artist);
    console.log(song);

    $.ajax({
        url: "https://itunes.apple.com/search?term=" + artist + "&song=" + song,
        type: 'GET',
        crossDomain: true,
        dataType: 'jsonp',
        success: function (result) {
            display(result);
            console.log(result);
        },
        error: function(){
            alert('Failed!');
        }
    });
});

function getQueryParameter(name) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] === name){return pair[1];}
    }
    return false;
}

function display(data){
    var artist = getQueryParameter("term");
    var song = getQueryParameter("song");
    var details = $("#details");
    details.append("<div><img src ='" + data.results[song].artworkUrl100 + "'></div>");
    details.append("<div>Song: " + data.results[song].trackName + "</div>");
    details.append("<div>Album: " + data.results[song].collectionName + "</div>");
    details.append("<div>Artist: " + data.results[song].artistName + "</div>");
    details.append("<div>Genre: " + data.results[song].primaryGenreName + "</div>");

    var minutes = convert(data.results[song].trackTimeMillis);
    details.append("<div>Track Length: " + minutes + "</div>");

    var dateString = new Date(data.results[song].releaseDate);
    details.append("<div>Release Date: " + dateString.toDateString() + "</div>");

    var explicit = data.results[song].trackExplicitness;

    if(explicit === "explicit"){
        details.append("<div>Explicit</div>");
    }else{
        details.append("<div>Not Explicit</div>");
    }

    details.append("<a href='" + data.results[song].collectionViewUrl + "' target='_blank'>Album Info</a>");

    details.append("<div><audio src='" + data.results[song].previewUrl + "' controls></audio></div>");

    var num = getQueryParameter("limit");
    details.append("<a href='index.html?term=" + artist + "&button=click&limit=" + num + "'>Back to Search</a>");
}

function convert(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}