function makeGrid() {
    //This function will dynamically create the table with all its elements <tr> <td>
    //We also will dynamically assig id to each td element.Finally each td elemnet will be an <img> , a blac square

    let heightSelected=4;
    let widthSelected=4;
    let indexForPosition=0;
    for (var height=0;height<heightSelected;height++){
        
        $('#matrixCanvas').prepend('<tr></tr>');
        for (var width=0;width<widthSelected;width++){
            //$('#matrixCanvas').children('tr').first().prepend('<td><div class="rectangle"><img class="card_back"  height="100" width="100"></div></td>');
            $('#matrixCanvas').children('tr').first().prepend('<td><div class="rectangle"><img class="card_back"></div></td>');
            //$('#matrixCanvas').children('tr').first().prepend('<td><div class="rectangle"><div class="card_back"  height="150" width="150"></div></div></td>');
            //$('#matrixCanvas').children('tr').first().prepend('<td><div   height="150px" width="150px"></div></td>');
            $('#matrixCanvas').children('tr').first().children('td').first().attr("id" , "position_" +indexForPosition );
            indexForPosition++;
        }
        
    }
}



$('#matrixCanvas').on( 'click', function( evt ) {
    //This is the on-click event for any elment inside the table.
    let target=$(evt.target);
    //We will follow the execution only if the user clicked on an <img> element.
    //This way we avoid below code to exeucte for <table> or an already faced up element <i>.
    if (target.is("img")){
        //Increase the number of clicks
    
        let color="red";
        //We get an array of 16 elements each element will be an ion-icon 
        //let positionsForImages=selectPosition();
        //At this point we need to see what position did we clicked .
        //Example: We need to get the <td id=position_13>  so it will be position 13 
        //let positionsForImages=selectPosition();
        //get the id of the clicked element position_12 or position_1
        let idOfElementClicked=$(target).parents('td').attr('id');
        let id=idOfElementClicked.slice(9,idOfElementClicked.length);
        //Get the icon that goes in that element
        let iconName=positionsForImages[id];
        //If we have already assign an Image to this position , please do nothing
        let myPartnerPosition=GetMyPartnerPosition(id);

        let hasMyPartnerBeenClicked=($(target).parents('td').attr('id')=='position_'+myPartnerPosition )? true : false ;
        //isThereAniconInThisPosition(id) then when we click the target it is an <i> if not it is an <img>
        //call the method to set the image 
        if ( target.is( "img" ) ) {
            let quantityOfCardFacingUp=NumbersOfCardsFacingUp();
            
            switch (quantityOfCardFacingUp%2){
                case 0:
                    //This is the first card of a posible pair.Face it up 
                    //If we are here there are 0 , 2, 4, 6, 8 , 10 , 12 or 14 
                    AssignImageToCard(idOfElementClicked,iconName);
                    increaseMoves();
                    // 
                    setStars(numberOfMoves);
                    break;
                case 1:
                //there is already one possible partner .let see if it is indeed a match
                    if (isThePriorFacedUpCartMyPartner(lastCardTurnedUp,id)){
                        //We have a match so turn it up and do something else
                        AssignImageToCard(idOfElementClicked,iconName);
                        //Set our background to red .We matched!!
                        increaseMoves();
                        setBackgroundColorToRed(lastCardTurnedUp,id);
                        setStars(numberOfMoves);
                        if (haveYouWon()){
                            endTime=Date.now();
                            var elapsedTime=endTime-startTime;
                            setStars(numberOfMoves);
                            setTime(elapsedTime);
                            victoryMessage();
                        }
                    } 
                    else{
                        //We do not have a match so do not turning me up 
                        //And turn the card before me that was looking for a partner to black
                        imageNode=$('<img class="card_back" height="100" width="100"> </img>');
                        $('#position_'+lastCardTurnedUp).children('div').children('i').remove();
                        $('#position_'+lastCardTurnedUp).children('div').prepend(imageNode);
                        //Also I do not need the prior card for anything 
                        increaseMoves();
                        setStars(numberOfMoves);
                    }
            

                    

            }

        }
        lastCardTurnedUp=id;
    } 
});


$('#restartIcon').on( 'click', function( evt ) {
       numberOfMoves=0;
       setMoves(0);
       setStars(0);
       window.location.reload();
});

$('#restartDialog').on( 'click', function( evt ) {
    numberOfMoves=0;
    setMoves(0);
    setStars(0);
    window.location.reload();
});



function victoryMessage(){
    

    //This is for normal HTML5 dialog. We can also use also show() in HTML5
    let dialog = document.getElementById('victoryModalDialog');
    //lets create an event for closing the dialog once the user select No
    document.querySelector('#closeDialog').onclick = function() {
         dialog.close();
    };
    //Show the HTML5 dialog in modal form 
    dialog.showModal();
}



function increaseMoves(){
    numberOfMoves++;
    if (numberOfMoves==1){
        //We take this point as start point for our time measurement
        //We set the global variable startTime with the first Click or increase of the move
        //this value will be used to show the user the time elapsed in the <dialog> element
        startTime=Date.now();
        //We also need to show the time in the panel.It will be showing the time during the 
        //duration of the game.For that we will use a function expresion and 
        //x is a global variable so we just set its value here but defined it in a global space
        //It is this way so we can later call clearInterval function that needs x as parameter 
        //to be call when the game finishs

        x = setInterval(function() {

            // Get todays date and time
            var now = new Date().getTime();
          
            // Find the distance between now an the count down date
            var distance = now-startTime;
          
            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
          
            // Display the result in the element with id="demo"
            document.getElementById("timerId").innerHTML = days + "d " + hours + "h "
            + minutes + "m " + seconds + "s ";
          
            //We call clearInterval() from the method that detect if we have won to stop the timer.
            // If the count down is finished, write some text 
            if (haveYouWon()) {
                clearInterval(x);
                document.getElementById("timerId").innerHTML = "YOU WON";
              }
            
          }, 1000);
    }

    setMoves(numberOfMoves);
}

function setStarsScorePanel(moves){
    $('#numberOfMoves').text(moves);
}

function setMoves(moves){
    
    $('#numberOfMoves').text(moves);
    $('#numberOfMovesDialog').text(moves);

}

function setTime(time){
    let seconds=time/1000;
    $('#elapsedTime').text(seconds);
}

function setStars(moves){

    if (moves<=15) {
        setNumberOfStars(0);
        
    }
    else if ((moves>=16 && moves<=25)){
        setNumberOfStars(5);
    }

    else if ((moves>=26 && moves<=35)){
        setNumberOfStars(4);
    }
    else if ((moves>=36 && moves<=47)){
        setNumberOfStars(3);
    }
    else if ((moves>=48 && moves<=55)){
        setNumberOfStars(2);
    }
    else {
        setNumberOfStars(1);
    }

}

function setNumberOfStars(stars){


            switch(stars){
                case (0):
                    setStarsNumberTo(0);
                    break;
                case (1):
                    setStarsNumberTo(1);
                    break;
                case (2):
                    setStarsNumberTo(2);
                    break;
                case (3):
                    setStarsNumberTo(3);
                    break;
                case (4):
                    setStarsNumberTo(4);
                    break;
                case (5):
                    setStarsNumberTo(5);
                    break;
            }
        
}

function setStarsNumberTo(numberOfStars){
    //In the Panel , we start with all starts checked and they will get unchecked 
    //when we keep increase move.So we need to uncheck them.The initialstatus is checked
    let numberOfStarsToToggleOff=5-numberOfStars;
    toggleStarsFromPanel(numberOfStarsToToggleOff);

    //In the <dialog> elemnet   , we start with all starts Unchecked .
    //We wil  turn them to checked depending on how many moves we have played.
    //As the dialog show only if we have won so we will do this only if we have won
    if (haveYouWon()){
        all_spans=$('#starsId').children('span');
        counter=0;
        for (let span of all_spans){
        
            if (counter<numberOfStars){
                span.outerHTML='<span class="fa fa-star checked"></span>';
                counter++;
            }
        }
    }
}


function toggleStarsFromPanel(starsToToggleOff){
    //This is for the panel 
    //We alwasy need to be certin that all stars are on so we cna atoggle those we need to toggle
    setAllStarsInThePanelToON();
    //Now that all stars are ON , we will toggle off those we need to turn off
    toggleXStarsFromPanel(starsToToggleOff);
}

function toggleXStarsFromPanel(starsToToggle){
    let all_spans=$('#starsIdScorePanel').children('span');
    let counter=0;
     
    for (let span of all_spans){
        if (counter<starsToToggle){
            //span.classList.toggle("checked");
            span.outerHTML='<span class="fa fa-star"></span>';
            counter++;
        }
    }

}

function setAllStarsInThePanelToON(){
    let all_spans=$('#starsIdScorePanel').children('span');
    let counter=0;

    for (let span of all_spans){
        if (counter<5){
            span.outerHTML='<span class="fa fa-star checked"></span>';
            counter++;
        }
    }

}

function haveYouWon(){
    let cardsUp=NumbersOfCardsFacingUp();
    return (cardsUp===16) ? true : false ;
}



function setBackgroundColorToRed(id,idPartner){
    $('#position_'+id).children('div').children('i').addClass('red_background');
    $('#position_'+idPartner).children('div').children('i').addClass('red_background');
}

function amITheOnlyCardFacingUp(){

    let all_tr=$('#matrixCanvas').children('tr');
    let counter=0;
    for (let tr of all_tr){
        let all_td=$(tr).children('td');
        for (let td of all_td){
            let div=$(td).children();
            if ($(div).children('i').length>0)
            {
              counter++;
             }
        }
        
    } 
    return counter==1? true : false ;
}

function NumbersOfCardsFacingUp(){
    let all_tr=$('#matrixCanvas').children('tr');
    let counter=0;
    for (let tr of all_tr){
        let all_td=$(tr).children('td');
        for (let td of all_td){
            let div=$(td).children();
            if ($(div).children('i').length>0)
            {
              counter++;
             }
        }
    }
    return counter;
}

function GetMyPartnerPosition(myPosition){
    let result=-1;//We do not have a match and this will be an error !!!
    let counter=0;
    let myIcon=positionsForImages[myPosition];
    for (let image of positionsForImages)
    {
        if ((image==myIcon) && (myPosition!=counter)){
            return counter;
        }
        counter++;

    }
    return result;
}

function isMyPartnerFacingUp( myPartnerPosition)
{
    //$('#'+myPartnerPosition).children('div').children('i').length>0 ? true: false;
    let myPartnerDiv=$('#position_'+myPartnerPosition).children('div');
    let myPartnerI=$(myPartnerDiv.children('i')).length;
    return (myPartnerI>0) ? true : false ;
}

function isThePriorFacedUpCartMyPartner(lastCardTurnedUp_Id, myId){
      let myPartnerPosition=GetMyPartnerPosition(myId);
      return (myPartnerPosition==lastCardTurnedUp_Id) ? true : false;
}




function selectPosition(){
    //We will randomly select from all the icons , 8 of them to set them in the 16 square grid
    let heightSelected=4;
    let widthSelected=4;
    let numberOfImages=widthSelected*heightSelected/2;
    let range=[];
    let result=[];
    var selectedIcons=["ion-trophy" ,"ion-earth" ,"ion-plane" ,"ion-videocamera","ion-beer","ion-help-buoy","ion-soup-can","ion-bug", "ion-umbrella" ,"ion-planet" , "ion-cash" ,"ion-lightbulb" ,"ion-leaf" ,"ion-model-s"];
    
    for (var height=0;height<(heightSelected*widthSelected);height++){
            //This will create an array containing  the quantity of picture in the grid 
            //If we have 16 pictures it will containg an array with the numbers 0-15
            //We will later randomly select from this array
            range.push(height);
    }
    
    for (let i=0;i<numberOfImages ;i++){
        
        //We iterate using numberOfImages (let say 8 images for 16 squares)
        //however the array were the images names is stored could be much larger so we can have more randoness and use more that 8 differents images
        //this way the game will be more random and the player wont see the same images every time .
        let indexOfImageToSelect=getRandomIntInclusive(0,selectedIcons.length-1);
        let selectedImage=selectedIcons[indexOfImageToSelect];
        //We remove the item from the array using splice.This also reduce the array length
        selectedIcons.splice(indexOfImageToSelect,1);
        
        //Randomly select one position in the grip where to put the above image
        let position1=getRandomIntInclusive(0,range.length-1)
        let index1=range[position1];
        //We remove the item from the array using splice.This also reduce the array length
        range.splice(position1,1);
        
        //Randomly select second position on the grid where to put the same matching image than position1
        let position2=getRandomIntInclusive(0,range.length-1)
        let index2=range[position2];
        //We remove the item from the array using splice.This also reduce the array length
        range.splice(position2,1);
        
        //Try to reduce above code an extract functions to optimization
        result[index1]=selectedImage;
        result[index2]=selectedImage;
    }
    return result;
} 

function getRandomIntInclusive(min, max) {
    //This is the way in JavaScrip to get a random number between tow numbers 
    //see MDN 
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function AssignImageToCards(positionForImagenArray){
         let all_td_elements=document.getElementsByTagName('td');
         let all_td_elementsJQ=$('td');
         
         //Jquery iteration
         $('td').each(function (index,value){
            
             let imgElement=$(this).children();
             let imgElementGranChildren=imgElement.children('img');
             $(imgElementGranChildren).addClass("ion-bug card_back fontSize" );
             let stop= 'stop';

         });


}

function AssignImageToCard(td_id ,icon){
        //Given the id of the td , set the image 
        $('#'+td_id).children('div').children('img').remove();
        $('#'+td_id).children('div').prepend('<i></i>');
        $('#'+td_id).children('div').children('i').attr('class',icon);
        $('#'+td_id).children('div').children('i').addClass('fonts_Icons');
}

var lastCardTurnedUp=-1;
var startTime=0;
//Here we will store a function.So it will be a function expression 
//That will call the setInterval() Browser function. We also will need to call later 
//the clearInterval() function that will need as parameter x in another point of the program
var x=0;
var numberOfMoves=0;
setStars(0);
makeGrid();
let positionsForImages=selectPosition();
