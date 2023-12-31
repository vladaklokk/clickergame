let score = 0
let timer = 10
let gameActive = false 
let scoreHistory = [0]
const message = document.querySelector('.alert')
const messageBlock = document.querySelector('.message-block')
const startBtn = document.querySelector('#startGameBtn')
const gameContainer = document.querySelector('#game-container')
const consoleBtn = document.querySelector('.console-btn')
const consoleContent = document.querySelector('.console-content')
const home = document.querySelector('#home')
const record = document.querySelector('#record')
const screen1 = document.querySelector('.screen1')
const screen2 = document.querySelector('.screen2')
const ul = document.querySelector('.historys')
const ul1 = document.querySelector('.last-scores')

function add(text){
   const li = document.createElement('li')
   ul.insertAdjacentElement('beforeend',li)
   li.textContent = text
}

function add1(text){
   const li = document.createElement('li')
   ul1.insertAdjacentElement('afterend',li)
   li.textContent = text
}

consoleBtn.addEventListener('click', ()=> {
   consoleContent.style.display = 'block'

})

home.addEventListener('click', ()=> {
   consoleContent.style.display = 'none'
   screen2.style.display = 'none'
   screen1.style.display = 'block'
})

record.addEventListener('click', ()=> {
   consoleContent.style.display = 'none'
   screen1.style.display = 'none'
   screen2.style.display = 'block'
})

startBtn.addEventListener('click', startGame)

function updateScore(){
   document.querySelector('#score').textContent = `Score: ${score}`
}

function updateTimer(){
   document.querySelector('#timer').textContent = `Time: ${timer}`
}

function clearGameContainer(){
   gameContainer.lastElementChild.remove()
}

function randomColor(min, max){
   r = min + Math.random() * (max - min)
   g = min + Math.random() * (max - min)
   b = min + Math.random() * (max - min)
   return r,g,b
}

function randomSize(){
   const select = document.querySelector('#select').value
   if(select === 'Hard'){
      return size = '20px'
   }else if(select === 'Medium'){
      return size = '50px'
   }else if(select === 'Easy'){
      return size = '70px'
   }else if(select === 'Beast mode'){
      return size = `${Math.floor(1 + Math.random() * (70 - 1))}px`
   }
}

function getRandomPosition(){
   const maxX = gameContainer.clientWidth - 50
   const maxY = gameContainer.clientHeight - 50
   const x = Math.floor(Math.random() * maxX)
   const y = Math.floor(Math.random() * maxY)
   return { x , y }
}

function creareSquare(){
   const square = document.createElement('div')
   square.classList.add('square') 
   randomColor(0,255)
   randomSize()
   square.style.backgroundColor = `rgb(${r},${g},${b})`
   console.log(size);
   square.style.width = size
   square.style.height = size
   const {x, y} = getRandomPosition()
   square.style.left = `${x}px`
   square.style.top = `${y}px`

   square.addEventListener('click', ()=>{
      if(gameActive){
         score++
         updateScore()
         square.remove()
         creareSquare()
      }
   })
   gameContainer.appendChild(square)
}

function startGame(){
   startBtn.style.display = 'none'
   gameActive = true 
   score = 0
   timer = parseInt(document.querySelector('#duration').value) || 10

   updateScore()
   updateTimer()

   squareInterval = setInterval(()=>{
      if (timer > 0){
         timer--
         updateTimer()
      }else {
         endGame()
      }
   }, 1000)
   creareSquare()
}

function alertToGame(){
   messageBlock.style.display = 'block'
   message.textContent = `Your score: ${score}, your time: ${document.querySelector('#duration').value} seconds, ${ score > scoreHistory[0] ? `your new record: ${score}` : `you need for a new record ${scoreHistory[0] - score + 1}`}`
   document.querySelector('.message-block').addEventListener('click', ()=>{
      document.querySelector('.message-block').style.display = 'none'
   })
}

function endGame() {
   clearInterval(squareInterval)
   gameActive = false
   alertToGame()
   add(score)
   score > scoreHistory[0] ? add1(score) : 0
   if(score > scoreHistory[0]) {scoreHistory.unshift(score)}
   console.log(scoreHistory[0]);
   clearGameContainer()
   startBtn.style.display = 'block'
   console.log(scoreHistory);
}

