const robot = document.getElementById('robot');
const world = document.getElementById('world');
let xPos = 1;
let yPos = 1
let degree = 0;
let direction = 'EAST';

function move() {
	
	if (frontIsClear()) {
		if(facingEast()) {
			xPos += 8;
			robot.style.left = xPos + 'em';
		} else if (facingWest()) {
			xPos -= 8;
			robot.style.left = xPos + 'em';
		} else if (facingNorth()) {
			yPos += 8;
			robot.style.bottom = yPos + 'em';
		} else if (facingSouth()){
			yPos -= 8;
			robot.style.bottom = yPos + 'em';
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
	const elem = document.createElement('div');
	elem.className = 'gold';
	elem.style.left = xPos + 'em';
	elem.style.bottom = yPos + 'em';
	world.appendChild(elem);
}

function frontIsClear() {

	//a cell is 8 x 8. for the front to be clear,
	//there shuould be 8 units of space available
	//from the current position  
	if (xPos <= 24 && direction == 'EAST') {
		return true;
	}

	if (xPos >= 8 && direction == 'WEST') {
		return true;
	}

	if (yPos <= 24 && direction == 'NORTH') {
		return true;
	}

	if (yPos >= 8 && direction == 'SOUTH') {
		return true;
	}

	return false;
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
