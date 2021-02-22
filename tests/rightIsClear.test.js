const { test } = require('@jest/globals');
const app = require('../assets/app.js');

test('right is clear when facing east', () => {
    var state = {
        currentRow: 0,
        currentCol: 0,
        world: [
            [0,0,0,0],
            [0,0,0,0]
        ]
    }

    app.setState(state);
    app.drawBoard();

    expect(app.rightIsClear()).toBe(true);
})

test('right is not clear when facing east next to wall', () => {
    var state = {
        currentRow: 1,
        currentCol: 0,
        world: [
            [0,0,0,0],
            [0,0,0,0]
        ]
    }

    app.setState(state);
    app.drawBoard();

    expect(app.rightIsClear()).toBe(false);
})

test('right is not clear when facing east next to inner wall', () => {
    var state = {
        currentRow: 0,
        currentCol: 0,
        world: [
            [0,0,0,0],
            [1,0,0,0]
        ]
    }

    app.setState(state);
    app.drawBoard();

    expect(app.rightIsClear()).toBe(false);
})

test('right is clear when facing west', () => {
    var state = {
        currentRow: 1,
        currentCol: 0,
        direction: 'WEST',
        world: [
            [0,0,0,0],
            [0,0,0,0]
        ]
    }

    app.setState(state);
    app.drawBoard();

    expect(app.rightIsClear()).toBe(true);
})

test('right is not clear when facing west and next to wall', () => {
    var state = {
        currentRow: 0,
        currentCol: 0,
        direction: 'WEST',
        world: [
            [0,0,0,0],
            [0,0,0,0]
        ]
    }

    app.setState(state);
    app.drawBoard();

    expect(app.rightIsClear()).toBe(false);
})

test('right is not clear when facing west and next to inner wall', () => {
    var state = {
        currentRow: 1,
        currentCol: 0,
        direction: 'WEST',
        world: [
            [1,0,0,0],
            [0,0,0,0]
        ]
    }

    app.setState(state);
    app.drawBoard();

    expect(app.rightIsClear()).toBe(false);
})

test('right is clear when facing north', () => {
    var state = {
        currentRow: 1,
        currentCol: 0,
        direction: 'NORTH',
        world: [
            [0,0,0,0],
            [0,0,0,0]
        ]
    }

    app.setState(state);
    app.drawBoard();

    expect(app.rightIsClear()).toBe(true);
})

test('right is clear when facing north next to wall', () => {
    var state = {
        currentRow: 1,
        currentCol: 3,
        direction: 'NORTH',
        world: [
            [0,0,0,0],
            [0,0,0,0]
        ]
    }

    app.setState(state);
    app.drawBoard();

    expect(app.rightIsClear()).toBe(false);
})

test('right is clear when facing north next to inner wall', () => {
    var state = {
        currentRow: 1,
        currentCol: 0,
        direction: 'NORTH',
        world: [
            [0,0,0,0],
            [0,1,0,0]
        ]
    }

    app.setState(state);
    app.drawBoard();

    expect(app.rightIsClear()).toBe(false);
})

test('right is clear when facing south', () => {
    var state = {
        currentRow: 1,
        currentCol: 1,
        direction: 'SOUTH',
        world: [
            [0,0,0,0],
            [0,0,0,0]
        ]
    }

    app.setState(state);
    app.drawBoard();

    expect(app.rightIsClear()).toBe(true);
})

test('right is not clear when facing south next to wall', () => {
    var state = {
        currentRow: 1,
        currentCol: 0,
        direction: 'SOUTH',
        world: [
            [0,0,0,0],
            [0,0,0,0]
        ]
    }

    app.setState(state);
    app.drawBoard();

    expect(app.rightIsClear()).toBe(false);
})

test('right is not clear when facing south next to inner wall', () => {
    var state = {
        currentRow: 1,
        currentCol: 1,
        direction: 'SOUTH',
        world: [
            [0,0,0,0],
            [1,0,0,0]
        ]
    }

    app.setState(state);
    app.drawBoard();

    expect(app.rightIsClear()).toBe(false);
})