import $ from "jquery";
import { init, getGridArea } from "./packing";

let grid = $("#background");

let r = Math.floor(Math.random() * 10) % 4 + 6;
let c = Math.floor(Math.random() * 10) % 4 + 6;

init(r, c, (rows, cols) => {
    grid.css("grid-template-rows", `repeat(${rows}, 1fr)`)
        .css("grid-template-columns", `repeat(${cols}, 1fr)`);
});

getGridArea().then(sol => {
    sol.positions.forEach((dim, index) => {
        let div = $("<div></div>")
            .toggleClass(dim.char)
            .css(
                "background-image",
                "url(img/" + (index % 17 + 1) + ".jpg)");

        grid.append(div);
    })
});