const res = 10;

let grid = [];
let thresh = 1;

function metaball_sample(cs, w, h) {
    // sample into grid
    grid = [];
    for(let y = 0; y < h + res; y += res) {
        grid.push([]);
        for(let x = 0; x < w + res; x += res) {
            let sum = 0;
            for(let c of cs) {
                // metaball formula:
                // cr^2/((x-cx)^2+(y-cy)^2)
                sum += Math.pow(c.r, 2) / (Math.pow(c.x - x, 2) + Math.pow(c.y - y, 2));
            }
            grid[grid.length - 1].push(sum);
        }
    }
}

function marching_squares(ctx, color, thr) {
    thresh = thr;
    ctx.fillStyle = color;
    for(let i = 0; i < grid.length - 1; ++i) {
        let y = i * res;
        for(let j = 0; j < grid[i].length - 1; ++j) {
            let x = j * res;
            let type = (
                (grid[i][j]>=thresh) +
                2 * (grid[i][j+1]>=thresh) + 
                4 * (grid[i+1][j]>=thresh) + 
                8 * (grid[i+1][j+1]>=thresh)
            );
            ctx.beginPath();
            switch(type) {
                case 0: break;
                case 1: polygon(ctx, i, j, x, y, 0, 1, 7); break;
                case 2: polygon(ctx, i, j, x, y, 1, 2, 3); break;
                case 3: polygon(ctx, i, j, x, y, 0, 2, 3, 7); break;
                case 4: polygon(ctx, i, j, x, y, 5, 6, 7); break;
                case 5: polygon(ctx, i, j, x, y, 0, 1, 5, 6); break;
                case 6: polygon(ctx, i, j, x, y, 1, 2, 3, 5, 6, 7); break;
                case 7: polygon(ctx, i, j, x, y, 0, 2, 3, 5, 6); break;
                case 8: polygon(ctx, i, j, x, y, 3, 4, 5); break;
                case 9: polygon(ctx, i, j, x, y, 0, 1, 3, 4, 5, 7); break;
                case 10: polygon(ctx, i, j, x, y, 1, 2, 4, 5); break;
                case 11: polygon(ctx, i, j, x, y, 0, 2, 4, 5, 7); break;
                case 12: polygon(ctx, i, j, x, y, 3, 4, 6, 7); break;
                case 13: polygon(ctx, i, j, x, y, 0, 1, 3, 4, 6); break;
                case 14: polygon(ctx, i, j, x, y, 1, 2, 4, 6, 7); break;
                case 15: polygon(ctx, i, j, x, y, 0, 2, 4, 6); break;
            }
            ctx.fill();
        }
    }
}

function polygon(ctx, i, j, x, y, ...points) {
    let p = point8(points[0], i, j, x, y);
    ctx.moveTo(p.x, p.y);
    for(let pi = 1; pi < points.length; ++pi) {
        p = point8(points[pi], i, j, x, y);
        ctx.lineTo(p.x, p.y);
    }
}

// returns from 0-res
function cornerlerp(i1, j1, i2, j2) {
    let r = res * (1-grid[i1][j1]/thresh) / (grid[i2][j2]/thresh-grid[i1][j1]/thresh);
    return r;
    // return res/2;
}

// 0-7 -> point
function point8(n, i, j, x, y) {
    switch(n) {
        case 0:
            return vector(x, y);
        case 1:
            return vector(x + cornerlerp(i, j, i, j+1), y);
            // return vector(x + res/2, y);
        case 2:
            return vector(x + res, y);
        case 3:
            return vector(x + res, y + cornerlerp(i, j+1, i+1, j+1));
            // return vector(x + res, y + res/2);
        case 4:
            return vector(x + res, y + res);
        case 5:
            return vector(x + cornerlerp(i+1, j, i+1, j+1), y + res);
            // return vector(x + res/2, y + res);
        case 6:
            return vector(x, y + res); 
        case 7:
            return vector(x, y + cornerlerp(i, j, i+1, j));
            // return vector(x, y + res/2);
    }
}