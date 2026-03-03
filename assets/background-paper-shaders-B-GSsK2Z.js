var L=Object.defineProperty;var F=(t,e,i)=>e in t?L(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i;var s=(t,e,i)=>F(t,typeof e!="symbol"?e+"":e,i);import{r as p,j as U,p as W}from"./index-DABPyK0H.js";const C=`#version 300 es
precision mediump float;

layout(location = 0) in vec4 a_position;

uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_imageAspectRatio;
uniform float u_originX;
uniform float u_originY;
uniform float u_worldWidth;
uniform float u_worldHeight;
uniform float u_fit;
uniform float u_scale;
uniform float u_rotation;
uniform float u_offsetX;
uniform float u_offsetY;

out vec2 v_objectUV;
out vec2 v_objectBoxSize;
out vec2 v_responsiveUV;
out vec2 v_responsiveBoxGivenSize;
out vec2 v_patternUV;
out vec2 v_patternBoxSize;
out vec2 v_imageUV;

vec3 getBoxSize(float boxRatio, vec2 givenBoxSize) {
  vec2 box = vec2(0.);
  // fit = none
  box.x = boxRatio * min(givenBoxSize.x / boxRatio, givenBoxSize.y);
  float noFitBoxWidth = box.x;
  if (u_fit == 1.) { // fit = contain
    box.x = boxRatio * min(u_resolution.x / boxRatio, u_resolution.y);
  } else if (u_fit == 2.) { // fit = cover
    box.x = boxRatio * max(u_resolution.x / boxRatio, u_resolution.y);
  }
  box.y = box.x / boxRatio;
  return vec3(box, noFitBoxWidth);
}

void main() {
  gl_Position = a_position;

  vec2 uv = gl_Position.xy * .5;
  vec2 boxOrigin = vec2(.5 - u_originX, u_originY - .5);
  vec2 givenBoxSize = vec2(u_worldWidth, u_worldHeight);
  givenBoxSize = max(givenBoxSize, vec2(1.)) * u_pixelRatio;
  float r = u_rotation * 3.14159265358979323846 / 180.;
  mat2 graphicRotation = mat2(cos(r), sin(r), -sin(r), cos(r));
  vec2 graphicOffset = vec2(-u_offsetX, u_offsetY);


  // ===================================================

  float fixedRatio = 1.;
  vec2 fixedRatioBoxGivenSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );

  v_objectBoxSize = getBoxSize(fixedRatio, fixedRatioBoxGivenSize).xy;
  vec2 objectWorldScale = u_resolution.xy / v_objectBoxSize;

  v_objectUV = uv;
  v_objectUV *= objectWorldScale;
  v_objectUV += boxOrigin * (objectWorldScale - 1.);
  v_objectUV += graphicOffset;
  v_objectUV /= u_scale;
  v_objectUV = graphicRotation * v_objectUV;

  // ===================================================

  v_responsiveBoxGivenSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  float responsiveRatio = v_responsiveBoxGivenSize.x / v_responsiveBoxGivenSize.y;
  vec2 responsiveBoxSize = getBoxSize(responsiveRatio, v_responsiveBoxGivenSize).xy;
  vec2 responsiveBoxScale = u_resolution.xy / responsiveBoxSize;

  #ifdef ADD_HELPERS
  v_responsiveHelperBox = uv;
  v_responsiveHelperBox *= responsiveBoxScale;
  v_responsiveHelperBox += boxOrigin * (responsiveBoxScale - 1.);
  #endif

  v_responsiveUV = uv;
  v_responsiveUV *= responsiveBoxScale;
  v_responsiveUV += boxOrigin * (responsiveBoxScale - 1.);
  v_responsiveUV += graphicOffset;
  v_responsiveUV /= u_scale;
  v_responsiveUV.x *= responsiveRatio;
  v_responsiveUV = graphicRotation * v_responsiveUV;
  v_responsiveUV.x /= responsiveRatio;

  // ===================================================

  float patternBoxRatio = givenBoxSize.x / givenBoxSize.y;
  vec2 patternBoxGivenSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  patternBoxRatio = patternBoxGivenSize.x / patternBoxGivenSize.y;

  vec3 boxSizeData = getBoxSize(patternBoxRatio, patternBoxGivenSize);
  v_patternBoxSize = boxSizeData.xy;
  float patternBoxNoFitBoxWidth = boxSizeData.z;
  vec2 patternBoxScale = u_resolution.xy / v_patternBoxSize;

  v_patternUV = uv;
  v_patternUV += graphicOffset / patternBoxScale;
  v_patternUV += boxOrigin;
  v_patternUV -= boxOrigin / patternBoxScale;
  v_patternUV *= u_resolution.xy;
  v_patternUV /= u_pixelRatio;
  if (u_fit > 0.) {
    v_patternUV *= (patternBoxNoFitBoxWidth / v_patternBoxSize.x);
  }
  v_patternUV /= u_scale;
  v_patternUV = graphicRotation * v_patternUV;
  v_patternUV += boxOrigin / patternBoxScale;
  v_patternUV -= boxOrigin;
  // x100 is a default multiplier between vertex and fragmant shaders
  // we use it to avoid UV presision issues
  v_patternUV *= .01;

  // ===================================================

  vec2 imageBoxSize;
  if (u_fit == 1.) { // contain
    imageBoxSize.x = min(u_resolution.x / u_imageAspectRatio, u_resolution.y) * u_imageAspectRatio;
  } else if (u_fit == 2.) { // cover
    imageBoxSize.x = max(u_resolution.x / u_imageAspectRatio, u_resolution.y) * u_imageAspectRatio;
  } else {
    imageBoxSize.x = min(10.0, 10.0 / u_imageAspectRatio * u_imageAspectRatio);
  }
  imageBoxSize.y = imageBoxSize.x / u_imageAspectRatio;
  vec2 imageBoxScale = u_resolution.xy / imageBoxSize;

  v_imageUV = uv;
  v_imageUV *= imageBoxScale;
  v_imageUV += boxOrigin * (imageBoxScale - 1.);
  v_imageUV += graphicOffset;
  v_imageUV /= u_scale;
  v_imageUV.x *= u_imageAspectRatio;
  v_imageUV = graphicRotation * v_imageUV;
  v_imageUV.x /= u_imageAspectRatio;

  v_imageUV += .5;
  v_imageUV.y = 1. - v_imageUV.y;
}`,B=1920*1080*4;let D=class{constructor(e,i,r,l,o=0,n=0,a=2,u=B,h=[]){s(this,"parentElement");s(this,"canvasElement");s(this,"gl");s(this,"program",null);s(this,"uniformLocations",{});s(this,"fragmentShader");s(this,"rafId",null);s(this,"lastRenderTime",0);s(this,"currentFrame",0);s(this,"speed",0);s(this,"currentSpeed",0);s(this,"providedUniforms");s(this,"mipmaps",[]);s(this,"hasBeenDisposed",!1);s(this,"resolutionChanged",!0);s(this,"textures",new Map);s(this,"minPixelRatio");s(this,"maxPixelCount");s(this,"isSafari",G());s(this,"uniformCache",{});s(this,"textureUnitMap",new Map);s(this,"initProgram",()=>{const e=H(this.gl,C,this.fragmentShader);e&&(this.program=e)});s(this,"setupPositionAttribute",()=>{const e=this.gl.getAttribLocation(this.program,"a_position"),i=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,i);const r=[-1,-1,1,-1,-1,1,-1,1,1,-1,1,1];this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array(r),this.gl.STATIC_DRAW),this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0)});s(this,"setupUniforms",()=>{const e={u_time:this.gl.getUniformLocation(this.program,"u_time"),u_pixelRatio:this.gl.getUniformLocation(this.program,"u_pixelRatio"),u_resolution:this.gl.getUniformLocation(this.program,"u_resolution")};Object.entries(this.providedUniforms).forEach(([i,r])=>{if(e[i]=this.gl.getUniformLocation(this.program,i),r instanceof HTMLImageElement){const l=`${i}AspectRatio`;e[l]=this.gl.getUniformLocation(this.program,l)}}),this.uniformLocations=e});s(this,"renderScale",1);s(this,"parentWidth",0);s(this,"parentHeight",0);s(this,"parentDevicePixelWidth",0);s(this,"parentDevicePixelHeight",0);s(this,"devicePixelsSupported",!1);s(this,"resizeObserver",null);s(this,"setupResizeObserver",()=>{this.resizeObserver=new ResizeObserver(([e])=>{var i;if(e!=null&&e.borderBoxSize[0]){const r=(i=e.devicePixelContentBoxSize)==null?void 0:i[0];r!==void 0&&(this.devicePixelsSupported=!0,this.parentDevicePixelWidth=r.inlineSize,this.parentDevicePixelHeight=r.blockSize),this.parentWidth=e.borderBoxSize[0].inlineSize,this.parentHeight=e.borderBoxSize[0].blockSize}this.handleResize()}),this.resizeObserver.observe(this.parentElement)});s(this,"handleVisualViewportChange",()=>{var e;(e=this.resizeObserver)==null||e.disconnect(),this.setupResizeObserver()});s(this,"handleResize",()=>{let e=0,i=0;const r=Math.max(1,window.devicePixelRatio),l=(visualViewport==null?void 0:visualViewport.scale)??1;if(this.devicePixelsSupported){const c=Math.max(1,this.minPixelRatio/r);e=this.parentDevicePixelWidth*c*l,i=this.parentDevicePixelHeight*c*l}else{let c=Math.max(r,this.minPixelRatio)*l;if(this.isSafari){const g=X();c*=Math.max(1,g)}e=Math.round(this.parentWidth)*c,i=Math.round(this.parentHeight)*c}const o=Math.sqrt(this.maxPixelCount)/Math.sqrt(e*i),n=Math.min(1,o),a=Math.round(e*n),u=Math.round(i*n),h=a/Math.round(this.parentWidth);(this.canvasElement.width!==a||this.canvasElement.height!==u||this.renderScale!==h)&&(this.renderScale=h,this.canvasElement.width=a,this.canvasElement.height=u,this.resolutionChanged=!0,this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height),this.render(performance.now()))});s(this,"render",e=>{if(this.hasBeenDisposed)return;if(this.program===null){console.warn("Tried to render before program or gl was initialized");return}const i=e-this.lastRenderTime;this.lastRenderTime=e,this.currentSpeed!==0&&(this.currentFrame+=i*this.currentSpeed),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.gl.useProgram(this.program),this.gl.uniform1f(this.uniformLocations.u_time,this.currentFrame*.001),this.resolutionChanged&&(this.gl.uniform2f(this.uniformLocations.u_resolution,this.gl.canvas.width,this.gl.canvas.height),this.gl.uniform1f(this.uniformLocations.u_pixelRatio,this.renderScale),this.resolutionChanged=!1),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.currentSpeed!==0?this.requestRender():this.rafId=null});s(this,"requestRender",()=>{this.rafId!==null&&cancelAnimationFrame(this.rafId),this.rafId=requestAnimationFrame(this.render)});s(this,"setTextureUniform",(e,i)=>{if(!i.complete||i.naturalWidth===0)throw new Error(`Paper Shaders: image for uniform ${e} must be fully loaded`);const r=this.textures.get(e);r&&this.gl.deleteTexture(r),this.textureUnitMap.has(e)||this.textureUnitMap.set(e,this.textureUnitMap.size);const l=this.textureUnitMap.get(e);this.gl.activeTexture(this.gl.TEXTURE0+l);const o=this.gl.createTexture();this.gl.bindTexture(this.gl.TEXTURE_2D,o),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.LINEAR),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,i),this.mipmaps.includes(e)&&(this.gl.generateMipmap(this.gl.TEXTURE_2D),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR_MIPMAP_LINEAR));const n=this.gl.getError();if(n!==this.gl.NO_ERROR||o===null){console.error("Paper Shaders: WebGL error when uploading texture:",n);return}this.textures.set(e,o);const a=this.uniformLocations[e];if(a){this.gl.uniform1i(a,l);const u=`${e}AspectRatio`,h=this.uniformLocations[u];if(h){const c=i.naturalWidth/i.naturalHeight;this.gl.uniform1f(h,c)}}});s(this,"areUniformValuesEqual",(e,i)=>e===i?!0:Array.isArray(e)&&Array.isArray(i)&&e.length===i.length?e.every((r,l)=>this.areUniformValuesEqual(r,i[l])):!1);s(this,"setUniformValues",e=>{this.gl.useProgram(this.program),Object.entries(e).forEach(([i,r])=>{let l=r;if(r instanceof HTMLImageElement&&(l=`${r.src.slice(0,200)}|${r.naturalWidth}x${r.naturalHeight}`),this.areUniformValuesEqual(this.uniformCache[i],l))return;this.uniformCache[i]=l;const o=this.uniformLocations[i];if(!o){console.warn(`Uniform location for ${i} not found`);return}if(r instanceof HTMLImageElement)this.setTextureUniform(i,r);else if(Array.isArray(r)){let n=null,a=null;if(r[0]!==void 0&&Array.isArray(r[0])){const u=r[0].length;if(r.every(h=>h.length===u))n=r.flat(),a=u;else{console.warn(`All child arrays must be the same length for ${i}`);return}}else n=r,a=n.length;switch(a){case 2:this.gl.uniform2fv(o,n);break;case 3:this.gl.uniform3fv(o,n);break;case 4:this.gl.uniform4fv(o,n);break;case 9:this.gl.uniformMatrix3fv(o,!1,n);break;case 16:this.gl.uniformMatrix4fv(o,!1,n);break;default:console.warn(`Unsupported uniform array length: ${a}`)}}else typeof r=="number"?this.gl.uniform1f(o,r):typeof r=="boolean"?this.gl.uniform1i(o,r?1:0):console.warn(`Unsupported uniform type for ${i}: ${typeof r}`)})});s(this,"getCurrentFrame",()=>this.currentFrame);s(this,"setFrame",e=>{this.currentFrame=e,this.lastRenderTime=performance.now(),this.render(performance.now())});s(this,"setSpeed",(e=1)=>{this.speed=e,this.setCurrentSpeed(document.hidden?0:e)});s(this,"setCurrentSpeed",e=>{this.currentSpeed=e,this.rafId===null&&e!==0&&(this.lastRenderTime=performance.now(),this.rafId=requestAnimationFrame(this.render)),this.rafId!==null&&e===0&&(cancelAnimationFrame(this.rafId),this.rafId=null)});s(this,"setMaxPixelCount",(e=B)=>{this.maxPixelCount=e,this.handleResize()});s(this,"setMinPixelRatio",(e=2)=>{this.minPixelRatio=e,this.handleResize()});s(this,"setUniforms",e=>{this.setUniformValues(e),this.providedUniforms={...this.providedUniforms,...e},this.render(performance.now())});s(this,"handleDocumentVisibilityChange",()=>{this.setCurrentSpeed(document.hidden?0:this.speed)});s(this,"dispose",()=>{this.hasBeenDisposed=!0,this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null),this.gl&&this.program&&(this.textures.forEach(e=>{this.gl.deleteTexture(e)}),this.textures.clear(),this.gl.deleteProgram(this.program),this.program=null,this.gl.bindBuffer(this.gl.ARRAY_BUFFER,null),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,null),this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,null),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.getError()),this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=null),visualViewport==null||visualViewport.removeEventListener("resize",this.handleVisualViewportChange),document.removeEventListener("visibilitychange",this.handleDocumentVisibilityChange),this.uniformLocations={},this.canvasElement.remove(),delete this.parentElement.paperShaderMount});if(e instanceof HTMLElement)this.parentElement=e;else throw new Error("Paper Shaders: parent element must be an HTMLElement");if(!document.querySelector("style[data-paper-shader]")){const x=document.createElement("style");x.innerHTML=j,x.setAttribute("data-paper-shader",""),document.head.prepend(x)}const c=document.createElement("canvas");this.canvasElement=c,this.parentElement.prepend(c),this.fragmentShader=i,this.providedUniforms=r,this.mipmaps=h,this.currentFrame=n,this.minPixelRatio=a,this.maxPixelCount=u;const g=c.getContext("webgl2",l);if(!g)throw new Error("Paper Shaders: WebGL is not supported in this browser");this.gl=g,this.initProgram(),this.setupPositionAttribute(),this.setupUniforms(),this.setUniformValues(this.providedUniforms),this.setupResizeObserver(),visualViewport==null||visualViewport.addEventListener("resize",this.handleVisualViewportChange),this.setSpeed(o),this.parentElement.setAttribute("data-paper-shader",""),this.parentElement.paperShaderMount=this,document.addEventListener("visibilitychange",this.handleDocumentVisibilityChange)}};function z(t,e,i){const r=t.createShader(e);return r?(t.shaderSource(r,i),t.compileShader(r),t.getShaderParameter(r,t.COMPILE_STATUS)?r:(console.error("An error occurred compiling the shaders: "+t.getShaderInfoLog(r)),t.deleteShader(r),null)):null}function H(t,e,i){const r=t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT),l=r?r.precision:null;l&&l<23&&(e=e.replace(/precision\s+(lowp|mediump)\s+float;/g,"precision highp float;"),i=i.replace(/precision\s+(lowp|mediump)\s+float/g,"precision highp float").replace(/\b(uniform|varying|attribute)\s+(lowp|mediump)\s+(\w+)/g,"$1 highp $3"));const o=z(t,t.VERTEX_SHADER,e),n=z(t,t.FRAGMENT_SHADER,i);if(!o||!n)return null;const a=t.createProgram();return a?(t.attachShader(a,o),t.attachShader(a,n),t.linkProgram(a),t.getProgramParameter(a,t.LINK_STATUS)?(t.detachShader(a,o),t.detachShader(a,n),t.deleteShader(o),t.deleteShader(n),a):(console.error("Unable to initialize the shader program: "+t.getProgramInfoLog(a)),t.deleteProgram(a),t.deleteShader(o),t.deleteShader(n),null)):null}const j=`@layer paper-shaders {
  :where([data-paper-shader]) {
    isolation: isolate;
    position: relative;

    & canvas {
      contain: strict;
      display: block;
      position: absolute;
      inset: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      corner-shape: inherit;
    }
  }
}`;function G(){const t=navigator.userAgent.toLowerCase();return t.includes("safari")&&!t.includes("chrome")&&!t.includes("android")}function X(){const t=(visualViewport==null?void 0:visualViewport.scale)??1,e=(visualViewport==null?void 0:visualViewport.width)??window.innerWidth,i=window.innerWidth-document.documentElement.clientWidth,r=t*e+i,l=outerWidth/r,o=Math.round(100*l);return o%5===0?o/100:o===33?1/3:o===67?2/3:o===133?4/3:l}const $={fit:"contain",scale:1,rotation:0,offsetX:0,offsetY:0,originX:.5,originY:.5,worldWidth:0,worldHeight:0},N={none:0,contain:1,cover:2},Y=`
#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846
`,q=`
vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}
`,k=`
  float hash21(vec2 p) {
    p = fract(p * vec2(0.3183099, 0.3678794)) + 0.1;
    p += dot(p, p + 19.19);
    return fract(p.x * p.y);
  }
`,V={maxColorCount:10},K=`#version 300 es
precision mediump float;

uniform float u_time;

uniform vec4 u_colors[${V.maxColorCount}];
uniform float u_colorsCount;

uniform float u_distortion;
uniform float u_swirl;
uniform float u_grainMixer;
uniform float u_grainOverlay;

in vec2 v_objectUV;
out vec4 fragColor;

${Y}
${q}
${k}

float valueNoise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}

float noise(vec2 n, vec2 seedOffset) {
  return valueNoise(n + seedOffset);
}

vec2 getPosition(int i, float t) {
  float a = float(i) * .37;
  float b = .6 + fract(float(i) / 3.) * .9;
  float c = .8 + fract(float(i + 1) / 4.);

  float x = sin(t * b + a);
  float y = cos(t * c + a * 1.5);

  return .5 + .5 * vec2(x, y);
}

void main() {
  vec2 uv = v_objectUV;
  uv += .5;
  vec2 grainUV = uv * 1000.;

  float grain = noise(grainUV, vec2(0.));
  float mixerGrain = .4 * u_grainMixer * (grain - .5);

  const float firstFrameOffset = 41.5;
  float t = .5 * (u_time + firstFrameOffset);

  float radius = smoothstep(0., 1., length(uv - .5));
  float center = 1. - radius;
  for (float i = 1.; i <= 2.; i++) {
    uv.x += u_distortion * center / i * sin(t + i * .4 * smoothstep(.0, 1., uv.y)) * cos(.2 * t + i * 2.4 * smoothstep(.0, 1., uv.y));
    uv.y += u_distortion * center / i * cos(t + i * 2. * smoothstep(.0, 1., uv.x));
  }

  vec2 uvRotated = uv;
  uvRotated -= vec2(.5);
  float angle = 3. * u_swirl * radius;
  uvRotated = rotate(uvRotated, -angle);
  uvRotated += vec2(.5);

  vec3 color = vec3(0.);
  float opacity = 0.;
  float totalWeight = 0.;

  for (int i = 0; i < ${V.maxColorCount}; i++) {
    if (i >= int(u_colorsCount)) break;

    vec2 pos = getPosition(i, t) + mixerGrain;
    vec3 colorFraction = u_colors[i].rgb * u_colors[i].a;
    float opacityFraction = u_colors[i].a;

    float dist = length(uvRotated - pos);

    dist = pow(dist, 3.5);
    float weight = 1. / (dist + 1e-3);
    color += colorFraction * weight;
    opacity += opacityFraction * weight;
    totalWeight += weight;
  }

  color /= max(1e-4, totalWeight);
  opacity /= max(1e-4, totalWeight);

  float grainOverlay = valueNoise(rotate(grainUV, 1.) + vec2(3.));
  grainOverlay = mix(grainOverlay, valueNoise(rotate(grainUV, 2.) + vec2(-1.)), .5);
  grainOverlay = pow(grainOverlay, 1.3);

  float grainOverlayV = grainOverlay * 2. - 1.;
  vec3 grainOverlayColor = vec3(step(0., grainOverlayV));
  float grainOverlayStrength = u_grainOverlay * abs(grainOverlayV);
  grainOverlayStrength = pow(grainOverlayStrength, .8);
  color = mix(color, grainOverlayColor, .35 * grainOverlayStrength);

  opacity += .5 * grainOverlayStrength;
  opacity = clamp(opacity, 0., 1.);

  fragColor = vec4(color, opacity);
}
`;function Z(t){if(Array.isArray(t))return t.length===4?t:t.length===3?[...t,1]:y;if(typeof t!="string")return y;let e,i,r,l=1;if(t.startsWith("#"))[e,i,r,l]=Q(t);else if(t.startsWith("rgb"))[e,i,r,l]=J(t);else if(t.startsWith("hsl"))[e,i,r,l]=te(ee(t));else return console.error("Unsupported color format",t),y;return[E(e,0,1),E(i,0,1),E(r,0,1),E(l,0,1)]}function Q(t){t=t.replace(/^#/,""),t.length===3&&(t=t.split("").map(o=>o+o).join("")),t.length===6&&(t=t+"ff");const e=parseInt(t.slice(0,2),16)/255,i=parseInt(t.slice(2,4),16)/255,r=parseInt(t.slice(4,6),16)/255,l=parseInt(t.slice(6,8),16)/255;return[e,i,r,l]}function J(t){const e=t.match(/^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([0-9.]+))?\s*\)$/i);return e?[parseInt(e[1]??"0")/255,parseInt(e[2]??"0")/255,parseInt(e[3]??"0")/255,e[4]===void 0?1:parseFloat(e[4])]:[0,0,0,1]}function ee(t){const e=t.match(/^hsla?\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(?:,\s*([0-9.]+))?\s*\)$/i);return e?[parseInt(e[1]??"0"),parseInt(e[2]??"0"),parseInt(e[3]??"0"),e[4]===void 0?1:parseFloat(e[4])]:[0,0,0,1]}function te(t){const[e,i,r,l]=t,o=e/360,n=i/100,a=r/100;let u,h,c;if(i===0)u=h=c=a;else{const g=(v,S,d)=>(d<0&&(d+=1),d>1&&(d-=1),d<.16666666666666666?v+(S-v)*6*d:d<.5?S:d<.6666666666666666?v+(S-v)*(.6666666666666666-d)*6:v),x=a<.5?a*(1+n):a+n-a*n,R=2*a-x;u=g(R,x,o+1/3),h=g(R,x,o),c=g(R,x,o-1/3)}return[u,h,c,l]}const E=(t,e,i)=>Math.min(Math.max(t,e),i),y=[0,0,0,1];function ie(){if(typeof window>"u"){console.warn("Paper Shaders: can’t create an image on the server");return}const t=new Image;return t.src=re,t}const re="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";function oe(t){const e=p.useRef(void 0),i=p.useCallback(r=>{const l=t.map(o=>{if(o!=null){if(typeof o=="function"){const n=o,a=n(r);return typeof a=="function"?a:()=>{n(null)}}return o.current=r,()=>{o.current=null}}});return()=>{l.forEach(o=>o==null?void 0:o())}},t);return p.useMemo(()=>t.every(r=>r==null)?null:r=>{e.current&&(e.current(),e.current=void 0),r!=null&&(e.current=i(r))},t)}function T(t){if(t.naturalWidth<1024&&t.naturalHeight<1024){if(t.naturalWidth<1||t.naturalHeight<1)return;const e=t.naturalWidth/t.naturalHeight;t.width=Math.round(e>1?1024*e:1024),t.height=Math.round(e>1?1024:1024/e)}}async function M(t){const e={},i=[],r=o=>{try{return o.startsWith("/")||new URL(o),!0}catch{return!1}},l=o=>{try{return o.startsWith("/")?!1:new URL(o,window.location.origin).origin!==window.location.origin}catch{return!1}};return Object.entries(t).forEach(([o,n])=>{if(typeof n=="string"){if(!n){e[o]=ie();return}if(!r(n)){console.warn(`Uniform "${o}" has invalid URL "${n}". Skipping image loading.`);return}const a=new Promise((u,h)=>{const c=new Image;l(n)&&(c.crossOrigin="anonymous"),c.onload=()=>{T(c),e[o]=c,u()},c.onerror=()=>{console.error(`Could not set uniforms. Failed to load image at ${n}`),h()},c.src=n});i.push(a)}else n instanceof HTMLImageElement&&T(n),e[o]=n}),await Promise.all(i),e}const O=p.forwardRef(function({fragmentShader:e,uniforms:i,webGlContextAttributes:r,speed:l=0,frame:o=0,width:n,height:a,minPixelRatio:u,maxPixelCount:h,mipmaps:c,style:g,...x},R){const[v,S]=p.useState(!1),d=p.useRef(null),_=p.useRef(null),A=p.useRef(r);p.useEffect(()=>((async()=>{const b=await M(i);d.current&&!_.current&&(_.current=new D(d.current,e,b,A.current,l,o,u,h,c),S(!0))})(),()=>{var b;(b=_.current)==null||b.dispose(),_.current=null}),[e]),p.useEffect(()=>{let m=!1;return(async()=>{var w;const I=await M(i);m||(w=_.current)==null||w.setUniforms(I)})(),()=>{m=!0}},[i,v]),p.useEffect(()=>{var m;(m=_.current)==null||m.setSpeed(l)},[l,v]),p.useEffect(()=>{var m;(m=_.current)==null||m.setMaxPixelCount(h)},[h,v]),p.useEffect(()=>{var m;(m=_.current)==null||m.setMinPixelRatio(u)},[u,v]),p.useEffect(()=>{var m;(m=_.current)==null||m.setFrame(o)},[o,v]);const P=oe([d,R]);return U.jsx("div",{ref:P,style:n!==void 0||a!==void 0?{width:typeof n=="string"&&isNaN(+n)===!1?+n:n,height:typeof a=="string"&&isNaN(+a)===!1?+a:a,...g}:g,...x})});O.displayName="ShaderMount";function ne(t,e){var i,r,l;for(const o in t){if(o==="colors"){const n=Array.isArray(t.colors),a=Array.isArray(e.colors);if(!n||!a){if(Object.is(t.colors,e.colors)===!1)return!1;continue}if(((i=t.colors)==null?void 0:i.length)!==((r=e.colors)==null?void 0:r.length)||!((l=t.colors)!=null&&l.every((u,h)=>{var c;return u===((c=e.colors)==null?void 0:c[h])})))return!1;continue}if(Object.is(t[o],e[o])===!1)return!1}return!0}const f={name:"Default",params:{...$,speed:1,frame:0,colors:["#e0eaff","#241d9a","#f75092","#9f50d3"],distortion:.8,swirl:.1,grainMixer:0,grainOverlay:0}},se=p.memo(function({speed:e=f.params.speed,frame:i=f.params.frame,colors:r=f.params.colors,distortion:l=f.params.distortion,swirl:o=f.params.swirl,grainMixer:n=f.params.grainMixer,grainOverlay:a=f.params.grainOverlay,fit:u=f.params.fit,rotation:h=f.params.rotation,scale:c=f.params.scale,originX:g=f.params.originX,originY:x=f.params.originY,offsetX:R=f.params.offsetX,offsetY:v=f.params.offsetY,worldWidth:S=f.params.worldWidth,worldHeight:d=f.params.worldHeight,..._}){const A={u_colors:r.map(Z),u_colorsCount:r.length,u_distortion:l,u_swirl:o,u_grainMixer:n,u_grainOverlay:a,u_fit:N[u],u_rotation:h,u_scale:c,u_offsetX:R,u_offsetY:v,u_originX:g,u_originY:x,u_worldWidth:S,u_worldHeight:d};return U.jsx(O,{..._,speed:e,frame:i,fragmentShader:K,uniforms:A})},ne);function ue({colors:t=["#0d2e1a","#1a4a28","#2d6b3e","#3d8c52"],speed:e=.8,className:i}){return U.jsx("div",{className:W("absolute inset-0 w-full h-full",i),children:U.jsx(se,{className:"w-full h-full",colors:t,speed:e})})}export{ue as S};
