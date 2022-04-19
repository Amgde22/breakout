const grid = document.querySelector(".grid")
grid.width = 900
grid.height = 600

const moveLeft = document.querySelector("#moveLeft")
const moveRight = document.querySelector("#moveRight")
let timer = null ;

const startButton = document.querySelector("#start")
startButton.addEventListener("click" , () => {
    startButton.style.display = "none"
    moveBallTimer = setInterval( moveBall , 15)})
let moveBallTimer = null




let xDirection = 4
let yDirection = 4
let timeId = null;

class block {
    constructor(xAxis , yAxis , blockWidth,blockHeight) {
        this.bottomLeft = [xAxis,yAxis]
        this.bottomRight = [xAxis + blockWidth , yAxis]
        this.topLeft = [xAxis , yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth , yAxis + blockHeight]
        this.blockW = blockWidth

    }

}
// all me blocks bruv
const blocks =[
    new block(10 + 20 , 500 , 410,50) ,
 
    new block(430 + 20 , 500 , 410,50),
    
    new block(10 + 20 , 430 , 200,50) ,
    new block(220 + 20 , 430 , 200,50),
    new block(430 + 20 , 430 , 200,50),
    new block(640 + 20 , 430 , 200,50) ,
    // tinys
    new block(10 + 20 , 360 , 127,50) ,
    new block(30 + 127 + 15, 360 , 127,50) ,
    new block(30 +(127*2) +30 , 360 , 127,50),

    new block(30 + (127*3) +40  , 360 , 127,50),
    new block(30 + (127*4) +55 , 360 , 127,50),

    new block(30 + (127*5) +70 , 360 , 127,50) ,
]


function creatBlock() {
    for(let i = 0; i<blocks.length;i++){
const block = document.createElement("div")
block.blockWidth = blocks[i].blockW
        switch(blocks[i].blockW){
            case 410 :
                block.classList.add("wideBlock")
                block.classList.add("block")

                break;
            case 200 :
                block.classList.add("block")
                break ;
            case 127 :
                block.classList.add("smallBlock")
                block.classList.add("block")

                break;
        }
block.style.left = blocks[i].bottomLeft[0] + "px"
block.style.bottom = blocks[i].bottomLeft[1] + "px"

grid.appendChild(block)

    }

} // END FO CREATE BLOCK
creatBlock()
// ADD USER
const userStartPosition = [355 , 30]
let userCurrentPosition = userStartPosition

const userPlatform = document.createElement("div")
userPlatform.classList.add("user")
drawUser()
grid.appendChild(userPlatform)
        // change user position
        function drawUser() {
            userPlatform.style.cssText = 
         `left:${userCurrentPosition[0]}px; bottom:${userCurrentPosition[1]}px; `

        
        }
         // Draw Ball
        function drawBall() {
            ball.style.cssText =
         `left:${ballPosition[0]}px; bottom:${ballPosition[1]}px; `
    }
// Mover User
function moveUser(e){
    switch(e.key){
        case "ArrowLeft" :
            moveleft()
            break;
        case "ArrowRight" :
              moveright()
            break;
            
    }} // end of move user keyboard

document.addEventListener("keydown" , moveUser)

moveRight.addEventListener("mousedown" , () => {moveUserButton("right") })
moveRight.addEventListener("mouseup" , () => {clearInterval(timer)})
moveRight.addEventListener("touchstart" , () => {moveUserButton("right") })
moveRight.addEventListener("touchend" , () => {clearInterval(timer)})


moveLeft.addEventListener("mousedown" , () => {moveUserButton("left") })
moveLeft.addEventListener("mouseup" , () => {clearInterval(timer)})
moveLeft.addEventListener("touchstart" , () => {moveUserButton("left") })
moveLeft.addEventListener("touchend" , () => {clearInterval(timer)})



function moveUserButton(direction) {
    
    switch(direction){
        case "right" : 
        timer =  setInterval( moveright , 90  )
        break;
        case "left" :
            timer =  setInterval( moveleft , 90  )
            break;
    }
}
function moveright() {
   

        if(userCurrentPosition[0] < 690){
            userCurrentPosition[0] += 35
            drawUser()
                
            }
}
function moveleft() {
    if(userCurrentPosition[0] > 0){
        userCurrentPosition[0] -= 35
        drawUser()
            if(userCurrentPosition[0] < -4) {
                userCurrentPosition[0] += 30
                drawUser()
            }
        }
}
// add ball
const ballPosition = [ 435 , 50]

const ball = document.createElement("div")
ball.classList.add("ball")


drawBall()
grid.appendChild(ball)
    // move ball 
function moveBall() {
    ballPosition[0] += xDirection
    ballPosition[1] += yDirection
    drawBall()
    checkForColisions()
}
            

//  coli check
 function checkForColisions() {
//  block break
for(let i = 0 ; i < blocks.length;i++) {
    if( ( ballPosition[0] + 32 >= blocks[i].bottomLeft[0] &&
          ballPosition[0]  <= blocks[i].bottomRight[0] ) &&
        ( ballPosition[1] + 32 >= blocks[i].bottomLeft[1] &&
          ballPosition[1] <= blocks[i].topRight[1] )
          
        ){
        const allBlocks = Array.from(document.querySelectorAll(".block"))
        allBlocks[i].classList.remove("block")
        switch( allBlocks[i].blockWidth){
            case 410 :
                allBlocks[i].classList.remove("wideBlock")
                allBlocks[i].classList.remove("block")
                break;
            case 200 :
                allBlocks[i].classList.remove("block")
                break ;
            case 127 :
                allBlocks[i].classList.remove("smallBlock")
                allBlocks[i].classList.remove("block")
                break;
        }
        blocks.splice(i,1)
        changePostion()
        }
}
// user Touch
if( (ballPosition[0] + 32 >= userCurrentPosition[0] && 
    ballPosition[0] <= userCurrentPosition[0] + 190 )&&
    ( ballPosition[1] >= userCurrentPosition[1] &&
      ballPosition[1]  <= userCurrentPosition[1] + 20 )){
        changePostion() 
      }

// wall touch
    if( ballPosition[0] >= (grid.width - 30 ) ||
        ballPosition[1] >= (grid.height - 30) ||
        ballPosition[0] <= 0 || ballPosition[1] <= 0){
        changePostion()
        
    }


 }
 //change ball postition
 function changePostion() {
     if(xDirection == 4 && yDirection == 4) {
        xDirection = -4
        return;
     }
     if(xDirection == -4 && yDirection == 4) {
         yDirection = -4
     return ;
    }
    if(xDirection == -4 && yDirection == -4) { 
       xDirection = 4
     return;}
    if(xDirection == 4 && yDirection == -4 ) {
        yDirection = 4

    }

 }