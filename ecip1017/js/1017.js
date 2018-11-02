
//era 1 0-5million
//era 2 5mil - 10 million
//era 3 10 million 15 million

//length of an era
var era = 5000000;
var blockTime = 14.5;
var currentblk = 0;

var currentEra = (currentblk % era) + 1;
var timeRemains = (currentEra * era - currentblk) * blockTime;


var progress = (100-((era + 1 - currentblk) / era) * 100);

//show next era time
var countDownDate = (timeRemains * 1000 )  + 604800 + new Date().getTime();
var real = new Date(countDownDate);
document.getElementById("realDate").innerHTML =  formatDate(real);

function newBlk() {
  //first era stuff
  progress = (100-((era + 1 - currentblk) / era) * 100);
  $('#currentBlock').html(progress);
  document.getElementById('era-1').style.width = progress+"%";

 //second era stuffs
  if (currentEra >=2 ){document.getElementById("era2-block").style.visibility = "visible";}
  progress2 = (100-(( era * 2 + 1 - (currentblk - era)) / era * 2) * 100);
  $('#currentBlock2').html(progress2);
  document.getElementById('era-2').style.width = progress2+"%";

  //third era stuffs

   if (currentEra >=3 ){document.getElementById("era3-block").style.visibility = "visible";}
   progress3 = (100-((era * 3 + 1 - (currentblk - era*2)) / era*3) * 100);
   $('#currentBlock3').html(progress3);
   document.getElementById('era-3').style.width = progress3+"%";
}

var socket = io('http://localhost');

socket.on('newBlock', function(data) {
                currentblk = data.currentBlk;
                newBlk();
            });

// on load
window.onload = function() {
   <!-- Countdown Timer -->
	// Set the date we're counting down to
	// Update the count down every 1 second
	var x = setInterval(function() {
	   // Get todays date and time
	    var now = new Date().getTime();
	     // Find the distance between now an the count down date
	    var distance = countDownDate - now;
  // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
    document.getElementById("day-val").innerHTML =  days;
	  document.getElementById("hour-val").innerHTML =  hours;
	  document.getElementById("minute-val").innerHTML =  minutes;
	  document.getElementById("second-val").innerHTML =  seconds;


  // If the count down is finished, write some text
  if (distance < 0) {
    	clearInterval(x);
    	document.getElementById("demo").innerHTML = "Processing";
  	}
	}, 1000);

};

function formatDate(date) {
  var monthNames = [
    "January [一月]", "February [二月]", "March [三月]",
    "April [四月]", "May [五月]", "June [六月]", "July [七月]",
    "August [八月]", "September [九月]", "October [十月]",
    "November [十一月]", "December [十二月]"
  ];
  var dayNames = [
    "Sunday [星期天]",
    "Monday [星期一]",
    "Tuesday [星期二]",
    "Wednesday [星期三]",
    "Thursday [星期四]",
    "Friday [星期五]",
    "Saturday [星期六]"
  ]

  var weekday = date.getDay();
  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return dayNames[weekday] +"  - " + day + ' ' + monthNames[monthIndex] + ' ' + year;
}
