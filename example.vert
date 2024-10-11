attribute vec3 aPosition;
attribute vec2 aTexCoord;
float average;
//float test;
//int makeshiftModulo;
varying vec2 pos;

uniform float mills;
uniform int fft[1024];
uniform bool playing;
void main() {
  pos = aTexCoord;

  vec4 position = vec4(aPosition, 1.);
  position.xy = position.xy * 2. - 1.;

  //test = mills / 500.;
  //test -= floor(test);
  //test *= 100.;
  //makeshiftModulo = int(floor(test));

  for(int i = 0; i < 1024; i++)
  {
    average += float(fft[i]);
  }
  average = average / 1024.;
  position.xy *= .75;

  if(playing)
  {
    position.y += sin(mills/1000. + position.x * 8.)/18.;
    position.x += sin(mills/1000. + position.y * 8.)/18.;
    if(average > 64.)
    {
      position.xy *= (average/128.);
    }
    
  }


  gl_Position = position;
}