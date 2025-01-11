const canvas = document.getElementById('Canvas');
const button = document.getElementById('run');
const input = document.getElementById('input');
const error = document.getElementById('error');

let valR = new Array(300).fill(null).map(() => new Array(300).fill(0));
let valG = new Array(300).fill(null).map(() => new Array(300).fill(0));
let valB = new Array(300).fill(null).map(() => new Array(300).fill(0));

function pixelChangeColor(p, x, y, r, g, b) {
    valR[x][y] += r;
    if (valR[x][y] > 255) {
        valR[x][y] = 255;
    }
    if (valR[x][y] < 0) {
        valR[x][y] = 0;
    }
    valG[x][y] += g;
    if (valG[x][y] > 255) {
        valG[x][y] = 255;
    }
    if (valG[x][y] < 0) {
        valG[x][y] = 0;
    }
    valB[x][y] += b;
    if (valB[x][y] > 255) {
        valB[x][y] = 255;
    }
    if (valB[x][y] < 0) {
        valB[x][y] = 0;
    }
    p.style.backgroundColor = 'rgb(' + valR[x][y] + ', ' + valG[x][y] + ', ' + valB[x][y] + ')';
}

function buildCanvas(n, m) {
    canvas.innerHTML = '';
    for (let row = 0; row < n; ++row) {
        const pixelRow = document.createElement('div');
        pixelRow.style.display = 'flex';
        for (let col = 0; col < m; ++col) {
            const pixel = document.createElement('div');
            pixel.classList.add('pixel');
            pixel.setAttribute('id', '(' + row + ',' + col + ')');
            pixel.style.backgroundColor = 'rgb(0, 0, 0)';
            pixelRow.appendChild(pixel);
        }
        canvas.appendChild(pixelRow);
    }
}

function drawBoard() {
    valR = new Array(300).fill(null).map(() => new Array(300).fill(0));
    valG = new Array(300).fill(null).map(() => new Array(300).fill(0));
    valB = new Array(300).fill(null).map(() => new Array(300).fill(0));

    const lines = input.value.split('\n');

    const numbers = lines[0].trim().split(/\s+/).map(Number);
    if (numbers.length > 1) {
        error.innerHTML = 'Error found at line 1: not 1 number.';
        return;
    }

    let q = numbers[0];
    if (Number.isNaN(q) || !Number.isInteger(q)) {
        error.innerHTML = 'Error found at line 1: q should be an integer.';
        return;
    }

    for (let num = 1; num <= q; ++num) {
        if (lines[num] == '') {
            continue;
        }
        const numbers = lines[num].trim().split(/\s+/).map(Number);
        for (let j = 0; j < numbers.length; ++j) {
            if (Number.isNaN(numbers[j]) || !Number.isInteger(numbers[j])) {
                error.innerHTML = 'Error found at line ' + (num + 1) + ': not integers.';
                return;
            }
        }
        if (numbers.length != 7) {
            error.innerHTML = 'Error found at line ' + (num + 1) + ': not 7 numbers.';
            return;
        }
        let x = numbers[0], y = numbers[1];
        let h = numbers[2], w = numbers[3];
        let r = numbers[4], g = numbers[5], b = numbers[6];
        if (-255 <= r && r <= 255 && -255 <= g && g <= 255 && -255 <= b && b <= 255) {
            for (let i = x; i < x + h; ++i) {
                for (let j = y; j < y + w; ++j) {
                    if (0 <= i && i < 300 && 0 <= j && j < 300) {
                        pixelChangeColor(document.getElementById('(' + i + ',' + j + ')'), i, j, r, g, b);
                    } else {
                        error.innerHTML = 'Error found at line ' + (num + 1) + ': coordinates out of range.';
                        return;
                    }
                }
            }
        } else {
            error.innerHTML = 'Error found at line ' + (num + 1) + ': RGB value out of range.';
            return;
        }
    }
    error.innerHTML = '<br>';
}

button.addEventListener('click', function() { drawBoard(); });
buildCanvas(300, 300);
drawBoard();