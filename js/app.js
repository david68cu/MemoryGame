function makeGrid() {
    
    let heightSelected=4;
    let widthSelected=4;
    let indexForPosition=0;
    for (var height=0;height<heightSelected;height++){
        
        $('#matrixCanvas').prepend('<tr></tr>');
        for (var width=0;width<widthSelected;width++){
            $('#matrixCanvas').children('tr').first().prepend('<td><div class="rectangle"><img class="card_back"  height="100" width="100"></div></td>');
            //$('#matrixCanvas').children('tr').first().prepend('<td><div class="rectangle"><div class="card_back"  height="150" width="150"></div></div></td>');
            //$('#matrixCanvas').children('tr').first().prepend('<td><div   height="150px" width="150px"></div></td>');
            $('#matrixCanvas').children('tr').first().children('td').first().attr("id" , "position_" +indexForPosition );
            indexForPosition++;
        }
        
    }
}

// function sourceOfIcosn(){
//     var selectedIcons=["ion-trophy" ,"ion-earth" ,"ion-plane" ,"ion-videocamera","ion-beer","ion-help-buoy","ion-soup-can","ion-bug"];
// }

$('#matrixCanvas').on( 'click', function( evt ) {
    let target=evt.target;
    //target should be <img>
    let color="red";
    //We get an array of 16 elementes each elemnet wil by an ion-icon 
    //let positionsForImages=selectPosition();
    //At this point we need to see what position did we clicked .
    //we need to get the td id=position_13 so it will be position 13 
    let positionsForImages=selectPosition();
    //get the id of the clicked element position_12 or position_1
    let idOfElementClicked=$(target).parents('td').attr('id');
    let id=idOfElementClicked.slice(9,idOfElementClicked.length);
    //Get the icon that goes in that elemenet
    let iconName=positionsForImages[id];
    //call the method to set the image 
    AssignImageToCard(idOfElementClicked,iconName);
    $(target).css( 'background-color', color );
});

document.addEventListener("DOMContentLoaded", function(event) { 
    //do work
  });


function selectPosition(){
    let heightSelected=4;
    let widthSelected=4;
    let numberOfImages=widthSelected*heightSelected/2;
    let range=[];
    let result=[];
    var selectedIcons=["ion-trophy" ,"ion-earth" ,"ion-plane" ,"ion-videocamera","ion-beer","ion-help-buoy","ion-soup-can","ion-bug", "ion-umbrella" ,"ion-planet" , "ion-cash" ];
    
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


makeGrid();
//let positionsForImages=selectPosition();
//before allow the client to click we need to load the images that has been randomly selected in selectPosition()
//to the position.
//AssignImageToCards(positionsForImages);