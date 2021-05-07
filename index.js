let numbersArray = [1,4,56,76,73,43453,53,343]

let ArraySlider = document.getElementById('rangeID')
let numOutput = document.getElementById('outputID')
let startClickable = true

//linear variables mostly
let allGrandchildren = []
let needToReturn = false
let loopIndx = 0
let loopIndx2 = 0
let linSearchNumFoundIndx
let numFound = false
let needTobreakLinSearchEarly = false
let IndexOfEarlyBreakLin

//binary variables mostly
let low
let high 
let mid
let elementsToPush = []
let Binarycount
let allLows = []
let allMids = []
let allHighs = []
let AnimateBinaryLoopCounter
let binaryNumFound = false


numOutput.innerHTML = ArraySlider.value //initial value of slider
lenArray = ArraySlider.value
makeArray(lenArray)

ArraySlider.addEventListener('input', function() {
    numOutput.innerHTML = ArraySlider.value //updates here on moving slider
    lenArray = ArraySlider.value
    needToReturn = true
    loopIndx = 0
    loopIndx2 = 0
    clearElements()
    clearErrorText()
    makeArray(lenArray)
}, false)


//this will come from slider




function startClicked(){
    targetNum = document.getElementById('targetNumID').value
    console.log(startClickable)
    if(targetNum == ""){
        NoNumEnteredText()
        return
    }
    if(startClickable == false){
        return
    }
    targetNum = parseInt(targetNum, 10)
    mode = document.getElementById('selectMenu').value
    if(mode =='Linear Search'){
        startClickable = false
        clearColor()
        clearErrorText()
        linearSearchFunction(targetNum)
    }
    if(mode =='Binary Search'){
        startClickable = false
        clearColor()
        clearErrorText()
        binarySearch(targetNum)
        console.log('binary')
    }
    if(mode =='Exponential Search'){
        startClickable = false
        clearColor()
        clearErrorText()
        console.log('exponent search')
        exponentialSearch(targetNum)
    }

    
}

function makeArray(lenArray){
    newArray = []
    for(i=0; i<lenArray; i++){
        numberToAppend = CalcRandom()
        while(newArray.includes(numberToAppend)){
            console.log('going to calculate a new number')
            numberToAppend = CalcRandom()
        }
        newArray.push(numberToAppend)
    }
    newArray.sort((a, b) => a - b);
    console.log(newArray)
    makeElements(newArray)
}

function CalcRandom(){
    randomNumber = Math.floor(Math.random() * 1000) + 1
    return randomNumber
}

function clearElements(){
    let bigContainer = document.getElementById('algoSection')
    bigContainer.innerHTML =''
}

function makeElements(ArrayToUse){
    let bigContainer = document.getElementById('algoSection')
    for(i = 0; i < ArrayToUse.length; i++){
        const singleArrayElement = document.createElement("div");
        const ValueOfArray = document.createElement("div");
        const ValueOfIndex = document.createElement("h5");
        singleArrayElement.className += "singleArrayElement"
        ValueOfArray.className += "valueOfArrayElement"
        ValueOfIndex.className += "indexOfArrayElement"
        ValueOfArray.innerHTML = ArrayToUse[i]
        ValueOfIndex.innerHTML = i
        bigContainer.appendChild(singleArrayElement)
        singleArrayElement.appendChild(ValueOfArray)
        singleArrayElement.appendChild(ValueOfIndex)
        

    }
}

function linearSearchFunction(targetNum){
    let bigContainer = document.getElementById('algoSection')
    numFound = false
    needTobreakLinSearchEarly = false
    allGrandchildren = []
    childDivs = bigContainer.children
    for(i=0; i < childDivs.length; i++){
        let grandChildDivs = childDivs[i].children[0] //value of array element div  
        numsOfArray = parseInt(grandChildDivs.innerHTML,10)
        allGrandchildren.push(grandChildDivs)
        if(numsOfArray == targetNum){
            numFound = true
            linSearchNumFoundIndx = i
            // found the number, index of number is i
        }   
    }
    //if numFound is false here than number is not in the list so here you can look for biggest possible index
    if(numFound == false){
        for(i=0; i<allGrandchildren.length; i++){
            if(targetNum< parseInt(allGrandchildren[i].innerHTML, 10)){
                console.log('here is the index of the number too big ' +  i)
                needTobreakLinSearchEarly = true
                IndexOfEarlyBreakLin = i
                break
            }
        }
    }
    

    loopIndx = 0
    loopIndx2 = 0
    needToReturn = false
    timeout()
    
//     if(numFound == false) {
 //        alert('num not in list')
    // }
}


function timeout() {
    if(needToReturn == true){
        loopIndx = 0
        startClickable = true
        return
    }

    if(loopIndx ==1){
        clearEffect()
    }
    setTimeout(function () {
        startClickable = false
        divTobeChanged = allGrandchildren[loopIndx]
        divTobeChanged.style.border = "orange 4px solid"
        divTobeChanged.style.borderRadius = "25px"
        if(numFound == true && loopIndx  == linSearchNumFoundIndx ){ //stop animating when find number
            startClickable = true
            return
        }
        if(needTobreakLinSearchEarly == true &&  loopIndx-1 == IndexOfEarlyBreakLin ){
            startClickable = true
            clearColor()
            showErrorText()
            return
        }

        loopIndx ++
        if(loopIndx < allGrandchildren.length){       
            timeout();
        }
        else{
            showErrorText()
            startClickable = true
        }
    }, 150);
}

function clearEffect() {
    if(needToReturn == true){
        loopIndx2 = 0
        startClickable = true
        return
    }
    setTimeout(function () {
        startClickable = false
        divTobeChanged = allGrandchildren[loopIndx2]
        divTobeChanged.style.border = '2px solid gray'
        divTobeChanged.style.borderRadius = '7px'
        if(numFound == true && loopIndx2 + 1 == linSearchNumFoundIndx ){ //stop clearing animation one before the actual number found
            startClickable = true
            return
        }
        if(needTobreakLinSearchEarly == true && loopIndx2 == IndexOfEarlyBreakLin ){
            startClickable = true
            return
        }
        loopIndx2 ++
        if(loopIndx2 < allGrandchildren.length){
            clearEffect();
        }
        else{
            startClickable = true
        }
        
    }, 150);
}

function clearColor(){
    let bigContainer = document.getElementById('algoSection')
    let littlemans = bigContainer.children
    for(i=0; i < littlemans.length; i++){
        let tinyMans = littlemans[i].children[0] //value of array element div
        tinyMans.style.border = '2px solid gray'
        tinyMans.style.borderRadius = '7px'
        tinyMans.style.backgroundColor = 'rgba(0,0,0,0)'
    }

  //  for(i=0; i<allGrandchildren.length; i++){
//        allGrandchildren[i].style.border = '2px solid gray'
    //    allGrandchildren[i].style.borderRadius = '7px'
  //      allGrandchildren[i].style.backgroundColor = 'rgba(0,0,0,0)'
//    }
}

function binarySearch(targetNum){
    let bigContainer = document.getElementById('algoSection')
    let childDivs = bigContainer.children
    binaryNumFound = false
    elementsToPush = []
    binarySearchValues = []
    allLows = []
    allMids = []
    allHighs = []
    AnimateBinaryLoopCounter = 0

    for(i=0; i < childDivs.length; i++){
        let grandChildDivs = childDivs[i].children[0] //value of array element div  
        let BinarySearchValueOfArrayAtIndex = parseInt(grandChildDivs.innerHTML,10)
        binarySearchValues.push(BinarySearchValueOfArrayAtIndex)
        elementsToPush.push(grandChildDivs)
    }
    low = 0
    high = elementsToPush.length - 1
    Binarycount = 0
    while(low <=high) {
        Binarycount++
        mid = Math.floor((high + low) /2)
        allLows.push(low)
        allHighs.push(high)
        allMids.push(mid)
        //animateBinary()
        //elementsToPush[mid].style.backgroundColor = "red"  
        //elementsToPush[high].style.backgroundColor = "black"
        if(binarySearchValues[mid] == targetNum){
            console.log('found the number, its this : ' + binarySearchValues[mid])
            startClickable = true
            binaryNumFound = true
            break//need to add something to identify when I find the number like numFound
        }
        else if(targetNum > binarySearchValues[mid] ){
            low = mid +1
        }
        else{
            high = mid -1
        }
    } 
    needToReturn = false
    animateBinary()
//    console.log('value is not in the array') //before I say this I must check to make sure numFound is false
}

function animateBinary(){
    if(needToReturn == true){
        startClickable = true
        return
    }
    setTimeout(function () {
        startClickable = false
        clearColor()
        console.log('allLows:'+  allLows)
        console.log('AnimateBinaryLoopCounter:'+  AnimateBinaryLoopCounter)

        elementsToPush[allLows[AnimateBinaryLoopCounter]].style.backgroundColor = "yellow"
        elementsToPush[allHighs[AnimateBinaryLoopCounter]].style.backgroundColor = "black"
        elementsToPush[allMids[AnimateBinaryLoopCounter]].style.backgroundColor = "red"
        if(binaryNumFound == true && AnimateBinaryLoopCounter+1 ==  Binarycount ){
            elementsToPush[allLows[AnimateBinaryLoopCounter]].style.backgroundColor = "rgba(0,0,0,0)"
            elementsToPush[allHighs[AnimateBinaryLoopCounter]].style.backgroundColor = "rgba(0,0,0,0)"
            elementsToPush[allMids[AnimateBinaryLoopCounter]].style.backgroundColor = "red"
            startClickable = true
            return
    }
    
    AnimateBinaryLoopCounter ++

    if(AnimateBinaryLoopCounter < Binarycount){
        animateBinary()
    }    
    else{
        console.log('number wasnt found so animation is over, should add a message here later ')
        showErrorText()
        clearColor()
        startClickable = true
        return
    }
    }, 1000);
}



function exponentialSearch(targetNum){
    let bigContainer = document.getElementById('algoSection')
    let childDivs = bigContainer.children
    let rangeOfsubarray = 1
    elementsToPush = []
    binaryNumFound = false
    exponentialSearchValues = []
    allLows = []
    allMids = []
    allHighs = []
    AnimateBinaryLoopCounter = 0

    for(i=0; i < childDivs.length; i++){ //gathering the array
        let grandChildDivs = childDivs[i].children[0] //value of array element div  
        let exponentialSearchValueOfArrayAtIndex = parseInt(grandChildDivs.innerHTML,10)
        exponentialSearchValues.push(exponentialSearchValueOfArrayAtIndex)
        elementsToPush.push(grandChildDivs)
    }
    //exponential search starts here
    if(exponentialSearchValues[0] == targetNum){
        console.log('found the number')
        elementsToPush[0].style.backgroundColor = "red"
        startClickable = true
        return
    }
    while (rangeOfsubarray < exponentialSearchValues.length && exponentialSearchValues[rangeOfsubarray]<= targetNum) {
        rangeOfsubarray = rangeOfsubarray*2
    }
    low = Math.floor(rangeOfsubarray/2)
    high = Math.min(rangeOfsubarray, elementsToPush.length - 1)
    let lowValueForSubarray = Math.floor(rangeOfsubarray/2)
    let highValueForSubarray = Math.min(rangeOfsubarray, elementsToPush.length)

    //subbarray goes from [rangeOfsubarra/2 ... Math.min(...)] 
    //need to light up the subarray
    //use diff colors for binary search
    //use maybe a variable for ammount of time to animate for binary search and make it slower for this one ?
    Binarycount = 0
    while(low<=high) {
        Binarycount++
        mid = Math.floor((high + low) /2)
        allLows.push(low)
        allHighs.push(high)
        allMids.push(mid)
        //animateBinary()
        //elementsToPush[mid].style.backgroundColor = "red"  
        //elementsToPush[high].style.backgroundColor = "black"
        if(exponentialSearchValues[mid] == targetNum){
            console.log('found the number in exponentialSearch, its this : ' + exponentialSearchValues[mid])
            startClickable = true
            binaryNumFound = true
            break
        }
        else if(targetNum > exponentialSearchValues[mid] ){
            low = mid +1
        }
        else{
            high = mid -1
        }
    }
    needToReturn = false
    lightUpSubarray(lowValueForSubarray, highValueForSubarray)
    //animateBinary()
    //must call binary search, low value is rangeOfSubarray/2, high value is min(rangeOfSuabarray, array length), targetNum
    //run binary search with these new parrams and get answer
}

function lightUpSubarray(lowValueForSubarray, highValueForSubarray){
    if(needToReturn == true){
        startClickable = true
        return
    }
    setTimeout(function () {
        startClickable = false
        let fullSubarray = elementsToPush.slice(lowValueForSubarray, highValueForSubarray)
        for(i=0; i<fullSubarray.length; i++){
            fullSubarray[i].style.backgroundColor ="pink"
        }
        animateBinary()
        return
    }, 0);
    
}


function showErrorText(){
    let errorTextDiv = document.getElementById('error-text-div')
    let thingToAddTextTo = document.getElementById('errorTextToAdd')
    errorTextDiv.style.display ="block"
    thingToAddTextTo.innerHTML = "number wasn't found"
}

function clearErrorText(){
    let errorTextDiv = document.getElementById('error-text-div')
    errorTextDiv.style.display ="none"
}

function NoNumEnteredText(){
    let errorTextDiv = document.getElementById('error-text-div')
    let thingToAddTextTo = document.getElementById('errorTextToAdd')
    errorTextDiv.style.display ="block"
    thingToAddTextTo.innerHTML = "No number was entered"
}