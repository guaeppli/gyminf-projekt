import React, { useContext, useEffect } from 'react'
import Context from '../../store/Context'

function AlgoChoice() {
    const { state, set } = useContext(Context)

    const onChangeAlg = (e) => {
        const algorithms = [...state.selected_algorithms]
        algorithms[e.target.value] = !algorithms[e.target.value]
        if (!algorithms.slice(0, 5).includes(true))
            algorithms[5] = false
        const firstAlg = state.algorithms[algorithms.indexOf(true)]
        set({ ...state, showCloseButton: false, selectedAlgorithm: firstAlg, selected_algorithms: algorithms })
    }


    const labelAlg = (i) => {
        switch (state.algorithms[i]) {
            case 'fifo':
                return 'FIFO'
            case 'lifo':
                return 'LIFO'
            case 'lru':
                return 'LRU'
            case 'random':
                return 'Zufall'
            case 'hand':
                return 'Benutzer'
            case 'lfd':
                return 'Optimal (LFD)'
            default:
                console.log('Das sollte nicht passieren...', { state })
                return 'Das sollte nicht passieren...'
        }
    }

    const swap = (i) => {
        const tempAlg = state.algorithms[i]
        state.algorithms[i] = state.algorithms[i - 1]
        state.algorithms[i - 1] = tempAlg

        const tempBool = state.selected_algorithms[i]
        state.selected_algorithms[i] = state.selected_algorithms[i - 1]
        state.selected_algorithms[i - 1] = tempBool
        set({ ...state, showCloseButton: false })
        // dummyReset nötig?

    }

    const linebreak = (width) => {
        return window.innerWidth < width ? <br /> : <>&nbsp;&nbsp; ||&nbsp;&nbsp; </>
    }

    const complicated_linebreak = (width_arr) => {
        const width = window.innerWidth

        if (width > width_arr[0])
            return <>&nbsp;&nbsp; ||&nbsp;&nbsp; </>
        else {
            if (width > width_arr[1])
                return <br />
            else {
                if (width > width_arr[2])
                    return <>&nbsp;&nbsp; ||&nbsp;&nbsp; </>
                else
                    return <br />
            }

        }
    }

    return (
        <div onChange={onChangeAlg} >
            <p>
                <input type="checkbox" value="0" name="algorithm" checked={state.selected_algorithms[0]} /> {labelAlg(0)} &nbsp;
                <button onClick={() => swap(1)}> &gt; </button> {linebreak(800)}
                <input type="checkbox" value="1" name="algorithm" checked={state.selected_algorithms[1]} />  {labelAlg(1)} &nbsp;
                <button onClick={() => swap(1)}> &lt; </button><button onClick={() => swap(2)}> &gt; </button> {linebreak(1050)}
                <input type="checkbox" value="2" name="algorithm" checked={state.selected_algorithms[2]} />  {labelAlg(2)} &nbsp;
                <button onClick={() => swap(2)}> &lt; </button><button onClick={() => swap(3)}> &gt; </button> {complicated_linebreak([1800, 1050, 800])}
                <input type="checkbox" value="3" name="algorithm" checked={state.selected_algorithms[3]} />  {labelAlg(3)} &nbsp;
                <button onClick={() => swap(3)}> &lt; </button><button onClick={() => swap(4)}> &gt; </button> {linebreak(1050)}
                <input type="checkbox" value="4" name="algorithm" checked={state.selected_algorithms[4]} />  {labelAlg(4)} &nbsp;
                <button onClick={() => swap(4)}> &lt; </button>

                {state.selected_algorithms.slice(0, 5).includes(true) && <>{linebreak(800)}<input type="checkbox" value="5" name="algorithm" checked={state.selected_algorithms[5]} />  {labelAlg(5)}</>}
            </p>
        </div>
    )
}

export default AlgoChoice
