const audioContext = new AudioContext();
const analyser = audioContext.createAnalyser();
var playing = false;
let angleX = -500;
let angleY = -100;
let angleZ = 500;
let zoom = 0;
let img;
let average = 0;
//let exampleShader;

if(location.hostname === "127.0.0.1")
{
  audio = new Audio("./Deep Sea Soar.mp3");
}
else
{
  audio = new Audio("https://davidfhoward.github.io/ShadyStuff/Deep Sea Soar.mp3");
}

// load in the shader
function preload() {
  const source = audioContext.createMediaElementSource(audio);
  source.connect(audioContext.destination);
  img = loadImage("./cat-care_general-cat-care_body1-left.jpg")
  source.connect(analyser);
  //exampleShader = loadShader('example.vert', 'example.frag');
  
}

function setup() {
  createCanvas(800, 800, WEBGL);
  
  // tell p5 to use the shader
  //shader(exampleShader);
  //noStroke();
  
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
  background(175);


  // audio stuff
  analyser.fftSize = 2048;
  analyser.frequencyBinCount = 1024;
  const dataArray = new Uint8Array(1024);

  // console.log(audioContext);
  // console.log(analyser);


  //exampleShader.setUniform("millis", millis());
  //exampleShader.setUniform("mills", millis());
  //exampleShader.setUniform("playing", playing);
  analyser.getByteTimeDomainData(dataArray);
  //exampleShader.setUniform("fft", dataArray); 
  for(let i = 0; i < dataArray.length / 4; i++)
  {
    average += dataArray[i];
  }
  average = average / (dataArray.length / 4);
  rectMode(CENTER);
  translate(mouseX - width/2, mouseY - height/2, zoom);
  rotateX(angleX);
  rotateY(angleY);
  rotateZ(angleZ);
  
  //rect(0, 0, 150, 100);
  noStroke();
  //pointLight(255, 255, 255, -200, -200, 0);
  directionalLight(255, 100, 100, 1, 1, 0);
  ambientLight(100, 100, 255);
  //ambientMaterial(255, 0, 255);
  texture(img);
  //torus(zoom, zoom * .5, 100, 50);
  sphere(100 + average);
  
  
}

function mouseWheel(event) {
  zoom += event.delta;
}

function mouseDragged() {
  
  
  if (mouseX > 10) {
    angleY += movedX * .01;// Code to run if the mouse is on the left.
  }

  if (mouseY > 10) {
    angleX += movedY * .01;// Code to run if the mouse is near the bottom.
  }
}


