module("Board");

test("creates board", function() {
	var b = board({size:1});
	expect(1);
	ok(b != null, "board exists");
});

test("returns cell at(row,col)", function() {
	var b = board({size:3});
	expect(5);
	ok(b != null, "board exists");
	var c0 = b.cell_at(0,0);
	var c1 = b.cell_at(1,1);
	var c2 = b.cell_at(2,2);
	var c3 = b.cell_at(3,3);
	ok(c0 != null, "(0,0) exists");
	ok(c1 != null, "(1,1) exists");
	ok(c2 != null, "(2,2) exists");
	ok(c3 == null, "(3,3) out of range");
});

test("new cells have null value", function() {
	var b = board({size:3});
	expect(1);
	equals(b.cell_at(0,0).value, null, "uninitialized = null value");
});

test("center cell is free space", function() {
	var b = board({size:1});
	var c0 = b.cell_at(0,0);
	expect(2);
	equals(c0.value, "Free space", "Center cell is a free space");
	ok(c0.correct, "Free space is correct");
});

test("single-cell card is a winning card", function() {
	var b = board({size:1});
	var c0 = b.cell_at(0,0);
	expect(2);
	ok(c0.correct, "Free space is correct");
	ok(b.isWinningCard, "is a winning card");
});

test("winning card has a correct row", function() {
	var correctValues =['c1','c2','c3','c4','c5'];
	var incorrect_values=['d1', 'd2', 'd3'];
	var b = board({size:3, isWinningCard: true, correctValues:correctValues, incorrectValues:incorrect_values});
	var c0 = b.cell_at(1,1);
	expect(4);
	ok(c0.correct, "Free space is correct");
	ok(b.isWinningCard, "Is a winning card");
	ok(b.winning_cells != null, "Has winning cells");
	equals(b.winning_cells.length, 3, "Has three winning cells");
//	ok(b.get_cells().every(function(x){x != null && x.value != null}), "Every cell has a value");
});

test("non-winning card has no correct row", function() {
	var correctValues =['c1','c2','c3','c4','c5'];
	var incorrect_values=['d1', 'd2', 'd3'];
	var b = board({size:3, isWinningCard: false, correctValues:correctValues, incorrectValues:incorrect_values});
	var c0 = b.cell_at(1,1);
	expect(3);
	ok(c0.correct, "Free space is correct");
	ok(!b.isWinningCard, "Is not a winning card");
	equals(b.winning_cells, null, "No winning cells");
});

test("winning card has all cells filled", function() {
	var correctValues =['c1','c2','c3','c4','c5'];
	var incorrect_values=['d1', 'd2', 'd3'];
	var b = board({size:3, isWinningCard: true, correctValues:correctValues, incorrectValues:incorrect_values});
	expect(1);
	var cells = b.get_cells();
	ok(cells.every(function(x){return x != null && x.value != null}), "Every cell has a value");
});

test("non-winning card has all cells filled", function() {
	var correctValues =['c1','c2','c3','c4','c5'];
	var incorrect_values=['d1', 'd2', 'd3'];
	var b = board({size:3, isWinningCard: false, correctValues:correctValues, incorrectValues:incorrect_values});
	expect(1);
	var cells = b.get_cells();
	ok(cells.every(function(x){return x != null && x.value != null}), "Every cell has a value");
});


/*
test("card contains correct and incorrect values", function() {
	var correctValues =['c1','c2','c3','c4','c5'];
	var incorrect_values=['d1', 'd2', 'd3'];
	var b = board({size:3, correctValues:['c1','c2','c3','c4','c5'], incorrectValues:['d1', 'd2', 'd3']});
	var cellValues = b.get_cells().map(function (x){return x.value});
	expect(10);
	ok(b.cell_at(1,1).correct, "Free space is correct");
	ok(b.isWinningCard, "is a winning card");
	for (var i=0; i<correctValues.length; i++) {
		var cv = correctValues[i]
		ok(cellValues.indexOf(cv) >= 0, "contains " + cv);
	}
	for (var i=0; i<incorrect_values.length; i++) {
		var iv = incorrect_values[i]
		ok(cellValues.indexOf(iv)  >= 0, "contains " + iv);
	}
});
*/


