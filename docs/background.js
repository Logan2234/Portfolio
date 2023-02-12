
const canvas = document.getElementsByTagName("canvas")[0];
const ctx = canvas.getContext("2d");

const particle_array = [];
const NB_PARTICLES = Math.round(window.innerWidth * window.innerHeight/15000);
const DIST_LINK = 90;

function distance(a, b) {
    return Math.sqrt(Math.pow(a.getX() - b.getX(), 2) + Math.pow(a.getY() - b.getY(), 2));
}

class Particle {
    #x;
    #y;
    #vx;
    #vy;
    #angle;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
        this.#angle = Math.random() * Math.PI * 2;
        this.#vx = Math.cos(this.#angle);
        this.#vy = Math.sin(this.#angle);
    }

    getX() {
        return this.#x;
    }

    getY() {
        return this.#y;
    }

    draw() {
        ctx.fillStyle = "rgb(150,150,150)";
        
        ctx.beginPath();
        ctx.arc(this.#x, this.#y, 2, 0, Math.PI * 2);
        ctx.fill();
        let curr_part = this;
        particle_array.forEach(function (elt){
            let dist = distance(curr_part, elt);
            if (curr_part != elt && dist <= DIST_LINK) {
                ctx.moveTo(curr_part.#x, curr_part.#y);
                ctx.lineTo(elt.getX(), elt.getY());
                let transparence = 1 - dist/DIST_LINK;
                ctx.strokeStyle = "rgba(100,100,100,"+transparence+")";
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

window.addEventListener("load", init, false);
window.addEventListener("resize", resize, false);
