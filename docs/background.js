
const canvas = document.getElementsByTagName("canvas")[0];
const ctx = canvas.getContext("2d");

const particle_array = [];
const NB_PARTICLES = Math.round(window.innerWidth * window.innerHeight / 15000);
const DIST_LINK = 90;

let color_mode = 0; // 0 = colorless, 1 = colorful
let mode = 0; // 0 = normal, 1 = gravity

function distance(ax, ay, bx, by) {
    return Math.sqrt(Math.pow(ax - bx, 2) + Math.pow(ay - by, 2));
}

class Particle {
    #x;
    #y;
    #vx;
    #vy;
    #angle;
    #color;
    #mode; // 0 = normal, 1 = attractive, 2 = repulsive

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
        this.#angle = Math.random() * Math.PI * 2;
        this.#vx = Math.cos(this.#angle);
        this.#vy = Math.sin(this.#angle);
        this.#color = "rgb(150,150,150)";
        this.#mode = 0;
    }

    getX() {
        return this.#x;
    }

    getY() {
        return this.#y;
    }

    setColor(new_color) {
        this.#color = new_color;
    }

    resetMode() {
        this.#mode = 0;
        this.#color = "rgb(150,150,150)";
    }

    modeRepulsive() {
        this.#mode = 2;
        this.#color = "rgb(200, 0, 0)";
    }

    modeAttractive() {
        this.#mode = 1;
        this.#color = "rgb(0, 0, 200)";
    }

    draw() {
        ctx.fillStyle = this.#color;

        ctx.beginPath();
        ctx.arc(this.#x, this.#y, 2, 0, Math.PI * 2);
        ctx.fill();
        let curr_part = this;
        particle_array.forEach(function (elt) {
            let dist = distance(curr_part.getX(), curr_part.getY(), elt.getX(), elt.getY());
            if (curr_part != elt && dist <= DIST_LINK) {
                ctx.moveTo(curr_part.#x, curr_part.#y);
                ctx.lineTo(elt.getX(), elt.getY());
                let transparence = 1 - dist / DIST_LINK;
                ctx.strokeStyle = "rgba(100,100,100," + transparence + ")";
                ctx.stroke();
            }
        })
    }

    move() {
        this.#x += this.#vx;
        this.#y += this.#vy;
        if (this.#x < 0 || this.#x > canvas.width) {
            this.#vx = -this.#vx;
        }
        else if (this.#y < 0 || this.#y >= canvas.height) {
            this.#vy = -this.#vy;
        }
    }
}

function init() {
    resize();
    // Particles gen
    for (let i = 0; i < NB_PARTICLES; i++) {
        particle_array.push(new Particle(Math.random() * document.documentElement.clientWidth, Math.random() * document.documentElement.clientHeight));
    }
    move();
}

function resize() {
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;
}

function move() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let elt of particle_array) {
        elt.draw();
        elt.move();
    }
    setTimeout(move, 20);
}

function mouse_move() {
    pos_x = window.event.clientX;
    pos_y = window.event.clientY;
    for (elt of particle_array) {
        let dist = distance(pos_x, pos_y, elt.getX(), elt.getY());
        if (dist <= DIST_LINK * 4 / 3) {
            ctx.moveTo(pos_x, pos_y);
            ctx.lineTo(elt.getX(), elt.getY());
            let transparence = 1 - dist / (DIST_LINK * 4 / 3);
            ctx.strokeStyle = "rgba(150,150,150," + transparence + ")";
            ctx.stroke();
        }
    }
}

function mouse_click() {
    pos_x = window.event.clientX;
    pos_y = window.event.clientY;
    particle_array.push(new Particle(pos_x, pos_y));
}

function toggleColor() {
    if (color_mode) {
        for (elt of particle_array) {
            elt.setColor("rgb(150, 150, 150)");
        }
        color_mode = 0;
    }
    else {
        for (elt of particle_array) {
            elt.setColor(randomColor());
        }
        mode = 0;
        color_mode = 1;
    }
}

function toggleGravity() {
    if (mode) {
        for (elt of particle_array) {
            elt.resetMode();
        }
        mode = 0;
    }
    else {
        for (elt of particle_array) {
            if (Math.random() <= 0.5) {
                elt.modeRepulsive();
            }
            else {
                elt.modeAttractive();
            }
        }
        color_mode = 0;
        mode = 1;
    }
}

function keyHandler() {
    let key_pressed = window.event.keyCode;
    let shift_pressed = window.event.shiftKey;
    if (shift_pressed) {
        console.log(key_pressed);
        if (key_pressed == 13) {
            toggleColor();
        }
        else if (key_pressed == 32) {
            toggleGravity();
        }
    }
}

window.addEventListener("load", init, false);
window.addEventListener("resize", resize, false);
window.addEventListener("mousemove", mouse_move, false);
window.addEventListener("click", mouse_click, false);
window.addEventListener("keypress", keyHandler, false);