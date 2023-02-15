/* eslint-disable indent */
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

export function cliInit() {
    document.getElementById("cli_prompt").addEventListener("keypress", cliKeyPress, false);
}

function cliKeyPress(event) {
    if (event.key == "Enter") {
        parseCommand();
        document.getElementById("cli_prompt").value = "";
    }
}

function parseCommand() {
    let token = document.getElementById("cli_prompt").value.split(" ");
    if (AVAILABLE_COMMANDS.has(token[0])) {
        let command = AVAILABLE_COMMANDS.get(token[0]);
        if (command.nb_args != token.length - 1)
            manageOutput(command.correctUsage, "red");
        else
            switch (token.length) {
                case 1:
                    manageOutput(command.function(), "lightgreen");
                    break;
                case 2:
                    manageOutput(command.function(token[1]), "lightgreen");
                    break;
                default:
                    manageOutput(command.function(token), "lightgreen");
                    break;
            }
    } else {
        manageOutput("Unknown command", "red");
    }
}

function manageOutput(command_output, color) {
    let new_p = document.createElement("p");
    new_p.className = "cli_answer_text";
    if (command_output == null)
        new_p.innerHTML = "Command successfully executed";
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

function reload() {
    window.location.reload();
}