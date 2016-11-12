var svgctrl = d3.select('svg');
var c1 = svgctrl.append('circle');
var p1 = svgctrl.append('polygon');
var c2 = svgctrl.append('circle');
var p2 = svgctrl.append('polygon');
var r1 = svgctrl.append('rect');
var r2 = svgctrl.append('rect');
var c3 = svgctrl.append('circle');
var e1 = svgctrl.append('ellipse');
var e2 = svgctrl.append('ellipse');
var e3 = svgctrl.append('ellipse');

c1.attr('cx', 200).attr('cy', 220).attr('r', 100).attr('stroke', 'black').attr('stroke-width',4).attr('fill', 'black');
p1.attr('points', '200,120 140,298 290,178 110,178 260,298').attr('fill', 'yellow').attr('stroke', 'yellow').attr('stroke-width',2).attr('fill-rule', 'nonzero');
c2.attr('cx', 500).attr('cy', 220).attr('r', 100).attr('stroke', 'black').attr('stroke-width',4).attr('fill', 'black');
p2.attr('points', '500,120 440,298 590,178 410,178 560,298').attr('fill', 'yellow').attr('stroke', 'yellow').attr('stroke-width',2).attr('fill-rule', 'nonzero');
r1.attr('x', 275).attr('y', 420).attr('rx', 20).attr('ry', 20).attr('width', 150).attr('height', 150).attr('fill', 'red').attr('stroke','pink').attr('stroke-width',5).attr('opacity',0.5);
r2.attr('x', 25).attr('y', 15).attr('rx', 20).attr('ry', 20).attr('width', 650).attr('height', 650).attr('fill', 'none').attr('stroke','black').attr('stroke-width',5).attr('opacity',0.5);
c3.attr('cx', 350).attr('cy', 350).attr('r', 40).attr('stroke', 'pink').attr('stroke-width',3).attr('fill', 'red');
e1.attr('cx', 350).attr('cy', 730).attr('rx', 220).attr('ry', 30).attr('fill', 'purple');
e2.attr('cx', 350).attr('cy', 700).attr('rx', 190).attr('ry', 20).attr('fill', 'lime');
e3.attr('cx', 350).attr('cy', 675).attr('rx', 170).attr('ry', 15).attr('fill', 'yellow');


function a(){
    c1.remove();
    c2.remove();
    p1.remove();
    p2.remove();
  var l1 = svgctrl.append('line');
  l1.attr('x1', 100).attr('y1', 220).attr('x2', 300).attr('y2', 220).attr('stroke', 'rgb(255,255,0)').attr('stroke-width',20);
  var l2 = svgctrl.append('line');
  l2.attr('x1', 400).attr('y1', 220).attr('x2', 600).attr('y2', 220).attr('stroke', 'rgb(255,255,0)').attr('stroke-width',20);
}

function b(){
  e1.attr('fill', 'red');
  e2.attr('fill', 'green');
  e3.attr('fill', 'lightblue');
}

function c(){
r2.remove();  
var c3 = svgctrl.append('circle');
c3.attr('cx', 350).attr('cy', 340).attr('r', 325).attr('stroke', 'grey').attr('stroke-width',4).attr('fill', 'none');

}