function randint(min, max) {
    return min + Math.floor(Math.random() * (max - min));
}

function rand(min, max) {
    return min + (Math.random() * (max - min));
}

function drawCirc(ctx, circ) {
    ctx.arc(circ.x, circ.y, circ.r, 0, 2*Math.PI);
}

function dist(v1, v2) {
    return Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2));
}

function angle(v1, v2) {
    return Math.atan2(v1.y - v2.y, v1.x - v2.x);
}

// x, y -> <x, y>
function vector(x, y) {
    return {x: x, y: y};
}

// magnitude, angle -> <x, y>
function polar(m, a) {
    return {x: Math.cos(a) * m, y: Math.sin(a) * m};
}

function vec_sum(v1, v2) {
    return vector(v1.x + v2.x, v1.y + v2.y);
}

function vec_dist(v1, v2) {
    return dist()
}

// center, angle, magnitude -> <x, y>
function polarc(c, m, a) {
    return vec_sum(polar(m, a), c);
}

function lerp(a, b, t) {
    return a + (b - a) * t;
}