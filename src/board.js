/**
 * board.js -- creates the game boards.
 */

/** 
 * Factory method.
 */
var board = function(spec) {
	var that = {};
	
	var packageValues = function(values, correct) {
		if (values == null) return [];
		return values.map(function(x) { return {value:x, correct:correct} });
	};
	
	var init = function(size) {
		var c = [];
		if (size % 2 == 0) throw new Error("only odd-sized arrays supported");
		for (var i=0; i < numCells; i++) {c[i]={value:null, correct:false}}
		var mp = {};
		mp.value = freeCellLabel;
		mp.correct = true;
		c[midpoint] = mp; // free cell in center
		return c;
	};	
	
	var build = function() {
		if (size == 1) {
			that.isWinningCard = true;
			// winningLine = 0;
			// winningCells = [0];
		} else if (incorrectValues.length > 0 && correctValues.length > 0) {
			var lines = buildLines();
			if (that.isWinningCard) addWinningLine(lines);
			addDistractors(lines);
			fillRemainingCells();
		}
		return that;
	};
	
	var buildLines = function() {
		var i = 0;
		var row, col;
		var lines = [];
		for (row = 0; row < size; row++) {
			var entry = [];
			for (col = 0; col < size; col++) { entry.push(i++) }
			lines.push(entry);
		}
		for (col = 0; col < size; col++) { 
			entry = [];
			for (row = 0; row < size; row++) { entry.push(col + row * size) }
			lines.push(entry);
		}
		// left diagonal
		var ld = [];
		var rd = [];
		for (row = 0; row < size; row++) { ld.push(row + row * size); rd.push(size-row-1 + row * size) }
		lines.push(ld, rd);
		return lines;
	};
	
	var setCell = function(index, list) {
		if (index != midpoint && (that.cells[index] == null || that.cells[index].value == null)) that.cells[index] = list.splice(0,1)[0];
	};
	
	var addWinningLine = function(lines) {
		var line = extractRandomElement(lines);
		that.winning_cells = line;
		for (var i=0; i < size; i++) setCell(line[i], correctValues);
	};
	
	var rand = function(n) { return Math.floor(Math.random() * n) };
	
	var extractRandomElement = function(list) { return list.splice(rand(list.length),1)[0] };
	
	var getRandomElement = function(list) { return list[rand(list.length)] };
	
	var addDistractors = function(lines) {
		var i;
		while (lines.length > 0) {
			var line = extractRandomElement(lines);
			if ((i=line.indexOf(midpoint)) >= 0) {line.splice(i,1)}; // no midpoint
			i = getRandomElement(line);
			setCell(i, incorrectValues);
			lines = lines.filter(function(cells){return cells.indexOf(i)<0}); // remove all lines that contain this cell
		}
	};
	
	var fillRemainingCells = function() {
		var remainder = shuffle(correctValues.concat(incorrectValues));
		for (var i=0;i<numCells;i++) {
 			 if (that.cells[i] == null || that.cells[i].value == null) setCell(i, remainder);
		}
	};
	
	
	var shuffle = function(o){
		for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	};

	that.get_cells = function() { return that.cells.slice(0) };

	that.cell_at = function(row, col) { 
		var i = row * size + col;
		return (i < 0 || i >= that.cells.length) ? null : that.cells[i];
	};
		
	
	// Initialize values
	spec = spec || {};
	var size = spec.size || 3;
	var numCells = size * size;
	var midpoint = (numCells - 1) / 2;
	var correctValues = packageValues(spec.correctValues, true);
	var incorrectValues = packageValues(spec.incorrectValues, false);
	var freeCellLabel = spec.freeCellLabel || "Free space";
	
	shuffle(correctValues);
	shuffle(incorrectValues);

	that.isWinningCard = (spec.isWinningCard == null) ? true : spec.isWinningCard;
	that.winning_cells = null;

	// Create a blank board
	that.cells = init(size);
	build();
	return that;
};
