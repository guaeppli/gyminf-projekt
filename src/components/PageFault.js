import React, { useContext } from 'react'
import Context from '../store/Context'

function PageFault() {
    const { state } = useContext(Context)
    let percentage = '(' + Math.round(state.pageFaults/state.input.length*100) + '%)'
    return (
        <div style= {{clear: 'both'}}>
            <h3 style ={{padding: 10, display: 'inline'}}>Input-Länge: {state.input.length} </h3><h2 tyle ={{padding: 20, display: 'inline'}}>  Seitenfehler: {state.pageFaults} </h2>
            
        </div>
    )
}

export default PageFault
