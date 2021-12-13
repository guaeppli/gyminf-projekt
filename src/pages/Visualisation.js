import React, { useEffect, useContext, useState } from 'react'
import Context from '../store/Context'
import InputBoxes from '../components/InputBoxes'
import Cache from '../components/Cache'
import Input from '../components/Input'
import PageFault from '../components/PageFault'
import Settings from './Settings'
import Results from '../components/Results'
import Settings_Chosen from './Settings_Chosen'
import '../App.css'


function Visualisation() {

    const { state, set, extract } = useContext(Context)

    const [buttonPopup, setbuttonPopup] = useState(false)
    const [showSettings, setShowSettings] = useState(false)

    let title = ''
    switch (state.selectedAlgorithm) {
        case 'fifo':
            title = 'First In, First Out'
            break;

        case 'lifo':
            title = 'Last In, First Out'
            break;

        case 'lru':
            title = 'Least Recently Used'
            break;

        case 'random':
            title = 'Zufällige Seitenauswahl'
            break;

        case 'hand':
            title = 'Versuche es selbst!'
            break;

        case 'lfd':
            title = 'Optimal (Longest Forward Distance)'
            break;

        default:
            title = 'Das sollte nicht passieren...'
            break;
    }

    useEffect(() => {
        return () => {
            window.location.reload()
        }
    }, [])

    const popUpClickHandler = () => {
        setbuttonPopup(true)
        clearInterval(state.fillCache_Loop)
        clearInterval(state.nextInput_Loop)
        state.visualisation_run = false
    }

    const hardReset = () => {

        state.input_is_random[0] = state.input_is_random[1]
        set({
            ...state,
            cache: Array.from({ length: state.cache.length }, () => ['', '', '', 0, '']),
            input: [],
            input_save: [],
            output: [],
            store_statistics: [],
            pageFaults: 0,
            fillingCache: true,
            visualisation_run: true,
            selectedAlgorithm: state.algorithms[state.selected_algorithms.indexOf(true)],
            allDone: false,
            dummyReset: Math.random()
        })
    }

    return (
        <div class='visualisation container'>
            { <button id='settings-button'
                onClick={popUpClickHandler}
                onMouseEnter={e => { setShowSettings(true) }}
                onMouseLeave={e => { setShowSettings(false) }}>Einstellungen</button>}
            {(showSettings || buttonPopup) && <Settings_Chosen />}
            <Settings trigger={buttonPopup} setTrigger={setbuttonPopup} />

            {!state.allDone ?
                <>
                    <h1 style ={{lineHeight: '1em'}}>{title}</h1>
                    <Cache />
                    <br /> &nbsp;
                    <Input />
                    <br />
                    <br />
                    <InputBoxes />
                    <br />
                    <PageFault />
                    <br />
                    <br />
                </> : <>
                    <h2>Alle gewählten Algorithmen wurden ausgeführt...</h2>
                    <button onClick={hardReset}>Dieselben Algorithmen nochmals ausführen</button>
                </>}

            <p>&nbsp;</p>
            <Results />


        </div>
    );

}

export default Visualisation
