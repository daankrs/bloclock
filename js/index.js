// index.js
/*
TO-DO:
  - Initialize
  - Update function
  -
*/
var mode = true,
    block,
    amountOfBlocks;

    var blocksContainer = document.getElementById('blocksContainer');

function drawBlocks() {
    if (mode) {
        amountOfBlocks = 145;
    } else {
        amountOfBlocks = 101;
    }
    for (var blockNumber = 1; blockNumber < amountOfBlocks; blockNumber++) {
        block = document.createElement("div");
        block.id = 'block-' + blockNumber;
        block.className = 'block';
        blocksContainer.appendChild(block);
    }
}
