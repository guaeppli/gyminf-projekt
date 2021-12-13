import React, { useContext, useEffect } from 'react'
import Context from '../../store/Context'

function CacheSize() {
    const { state, set } = useContext(Context)

    const increase = () => {
        if (state.cache.length < state.currentRange - 1) {
            const newCache = [...state.cache, ['', '', '', 0, '']]
            set({ ...state, showCloseButton: false, cache: newCache })
        }
    }
    const increase10 = () => {
        if (state.cache.length < state.currentRange - 11) {
            const newCache = [...state.cache, ['', '', '', 0, ''], ['', '', '', 0, ''], ['', '', '', 0, ''], ['', '', '', 0, ''], ['', '', '', 0, ''], ['', '', '', 0, ''], ['', '', '', 0, ''], ['', '', '', 0, ''], ['', '', '', 0, ''], ['', '', '', 0, '']]
            set({ ...state, showCloseButton: false, cache: newCache })
        }
    }
    const decrease10 = () => {
        if (state.cache.length > 11) {
            const newCache = state.cache.slice(0, state.cache.length - 10)
            set({ ...state, showCloseButton: false, cache: newCache})
        }
    }

    const decrease = () => {
        if (state.cache.length > 1) {
            const newCache = state.cache.slice(0, state.cache.length - 1)

           set({ ...state, showCloseButton: false, cache: newCache})

        }
    }

    const onChange = (e) => {
        set({ ...state, showCloseButton: false, cacheFilled: !state.cacheFilled })
    }

    const linebreak = (width, spaces) =>
    {
        return window.innerWidth < width? <><br/></> :       <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>
    }

    return (
        <div onChange={onChange}>
            <p>
                <table>
                    <tr>
                   
                        <td style={{width: 80, fontSize: '1.5em',  textAlign: 'center', }}>
                            {state.cache.length} &nbsp; &nbsp;
                        </td>
                        <td><button onClick={decrease}>-</button>
                            <button onClick={increase}>+</button> {linebreak(800)}
                            <button onClick={decrease10}>-10</button>
                            <button onClick={increase10}>+10</button>
                            <>{linebreak(1050)}</>
                            <label>Cache bereits gefüllt </label>
                            <input type="checkbox" id="cacheFilled" name="cacheFilled" value="cacheFilled" checked={state.cacheFilled}></input>
                        </td>
                    </tr>
                </table>
            </p>
        </div>
    )
}

export default CacheSize
