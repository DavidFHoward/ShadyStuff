// function setup() {
//   createCanvas(700, 500);
// }

// function draw() {
//   background(5);
//   circle(60);
// }
// const audio = document.querySelector("audio");
// audio.play();

const audioContext = new AudioContext();

console.log(location.hostname);
if(location.hostname === "127.0.0.1")
{
  audio = new Audio("./Deep Sea Soar.mp3");
}
else
{
  audio = new Audio("https://davidfhoward.github.io/ShadyStuff/Deep Sea Soar.mp3");
}

const analyser = audioContext.createAnalyser();
var playing = false;




let exampleShader;


// load in the shader
function preload() {
  const source = audioContext.createMediaElementSource(audio);
  source.connect(audioContext.destination);

  source.connect(analyser);
  exampleShader = loadShader('example.vert', 'example.frag');
}

function setup() {
  createCanvas(800, 800, WEBGL);
  
  // tell p5 to use the shader
  shader(exampleShader);
  noStroke();
  
  //audio stuff
  const playBtn = document.querySelector(".play");
  const pauseBtn = document.querySelector(".pause");
  const stopBtn = document.querySelector(".stop");

  playBtn.addEventListener("click", () => {
    audioContext.state === "suspended"? audioContext.resume() : null;
    audio.play();
    playing = true;
    
  });

  pauseBtn.addEventListener("click", () => {
    audio.pause();
    playing = false;
  });

  stopBtn.addEventListener("click", () => {
    audio.pause();
    audio.currentTime = 0;
    playing = false;
  });

  
}

function draw() {
  clear();
  background(5);


  // audio stuff
  analyser.fftSize = 2048;
  analyser.frequencyBinCount = 1024;
  const dataArray = new Uint8Array(1024);
  //var num = dataArray[512];
  // console.log(audioContext);
  // console.log(analyser);

  //console.log(dataArray);
  exampleShader.setUniform("millis", millis());
  exampleShader.setUniform("mills", millis());
  exampleShader.setUniform("playing", playing);
  analyser.getByteTimeDomainData(dataArray);
  exampleShader.setUniform("fft", dataArray); 
  //console.log(dataArray);
  ellipse(0, 0, height, width, 100);
  
}

// //audio stuff I found that doesnt work
// var audioContext = new AudioContext();
// var source = audioContext.createBufferSource();
// source.connect(audioContext.destination);
// var xhr = new XMLHttpRequest();
// xhr.open("GET", "Future Meow.mp3", true);
// xhr.responseType = "arraybuffer";
// xhr.onload = function() {
//   var buffer = audioContext.createBuffer(xhr.response, false);
//   source.buffer = buffer;
//   source.noteOn(0);
// };
// xhr.send();

