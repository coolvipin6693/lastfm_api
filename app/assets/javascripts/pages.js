var param = '';

function search(){
    param = document.getElementById("searchParam").value;

    if(param){
        saveHistory()

        $.ajax({
            beforeSend: function() { document.getElementById("loader-ajax").style.visibility = "visible"; },
            complete: function() { document.getElementById("loader-ajax").style.visibility = "hidden"; },
            type: 'GET',
            url: 'https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' + param + '&autocorrect=1&api_key=0a784086eedee87610825e6cefc8a46e&format=json'
        }).done(function(response) {
                document.getElementById("mainpanel").style.visibility = "visible";
                document.getElementById("toptracks").style.visibility = "visible";

                if(!response.artist.bio.summary){
                    document.getElementById("desc").innerHTML = "Could not load description!";
                }
                else{
                    document.getElementById("desc").innerHTML = response.artist.bio.summary;
                }
                document.getElementById("pic").innerHTML = '<img src="' + response.artist.image[3]["#text"] + '" style="height:193px;">';
                document.getElementById("tracklist") .innerHTML = '';

                document.getElementById("similarArtists").innerHTML = '<h1>' + 'Similar Artists' + '</h1>';

                for(var i=0;i<response.artist.similar.artist.length;i++){
                    document.getElementById("similarArtists").innerHTML += '<img src="' + response.artist.similar.artist[i].image[1]["#text"] + '">' + ', ' + '<a href="' + response.artist.similar.artist[i].url + '" target="_blank">' + response.artist.similar.artist[i].name + '</a>' + '<br><br>';
                }

                document.getElementById("tags").innerHTML = "Associated Tags : ";

                for(var j=0;j<response.artist.tags.tag.length;j++){
                    document.getElementById("tags").innerHTML += '<a href="'+ response.artist.tags.tag[j].url +'" class="btn btn-primary" target="_blank">' + response.artist.tags.tag[j].name + '</a>' + ' ';
                }
            }
        );
    }
    else{
        alert("Please Enter the Name of the Artist!");
    }
}

function saveHistory(){
    var urlP = document.URL + "storeKeyword?keyword=" + param;
    var metaTags = document.getElementsByTagName('meta');

    var AJAX_req = new XMLHttpRequest();
    AJAX_req.open( "POST", urlP, true );
    AJAX_req.setRequestHeader("Content-type", "application/json");
    for ( var i = 0; i < metaTags.length; i++) {
        if (metaTags[i].name === 'csrf-token') {
            AJAX_req.setRequestHeader('X-CSRF-Token', metaTags[i].content);
        }
    }
    AJAX_req.onreadystatechange = function(){
        if( AJAX_req.readyState == 4 && AJAX_req.status == 200 ){
            console.log("Success!");
        }
    }
    AJAX_req.send();
}

function gettracks(){
    $.ajax({
        beforeSend: function() { document.getElementById("loader-ajax").style.visibility = "visible"; },
        complete: function() { document.getElementById("loader-ajax").style.visibility = "hidden"; },
        type: 'GET',
        url: 'https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist='+ param +'&api_key=0a784086eedee87610825e6cefc8a46e&format=json'
    }).done(function(response) {
            document.getElementById("tracklist") .innerHTML = '<thead><tr><th>#</th><th>Name</th><th>Duration</th><th>Playcount</th><th>Listeners</th></tr></thead><tbody>';
            for(var k=0;k<response.toptracks.track.length;k++){
                document.getElementById("tracklist") .innerHTML += '<tr>' + '<td>' + (k+1) + '</td>' + '<td>' + '<a href="'+ response.toptracks.track[k].url +'" target="_blank">' + response.toptracks.track[k].name + '</a>' + '</td>' + '<td>' + response.toptracks.track[k].duration + ' s' + '</td>' + '<td>' + response.toptracks.track[k].playcount + '</td>' + '<td>' + response.toptracks.track[k].listeners + '</td>' + '</tr>';
            }
            document.getElementById("tracklist") .innerHTML += '</tbody>';
        }
    );
}

