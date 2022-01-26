pageReplace
          ? state.selectedAlgorithm === "hand"
            ?
            
          : setStepText("Die Seite ist bereits im Cache vorhanden!");


if (pageReplace === true) 
{
    if (state.selectedAlgorithm === "hand")
    {
        let number = ''
        if (state.input_is_random[0] === true)
            number = sw_variables.randomNr
        else
            number = sw_variables.inputNr 
        setStepText('Wähle einen Cache-Platz für die ' + number + '!')
    }    
    else
        setStepText("Die zu ersetzende Seite wurde bestimmt.")
}
else   
    setStepText("Die Seite ist bereits im Cache vorhanden!")      