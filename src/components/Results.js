import '../App.css'
import React, { useContext, useState, useEffect } from 'react'
import Context from '../store/Context'
import InputBoxes from '../components/InputBoxes'


function Results() {
    const { state, extract } = useContext(Context)

    const getAlg = (alg) => {
        switch (alg) {
            case 'fifo':
                return 'First In, First Out (FIFO) '
            case 'lifo':
                return 'Last In, First Out (LIFO) '
            case 'lru':
                return 'Least Recently Used (LRU) '
            case 'random':
                return 'Zufällige Verarbeitung '
            case 'hand':
                return 'Deine eigene Verarbeitung '
            case 'lfd':
                return 'Optimale Verarbeitung (LFD)'
            default:
                console.log('Das sollte nicht passieren...', {state})
                break;
        }
    }

    const getPerformance = (sf) => {
        const lfdIndex = extract(state.store_statistics, 0).indexOf('lfd')
        if (lfdIndex === -1)
            return 'Ohne LFD nicht bestimmbar!'
        let answer = sf / state.store_statistics[lfdIndex][2] * 100
        if (answer % 100 === 0) 
            return answer/100 + '.0'
        else 
            return Math.round(answer) / 100
    }


    return (

        <div id='results'  >

            <table  style={{boxShadow: 'none'}} >
                <tbody style={{ tableLayout: 'fixed', width: '100%'}}>
                    {state.store_statistics.map((value) => {
                        return (
                            <>
                                <tr >
                                    <td className='getVertical' style={{ border: 0, }}   >{getAlg(value[0])}</td>
                                    <td  className='getVertical'  style={{ border: 0, }} >{'Seitenfehler: ' + value[2]}</td>
                                    {state.allDone && state.selected_algorithms[5] && <td className='getVertical' style={{ border: 0,  }} > {(value[0] !== 'lfd' && value[2] !== 0) ? 'Performance: ' + getPerformance(value[2]) : ''} </td>}
                                   <div>
                                   <div id='results-input' >
                                        <InputBoxes input={value[1]} />
                                    </div>
                                    </div>
                                </tr>
                                <tr>&nbsp;</tr>

                            </>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Results
