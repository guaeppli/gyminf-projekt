import { useState, useEffect } from 'react'

const useGlobalState = () => {


    const [state, setState] = useState({
        selectedAlgorithm: 'fifo',               // fifo, lifo, lru, random, hand, lfd
        currentRange: 10,
        cache: Array.from({ length: 5 }, () => ['', '', '', 0, '']),      // [value, bgColor, FIFO-index, LRU-index, LFD-index]
        input: [],
        input_save: [],
        inputObject: [null, ''],    // [inputValue, bgColor]
        output: [],
        algorithms: ['fifo', 'lifo', 'lru', 'random', 'hand', 'lfd'],
        selected_algorithms: [true, true, true, false, false, true],     //  fifo, lifo, lru, random, hand, lfd
        store_statistics: [],     // algorithm, input, pagefaults
        input_is_random: [true,true],   // second value is for backup
        input_is_adversary: false,
        input_is_distributed: false,
        stepWise_mode: true,   
        visualisation_run: true,
        fillCache_Loop: null,
        nextInput_Loop: null,
        step_Loop: null,
        cacheClicked: true,
        fillingCache: true,
        cacheFilled: true,
        hand_index: null,
        pageFaults: 0,
        timeInterval: 1000,
        dummyFill: 0,
        dummyReset: 0,
        dummyClicked: 0,
        dummyHardReset: 0,
        dummyCloseWindow: 0,
        allDone: false,
        showCloseButton: true,
        start: true
    })

    const set = (payload) => {
        return setState(payload)
    }

    const extract = (matrix, row) => {
        let answer = []
        for (let i = 0; i < matrix.length; i++)
            answer[i] = matrix[i][row]
        return answer
    }

    const clear = (matrix, row) => {
        for (let i = 0; i < matrix.length; i++)
            matrix[i][row] = ''
        return matrix
    }

    return { state, set, extract, clear }

}
export default useGlobalState

// idea taken from https://youtu.be/oKLX3d5P4ZU