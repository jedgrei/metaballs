let c = document.getElementById("canvas");
c.width = document.documentElement.clientWidth;
c.height = document.documentElement.clientHeight;
let ctx = c.getContext("2d");

const num_circs = 50;
const min_rad = c.width/60;
const max_rad = c.width/30;
const vel = c.width/1000;
const lim_anv = Math.PI/20;
const acc_anv = Math.PI/200;
const dec_anv = 0.97;

let all_circs = [];
let all_layers = [];

function init_circs(params) {
    params.cs = [];
    for(let i = 0; i < params.num; ++i) {
        params.cs.push({
            x: randint(0, c.width),
            y: randint(0, c.height),
            r: rand(params.min_rad, params.max_rad),
            v: vel,
            a: rand(0, 2 * Math.PI),
            av: rand(-params.lim_anv, params.lim_anv),
        });
    }
    all_circs.push(params);
}

function move_circs(circs) {
    for(let circ of circs.cs) {
        // move circ
        circ.x += circ.v * Math.cos(circ.a);
        circ.y += circ.v * Math.sin(circ.a);
        circ.a += circ.av;

        // modify angle
        circ.av *= circs.dec_anv;
        circ.av += rand(-circs.acc_anv, circs.acc_anv);
        if(circ.av > circs.lim_anv) circ.av = circs.lim_anv;
        if(circ.av < -circs.lim_anv) circ.av = -circs.lim_anv;

        // bounce off
        if(circ.x - circ.r < 0) circ.a = 0;
        if(circ.x + circ.r > c.width) circ.a = Math.PI;
        if(circ.y - circ.r < 0) circ.a = Math.PI/2;
        if(circ.y + circ.r > c.height) circ.a = 3*Math.PI/2;
    }
    return circs.cs;
}

function draw() {
    c.width = document.documentElement.clientWidth;
    c.height = document.documentElement.clientHeight;

    ctx.fillStyle = bg_color;
    ctx.beginPath();
    ctx.rect(0, 0, c.width, c.height);
    ctx.fill();

    for(let circs of all_circs) {
        circs.cs = move_circs(circs);
    }
    for(let layer of all_layers) {
        metaball_sample(all_circs[layer.circs].cs, c.width, c.height);
        marching_squares(ctx, layer.color, layer.thresh);
    }
}

// sets the background color
function set_background(color) {
    bg_color = color;
}

// adds a set of circles that layers are based off of
function add_circs(params) {
    // set defaults
    if(!('num' in params)) params.num = 30;
    if(!('min_rad' in params)) params.min_rad = c.width/60;
    if(!('max_rad' in params)) params.max_rad = c.width/30;
    if(!('vel' in params)) params.vel = c.width/1000;
    if(!('lim_anv' in params)) params.lim_anv = Math.PI/20;
    if(!('acc_anv' in params)) params.acc_anv = Math.PI/200;
    if(!('dec_anv' in params)) params.dec_anv = 0.97;

    init_circs(params);
}

// adds a layer that shows circles
// multiple layers can use the same set of circles
function add_layer(params) {
    // set defaults
    if(!('circs' in params)) params.circs = 0;
    if(!('thresh' in params)) params.thresh = 1;
    if(!('color' in params)) params.color = "#e0e0e0";
    if(!('lerp' in params)) params.lerp = true;

    all_layers.push(params);
}

setInterval(draw, 38);