'use strict';

const sudoku = [
	[null, null, null, 6, null, null, null, 2, null],
	[5, null, 6, 4, 7, null, null, null, null],
	[8, 3, null, null, 9, null, 7, null, null],
	[null, null, null, 8, null, 5, null, 4, null],
	[6, null, 9, 1, null, 3, 2, 8, 7],
	[1, 8, 4, 7, null, 9, 5, null, 6],
	[null, null, null, 9, null, null, 6, null, 3],
	[4, 6, null, null, null, null, null, 9, 2],
	[null, null, 3, null, 8, null, null, null, null]
];

for (let i = 0; i < 9; i++) {
	for (let j = 0; j < 9; j++) {
		sudoku[i][j] ??= [1, 2, 3, 4, 5, 6, 7, 8, 9];
	}
}

const filterRowsSimple = () => {
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			if (typeof sudoku[i][j] === 'number') {
				const value = sudoku[i][j];
				for (let k = 0; k < 9; k++) {
					let index;
					if (Array.isArray(sudoku[i][k]) && (index = sudoku[i][k].indexOf(value)) !== -1) {
						sudoku[i][k].splice(index, 1);
						if (sudoku[i][k].length === 1) {
							sudoku[i][k] = sudoku[i][k][0];
						}
					}
				}
			}
		}
	}
}

const filterColumnsSimple = () =>  {
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			if (typeof sudoku[i][j] === 'number') {
				const value = sudoku[i][j];
				for (let k = 0; k < 9; k++) {
					let index;
					if (Array.isArray(sudoku[k][j]) && (index = sudoku[k][j].indexOf(value)) !== -1) {
						sudoku[k][j].splice(index, 1);
						if (sudoku[k][j].length === 1) {
							sudoku[k][j] = sudoku[k][j][0];
						}
					}
				}
			}
		}
	}
}

const filterSquaresSimple = () => {
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			if (typeof sudoku[i][j] === 'number') {
				const value = sudoku[i][j];
				const imod = i % 3;
				const jmod = j % 3;
				for (let k = -imod; k <= 2 - imod; k++) {
					for (let l = -jmod; l <= 2 - jmod; l++) {
						let index;
						if (i + k >= 0 && i + k <= 8 && j + l >= 0 && j + l <= 8
						&& Array.isArray(sudoku[i + k][j + l])
						&& (index = sudoku[i + k][j + l].indexOf(value)) !== -1) {
							sudoku[i + k][j + l].splice(index, 1);
							if (sudoku[i + k][j + l].length === 1) {
								sudoku[i + k][j + l] = sudoku[i + k][j + l][0];
							}
						}
					}
				}
			}
		}
	}
}

const filterRowsComplex = () => {
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			if (Array.isArray(sudoku[i][j])) {
				let uniqueColumnValues = [...sudoku[i][j]];
				for (let k = 0; k < 9; k++) {
					if (k !== j && Array.isArray(sudoku[i][k])) {
						uniqueColumnValues = uniqueColumnValues.filter(value => !sudoku[i][k].includes(value));
						if (!uniqueColumnValues.length) {
							break;
						}
					}
				}
				
				if (uniqueColumnValues.length === 1) {
					sudoku[i][j] = uniqueColumnValues[0];
				}
			}
		}
	}
}

const filterColumnsComplex = () => {
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			if (Array.isArray(sudoku[i][j])) {
				let uniqueRowValues = [...sudoku[i, j]];
				for (let k = 0; k < 9; k++) {
					if (k !== j && Array.isArray(sudoku[k][j])) {
						uniqueRowValues = uniqueRowValues.filter(value => !sudoku[k][j].includes(value));
						if (!uniqueRowValues.length) {
							break;
						}
					}
				}
				
				if (uniqueRowValues.length === 1) {
					sudoku[i][j] = uniqueRowValues[0];
				}
			}
		}
	}
}

const filterSquaresComplex = () => {
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			if (Array.isArray(sudoku[i][j])) {
				let uniqueSquareValues = [...sudoku[i, j]];
				const imod = i % 3;
				const jmod = j % 3;
				for (let k = -imod; k <= 2 - imod; k++) {
					for (let l = -jmod; l <= 2 - jmod; l++) {
						if ((k !== 0 || l !== 0) && i + k >= 0 && i + k <= 8 && j + l >= 0
						&& j + l <= 8 && Array.isArray(sudoku[i + k][j + l])) {
							uniqueSquareValues = uniqueSquareValues.filter(value => !sudoku[i + k, j + l].includes(value));
							if (!uniqueSquareValues.length) {
								break;
							}
						}
					}
				}
				// console.log(uniqueSquareValues);
				if (uniqueSquareValues.length === 1) {
					sudoku[i][j] = uniqueSquareValues[0];
				}
			}
		}
	}
}

const sudokuSolver = () => {
	for (let x = 0; x < 2000; x++) {
			filterRowsSimple();
			filterColumnsSimple();
			filterSquaresSimple();
			filterRowsComplex();
			filterColumnsComplex();
			// filterSquaresComplex();
	}
}

sudokuSolver();
console.table(sudoku);