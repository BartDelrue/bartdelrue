import Ball from "./ball.mjs";
import hsl2rgb from "./hsl2rgb.mjs";
import {calcRatio} from "./contrast.mjs";

(function () {
    const controls = document.querySelector('#controls');
    const btnControls = document.querySelector('#btnControls')
    const css = document.querySelector('#css');
    const baseColorInput = document.querySelector('#base');
    const bgCollection = {};
    const root = document.querySelector(':root');

    let count = 0;
    let color = hsl2rgb(Math.floor(Math.random() * 360) + 1, 100, 15);
    let background = 'none';

    setBackground(color);

    baseColorInput.value = color;
    baseColorInput.addEventListener('change', ({target: {value}}) => setBackground(value));
    btnControls.addEventListener('click', () => {
        const uid = ++count;
        new Ball(uid,
            undefined,
            c => controls.appendChild(c),
            bg => draw(uid, bg),
            c => controls.removeChild(c));
    });

    function setBackground(v) {
        color = v;
        root.style.setProperty('--bg-color', color)
        root.style.setProperty('--text-color', calcRatio(color, '#FFFFFF') < 4.5 ? '#000000' : '#FFFFFF');
        root.style.setProperty('--shadow-color', calcRatio(color, '#FFFFFF') < 4.5 ? '#FFFFFF' : '#000000');
        showValue()
    }

    function draw(uid, bg) {
        bg ? bgCollection[uid] = bg : delete bgCollection[uid]
        background = `${Object.values(bgCollection).toString()}`
        root.style.setProperty('--bg', "" + background);
        showValue()
    }

    function showValue() {
        css.value = `background-color: ${color};\nbackground-image: ${background};`;
    }

    for (let i = 3; i--;) {
        const uid = ++count;
        const ball = new Ball(uid,
            {
                x: (Math.floor(Math.random() * 200) + 1) - 100,
                y: (Math.floor(Math.random() * 200) + 1) - 100,
                alpha: Math.floor((Math.random() * 30)) + 20,
                size: (Math.floor(Math.random() * 20) + 41),
                blur: 0
            },
            c => controls.appendChild(c),
            bg => draw(uid, bg),
            c => controls.removeChild(c))
    }
})();
