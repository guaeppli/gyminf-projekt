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
            set({ ...state, showCloseButton: false, cache: newCache })
        }
    }

    const decrease = () => {
        if (state.cache.length > 1) {
            const newCache = state.cache.slice(0, state.cache.length - 1)

            set({ ...state, showCloseButton: false, cache: newCache })

        }
    }

    const onChange = (e) => {
        if (e.target.value === "cacheFilled")
            set({ ...state, showCloseButton: false, cacheFilled: !state.cacheFilled })
        if (e.target.value === "pageFault_cacheFilling")
            set({ ...state, showCloseButton: false, pageFault_cacheFilling: !state.pageFault_cacheFilling })
    }

    const linebreak = (width, spaces) => {
        return window.innerWidth < width ? <><br /></> : <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>
    }

    return (
        <div onChange={onChange}>
            <p>
                <table>
                    <tr>

                        <td style={{ width: 80, fontSize: '1.5em', textAlign: 'center', }}>
                            {state.cache.length} &nbsp; &nbsp;
                        </td>
                        <td>
                            <td><button onClick={decrease}>-</button>
                                <button onClick={increase}>+</button> {linebreak(1100)}
                                <button onClick={decrease10}>-10</button>
                                <button onClick={increase10}>+10</button>
                            </td>
                            <td>&nbsp;&nbsp;&nbsp;</td>
                            <td style={{alignItems: 'left'}}>
                                <>{linebreak(1100)}</>
                                <label>Cache bereits gefüllt </label>
                                <input type="checkbox" name="cacheSettings" value="cacheFilled" checked={state.cacheFilled}></input>
                                <>{linebreak(1500)}</>
                                <label>Seitenfehler bei Cachefüllung </label>
                                <input type="checkbox" name="cacheSettings" value="pageFault_cacheFilling" checked={state.pageFault_cacheFilling}></input>
                            </td>
                        </td>
                    </tr>
                </table>
            </p>
        </div>
    )
}

export default CacheSize


// getModulo() == 0 && <tr></tr>

// const getModulo = () =>
// {
//     return window.innerWidth > 1200? 10 : 5      
// }