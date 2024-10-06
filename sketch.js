// function setup() {
//   createCanvas(700, 500);
// }

// function draw() {
//   background(5);
//   circle(60);
// }
let exampleShader;

// load in the shader
function preload() {
  exampleShader = loadShader('example.vert', 'example.frag');
}

function setup() {
  createCanvas(800, 800, WEBGL);
  
  // tell p5 to use the shader
  shader(exampleShader);

  noStroke();
}

function draw() {
  clear();
  background(5);
  exampleShader.setUniform("millis", millis());
  exampleShader.setUniform("mills", millis()); 
  // run shader
  // rect(0, 0, width, height);
  ellipse(0, 0, height, width, 1000);
}
