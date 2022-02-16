'use strict'
export default class Ball {
    set color(value) {
        this._color = value;
        this.draw();
    }

    get color() {
        return this._color;
    }

    set blur(value) {
        this._blur = value;
        this.draw();
    }

    get blur() {
        return this._blur;
    }

    set size(value) {
        this._size = value;
        this.draw();
    }

    get size() {
        return this._size;
    }

    set alpha(value) {
        this._alpha = value;
        this.draw();
    }

    get alpha() {
        return this._alpha;
    }

    set x(value) {
        this._x = value;
        this.draw();
    }

    get x() {
        return this._x;
    }

    set y(value) {
        this._y = value;
        this.draw();
    }

    get y() {
        return this._y;
    }

    constructor(uid, {x = 50, y = 50, alpha = 30, size = 50, blur = 0, color = '#000000'} = {}, created, updated, remove) {
        this.created = created;
        this.updated = updated;
        this.remove = remove;
        this._x = x;
        this._y = y;
        this._alpha = alpha;
        this._size = size;
        this._blur = blur;
        this._color = color;
        this.uid = uid;
        this.#makeControls(uid)
    }

    #makeControls(uid) {
        const c = document.createElement('fieldset');
        c.id = uid;
        c.className = 'circle';
        c.innerHTML =
            '<div>' +
            '<label for="size' + uid + '">size</label> ' +
            '<input type="range" id="size' + uid + '" data-circle="' + uid + '" class="size" value="' + this._size + '" max="100"> ' +
            '<label for="transp' + uid + '">opacity</label> ' +
            '<input type="range" id="transp' + uid + '" data-circle="' + uid + '" class="transp" value="' + this._alpha + '" max="255"> ' +
            '<label for="blur' + uid + '">blur</label> ' +
            '<input type="range" id="blur' + uid + '" data-circle="' + uid + '" class="blur" value="' + this.blur + '" max="100"> ' +
            '</div>' +
            '<div>' +
            '<label for="x' + uid + '">x</label>' +
            '<input type="range" id="x' + uid + '" data-circle="' + uid + '" class="x" value="' + this._x + '" min="-900" max="900"> ' +
            '<label for="y' + uid + '">y</label> ' +
            '<input type="range" id="y' + uid + '"  data-circle="' + uid + '" class="y" value="' + this._y + '" min="-900" max="900"> ' +
            '<label for="color' + uid + '">color</label> ' +
            '<input type="color" class="color" data-circle="' + uid + '" id="color' + uid + '" value="' + this._color + '">' +
            '<div><button class="remove small" data-circle="' + uid + '" id="color' + uid + '">remove ball</button></div>' +
            '</div>';

        this.created(c);
        this.draw();

        c.querySelector('.size').addEventListener('input', ({target: {value}}) => this.size = +value);
        c.querySelector('.x').addEventListener('input', ({target: {value}}) => this.x = +value);
        c.querySelector('.y').addEventListener('input', ({target: {value}}) => this.y = +value);
        c.querySelector('.transp').addEventListener('input', ({target: {value}}) => this.alpha = +value);
        c.querySelector('.blur').addEventListener('input', ({target: {value}}) => this.blur = +value);
        c.querySelector('.color').addEventListener('change', ({target: {value}}) => this.color = value);
        c.querySelector('.remove').addEventListener('click', () => {
            this.remove(c);
            this.updated();
        });
    };


    draw() {
        let bg = `radial-gradient(circle at ${this.x}% ${this.y}%, ${this.color + ('0' + this.alpha.toString(16)).slice(-2)} ${this.size}%, transparent ${this.blur + this.size}%)`;
        this.updated(bg)
    }
}
