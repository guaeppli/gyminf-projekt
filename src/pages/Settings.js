import React, { useContext, useEffect, useState } from 'react'
import Algorithm from '../components/settings/AlgoChoice'
import Input from '../components/settings/InputChoice'
import Processing from '../components/settings/ProcessingChoice'
import CacheSize from '../components/settings/CacheChoice'
import Context from '../store/Context'
import '../components/Popup.css'
import '../App.css'


function Settings(props) {
    const { state, set } = useContext(Context)

    const settingsReset = () => {
        set({
            ...state,
            currentRange: 10,
            cache: Array.from({ length: 5 }, () => ['', '', '', 0, '']),
            input: [['', '']],
            timeInterval: 1000,
            selectedAlgorithm: 'fifo',
            algorithms: ['fifo', 'lifo', 'lru', 'random', 'hand', 'lfd'],
            selected_algorithms: [true, true, true, false, false, true],
            input_is_random: [true, true],
            input_is_adversary: false,
            input_is_distributed: false,
            stepWise_mode: true,
            cacheFilled: true,
            allDone: false,
            showCloseButton: false
        })
    }



    function Range() {
        const { state, set } = useContext(Context)

        const tempRange = state.currentRange
        const increase = () => set({ ...state, showCloseButton: false, currentRange: tempRange + 1 })
        const increase10 = () => set({ ...state, showCloseButton: false, currentRange: tempRange + 10 })
        const decrease10 = () => {
            if (tempRange >= 20 && tempRange > state.cache.length + 1)
                set({ ...state, showCloseButton: false, currentRange: tempRange - 10 })
        }
        const decrease = () => {
            if (tempRange > 2 && tempRange > state.cache.length + 1)
                set({ ...state, showCloseButton: false, currentRange: tempRange - 1 })
        }

        const linebreak = (width) => {
            return window.innerWidth < width ? <><br /></> : <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>
        }

        return (
            <div>
                <table>
                    <tr>
                        <td style={{ width: 80, fontSize: '1.5em', paddingTop: 30, textAlign: 'center' }}>
                            1 - {state.currentRange} &nbsp; &nbsp;
                        </td>
                        <td>
                            <button onClick={decrease}>-</button>
                            <button onClick={increase}>+</button>
                            <>{linebreak(800)}</>
                            <button onClick={decrease10}>-10</button>
                            <button onClick={increase10}>+10</button>
                        </td>
                    </tr>
                </table>
            </div>
        )
    }

    const closeButtonHandler = () => {
        props.setTrigger(false)

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
            dummyReset: Math.random(),
            dummyHardReset: Math.random()
        })

    }


    const close = () => {
        props.setTrigger(false)
        set({ ...state, dummyCloseWindow: Math.random() })
    }

    return (props.trigger) ? (

        <div className="popup">
            <div className="popup-inner">
                <br />
                <h1>Einstellungen:</h1>
                <table id="settings" >
                    <tr>
                        <td><label className='settings-item'> Algorithmen: </label></td>  <td><Algorithm /></td>
                    </tr>
                    <tr>
                        <td><label className='settings-item'> Input: </label> </td> <td><Input /></td>
                    </tr>
                    <tr>
                        <td><label className='settings-item'> Verarbeitung: </label> </td> <td><Processing /></td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td><label className='settings-item'> Cachegrösse: </label> </td> <td><CacheSize /></td>
                    </tr>
                    <tr>
                        <td><label className='settings-item'> Zahlenbereich: </label> </td><td><br/> <Range /></td>
                    </tr>
                    <tr>
                        <td>&nbsp;</td>
                    </tr>
                    <tr>
                        <td style={{ padding: 20 }} colspan="2">Beachte, dass die Cachegrösse kleiner als der Zahlenbereich sein muss!</td>
                    </tr>
                </table>


                <div style={{ textAlign: 'center' }}>
                    <button id='settingsButton' onClick={settingsReset}>Einstellungen zurücksetzen</button>

                    {state.selected_algorithms.includes(true) ? <button id='settingsButton' onClick={closeButtonHandler}>Anwenden und neu starten</button> : 'Noch keinen Algorithmus ausgewählt!'}
                    {state.showCloseButton && <button id='closeButton' onClick={close}>X</button>}
                </div>
            </div>
        </div>
    ) : ""
}

export default Settings
