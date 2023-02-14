import { resize, mouse_move, mouse_click, toggleColor, toggleGravity, move, createParticle, removeParticle } from "./modules/background.js";

let help_displayed = false;
let play_animation = true;

function init() {
    // Adding event listener for the label of inputs
    let inputs = document.getElementsByClassName("input");
    for (let i = 0; i < inputs.length - 1; i++) {
        inputs[i].addEventListener("input", show_label, false);
    }

    // Background management
    resize();
    createParticle(Math.round(window.innerWidth * window.innerHeight / 10000));
    main();
}

// Main loop
function main() {
    if (play_animation)
        move();
    setTimeout(main, 20);
}

function scrollFunc() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    if (winScroll >= document.documentElement.clientHeight) {
        document.getElementsByTagName("header")[0].classList.add("scrolled");
        play_animation = false; // Disabling animation for optimization purposes
    } else {
        document.getElementsByTagName("header")[0].classList.remove("scrolled");
        play_animation = true;
    }
    document.getElementById("test").style.width = scrolled + "%";
}

function find_label(id) {
    let labels = document.getElementsByTagName("label");
    for (let label of labels) {
        if (label.htmlFor == id) {
            return label;
        }
    }
    return null;
}

function show_label() {
    let curr_input = document.activeElement;
    let id = curr_input.id;
    let label = find_label(id);
    if (curr_input.value) {
        if (label) {
            label.classList.remove("hidden_label");
            label.classList.add("active_label");
            label.style.display = "block";
        }
    }
    else {
        if (label) {
            label.classList.remove("active_label");
            label.classList.add("hidden_label");
            setTimeout(() => { label.style.display = "none"; }, 700);
        }
    }
}

function keyHandler() {
    let key_pressed = window.event.keyCode;
    let shift_pressed = window.event.shiftKey;

    if (shift_pressed) {
        switch (key_pressed) {
        case 67:
            toggleColor();
            break;
        case 71:
            toggleGravity();
            break;
        case 43:
            createParticle(1);
            break;
        case 45:
            removeParticle(1);
            break;
        case 63:
            if (help_displayed) {
                setTimeout(() => { document.getElementById("help").style.display = "none"; }, 400);
                document.getElementById("help_content").className = "help_hidden";
            }
            else {
                document.getElementById("help").style.display = "flex";
                document.getElementById("help_content").className = "help_shown";
            }
            help_displayed = !help_displayed;
            break;
        default:
            console.log(key_pressed);
            break;
        }
    }
}

window.addEventListener("scroll", scrollFunc, false);
window.addEventListener("load", init, false);
window.addEventListener("resize", resize, false);
window.addEventListener("mousemove", mouse_move, false);
window.addEventListener("click", mouse_click, false);
window.addEventListener("keypress", keyHandler, false);
