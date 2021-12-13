import React, { useContext } from 'react'
import Context from '../../store/Context'

function Processing() {
    const { state, set } = useContext(Context)

    const tempInterval = state.timeInterval

    const increase = () => {
        if (tempInterval === 1)
            set({ ...state, showCloseButton: false, stepWise_mode: false, timeInterval: 1000 })
        else
            set({ ...state, showCloseButton: false, stepWise_mode: false, timeInterval: tempInterval + 1000 })

    }

    const decrease = () => {
        if (tempInterval > 1000)
            set({ ...state, showCloseButton: false, stepWise_mode: false, timeInterval: tempInterval - 1000 })
        if (tempInterval == 1000)
            set({ ...state, showCloseButton: false, stepWise_mode: false, timeInterval: 1})

    }


    const onChange = (e) => {
        set({ ...state, showCloseButton: false, stepWise_mode: e.target.value === 'stepwise' })
    }

    const linebreak = (width) =>
    {
        console.log(window.innerWidth)
        return window.innerWidth < width? <br/> :       <> &nbsp;</>
    }

    return (
        <div>      
                <div onChange={onChange} >
                    <p> 
                        <input type="radio" value={'stepwise'} name="steps" checked={state.stepWise_mode} /> Schrittweise {linebreak(1200)}
                        <input type="radio" value={'automatic'} name="steps" checked={!state.stepWise_mode} /> Automatisch:                      
                        <label> {linebreak(1050)}  Schrittdauer {state.timeInterval === 1? 'schnell' :  `${state.timeInterval / 1000} Sekunde${state.timeInterval == 1000 ? '' : 'n'}`}  &nbsp; </label>
                        {linebreak(500)} 
                        <button onClick={decrease}>-</button>
                        <button onClick={increase}>+</button>
                    </p>
                </div>
        </div >
    )
}

export default Processing
