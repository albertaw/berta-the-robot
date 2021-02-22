const { beforeEach, test, expect } = require('@jest/globals');
const app = require('../assets/app.js');

test('left is clear when facing east', () => {
    var state = {
        currentRow: 1,
        currentCol: 2,
        xPos: 64*2,
        yPos: 0,
        world: [
            [0,1,0,1,0],
            [0,1,0,1,0]
        ]
    }

    app.setState(state);
    app.drawBoard();

    expect(app.leftIsClear()).toBe(true);
});

test('left is not clear when facing east next to wall', () => {
    var state = {
        currentRow: 0,
        currentCol: 2,
        xPos: 64*2,
        yPos: 64,
        world: [
            [0,1,0,1,0],
            [0,1,0,1,0]
        ]
    }

    app.setState(state);
    app.drawBoard();

    expect(app.leftIsClear()).toBe(false);
});

test('left is not clear when facing east next to inner wall', () => {
    var state = {
        currentRow: 0,
        currentCol: 2,
        xPos: 64*2,
        yPos: 0,
        world: [
            [0,1,1,1,0],
            [0,1,0,1,0]
        ]
    }

    app.setState(state);
    app.drawBoard();

    expect(app.leftIsClear()).toBe(false);
});

test('left is clear when facing west', () => {
    var state = {
        currentRow: 0,
        currentCol: 2,
        xPos: 64*2,
        yPos: 64,
        direction: 'WEST',
        world: [
            [0,1,0,1,0],
            [0,1,0,1,0]
        ]
    }

    app.setState(state);
    app.drawBoard();

    expect(app.leftIsClear()).toBe(true);
});

test('left is not clear when facing west next to wall', () => {
    var state = {
        currentRow: 1,
        currentCol: 2,
        xPos: 64*2,
        yPos: 0,
        direction: 'WEST',
        world: [
            [0,1,0,1,0],
            [0,1,0,1,0]
        ]
    }

    app.setState(state);
    app.drawBoard();

    expect(app.leftIsClear()).toBe(false);
});

test('left is not clear when facing west next to inner wall', () => {
    var state = {
        currentRow: 0,
        currentCol: 2,
        direction: 'WEST',
        world: [
            [0,1,0,1,0],
            [0,1,1,1,0]
        ]
    }

    app.setState(state);
    app.drawBoard();

    expect(app.leftIsClear()).toBe(false);
});

test('left is clear when facing north', () => {
    var state = {
        currentRow: 1,
        currentCol: 2,
        direction: 'NORTH',
        world: [
            [0,0,0,0,0],
            [0,0,0,0,0]
        ]
    }

    app.setState(state);
    app.drawBoard();

    expect(app.leftIsClear()).toBe(true);
});

test('left is not clear when facing north next to wall', () => {
    var state = {
        currentRow: 1,
        currentCol: 0,
        direction: 'NORTH',
        world: [
            [0,0,0,0,0],
            [0,0,0,0,0]
        ]
    }

    app.setState(state);
    app.drawBoard();

    expect(app.leftIsClear()).toBe(false);
});

test('left is not clear when facing north next to inner wall', () => {
    var state = {
        currentRow: 1,
        currentCol: 1,
        direction: 'NORTH',
        world: [
            [0,0,0,0,0],
            [1,0,0,0,0]
        ]
    }

    app.setState(state);
    app.drawBoard();

    expect(app.leftIsClear()).toBe(false);
});

test('left is clear when facing south', () => {
    var state = {
        currentRow: 1,
        currentCol: 1,
        direction: 'SOUTH',
        world: [
            [0,0,0,0,0],
            [0,0,0,0,0]
        ]
    }

    app.setState(state);
    app.drawBoard();

    expect(app.leftIsClear()).toBe(true);
});

test('left is not clear when facing south next to wall', () => {
    var state = {
        currentRow: 1,
        currentCol: 4,
        direction: 'SOUTH',
        world: [
            [0,0,0,0,0],
            [0,0,0,0,0]
        ]
    }

    app.setState(state);
    app.drawBoard();

    expect(app.leftIsClear()).toBe(false);
});

test('left is not clear when facing south next to inner wall', () => {
    var state = {
        currentRow: 1,
        currentCol: 0,
        direction: 'SOUTH',
        world: [
            [0,0,0,0,0],
            [0,1,0,0,0]
        ]
    }

    app.setState(state);
    app.drawBoard();

    expect(app.leftIsClear()).toBe(false);
});