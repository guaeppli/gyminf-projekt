import React from 'react'
import { useEffect, useState, useContext } from "react"
import '../App.css'
import Context from '../store/Context'

function Cache() {
    const { state, set, clear, extract } = useContext(Context)

    const clickHandler = (index) => {
        clear(state.cache, 1)
        if (!state.cacheClicked) {
            if (!state.stepWise_mode) {
                state.output[0] = state.cache[index][0]
                state.cache[index] = [state.input[0][0], 'red']
                set({ ...state, cacheClicked: true, hand_index: index, dummyClicked: Math.random() })
            }
            else {
                state.cache[index][1] = 'salmon'
                set({ ...state, cacheClicked: true, hand_index: index, dummyClicked: Math.random() })
            }
        }
    };
    const sorted = extract(state.cache, 3).slice().sort(function (a, b) { return b - a })
    const ranks = extract(state.cache, 3).map(function (v) { return sorted.indexOf(v) + 1 });

    let stream = [...state.cache]

    for (var i = 0; i < state.cache.length; i++)
        stream[i][5] = ranks[i]

    const getModulo = () =>
    {
        return window.innerWidth > 1200? 10 : 5      
    }

    return (
        < div  style ={{textAlign: 'center',  margin: 0}}>

            <table id='cache' style={{color: 'black', border: '1px solid black'}}>
             
                <tbody >
                    {!state.fillingCache && (state.selectedAlgorithm === 'fifo' || state.selectedAlgorithm === 'lru' || state.selectedAlgorithm === 'lfd') &&
                        <td colspan={state.cache.length} style={{ backgroundColor: 'lightblue', fontSize: 18, border: 0, padding: 5 }}>
                            {state.selectedAlgorithm === 'fifo' && <span> Am längsten im Cache: </span>}
                            {state.selectedAlgorithm === 'lru' && <span> Reihenfolge des Aufrufs: </span>}
                            {state.selectedAlgorithm === 'lfd' && <span> Distanz zum nächsten Aufruf: </span>}
                        </td>}
                    {stream.map((value, index) => {
                        return (
                            <>
                                {index % getModulo() == 0 && <tr></tr>}
                                <td style={{ border: 0, padding: 0 }} >

                                    {(state.selectedAlgorithm === 'fifo') && !state.fillingCache &&
                                        <tr>
                                            <td key={index} style={{ fontSize: 18, border: 0, padding: 0, backgroundColor: 'lightblue' }}> {value[2] === 'X'? value[2]: <span>&nbsp;</span>} </td>
                                        </tr>}
                                    {(state.selectedAlgorithm === 'lru') && !state.fillingCache &&
                                        <tr>
                                            <td key={index} style={{ fontSize: 18, border: 0, padding: 0, backgroundColor: 'lightblue' }}> {value[5] + '.'} </td>
                                        </tr>}
                                    {(state.selectedAlgorithm === 'lfd') && !state.fillingCache &&
                                        <tr>
                                            <td key={index} style={{ fontSize: 18, border: 0, padding: 0, backgroundColor: 'lightblue' }}> {value[4] < 0 ? <span>&infin;</span> : value[4]} </td>
                                        </tr>}

                                    <tr className={`${!state.cacheClicked ? 'hovereffect' : ''}`} >
                                        <td style={{ backgroundColor: value[1], width: 100, height: 30}} key={index} onClick={() => clickHandler(index)}> {value[0]} </td>
                                    </tr>
                                </td>
                            </>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Cache
