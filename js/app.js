function makeGrid() {
    
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
    
    let target=$(evt.target);
    //target should be <img>
    if (target.is("img")){
        //Increase the number of clicks
    
        let color="red";
        //We get an array of 16 elementes each elemnet wil by an ion-icon 
        //let positionsForImages=selectPosition();
        //At this point we need to see what position did we clicked .
        //we need to get the td id=position_13 so it will be position 13 
        //let positionsForImages=selectPosition();
        //get the id of the clicked element position_12 or position_1
        let idOfElementClicked=$(target).parents('td').attr('id');
        let id=idOfElementClicked.slice(9,idOfElementClicked.length);
        //Get the icon that goes in that elemenet
        let iconName=positionsForImages[id];
        //If we have already Assige an Image to this position , please do nothing
        let myPartnerPosition=GetMyPartnerPosition(id);

        let hasMyPartnerBeenClicked=($(target).parents('td').attr('id')=='position_'+myPartnerPosition )? true : false ;
        //isThereAniconInThisPosition(id) thet when we click the target is an <i> if not it is an <img>
        //call the method to set the image 
        if ( target.is( "img" ) ) {
            let quantityOfCardFacingUp=NumbersOfCardsFacingUp();
            switch (quantityOfCardFacingUp%2){
                case 0:
                    //This is the first card of a posible pair.Face it up
                    AssignImageToCard(idOfElementClicked,iconName);
                    increaseMoves();
                    break;
                case 1:
                //there is already one possible partner .let see if it is indeed a match
                    if (isThePriorFacedUpCartMyPartner(lastCardTurnedUp,id)){
                        //We have a match so turn it up and do something else
                        AssignImageToCard(idOfElementClicked,iconName);
                        //Set our background to red .We matched!!
                        increaseMoves();
                        setBackgroundColorToRed(lastCardTurnedUp,id);
                        if (haveYouWon()){
                            setStars(numberOfMoves);
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

function increaseMoves(){
    numberOfMoves++;
    setMoves(numberOfMoves);
}

function setMoves(moves){
    $('#numberOfMoves').text(moves);
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

    // switch(moves){
    //     case (moves<=7):
            
    //     case ((moves>=8) || moves<=12)):
    //         setNumberOfStars(5);
    //         break;
    //     case ((moves>=13 ) || moves<=15):
    //         setNumberOfStars(4);
    //         break;
    //     case ((moves>=16 ) || moves<=18):
    //         setNumberOfStars(3);
    //          break;
    //     case ((moves>=19 ) || moves<=21):
    //         setNumberOfStars(2);
    //         break;
    //     case (moves>=22):
    //           setNumberOfStars(1);
    //           break;

    // }
}

function setNumberOfStars(stars){
       let all_spans=$('#starsId').children('span');
       let counter=0;

            switch(stars){
                case (0):
                    for (let span of all_spans){
                        //span.addClass('checked');
                        span.outerHTML='<span class="fa fa-star"></span>';
                        
                    }
                    break;
                case (1):
                    
                    for (let span of all_spans){
                        if (counter<1){
                            span.outerHTML='<span class="fa fa-star checked"></span>';
                            counter++;
                        }
                    }
                    break;
                case (2):
                    //let counter=0;
                    for (let span of all_spans){
                        if (counter<2){
                            span.outerHTML='<span class="fa fa-star checked"></span>';
                            counter++;
                        }
                    }
                    break;
                case (3):
                //let counter=0;
                    for (let span of all_spans){
                        if (counter<3){
                            span.outerHTML='<span class="fa fa-star checked"></span>';
                            counter++;
                        }
                    }
                    break;
                case (4):
                //let counter=0;
                    for (let span of all_spans){
                        if (counter<4){
                            span.outerHTML='<span class="fa fa-star checked"></span>';
                            counter++;
                        }
                    }
                    break;
                case (5):
                    for (let span of all_spans){
                        //span.addClass('checked');
                        span.outerHTML='<span class="fa fa-star checked"></span>';
                    }
                    break;
            }
        
}

// $('#modal_CloseBtn').on('click', function(evt) {
//     //evt.preventDefault()

//     $('#victoryModalDialog').close;
    
// });


function haveYouWon(){
    let cardsUp=NumbersOfCardsFacingUp();
    return (cardsUp===16) ? true : false ;
}

function victoryMessage(){
    //Without jQuery
    //let dialog=document.querySelector('#victoryModalDialog');
    //dialog.showModal();
    $('#victoryModalDialog').dialog({
        show: {
            effect: "blind",
            duration: 1000
          },
          hide: {
            effect: "explode",
            duration: 1000
          }
    });
    
}

function setBackgroundColorToRed(id,idPartner){
    $('#position_'+id).children('div').children('i').addClass('red_background');
    $('#position_'+idPartner).children('div').children('i').addClass('red_background');
}

function amITheOnlyCardFacingUp(idOfElementClicked,iconName){
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
var numberOfMoves=0;
setStars(0);
makeGrid();
let positionsForImages=selectPosition();
var modalCloseBtn=document.getElementById('modal_CloseBtn');
