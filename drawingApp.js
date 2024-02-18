let canvas = document.getElementById("canvas")
let canvasControl = canvas.getContext("2d");
let fineFont = document.getElementById("fineFont")
let fontNumber = document.getElementById("fontNumber")
let broadFont = document.getElementById("broadFont")
let myColor = document.getElementById("myColor")
let cancelButton = document.getElementById("cancel")
let previousXPos,previousYPos;

canvasControl.lineWidth = 10
console.log(canvas)
console.log(fineFont)
console.log(fontNumber)
console.log(broadFont)
console.log(myColor)
console.log(cancelButton)

let check = false
canvas.addEventListener("mousedown", (event) => {
    
    console.log(event)
    console.log("It is down")
    check = true
    /*
    It didn't work due to scroll
    let previousXPos = event.target.clientX - canvas.scrollLeft
    let previousYPos = event.target.clientY - canvas.scrollTop
    */
   /*
   It worked but not exactly as wanted
    previousXPos = event.clientX - canvas.offsetLeft
    previousYPos = event.clientY - canvas.offsetTop 
   */ 
    
    previousXPos = event.offsetX
    previousYPos = event.offsetY

    canvas.addEventListener("mousemove", (event) => {
        /*
        let newXPos = event.clientX - canvas.offsetLeft
        let newYPos = event.clientY - canvas.offsetTop 
        */
        let newXPos = event.offsetX
        let newYPos = event.offsetY
 
        console.log(previousXPos)
        console.log(previousYPos)
        console.log(newXPos)
        console.log(newYPos)

        if (check)
        {
            if (previousXPos != newXPos || previousYPos != newYPos) 
            {
                console.log("Its moving too")

    //=====>Important! Same result with the both methods except shape no differerence in the position 
                
                /*canvasControl.beginPath();
                canvasControl.moveTo(previousXPos, previousYPos)
                canvasControl.lineTo(newXPos, newYPos)
                canvasControl.stroke();
                // canvasControl.closePath()
                */
               drawCircle(newXPos,newYPos)
               previousXPos = newXPos
               previousYPos = newYPos
            }
            canvas.addEventListener("mouseup", () =>{
                check = false
                previousXPos = 0
                previousYPos = 0
            } );
            // canvas.addEventListener("mouseleave", () => check = false);
        }
            
    });
});


fineFont.addEventListener("click", () => {
    if (+fontNumber.textContent > 5) {
        fontNumber.textContent = +fontNumber.textContent - 5
        canvasControl.lineWidth = +fontNumber.textContent
    }

})

broadFont.addEventListener("click", () => {
    if (+fontNumber.textContent < 50) {
        fontNumber.textContent = +fontNumber.textContent + 5
        canvasControl.lineWidth = +fontNumber.textContent
    }

})

myColor.addEventListener("input", (element) => {
    canvasControl.strokeStyle = element.target.value
    console.log(`the new color is ${element.target.value}`)
})


cancelButton.addEventListener("click",()=>canvasControl.clearRect(0, 0, canvas.width, canvas.height))

let drawCircle = (x,y)=>
{
    //The 3 argument is radius of the circle and true false is for clockwise and true is for anticlockwise
    canvasControl.beginPath();
    canvasControl.arc(x, y, canvasControl.lineWidth, 0, Math.PI * 2, true);
    canvasControl.fillStyle = canvasControl.strokeStyle;
    canvasControl.fill()
}