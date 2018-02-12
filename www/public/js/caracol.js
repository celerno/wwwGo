//try move

clickBox = function() {
  var i = this.getAttribute('data-i');
  var j = this.getAttribute('data-j');
  i = parseInt(i);
  j = parseInt(j);
  
  var arriba = i > 0 ? ((i - 1) * 4) + j : undefined;
  var abajo = i < 3 ? ((i + 1) * 4) + j : undefined;
  var derecha = j < 3 ? i * 4 + (j + 1) : undefined;
  var izquierda = j > 0 ? i * 4 + (j - 1) : undefined;

  var boxes = document.getElementById('board').children;

  if (derecha!=undefined && boxes[derecha].innerHTML == '')
    move([i, j], [i,j+1]);
  else if (izquierda!=undefined && boxes[izquierda].innerHTML == '')
    move([i, j], [i,j-1]);
  else if (arriba!=undefined && boxes[arriba].innerHTML == '')
    move([i, j], [i-1,j]);
  else if (abajo !=undefined && boxes[abajo].innerHTML == '')
    move([i, j], [i+1,j]);

}

move = function(o, d) {
  var t = board[o[0]][o[1]];
  board[o[0]][o[1]] = '';
  board[d[0]][d[1]] = t;
  draw();
}
var board = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 0]
];

draw = function() {
  var boxes = document.getElementById('board').children;
  for (var i = 0; i < 4; i++)
    for (var j = 0; j < 4; j++)
      boxes[((i * 4) + j)].innerHTML = board[i][j] == 0 ? '' : board[i][j];

}

randomize = function() {
  var shuffled = [];
  for (var i = 0; i < 4; i++)
    for (var j = 0; j < 4; j++) {
      var t = board[i][j];
      var i_t = Math.floor(Math.floor(Math.random() * 4));
      var j_t = Math.floor(Math.floor(Math.random() * 4));

      board[i][j] = board[i_t][j_t];
      board[i_t][j_t] = t;
    }

  draw();
}

var boxex = document.getElementById('board').children;
for(var i=0;i<16;i++){
boxex[i].onclick=clickBox;
}
randomize();