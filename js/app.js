function makeGrid() {
    
    let heightSelected=4;
    let widthSelected=4;
    for (var height=0;height<heightSelected;height++){
        $('#matrixCanvas').prepend('<tr></tr>');
        for (var width=0;width<widthSelected;width++){
            $('#matrixCanvas').children('tr').first().prepend('<td>HO</td>');
            
        }
        
    }
}

document.addEventListener("DOMContentLoaded", function(event) { 
    //do work
  });

makeGrid();