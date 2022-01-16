x=0;
y=0;
screen_width=0;
screen_height=0;
kiwi= "";
speak_data= "";
to_number= "";

draw_kiwi = "";

var speechRecognition=window.webkitSpeechRecognition;

var recognition=new speechRecognition();

function start(){
    document.getElementById("status").innerHTML="System is Listening, please speak";
    recognition.start();
    
}

recognition.onresult=function(event){
    console.log(event);
    var content=event.results[0][0].transcript;

    document.getElementById("status").innerHTML="The Speech has been recognized as: "+content;
    to_number = Number(content);
    console.log(to_number);
    if(Number.isInteger(to_number)){
        document.getElementById("status").innerHTML="Started Drawing kiwi";
        draw_kiwi="set";
    }
    else{
        document.getElementById("status").innerHTML = "The Speech Has Not Recognized A Number";
    }
}

function setup(){
  screen_width = window.innerWidth;
  screen_height = window.innerHeight;
  canvas=createCanvas(screen_width,screen_height-150);
  canvas.position(0,150);
}

function draw()
{
    if(draw_kiwi == "set")
    {
        document.getElementById("status").innerHTML= to_number + " kiwi drawn";
        draw_kiwi= "";
        speak_data= to_number+" kiwis Drawn";
        speak();
        for(var i = 1; i <= to_number; i++){
            x = Math.floor(Math.random()*700);
            y = Math.floor(Math.random()*400);
            image(kiwi, x, y, 50, 50);
        }
    }
}

function speak(){
  var synth = window.speechRecognition;

  var utterThis = new SpeechSynthesisUtterance(speak_data);

  synth.speak(utterThis);

  speak_data = "";
}
function preload(){
    kiwi = loadImage("kiwi.png");
}