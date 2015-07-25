
// Little Canvas things

var canvas = document.querySelector("#first-canvas"),
    ctx = canvas.getContext("2d");

window.requestAnimFrame = (function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };
})();

// Configuration, Play with these
var config = {
  particleNumber: 0,
  maxParticleSize: 10,
  maxSpeed: 80
};

// Some Variables hanging out
var particles = [];

// Particle Constructor
var Particle = function Particle(x, y) {
  this.x = x || Math.round(Math.random() * canvas.width);
  this.y = y || Math.round(Math.random() * canvas.height);
  this.r = Math.ceil(Math.random() * config.maxParticleSize);
  this.c = this.Color();
  this.s = Math.pow(Math.ceil(Math.random() * config.maxSpeed), 0.7);
  this.d = Math.round(Math.random() * 360);
};

Particle.prototype.Color = function() {
  var r, g, b, a, variation;

  r = Math.floor(Math.random() *80 + 130);
  g = Math.floor(Math.random() *80 + 222);
  b = Math.floor(Math.random() *80 + 240);
  a = Math.random();
  console.log("rgba(" + r + "," + g + "," + b + "," + a + ")");

  return "rgba(" + r + "," + g + "," + b + "," + a + ")";
};

Particle.prototype.Update = function() {
  var a = 180 - (this.d + 90);

  this.d > 0 && this.d < 180 ? this.x += this.s * Math.sin(this.d) / Math.sin(this.s) : this.x -= this.s * Math.sin(this.d) / Math.sin(this.s);
  this.d > 90 && this.d < 270 ? this.y += this.s * Math.sin(a) / Math.sin(this.s) : this.y -= this.s * Math.sin(a) / Math.sin(this.s);
};

Particle.prototype.Draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.c;
  ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
  ctx.fill();
  ctx.closePath();
};

var cleanUpArray = function() {
  particles = particles.filter(function (p) {
    return p.x > -100 && p.y > -100;
  });
};

var initParticles = function(numParticles, x, y) {
  for (var i = 0; i < numParticles; i++) {
    particles.push(new Particle(x, y));
    particles[i].Draw();
  }
};

var frame = function frame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.map(function (p) {
    p.Update();
    p.Draw();
  });

  window.requestAnimFrame(frame);
};

var fisrtCanvasInit = function() {
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  config.particleNumber = (document.body.clientHeight > 600 ? document.body.clientHeight - 100 : document.body.clientHeight);

  initParticles(config.particleNumber);

  frame();
}

window.onresize = fisrtCanvasInit;

document.querySelector('#first').onclick = function (event) {
    var x = event.clientX,
        y = event.clientY;
    cleanUpArray();
    initParticles(config.particleNumber, x, y);
};

window.onload = function() {
  document.querySelector('body').className = 'loaded onfirst';
  fisrtCanvasInit();

  var ing = false,
      nav = document.querySelectorAll('*[data-to]');

  for (var i = nav.length - 1; i >= 0; i--) {
    nav[i].onclick = function() {
      if (ing === true) return;

      ing = true;
      document.querySelector('#nav li.active').className = '';
      document.querySelector('body').className = 'loaded on' + this.getAttribute('data-to');
      document.querySelector('#nav a[data-to=' + this.getAttribute('data-to') + ']').parentNode.className = 'active';
      
      setTimeout(function() {
        ing = false;
      }, 400);
    }
  };
}