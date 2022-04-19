const grid = document.querySelector(".grid")
grid.width = 900
grid.height = 600

let xDirection = 4
let yDirection = 4
let timeId = null;

class block {
    constructor(xAxis , yAxis) {
        this.bottomLeft = [xAxis,yAxis]
        this.bottomRight = [xAxis + 200 , yAxis]
        this.topLeft = [xAxis , yAxis + 50]
        this.topRight = [xAxis + 200 , yAxis + 50]

    }

}
// all me blocks bruv
const blocks =[
    new block(10 , 500) ,
    new block(220 , 500),
    new block(430 , 500),
    new block(640 , 500) ,
    new block(10 , 430) ,
    new block(220 , 430),
    new block(430 , 430),
    new block(640 , 430) ,
    new block(10 , 360) ,
    new block(220 , 360),
    new block(430 , 360),
    new block(640 , 360) ,
]


function creatBlock() {
    for(let i = 0; i<blocks.length;i++){
const block = document.createElement("div")
block.classList.add("block")
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
            if(userCurrentPosition[0] > 0){
            userCurrentPosition[0] -= 35
            drawUser()
                if(userCurrentPosition[0] < -4) {
                    userCurrentPosition[0] += 30
                    drawUser()
                }
            }
            break;
        case "ArrowRight" :
                if(userCurrentPosition[0] < 690){
                userCurrentPosition[0] += 35
                drawUser()
                    
                }
            break;
            
    }
}
document.addEventListener("keydown" , moveUser)

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
            // setInterval( moveBall , 15) 

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