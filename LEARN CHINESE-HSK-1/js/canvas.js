'use strict';
const WritingCanvas = (() => {
  const canvas=document.getElementById('writing-canvas'),ctx=canvas.getContext('2d');
  let drawing=false,last=null,color='#2457d6',brush=5,erase=false,strokes=[],current=null,guide=false;
  function resize(){const rect=canvas.getBoundingClientRect();const dpr=window.devicePixelRatio||1;const old=document.createElement('canvas');old.width=canvas.width;old.height=canvas.height;old.getContext('2d').drawImage(canvas,0,0);canvas.width=Math.round(rect.width*dpr);canvas.height=Math.round(rect.height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);redraw();}
  function redraw(){const r=canvas.getBoundingClientRect();ctx.clearRect(0,0,r.width,r.height);for(const stroke of strokes)drawStroke(stroke);if(current)drawStroke(current);}
  function drawStroke(s){if(!s.points.length)return;ctx.save();ctx.lineCap='round';ctx.lineJoin='round';ctx.strokeStyle=s.erase?'#fffefa':s.color;ctx.lineWidth=s.brush;ctx.beginPath();ctx.moveTo(s.points[0].x,s.points[0].y);if(s.points.length===1){ctx.lineTo(s.points[0].x+.1,s.points[0].y+.1);}else s.points.slice(1).forEach(p=>ctx.lineTo(p.x,p.y));ctx.stroke();ctx.restore();}
  function point(e){const r=canvas.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top};}
  canvas.addEventListener('pointerdown',e=>{e.preventDefault();canvas.setPointerCapture(e.pointerId);drawing=true;last=point(e);current={color,brush,erase,points:[last]};redraw();});
  canvas.addEventListener('pointermove',e=>{if(!drawing)return;e.preventDefault();const p=point(e);current.points.push(p);redraw();});
  function finish(){if(!drawing)return;drawing=false;if(current&&current.points.length)strokes.push(current);current=null;last=null;redraw();}
  canvas.addEventListener('pointerup',finish);canvas.addEventListener('pointercancel',finish);canvas.addEventListener('lostpointercapture',finish);
  function clear(){strokes=[];current=null;redraw();}function undo(){strokes.pop();redraw();}function setColor(c){color=c;erase=false;document.getElementById('eraser-btn').classList.remove('active');}function setBrush(n){brush=Number(n);}function setEraser(){erase=!erase;document.getElementById('eraser-btn').classList.toggle('active',erase);}
  function setGuide(on,character){guide=on;const el=document.getElementById('canvas-character');el.textContent=character||'';el.classList.toggle('visible',on);}
  window.addEventListener('resize',resize);requestAnimationFrame(resize);
  return {clear,undo,setColor,setBrush,setEraser,setGuide};
})();
