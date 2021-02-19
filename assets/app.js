const robot = document.getElementById('robot');
const world = document.getElementById('world');
const cellDimen = 64;
const row = 6;
const col = 6;
let xPos = 0;
let yPos = 0;
let degree = 0;
let direction = 'EAST';
let worldWidth;
let worldHeight;
let state = [];
let currentStateRow = row - 1;
let currentStateCol = 0;

function initBoard(worldState) {
	worldWidth = cellDimen * col;
	worldHeight = cellDimen * row;
	let cellCount = 0;
	//add 4 to account for borders on each side
	world.style.width = cellDimen * col + 4 + 'px';
	world.style.height = cellDimen * row + 4 + 'px';
	for (let i = 0; i < row; i++) {
		let row = document.createElement('div');
		row.className = 'row';
		let arr = []
		for (let j = 0; j < col; j++) {
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
				arr.push({gold: gold, cell: cell, wall: false});
			} else if (worldState[i][j] == 1) {
				cell.style.backgroundColor = 'black';
				arr.push({ cell: cell, wall: true });
			} else {
				arr.push({ cell: cell, wall: false });
			}
			row.appendChild(cell);
			
		}
		world.appendChild(row);
		state.push(arr);
	}
	
} 

function move() {
	if (frontIsClear()) {
		if(facingEast()) {
			currentStateCol += 1;
			xPos += cellDimen;
			robot.style.left = xPos + 'px';
		} else if (facingWest()) {
			currentStateCol -= 1;
			xPos -= cellDimen;
			robot.style.left = xPos + 'px';
		} else if (facingNorth()) {
			currentStateRow -= 1;
			yPos += cellDimen;
			robot.style.bottom = yPos + 'px';
		} else if (facingSouth()){
			currentStateRow += 1;
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


function putGold() {
	const gold = document.createElement('div');
	gold.className = 'gold';
	const cell = state[currentStateRow][currentStateCol].cell;
	cell.appendChild(gold);
	state[currentStateRow][currentStateCol].gold = gold;
}

function pickGold() {
	const elem = state[currentStateRow][currentStateCol].gold;
	if (elem) {
		state[currentStateRow][currentStateCol].gold = null
		elem.remove();
	} else {
		turnOff()
	}
}

function nextToGold() {

}

function frontIsClear() {
	//for the front to be clear there shuould be 1 more cell
	//from the current position. 
	
	//check for outer wall
	if (currentStateCol == (col-1) && facingEast()) {
		return false;
	}

	else if (currentStateCol == 0 && facingWest()) {
		return false;
	}

	else if (currentStateRow == 0 && facingNorth()) {
		return false;
	}

	else if (currentStateRow == (row-1) && facingSouth()) {
		return false;
	}

	//check if an inner wall exists
	else if (facingEast() && state[currentStateRow][currentStateCol + 1] && state[currentStateRow][currentStateCol + 1].wall)  {
		return false;
	}

	else if (facingWest() && state[currentStateRow][currentStateCol - 1] && state[currentStateRow][currentStateCol - 1].wall)  {
		return false;
	}

	else if (facingNorth() && state[currentStateRow - 1][currentStateCol] && state[currentStateRow - 1][currentStateCol].wall)  {
		
		return false;
	}
	
	else if (facingSouth() && state[currentStateRow + 1][currentStateCol] && state[currentStateRow + 1][currentStateCol].wall )  {
		
		return false;
	}

	return true;
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