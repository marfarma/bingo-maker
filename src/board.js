/**
 * board.js -- creates the game boards.
 */

/** 
 * Factory method.
 */
var board = function(spec) {
	var that = {serial_number: null};
	spec = spec || {};
	var size = spec.size || 3;
	var correctValues = spec.correctValues || [];
	var distractors = spec.distractors || [];
	var freeCellLabel = spec.freeCellLabel || "Free space";

	that.is_winning_card = spec.is_winning_card || true;

	var init = function(size) {
		var cells = [];
		if (size % 2 == 0) throw new Error("only odd-sized arrays supported");
		var numCells = size * size;
		for (var i=0; i < numCells; i++) {cells[i]={value:null}};
		cells[(numCells - 1) / 2] = {value:freeCellLabel, correct: true}; // free cell in center
		return cells;
	};	
	
	var build = function() {
		if (size == 1) {
			that.is_winning_card = true;
			that.serial_number = "0";
			// winningLine = 0;
			// winningCells = [0];
		} else {
			// if (is_winning_card) addCorrect();
		}
		return that;
	};
	
	that.get_cells = function() { cells.slice() };

	that.cell_at = function(row, col) { 
		var i = row * size + col;
		return (i < 0 || i >= cells.length) ? null : cells[i];
	};
		
	// Create a blank board
	var cells = init(size);
	build();
	return that;
};
