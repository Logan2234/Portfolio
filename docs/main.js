/* eslint-disable indent */
import { backgroundInit, toggleColor, toggleGravity, move, createParticle, removeParticle } from "./modules/background.js";
import { cliInit } from "./modules/cli.js";

let help_displayed = false;
let cli_displayed = false;
let play_animation = true;
let about_shown = false;

function init() {
    // Adding event listener for the label of inputs
    let inputs = document.getElementsByClassName("input");

    for (let i = 0; i < inputs.length - 1; i++) {
        inputs[i].addEventListener("input", show_label, false);
    }

    backgroundInit();
    cliInit();
    main();
}

// Main loop
function main() {
    if (play_animation) {
        move();
        setTimeout(main, 20);
    }
}

function scrollFunc() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    if (winScroll >= document.documentElement.clientHeight) {
        document.getElementsByTagName("header")[0].classList.add("scrolled");
        play_animation = false; // Disabling animation for optimization purposes
        if (!about_shown) {
            animateAbout();
            about_shown = !about_shown;
        }
    } else {
        document.getElementsByTagName("header")[0].classList.remove("scrolled");
        if (!play_animation) {
            play_animation = true;
            main();
        }
    }
    document.getElementById("test").style.width = scrolled + "%";
}

function animateAbout() {
    function animateString(string, pos = 0) {
        if (pos == 0) {
            let new_par = document.createElement("p");
            new_par.className = "about_par";
            new_par.appendChild(document.createTextNode(""));
            about_content.appendChild(new_par);
        }

        let texte = about_content.lastChild.textContent;
        if (pos < string.length) {
            let wait = 0;
            if (string[pos] === "/")
                wait = 160;
            else
                about_content.lastChild.textContent = texte.substring(0, texte.length - 1) + string[pos] + "_";
            setTimeout(() => { animateString(string, pos + 1); }, 30 + wait);
        } else 
            about_content.lastChild.textContent = texte.substring(0, texte.length - 1); // Removes last "_"
    }

    
    // Initial blinking animation
    let about_content = document.getElementById("about_content");
    let new_par = document.createElement("p");
    new_par.className = "about_par";
    new_par.innerHTML = "<span id=\"blinking\">_</span>";
    about_content.appendChild(new_par);
    
    setTimeout(() => {
        about_content.removeChild(new_par);

        let string1 = "Hi!// I'm Logan,/ I'm 21 years old and I am in the second year of engineering school.";
        let string2 = "I study computer science and I'm passionate about programming.";

        animateString(string1);
        setTimeout(() => animateString(string2), 4000);
    }, 2000);
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

function displayHelp() {
    if (help_displayed) {
        setTimeout(() => { document.getElementById("help").style.display = "none"; }, 400);
        document.getElementById("help_content").className = "help_hidden";
    }
    else {
        document.getElementById("help").style.display = "flex";
        document.getElementById("help_content").className = "help_shown";
    }
    help_displayed = !help_displayed;
}

function displayCLI() {
    document.getElementById("cli").style.display = (cli_displayed ? "none" : "block");
    document.getElementById("cli_prompt").focus();
    cli_displayed = !cli_displayed;
}

function keyHandler(event) {
    let key_pressed = event.key;
    let shift_pressed = event.shiftKey;

    if (shift_pressed) {
        switch (key_pressed) {
            case "C":
                toggleColor();
                break;
            case "G":
                toggleGravity();
                break;
            case "+":
                createParticle(1);
                break;
            case "-":
                removeParticle(1);
                break;
            case "?":
                displayHelp();
                break;
            case " ":
                displayCLI();
                event.preventDefault();
                break;
            default:
                console.log(key_pressed);
                break;
        }
    }
}

export function turnOffBg() {
    document.getElementsByTagName("canvas")[0].getContext("2d").clearRect(0, 0, 3000, 3000);
    play_animation = false;
}

export function turnOnBg() {
    play_animation = true;
    main();
}

window.addEventListener("scroll", scrollFunc, false);
window.addEventListener("load", init, false);
window.addEventListener("keypress", keyHandler, false);
