/* eslint-disable indent */
import { turnOffBg, turnOnBg } from "../main.js";
import { createParticle, removeParticle, toggleColor, toggleGravity } from "./background.js";

const AVAILABLE_COMMANDS = new Map();

AVAILABLE_COMMANDS.set("add", {
    nb_args: 1,
    description: "Add &lt;nb&gt; particles",
    function: createParticle,
    correctUsage: "Correct usage: add &lt;nb&gt;"
});

AVAILABLE_COMMANDS.set("remove", {
    nb_args: 1,
    description: "Remove &lt;nb&gt; particles",
    function: removeParticle,
    correctUsage: "Correct usage: remove &lt;nb&gt;"
});

AVAILABLE_COMMANDS.set("clear", {
    nb_args: 0,
    description: "Clear the console",
    function: clearCLI,
    correctUsage: "Correct usage: clear"
});

AVAILABLE_COMMANDS.set("color", {
    nb_args: 0,
    description: "Toggle background color mode",
    function: toggleColor,
    correctUsage: "Correct usage: color"
});

AVAILABLE_COMMANDS.set("link", {
    nb_args: 1,
    description: "Copy specified link to clipboard",
    function: link,
    correctUsage: "Correct usage: link &lt; mail | linkedin | github | facebook | steam &gt;"
});

AVAILABLE_COMMANDS.set("gravity", {
    nb_args: 0,
    description: "Toggle background gravity mode",
    function: toggleGravity,
    correctUsage: "Correct usage: gravity"
});

AVAILABLE_COMMANDS.set("help", {
    nb_args: 0,
    description: "Shows available commands",
    function: help,
    correctUsage: "Correct usage: help"
});

AVAILABLE_COMMANDS.set("reload", {
    nb_args: 0,
    description: "Reloads the page",
    function: reload,
    correctUsage: "Correct usage: reload"
});

AVAILABLE_COMMANDS.set("start", {
    nb_args: 0,
    description: "Starts the animation",
    function: turnOnBg,
    correctUsage: "Correct usage: start"
});

AVAILABLE_COMMANDS.set("stop", {
    nb_args: 0,
    description: "Stops the animation",
    function: turnOffBg,
    correctUsage: "Correct usage: stop"
});

export function cliInit() {
    document.getElementById("cli_prompt").addEventListener("keyup", cliKeyPress, false);
}

function cliKeyPress(event) {
    let prompt = document.getElementById("cli_prompt");
    if (event.key == "Enter") {
        parseCommand(prompt.value);
        document.getElementById("cli_prompt").value = "";
    }
    else{
        let is_valid = false;
        let full_command = prompt.value.split(" ").filter(elt => elt.length > 0);
        if (AVAILABLE_COMMANDS.has(full_command[0]) && AVAILABLE_COMMANDS.get(full_command[0]).nb_args == full_command.length - 1)
            is_valid = !is_valid;
        prompt.style.color = (is_valid) ? "rgb(70, 197, 123)" : "rgb(197, 70, 70)";
    }
}

function parseCommand(full_command) {
    let tokens = full_command.split(" ").filter(elt => elt.length > 0);
    if (AVAILABLE_COMMANDS.has(tokens[0])) {
        let command = AVAILABLE_COMMANDS.get(tokens[0]);
        if (command.nb_args != tokens.length - 1)
            manageOutput(command.correctUsage, tokens, "red");
        else
            switch (tokens.length) {
                case 1:
                    manageOutput(command.function(), tokens, "lightgreen");
                    break;
                case 2:
                    manageOutput(command.function(tokens[1]), tokens, "lightgreen");
                    break;
                default:
                    manageOutput(command.function(tokens), tokens, "lightgreen");
                    break;
            }
    } else {
        manageOutput("Unknown command", tokens, "red");
    }
}

function manageOutput(command_output, tokens, color) {
    let new_p = document.createElement("p");
    new_p.className = "cli_answer_text";
    if (command_output == null)
        new_p.innerHTML = "Command successfully executed";
    else if (command_output == "Correct usage") {
        new_p.innerHTML = AVAILABLE_COMMANDS.get(tokens[0]).correctUsage;
        color = "red";
    }
    else
        new_p.innerHTML = command_output;
    new_p.style.color = color;
    document.getElementById("cli_answer").appendChild(new_p);
}

// Commands functions ahead

function clearCLI() {
    document.getElementById("cli_answer").innerHTML = "";
    setTimeout(() => { document.getElementById("cli_answer").innerHTML = ""; }, 1000);
    return "Console cleared";
}

function help() {
    let string = "";
    string += "<p class=\"cli_answer_text\">";
    string += "======== List of commands ========<br><br>";
    for (let entries of AVAILABLE_COMMANDS.entries()) {
        string += "<strong>" + entries[0] + "</strong>" + ": " + entries[1].description;
        string += "<br>";
    }
    string += "<br>==================================</p>";
    return string;
}

function link(media) {
    switch (media) {
        case "mail":
            navigator.clipboard.writeText("loganwi322@gmail.com");
            break;
        case "linkedin":
            navigator.clipboard.writeText("https://www.linkedin.com/in/logan-willem/");
            break;
        case "github":
            navigator.clipboard.writeText("https://github.com/Logan2234/");
            break;
        case "facebook":
            navigator.clipboard.writeText("https://www.facebook.com/logan.wi322/");
            break;
        case "steam":
            navigator.clipboard.writeText("https://steamcommunity.com/id/logan2234/");
            break;
        default:
            return "Correct usage";
    }
    return "Link successfully copied to clipboard";
}

function reload() {
    window.location.reload();
}
