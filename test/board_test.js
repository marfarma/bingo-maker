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
	expect(3);
	ok(c0.correct, "Free space is correct");
	ok(b.is_winning_card, "is a winning card");
	equals(b.serial_number, "0", "serial number == 0");
});
