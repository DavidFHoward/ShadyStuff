attribute vec3 aPosition;
attribute vec2 aTexCoord;

varying vec2 pos;

uniform float mills;

void main() {
  pos = aTexCoord;

  vec4 position = vec4(aPosition, 1.);
  position.xy = position.xy * 2. - 1.;
  position.xy *= .75;
  
  position.x += sin(mills/1000. + position.y * 8.)/16.;
  gl_Position = position;
}