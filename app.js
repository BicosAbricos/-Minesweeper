//Создаём доску сапёра

import {
    TILE_STATUSES, createBoard, markTile, revealTile, checkWin, checkLose
} from "./minesweeper.js";

let BOARD_SIZE = 14
let NUMBER_OF_MINES = 40
const minesLeftText = document.querySelector('[data-mine-count]')
const messageText = document.querySelector('.subtext')
let board;
const boardElement = document.querySelector('.board')
let easyBtn = document.querySelector('.easy')
let normalBtn = document.querySelector('.normal')
let hardBtn = document.querySelector('.hard')
easyBtn.addEventListener('click', () => {
    BOARD_SIZE = 10;
    NUMBER_OF_MINES = 10;
    boardElement.innerHTML = '';
    board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);
    Doska()
})
normalBtn.addEventListener('click', () => {
    BOARD_SIZE = 14;
    NUMBER_OF_MINES = 40;
    boardElement.innerHTML = '';
    board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);
    Doska()
})
hardBtn.addEventListener('click', () => {
    BOARD_SIZE = 24;
    NUMBER_OF_MINES = 99;
    boardElement.innerHTML = '';
    board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);
    Doska()
})
function Doska() {
    board.forEach(row => {
        row.forEach(tile => {
            boardElement.append(tile.element)
            tile.element.addEventListener('click', () => {
                revealTile(board, tile)
                checkGameEnd()
            })
            tile.element.addEventListener("contextmenu", e => {
                e.preventDefault()
                markTile(tile)
                listMinesLeft()
            })

        })
    })
    boardElement.style.setProperty("--size", BOARD_SIZE)
    minesLeftText.textContent = NUMBER_OF_MINES
}
function listMinesLeft() {
    const markedTilesCount = board.reduce((count, row) => {
        return count + row.filter(tile => tile.status === TILE_STATUSES.MARKED).length
    }, 0)

    minesLeftText.textContent = NUMBER_OF_MINES - markedTilesCount
}

function checkGameEnd() {
    const win = checkWin(board)
    const lose = checkLose(board)

    if (win || lose) {
        boardElement.addEventListener('click', stopProp, { capture: true })
        boardElement.addEventListener('contextmenu', stopProp, { capture: true })

    }
    if (win) {
        messageText.textContent = "You Win"
    }

    if (lose) {
        messageText.textContent = "You lose"
        board.forEach(row => {
            row.forEach(tile => {
                if (tile.status === TILE_STATUSES.MARKED) markTile(tile)
                if (tile.mine) revealTile(board, tile)
            })
        })
    }
}

function stopProp(e) {
    e.stopImmediatePropagation()
}