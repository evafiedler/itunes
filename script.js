$(document).ready(function(){

    var button = getQueryParameter("button");
    if(button === "click"){
        document.getElementById("artist").value = getQueryParameter("term");
        document.getElementById("number").value = getQueryParameter("limit");
        search();
    }


    $("#button").click(function(){
        search();
    });
});

function search(){
    $("#track").empty();
    var artist = $("#artist").val();

    $.ajax({
        url: "https://itunes.apple.com/search?term=" + artist,
        type: 'GET',
        crossDomain: true,
        dataType: 'jsonp',
        success: function (result) {
            process(result);
        },
        error: function(){
            alert('Failed!');
        }
    });
}

function getQueryParameter(name) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] === name){return pair[1];}
    }
    return false;
}

function process(data){
    var myResult = data;
    var num = $("#number").val();
    var track = $("#track");
    if(myResult.resultCount === 0){
        track.append("There are no results for this search");
        track.css("text-align", "center");
    }else{
        for(var i = 0; i < num; i++){
            track.append("<tr id=row" + i + "></tr>");
            $("#row" + i).append("<td><img src ='" + myResult.results[i].artworkUrl100 + "'></td>");
            $("#row" + i).append("<td id=td" + i + "></td>");
            $("#td" + i).append("<div>" + (i + 1) + ".</div>");
            $("#td" + i).append("<div>" + myResult.results[i].trackName + "</div>");
            $("#td" + i).append("<div>" + myResult.results[i].collectionName + "</div>");
            $("#td" + i).append("<div>" + myResult.results[i].artistName + "</div>");
            $("#td" + i).append("<a href='details.html?term=" + myResult.results[i].artistName + "&song=" + i + "&limit=" + num + "'>More info</a>");
            $("#row" + i).append("<td><audio src='" + myResult.results[i].previewUrl + "' controls></audio></td>");
        }
    }
}