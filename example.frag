precision mediump float;

varying vec2 pos;

vec4 color1 = vec4(0.5, 0.1, 0.9, 1.);
vec4 color2 = vec4(0.1, 0.8, 0.7, 1.);

uniform float millis;

void main() {
  color1.r = (sin(millis/1000.) + 1.)/ 2.;
  color2.r = (cos(millis/1000.) + 1.)/ 2.;
  vec4 color = mix(color1, color2, pos.x);
  gl_FragColor = color;
}