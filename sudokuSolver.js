'use strict';

const sudokuCopy = [
	[null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null],
	[null, null, null, null, null, null, null, null, null]
];

const sudoku = [
	[null, null, 2, null, null, 4, null, 7, null],
	[null, null, 4, null, null, 1, null, null, 3],
	[7, 5, null, null, null, null, null, null, null],
	[null, null, null, null, 8, null, null, 5, 2],
	[null, null, null, 1, null, 3, null, null, null],
	[6, 2, null, null, 4, null, null, null, null],
	[null, null, null, null, null, null, null, 3, 5],
	[1, null, null, 7, null, null, 9, null, null],
	[null, 8, null, 3, null, null, 4, null, null]
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

const removeNumberFromColumnsRowsAndSquare = (numberToRemove, currentRow, currentColumn) => {
	for (let i = 0; i < 9; i++) {
		let rowIndex;
		if (Array.isArray(sudoku[currentRow][i]) && (rowIndex = sudoku[currentRow][i].indexOf(numberToRemove)) !== -1) {
			sudoku[currentRow][i].splice(rowIndex, 1);
		}
	}
	
	for (let i = 0; i < 9; i++) {
		let columnIndex;
		if (Array.isArray(sudoku[i][currentColumn]) && (columnIndex = sudoku[i][currentColumn].indexOf(numberToRemove)) !== -1) {
			sudoku[i][currentColumn].splice(columnIndex, 1);
		}
	}
	
	const currentRowMod = currentRow % 3;
	const currentColumnMod = currentColumn % 3;
	for (let k = -currentRowMod; k <= 2 - currentRowMod; k++) {
		for (let l = -currentColumnMod; l <= 2 - currentColumnMod; l++) {
			let squareIndex;
			if ((k !== 0 || l !== 0) && currentRow + k >= 0 && currentRow + k <= 8 && currentColumn + l >= 0
			&& currentColumn + l <= 8 && Array.isArray(sudoku[currentRow + k][currentColumn + l])
			&& (squareIndex = sudoku[currentRow + k][currentColumn + l].indexOf(numberToRemove)) !== -1) {
				sudoku[currentRow + k][currentColumn + l].splice(squareIndex, 1);
			}
		}
	}
}

const filterRowsComplex = () => {
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			if (Array.isArray(sudoku[i][j])) {
				let uniqueValues = [...sudoku[i][j]];
				for (let k = 0; k < 9; k++) {
					if (k !== j && Array.isArray(sudoku[i][k])) {
						uniqueValues = uniqueValues.filter(value => !sudoku[i][k].includes(value));
						if (!uniqueValues.length) {
							break;
						}
					}
				}
				
				if (uniqueValues.length === 1) {
					sudoku[i][j] = uniqueValues[0];
					removeNumberFromColumnsRowsAndSquare(sudoku[i][j], i, j);
				}
			}
		}
	}
}

const filterColumnsComplex = () => {
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			if (Array.isArray(sudoku[i][j])) {
				let uniqueValues = [...sudoku[i][j]];
				
				for (let k = 0; k < 9; k++) {
					if (k !== i && Array.isArray(sudoku[k][j])) {
						uniqueValues = uniqueValues.filter(value => !sudoku[k][j].includes(value));
						if (!uniqueValues.length) {
							break;
						}
					}
				}
				
				if (uniqueValues.length === 1) {
					sudoku[i][j] = uniqueValues[0];
					removeNumberFromColumnsRowsAndSquare(sudoku[i][j], i, j);
				}
			}
		}
	}
}

const filterSquaresComplex = () => {
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			if (Array.isArray(sudoku[i][j])) {
				let uniqueValues = [...sudoku[i][j]];
				
				const imod = i % 3;
				const jmod = j % 3;
				for (let k = -imod; k <= 2 - imod; k++) {
					for (let l = -jmod; l <= 2 - jmod; l++) {
						if ((k !== 0 || l !== 0) && i + k >= 0 && i + k <= 8 && j + l >= 0
						&& j + l <= 8 && Array.isArray(sudoku[i + k][j + l])) {
							uniqueValues = uniqueValues.filter(value => !sudoku[i + k, j + l].includes(value));
							if (!uniqueValues.length) {
								break;
							}
						}
					}
				}
				
				if (uniqueValues.length === 1) {
					sudoku[i][j] = uniqueValues[0];
					removeNumberFromColumnsRowsAndSquare(sudoku[i][j], i, j);
				}
			}
		}
	}
}

const sudokuSolver = () => {
	const numberOfSteps = 9**4;
	for (let x = 0; x < numberOfSteps; x++) {
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
