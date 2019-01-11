$(document).ready(function(){
    $("#button").click(function(){
        $("#track").empty();
        var artist = $("#artist").val();
        $.get("https://itunes.apple.com/search?term=" + artist, process);
    });
});

function process(data){
    var myResult = JSON.parse(data);
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
            $("#row" + i).append("<td><audio src='" + myResult.results[i].previewUrl + "' controls></audio></td>");
        }
    }
}