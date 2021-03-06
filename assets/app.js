document.body.innerHTML = `
<div id="world">
	<div id="robot"></div>
</div>
`

const robot = document.getElementById('robot');
const world = document.getElementById('world');
const cellDimen = 64;
let worldWidth;
let worldHeight;
let numRows;
let numCols;
let currentRow;
let currentCol;
let xPos;
//increases from bottom to top
let yPos;
let degree = 0;
let direction = 'EAST';
let worldState = [];

function setState(state) {
	currentRow = state.currentRow;
	currentCol = state.currentCol;
	xPos = state.xPos;
	yPos = state.yPos;
	worldState = state.world;
	numRows = state.world.length;
	numCols = state.world[0].length;
	worldWidth = cellDimen * numCols;
	worldHeight = cellDimen * numRows;
	direction = state.direction || 'EAST';
}

function drawBoard() {
	let cellCount = 0;
	//add 4 to account for borders on each side
	world.style.width = worldWidth + 4 + 'px';
	world.style.height = worldHeight + 4 + 'px';
	robot.style.left = xPos + 'px';
	robot.style.bottom = yPos + 'px';
	for (let i = 0; i < numRows; i++) {
		let row = document.createElement('div');
		row.className = 'row';
		for (let j = 0; j < numCols; j++) {
			let cell = document.createElement('div');
			cell.className = 'cell';
			cell.id = 'cell' + cellCount;
			cellCount += 1;
			cell.style.width = cellDimen + 'px';
			cell.style.height = cellDimen + 'px';
			if(worldState[i][j] == 2) {
				const gold = document.createElement('div');
				gold.className = 'gold';
				cell.appendChild(gold);
				worldState[i][j] = {gold: gold, cell: cell, wall: false};
			} else if (worldState[i][j] == 1) {
				cell.style.backgroundColor = 'black';
				worldState[i][j] = { cell: cell, wall: true };
			} else {
				worldState[i][j] = { cell: cell, wall: false };
			}
			row.appendChild(cell);
			
		}
		world.appendChild(row);
	}
	
} 

function move() {
	if (frontIsClear()) {
		if(facingEast()) {
			currentCol += 1;
			xPos += cellDimen;
			robot.style.left = xPos + 'px';
		} else if (facingWest()) {
			currentCol -= 1;
			xPos -= cellDimen;
			robot.style.left = xPos + 'px';
		} else if (facingNorth()) {
			currentRow -= 1;
			yPos += cellDimen;
			robot.style.bottom = yPos + 'px';
		} else if (facingSouth()){
			currentRow += 1;
			yPos -= cellDimen;
			robot.style.bottom = yPos + 'px';
		}
	} else {
		turnOff();
	}
	
}

function turnLeft() {
	degree -= 90;
	robot.style.transform = 'rotate(' + degree + 'deg)';
	
	if (degree == 0 || degree % 360 == 0) {
		direction = 'EAST';
		degree = 0;
	} else if (degree % 270 == 0) {
		direction = 'SOUTH';
	} else if (degree % 180 == 0) {
		direction = 'WEST';
	} else if (degree % 90 == 0) {
		direction = 'NORTH';
	} 
}


function putBox() {
	if (worldState[currentRow][currentCol].gold) {
		turnOff();
	} else {
		const gold = document.createElement('div');
		gold.className = 'gold';
		const cell = worldState[currentRow][currentCol].cell;
		cell.appendChild(gold);
		worldState[currentRow][currentCol].gold = gold;
	}
}

function pickBox() {
	const elem = worldState[currentRow][currentCol].gold;
	if (elem) {
		worldState[currentRow][currentCol].gold = null
		elem.remove();
	} else {
		turnOff()
	}
}

function nextToBox() {
	const elem = worldState[currentRow][currentCol].gold;
	if (elem) {
		return true;
	} else {
		return false;
	}
}

function frontIsClear() {
	//for the front to be clear there shuould be 1 more cell
	//from the current position. 
	
	//check for outer wall
	if (currentCol == (numCols-1) && facingEast()) {
		return false;
	}

	else if (currentCol == 0 && facingWest()) {
		return false;
	}

	else if (currentRow == 0 && facingNorth()) {
		return false;
	}

	else if (currentRow == (numRows-1) && facingSouth()) {
		return false;
	}

	//check if an inner wall exists
	else if (facingEast() && worldState[currentRow][currentCol + 1] && worldState[currentRow][currentCol + 1].wall)  {
		return false;
	}

	else if (facingWest() && worldState[currentRow][currentCol - 1] && worldState[currentRow][currentCol - 1].wall)  {
		return false;
	}

	else if (facingNorth() && worldState[currentRow - 1][currentCol] && worldState[currentRow - 1][currentCol].wall)  {
		
		return false;
	}
	
	else if (facingSouth() && worldState[currentRow + 1][currentCol] && worldState[currentRow + 1][currentCol].wall )  {
		
		return false;
	}

	return true;
}

function leftIsClear() {
	if (facingEast() && currentRow == 0) {
		return false;
	} else if (facingEast() && worldState[currentRow -1][currentCol] && worldState[currentRow -1][currentCol].wall) {
		return false;
	} else if (facingWest() && currentRow == (numRows-1)) {
		return false;
	} else if (facingWest() && worldState[currentRow + 1][currentCol] && worldState[currentRow + 1][currentCol].wall) {
		return false;
	} else if (facingNorth() && currentCol == 0) {
		return false;
	} else if (facingNorth() && worldState[currentRow][currentCol - 1] && worldState[currentRow][currentCol - 1].wall) {
		return false;
	} else if (facingSouth() && currentCol == (numCols - 1)) {
		return false;
	} else if (facingSouth() && worldState[currentRow][currentCol + 1] && worldState[currentRow][currentCol + 1].wall) {
		return false;
	} else {
		return true;
	}
}

function rightIsClear() {
	if (facingEast() && currentRow == (numRows-1)) {
		return false;
	} else if (facingEast() && worldState[currentRow + 1][currentCol] && worldState[currentRow + 1][currentCol].wall) {
		return false;
	} else if (facingWest() && currentRow == 0) {
		return false;
	} else if (facingWest() && worldState[currentRow -1][currentCol] && worldState[currentRow -1][currentCol].wall) {
		return false;
	} else if (facingNorth() && currentCol == (numCols - 1)) {
		return false;
	} else if (facingNorth() && worldState[currentRow][currentCol + 1] && worldState[currentRow][currentCol + 1].wall) {
		return false;
	} else if (facingSouth() && currentCol == 0) {
		return false;
	} else if (facingSouth() && worldState[currentRow][currentCol - 1] && worldState[currentRow][currentCol - 1].wall) {
		return false;
	} else {
		return true;
	}
	
}

function facingEast() {
	return direction == 'EAST';
}

function facingWest() {
	return direction == 'WEST'
}

function facingNorth() {
	return direction == 'NORTH';
}

function facingSouth() {
	return direction == 'SOUTH';
}

function turnOff() {
	const id = setInterval(animate, 10);

	function animate() {
		degree--;
		robot.style.transform = 'rotate(' + degree + 'deg)';
	}
} 

module.exports = {
	setState,
	drawBoard,
	move,
	turnLeft,
	leftIsClear,
	rightIsClear
}