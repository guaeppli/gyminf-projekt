import React, { useContext, useEffect } from 'react'
import Context from '../store/Context'
import '../components/Popup.css'
import '../App.css'


function Settings_Chosen(props) {
    const { state, set } = useContext(Context)


    const labelAlg = (i) => {
        switch (state.algorithms[i]) {
            case 'fifo':
                return ' FIFO'
            case 'lifo':
                return ' LIFO'
            case 'lru':
                return ' LRU'
            case 'random':
                return ' Zufall'
            case 'hand':
                return ' Benutzer'
            case 'lfd':
                return ' LFD'
            default:
                console.log('Das sollte nicht passieren...', { state })
                return 'Das sollte nicht passieren...'
        }
    }

    const algorithmen = () => {
        let answer = []
        if (state.selected_algorithms[0] === true)
            answer = [labelAlg(0)]
        if (state.selected_algorithms[1] === true)
            answer = (answer.length === 0 ? [labelAlg(1)] : [...answer, ',  ' + labelAlg(1)])
        if (state.selected_algorithms[2] === true)
            answer = (answer.length === 0 ? [labelAlg(2)] : [...answer, ',  ' + labelAlg(2)])
        if (state.selected_algorithms[3] === true)
            answer = (answer.length === 0 ? [labelAlg(3)] : [...answer, ',  ' + labelAlg(3)])
        if (state.selected_algorithms[4] === true)
            answer = (answer.length === 0 ? [labelAlg(4)] : [...answer, ',  ' + labelAlg(4)])
        if (state.selected_algorithms[5] === true)
            answer = (answer.length === 0 ? [labelAlg(5)] : [...answer, ',  ' + labelAlg(5)])
        return answer
    }

    const input = () => {
        if (state.input_is_random[1] && !state.input_is_adversary && !state.input_is_distributed)
            return 'Zufall'
        if (!state.input_is_random[1])
            return 'Benutzer'
        if (state.input_is_random[1] && state.input_is_adversary)
            return 'Gegenspieler'
        if (state.input_is_distributed)            
            return 'Vergangenheitsabhängig'
    }

    const processing = () => {
        if (state.stepWise_mode)
            return 'Schrittweise'
        else {
            const time = state.timeInterval === 1? 'schnell' : state.timeInterval / 1000 + " Sek."
            return 'Automatisch (' + time + ')'
        }
    }

    const cache = () => {
        let answer = state.cache.length
        if (state.cacheFilled)
            answer = answer + ' (automatisch füllen)'
        return answer
    }

    const adversary_text = () => {
        if (state.input_is_adversary && state.input_is_random)
            return '(für ' + algorithmen()[0] + '!)'
        return ''
    }

    return (
        <div className="popup-chosen-settings">
            <br/>
            <h3>Gewählte Einstellungen:</h3>
            <p>{<strong>Algortihmen: </strong>} {algorithmen()}</p>
            <p>{<strong>Input: </strong>}{input()} {adversary_text()}</p>
            <p>{<strong>Verarbeitung:</strong>} {processing()}</p>
            <p>{<strong>Cachegrösse:</strong>} {cache()}</p>
            <p>{<strong>Zahlenbereich:</strong>} 1 - {state.currentRange}</p>
            <br/>
        </div>

    )
}

export default Settings_Chosen
