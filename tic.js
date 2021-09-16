const X_CLASS='x'
const CIRCLE_CLASS='circle'
const cellElements=document.querySelectorAll('[data-cell]')
const board=document.getElementById('board')
let circleTurn
let xTurn
const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const winningMessageTextElement=document.querySelector('[data-winning-message-text]')
const winningMessageElement = document.getElementById('winningMessage')

cellElements.forEach(cell => {
    cell.addEventListener('click', handleClick, {once: true})
   

})
 
function handleClick(e){
    const cell = e.target
    const currentClass= circleTurn ? CIRCLE_CLASS : X_CLASS
    placemark(cell, currentClass)
    if (checkWin(currentClass)){
        console.log('winner')
         endGame(false)
    }
    else if(isDraw()){
        endGame(true)
    }
    
    else{
    swapTurn()
    setBoardHoverClass()
    }
}

function endGame(draw){
    if(draw) {
        winningMessageElement.innerText='Draw!'
    }
    else{
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!!`
    }
    winningMessageElement.classList.add('show')
}


function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || 
        cell.classList.contains(CIRCLE_CLASS)
    })
}

function placemark(cell, currentClass){
    cell.classList.add(currentClass)
}
function swapTurn(){
    circleTurn=!circleTurn
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if(circleTurn){
    board.classList.add(CIRCLE_CLASS)
    }
    else{
                board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })

}

function restart(){
    window.location.reload()
}
