import React, { useContext, useEffect } from 'react'
import Context from '../../store/Context'

function InputChoice() {
    const { state, set } = useContext(Context)


    const onChangeInput = (e) => {
        switch (e.target.value) {
            case 'random':
                set({ ...state, showCloseButton: false, input_is_random: [true, true], input_is_adversary: false, input_is_distributed: false })
                break

            case 'distributed':
                set({ ...state, showCloseButton: false, input_is_random: [true, true], input_is_adversary: false, input_is_distributed: true })
                break

            case 'user':
                set({ ...state, showCloseButton: false, input_is_random: [false, false], input_is_adversary: false, input_is_distributed: false })
                break

            case 'adversary':
                set({ ...state, showCloseButton: false, input_is_random: [true, true], input_is_adversary: true, input_is_distributed: false })
                break

            default:
                console.log('Das sollte nicht passieren...', { state })
                break;
        }
    }

    const getInput = () => {
        if (state.input_is_random[0] && !state.input_is_adversary && !state.input_is_distributed)
            return 'random'
        if (state.input_is_distributed)
            return 'distributed'
        if (!state.input_is_random[0])
            return 'user'
        if (state.input_is_random[0] && state.input_is_adversary)
            return 'adversary'
    }
    const linebreak = (width) =>
    {
        return window.innerWidth < width? <br/> :       <> &nbsp;</>
    }

    return (
        <div onChange={onChangeInput} >
            <p>
                <input type="radio" value={'random'} name="input" checked={getInput() === 'random'} /> Zufall {linebreak(800)}
                <input type="radio" value={'distributed'} name="input" checked={getInput() === 'distributed'} /> Vergangenheitsabhängig {linebreak(1200)}
                <input type="radio" value={'adversary'} name="input" checked={getInput() === 'adversary'} /> Gegenspieler {linebreak(800)}
                <input type="radio" value={'user'} name="input" checked={getInput() === 'user'} /> Benutzerdefiniert &nbsp;
            </p>
        </div>
    )
}

export default InputChoice
