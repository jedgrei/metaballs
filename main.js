let c = document.getElementById("canvas");
c.width = document.documentElement.clientWidth;
c.height = document.documentElement.clientHeight;
let ctx = c.getContext("2d");

const num_circs = 50;
const min_rad = c.width/60;
const max_rad = c.width/30;
const vel = c.width/1000;
// const vel = 0;
const lim_anv = Math.PI/20;
const acc_anv = Math.PI/200;
// const acc_anv = Math.PI/200;
const dec_anv = 0.97;
// init circs
// let circs = [];
// for(let i = 0; i < num_circs; ++i) {
//     circs.push({
//         id: i,
//         x: randint(0, c.width),
//         y: randint(0, c.height),
//         r: rand(min_rad, max_rad),
//         v: vel,
//         a: rand(0, 2 * Math.PI),
//         av: rand(-lim_anv, lim_anv),
//     });
// }

let yellow_circs = init_circs(15);
let red_circs = init_circs(27);
let blue_circs = init_circs(40);

function init_circs(num) {
    let circs = [];
    for(let i = 0; i < num_circs; ++i) {
        circs.push({
            id: i,
            x: randint(0, c.width),
            y: randint(0, c.height),
            r: rand(min_rad, max_rad),
            v: vel,
            a: rand(0, 2 * Math.PI),
            av: rand(-lim_anv, lim_anv),
        });
    }
    return circs;
}

function move_circs(circs) {
    for(let circ of circs) {
        // move circ
        circ.x += circ.v * Math.cos(circ.a);
        circ.y += circ.v * Math.sin(circ.a);
        circ.a += circ.av;

        // modify angle/vel
        circ.av *= dec_anv;
        circ.av += rand(-acc_anv, acc_anv);
        if(circ.av > lim_anv) circ.av = lim_anv;
        if(circ.av < -lim_anv) circ.av = -lim_anv;

        // bounce off
        if(circ.x - circ.r < 0) circ.a = 0;
        if(circ.x + circ.r > c.width) circ.a = Math.PI;
        if(circ.y - circ.r < 0) circ.a = Math.PI/2;
        if(circ.y + circ.r > c.height) circ.a = 3*Math.PI/2;
    }
    return circs;
}

function draw() {
    ctx.fillStyle = "#202020";
    ctx.beginPath();
    ctx.rect(0, 0, c.width, c.height);
    ctx.fill();

    move_circs(blue_circs);
    metaball_sample(blue_circs, c.width, c.height)
    marching_squares(ctx,"#80f0f0", 1);
    move_circs(red_circs);
    metaball_sample(red_circs, c.width, c.height)
    marching_squares(ctx,"#f080f0", 1);
    move_circs(yellow_circs);
    metaball_sample(yellow_circs, c.width, c.height)
    marching_squares(ctx,"#f0f080", 1);
}

setInterval(draw, 38);
// draw();