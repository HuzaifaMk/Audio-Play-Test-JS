function loadAudio(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;

}

function getAudio() {

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "http://localhost:3000/generateurl", false );
    xmlHttp.send( null );
    a = xmlHttp.responseText;
    console.log(a)
    document.getElementById("myAudio").src = a;
}

var x = document.getElementById("myAudio"); 

  function playAudio() { 
    x.play(); 
  }
  function pauseAudio() { 
    x.pause(); 
  }