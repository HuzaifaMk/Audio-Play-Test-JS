var timer;
var timerStart;
var timeSpentOnSite = getTimeSpentOnSite();

function getTimeSpentOnSite(){
    timeSpentOnSite = parseInt(localStorage.getItem('timeSpentOnSite'));
    timeSpentOnSite = isNaN(timeSpentOnSite) ? 0 : timeSpentOnSite;
    return timeSpentOnSite;
}

function startCounting(){
    timerStart = Date.now();
    timer = setInterval(function(){
        timeSpentOnSite = getTimeSpentOnSite()+(Date.now()-timerStart);
        localStorage.setItem('timeSpentOnSite',timeSpentOnSite);
        timerStart = parseInt(Date.now());
        // Convert to seconds
        let T = parseInt(timeSpentOnSite/1000);
        console.log(T);
        if (T < 2){
          GetAudio();
        }
        if (T > 50){
          localStorage.clear();
        }
    },1000);
}
startCounting();

function GetAudio() {
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