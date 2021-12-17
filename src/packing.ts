class position {
    public s_row: number;
    public s_col: number;
    public rows: number;
    public cols: number;
    public char: string;

    constructor(r: number, c: number, t: string) {
        this.s_row = r;
        this.s_col = c;
        this.char = t;

        switch (t) {
            case "t": // 2x3
                this.cols = 2;
                this.rows = 3;
                break;
            case "w": // 3x2
                this.cols = 3;
                this.rows = 2;
                break;
            case "b": // 2x2
                this.cols = 2;
                this.rows = 2;
                break;
            case "s": // 2x2
                this.cols = 1;
                this.rows = 1;
                break;
        }
    }
};

class solution {
    public positions: position[];
    public state: string[][];

    constructor(pos: position[], state: string[][]) {
        this.positions = pos;
        this.state = state;
    }
}

var MAX_COL: number;
var MAX_ROW: number;

export function init(r: number, c: number, callback: (rows: number, cols: number) => void) {
    MAX_ROW = r;
    MAX_COL = c;
    callback(MAX_ROW, MAX_COL);
}

export async function getGridArea(): Promise<solution> {
    let area = [];

    for (let i = 0; i < MAX_ROW; ++i) {
        area.push([]);
        for (let j = 0; j < MAX_COL; ++j) {
            area[i].push('.');
        }
    }

    area

    let sol: solution = new solution([], area);

    /******************************
    soluzione: {
            tall[].length == t
            wide[].length == w
            big[].length == b
    
            no overlays, randomized neighbors
    }
    ******************************/

    return getSolution(sol);
}

async function getSolution(sol: solution, row: number = 0, col: number = 0,
    last: string = '.'): Promise<solution> {

    if (col > MAX_COL) return getSolution(sol, ++row, 0, last);
    if (row > MAX_ROW) return sol;

    switch (Math.floor(Math.random() * 10 % 4)) {
        case 0:
            if (last !== 't') {
                let pos: position = new position(row, col, 't');
                const [cond, res] = isValid(sol.state, pos);
                if (cond) {
                    sol.state = res;
                    sol.positions.push(pos);
                    return getSolution(sol, row, ++col, 't');
                }
            }
        case 1:
            if (last !== 'w') {
                let pos: position = new position(row, col, 'w');
                const [cond, res] = isValid(sol.state, pos);
                if (cond) {
                    sol.state = res;
                    sol.positions.push(pos);
                    return getSolution(sol, row, ++col, 'w');
                }
            }
        case 2:
            if (last !== 'b') {
                let pos: position = new position(row, col, 'b');
                const [cond, res] = isValid(sol.state, pos);
                if (cond) {
                    sol.state = res;
                    sol.positions.push(pos);
                    return getSolution(sol, row, ++col, 'b');
                }
            }
        default:
            let pos: position = new position(row, col, 's');
            const [cond, res] = isValid(sol.state, pos);
            if (cond) {
                sol.state = res;
                sol.positions.push(pos);
                return getSolution(sol, row, ++col, 's');
            }
    }
    return getSolution(sol, row, ++col, last);
}

const isValid = (state: string[][], pos: position): [boolean, string[][]] => {
    let new_state = [];

    const { s_row, s_col, rows, cols, char } = pos;
    const max_row = s_row + rows;
    const max_col = s_col + cols;

    try {
        if (max_row > MAX_ROW || max_col > MAX_COL)
            throw new Error();

        for (let i = 0; i < state.length; ++i) {
            new_state.push([]);
            for (let j = 0; j < state[0].length; ++j) {
                new_state[i].push(state[i][j]);
            }
        }

        for (let i = s_row; i < max_row; ++i) {
            for (let j = s_col; j < max_col; ++j) {
                if (new_state[i][j] == '.')
                    new_state[i][j] = char;
                else throw new Error();
            }
        }
    } catch (error) {
        return [false, []];
    }

    return [true, new_state];
};