//Get context and screen size;
var ctx = cnv.getContext("2d");
var W = window.innerWidth;
var H = window.innerHeight;
var max = 200;
var cmpt = 0;
var tab = ["white","red","orange","cyan"];

//Set Canvas and Background Color;
cnv.width = W;
cnv.height = H;
ctx.fillStyle = "#112";
ctx.fillRect(0, 0, W, H);

//Glow effect;
ctx.shadowBlur = 10;

function animate() {
  //Random position and size of stars;
  if(cmpt<max){
    let x = W * Math.random();
    let r = 2.5 * Math.random();
    let c = Math.round(4 * Math.random());
    let y = H * Math.random();


  //Draw the stars;
    ctx.beginPath();
    ctx.fillStyle = tab[c];
    ctx.shadowColor = tab[c];
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();

  //Using setTimeout instead of window.requestAnimationFrame for slower speed... window.requestAnimationFrame is approximately equal to setTimeout(func, 17);
    cmpt = cmpt+1;
    setTimeout(animate, 100);
  }
}
{
  animate();
}
