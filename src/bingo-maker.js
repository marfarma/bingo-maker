/**
 * Created by IntelliJ IDEA.
 * User: rdclark
 * Date: Oct 30, 2010
 * Time: 12:07:23 PM
 * To change this template use File | Settings | File Templates.
 */
function buildSample(divID) {
    var correct_values = ['c1','c2','c3','c4','c5', 'c6', 'c7','c8','c9', 'c10', 'c11','c12','c13','c14','c15', 'c16', 'c17','c18','c19', 'c20'];
    var incorrect_values = ['d1', 'd2', 'd3', 'd4', 'd5'];
    var size = 5;
    var b = board({size:size, is_winning_card: true, correct_values:correct_values, distractors:incorrect_values});
    var cells = b.get_cells();
    var table = buildTable(size, cells);
    $(divID).empty().append(table);
}

function buildTable(size, cells) {
    var table = '<table>';
    for (var i = 0,row = 0; row < size; row++) {
        table += '<tr>';
        for (var col = 0; col < size; col++) {
            table += '<td>' + cells[i].value + '</td>';
            i++
        }
        table += '</tr>';
    }
    table += '</table>';
    return table;
}