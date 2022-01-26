import React, { useContext, useEffect, useState } from "react";
import Context from "../store/Context";

function Input() {
  const { state, set, extract, clear } = useContext(Context);
  const [buttonText, setButtonText] = useState("Pause");
  const [stepButtonText, setStepButtonText] = useState("Seite anfragen");
  const [step, setStep] = useState("step1");
  const [stepText, setStepText] = useState("Lass uns beginnen!");
  const [finishText, setFinishText] = useState("Input beenden");
  const [replacePage, setReplacePage] = useState(false);
  const [sw_variables, setSw_variables] = useState({
    // Für stepwise-Version
    randomNr: "",
    inputNr: "",
    index: "",
    randCacheIndex: Math.floor(Math.random() * state.cache.length),
    lifoCacheIndex: state.cache.length - 1,
    fifoCacheIndex: 0,
    indexLRU: "",
    lfdCacheIndex: "",
    cacheBGColor: "",
  });
  const [currentAlg, setCurrentAlg] = useState(state.selectedAlgorithm);
  const [inputClickable, setInputClickable] = useState(true);
  const [fifoCacheIndex, setFifoCacheIndex] = useState(0);

  var inputFields = [];
  for (var i = 0; i < state.currentRange; i++)
    inputFields = [...inputFields, i + 1];

  const InputClickHandler = (input) => {
    if (inputClickable) {
      if (state.fillingCache)
        state.cacheFilled ? fillCache() : fillCache_choose(input);
      else (sw_variables.inputNr = input) && nextStep(input);
      set({ ...state, dummyFill: Math.random() });
    }
  };



  const nextInput = () => {
    switch (state.selectedAlgorithm) {
      case "fifo":
        return nextInput_FIFO();

      case "lru":
        return nextInput_LRU();

      default:
        console.log("Das sollte nicht passieren...", { state }, { sw_variables });
        break;
    }
  };

  const nextInput_FIFO = () => {
    state.cacheClicked = true;
    let fifoCacheIndex = extract(state.cache, 0).indexOf("");
    const time = state.cacheFilled ? 1 : state.timeInterval;
    state.nextInput_Loop = setInterval(tick, time);

    function tick() {
      if (state.visualisation_run) {
        checkFillingCache();
        clear(state.cache, 1);
        const cacheNumbers = extract(state.cache, 0);
        state.output = [null, ...state.output];
        const randomNr = getRandomNr();
        const index = cacheNumbers.indexOf(randomNr);

        let inputBGColor = null;
        if (index === -1) {
          // randomNr not in cache
          inputBGColor = "salmon";
          const cacheBGColor = "salmon";
          if (state.input.length === 0 && state.pageFault_cacheFilling)
            state.pageFaults = 1;
          if (state.input.length > 0 && (state.input[0][1] === "red" || (state.input[0][1] === "salmon" && state.pageFault_cacheFilling)))
            state.pageFaults = state.pageFaults + 1;
          state.output[0] = state.cache[fifoCacheIndex][0];
          state.cache[fifoCacheIndex] = [randomNr, cacheBGColor];
          console.log(state.cache)
          fifoCacheIndex = (fifoCacheIndex + 1) % state.cache.length;
          state.cache[fifoCacheIndex][2]= "X"

        } else {
          // randomNr already in cache
          const cacheBGColor = "palegreen";
          inputBGColor = "palegreen";
          state.cache[index][1] = cacheBGColor;
        }

        state.inputObject = [randomNr, inputBGColor];
        state.input = [state.inputObject, ...state.input];
        set({ ...state, dummyFill: Math.random() });
      }
    }
  };

  const nextInput_LRU = () => {
    state.cacheClicked = true;
    const time = state.cacheFilled ? 1 : state.timeInterval;
    state.nextInput_Loop = setInterval(tick, time);
    function tick() {
      if (state.visualisation_run) {
        checkFillingCache();
        clear(state.cache, 1);
        const cacheNumbers = extract(state.cache, 0);
        state.output = [null, ...state.output];
        const randomNr = getRandomNr();
        const index = cacheNumbers.indexOf(randomNr);
        const indexLRU = findLRU();
        for (let i = 0; i < state.cache.length; i++)
          state.cache[i][3] = state.cache[i][3] + 1;

        let inputBGColor = null;
        if (index == -1) {          // randomNr not in cache
          inputBGColor = "salmon";
          const cacheBGColor = "salmon";

        if (state.input.length === 0 && state.pageFault_cacheFilling)
          state.pageFaults = 1;
        if (state.input.length > 0 && (state.input[0][1] === "red" || (state.input[0][1] === "salmon" && state.pageFault_cacheFilling)))
          state.pageFaults = state.pageFaults + 1;
        
          state.output[0] = state.cache[indexLRU][0];
          state.cache[indexLRU] = [randomNr, cacheBGColor, "", 0, ""];
        } else {          // randomNr already in cache
          const cacheBGColor = "palegreen";
          inputBGColor = "palegreen";
          state.cache[index][1] = cacheBGColor;
          state.cache[index][3] = 0;
        }
        state.inputObject = [randomNr, inputBGColor];
        state.input = [state.inputObject, ...state.input];
        set({ ...state, dummyFill: Math.random() });
      }
    }
  };

  const step0_choose = () => {
    clear(state.cache, 1);
    set({ ...state, dummyFill: Math.random() });
    setStep("step1");
  };

  const step1 = (input) => {
    clear(state.cache, 1);
    state.output = [null, ...state.output];
    const cacheNumbers = extract(state.cache, 0);
    const index = cacheNumbers.indexOf(
      state.input_is_random[0] ? sw_variables.randomNr : input
    );
    sw_variables.index = index;
    setSw_variables({
      ...sw_variables,
      cacheNumbers: cacheNumbers,
      index: index,
    });
    let inputBGColor;
    if (index === -1) {
      inputBGColor = "red";
      if (state.input.length >= state.cache.length)
        state.pageFaults = state.pageFaults + 1;
    } else inputBGColor = "green";

    if (state.selectedAlgorithm === "lfd") {
      setLFD();
    }

    state.inputObject = [
      state.input_is_random[0] ? sw_variables.randomNr : input,
      inputBGColor,
    ];
    state.input = [state.inputObject, ...state.input];
    setSw_variables({ ...sw_variables, indexLRU: findLRU() });
    set({ ...state, dummyFill: Math.random() });
  };

  const step2 = () => {
    clear(state.cache, 1);
    let replacePage;
    const cacheNumbers = extract(state.cache, 0);
    setSw_variables({ ...sw_variables, cacheNumbers: cacheNumbers });

    for (let i = 0; i < state.cache.length; i++)// necessary for LRU only
      state.cache[i][3] = state.cache[i][3] + 1;

    if (sw_variables.index == -1) {      // randomNr not in cache
      replacePage = true;
      setReplacePage(true);
      let index;
      switch (state.selectedAlgorithm) {
        case "fifo":
          index = sw_variables.fifoCacheIndex;
          break;
        case "lifo":
          index = sw_variables.lifoCacheIndex;
          break;
        case "lru":
          index = sw_variables.indexLRU;
          break;
        case "random":
          index = sw_variables.randCacheIndex;
          break;
        case "hand":
          state.cacheClicked = false;
          sw_variables.index = state.hand_index;
          break;
        case "lfd":
          index = findLFD();
          break;

        default:
          console.log("Das sollte nicht passieren...", { state }, { sw_variables });
          break;
      }
      if (state.selectedAlgorithm != "hand")
        state.cache[index] = [state.cache[index][0], "salmon", state.cache[index][2], 0, state.cache[index][4],]; // take current value (no replacement yet!)
    } else {      // randomNr already in cache
      replacePage = false;
      setReplacePage(false);
      state.cache[sw_variables.index][1] = "palegreen";
      state.cache[sw_variables.index][3] = 0;
    }
    set({ ...state, dummyFill: Math.random() });
    return replacePage;
  };

  const step3 = () => {
    step3_inside();
    sw_variables.randCacheIndex = Math.floor(
      Math.random() * state.cache.length
    );
    const randomNr = getRandomNr();
    if (randomNr === null) {
      clearTimeout(state.step_Loop);
      finish();
    } else setSw_variables({ ...sw_variables, randomNr: randomNr });
    set({ ...state, dummyFill: Math.random() });
  };

  const step3_inside = () => {
    if (sw_variables.index == -1) {      // randomNr not in cache
      let index;
      switch (state.selectedAlgorithm) {
        case "fifo":
          index = sw_variables.fifoCacheIndex;
          sw_variables.fifoCacheIndex = (index + 1) % state.cache.length;
          clear(state.cache, 2);
          state.cache[sw_variables.fifoCacheIndex][2] = "X";
          break;
        case "lifo":
          index = sw_variables.lifoCacheIndex;
          break;
        case "lru":
          index = sw_variables.indexLRU;
          break;
        case "random":
          index = sw_variables.randCacheIndex;
          break;
        case "hand":
          index = state.hand_index;
          break;
        case "lfd":
          index = sw_variables.lfdCacheIndex;
          break;
        default:
          console.log("Das sollte nicht passieren...", { state }, { sw_variables });
          break;
      }
      if (!(state.selectedAlgorithm === "hand" && !state.stepWise_mode)) {
        state.output[0] = state.cache[index][0];
      }
      state.cache[index][0] = 
       state.input_is_random[0]  ? sw_variables.randomNr : sw_variables.inputNr;

      state.cache[index][1] = "red";
  //    state.cache[index][3] = 0;
    } else {      // randomNr already in cache
      state.cache[sw_variables.index][1] = "green";
   //   state.cache[sw_variables.index][3] = 0;

    }
  };

  const nextStep = (input) => {
    console.log({state})
    switch (step) {
      case "step0":
        step0_choose();
        !state.input_is_random[0] && setStepText("Warten auf deine Eingabe...");
        break;
      case "step1":
        step1(input);
        setStepText(
          `Nächste Seitenanfrage: ${state.input_is_random[0]
            ? sw_variables.randomNr
            : sw_variables.inputNr
          }`
        );
        setStepButtonText("Cache-Platz finden");
        setStep("step2");
        break;

      case "step2":
        const pageReplace = step2();
        pageReplace
          ? state.selectedAlgorithm === "hand"
            ? setStepText(
              `Wähle einen Cache-Platz für die ${state.input_is_random[0]
                ? sw_variables.randomNr
                : sw_variables.inputNr
              } !`
            )
            : setStepText("Die zu ersetzende Seite wurde bestimmt.")
          : setStepText("Die Seite ist bereits im Cache vorhanden!");
        setStepButtonText("Seite ersetzen");
        setStep("step3");
        break;

      case "step3":
        step3();
        replacePage
          ? setStepText("Die Seite wurde ersetzt.")
          : setStepText("Die Seite musste nicht ersetzt werden.");
        setStepButtonText("Seite anfragen");
        setStep("step1");
        break;

      default:
        console.log("Das sollte nicht passieren...", { state }, { sw_variables });
        break;
    }
  };

  const fillCache = function () {
    state.cacheClicked = true;
    const time = state.cacheFilled ? 1 : state.timeInterval;

    state.fillCache_Loop = setInterval(tick, time);

    function tick() {
      if (state.visualisation_run && state.fillingCache) {
        clear(state.cache, 1);
        const cacheNumbers = extract(state.cache, 0);
        if (cacheNumbers.includes("")) {
          checkFillingCache();
          const emptyCacheFieldIndex = cacheNumbers.indexOf("");
          state.output = [null, ...state.output];
          const randomNr = getRandomNr();
          state.inputObject = [randomNr, "salmon"];

          if (!cacheNumbers.includes(state.inputObject[0])) {
            state.cache[emptyCacheFieldIndex][0] = randomNr;
            state.cache[emptyCacheFieldIndex][1] = "salmon";
            if (state.pageFault_cacheFilling)
              state.pageFaults = state.pageFaults + 1
          } else {
            state.inputObject[1] = "palegreen";
            state.cache[cacheNumbers.indexOf(randomNr)][1] = "palegreen";
          }
          state.input = [state.inputObject, ...state.input];
          set({ ...state, dummyFill: Math.random() });
        } else {
          set({ ...state, fillingCache: false, dummyClicked: Math.random() });
        }
      }
    }
  };

  const fillCache_choose = function (newInputNr) {
    state.cacheClicked = true;
    clear(state.cache, 1);
    const cacheNumbers = extract(state.cache, 0);
    if (cacheNumbers.includes("")) {
      if (newInputNr !== undefined) {
        checkFillingCache(newInputNr);

        for (let i = 0; i < state.cache.length; i++) // necessary for LRU
          state.cache[i][3] = state.cache[i][3] + 1;

        const emptyCacheFieldIndex = cacheNumbers.indexOf("");
        state.inputObject = [newInputNr, "salmon"];
        state.output = [null, ...state.output];
        if (!cacheNumbers.includes(newInputNr)) {
          state.cache[emptyCacheFieldIndex] = [newInputNr, "salmon", "", 0, state.cache[emptyCacheFieldIndex][4],];
          clear(state.cache, 2);
          setFifoCacheIndex((fifoCacheIndex + 1) % state.cache.length);
          state.cache[(fifoCacheIndex + 1) % state.cache.length][2] = "X";
          if (state.pageFault_cacheFilling)
          state.pageFaults = state.pageFaults + 1
        } else {
          state.inputObject[1] = "palegreen";
          state.cache[cacheNumbers.indexOf(newInputNr)][1] = "palegreen";
          state.cache[cacheNumbers.indexOf(newInputNr)][3] = 0; // updating LRU
        }

        state.input = [state.inputObject, ...state.input];

        set({ ...state, dummyFill: Math.random() });
      }
    }
  };

  const findLRU = () => {
    var lruFrequencies = extract(state.cache, 3);
    //if (lruFrequencies.includes("")) return lruFrequencies.indexOf("");
    return lruFrequencies.indexOf(Math.max(...lruFrequencies));
  };

  const setLFD = () => {
    const inputNumbers = extract(state.input_save, 0);
    for (let i = 0; i < state.cache.length; i++) {
      state.cache[i][4] =
        inputNumbers.indexOf(state.cache[i][0], state.input.length) - state.input.length;
    }
  };

  const findLFD = () => {
    var distances = extract(state.cache, 4);
    const neg = -state.input.length;
    if (distances.includes(neg)) {
      setSw_variables({
        ...sw_variables,
        lfdCacheIndex: distances.indexOf(neg),
      });
      return distances.indexOf(neg);
    }
    setSw_variables({
      ...sw_variables,
      lfdCacheIndex: distances.indexOf(Math.max(...distances)),
    });
    return distances.indexOf(Math.max(...distances));
  };

  const checkFillingCache = (newInputNr) => {
    console.log({state})
    const cacheNumbers = extract(state.cache, 0);
    const nextNumber =
      state.input_save.length > 0
        ? state.input_save[state.input.length][0]
        : newInputNr;

    if (
      cacheNumbers.filter((x) => x === "").length === 1 &&
      !cacheNumbers.includes(nextNumber)
    ) {
      state.fillingCache = false;
      if (!state.input_is_random[0]) setStep("step0");
    }
  };

  const getRandomNr = () => {
    if (state.input_save.length > 0) {      // not the first algorithm -> use given input
      if (state.input.length === state.input_save.length) {
        clearTimeout();
        return null;
      }
      return state.input_save[state.input.length][0];
    }

    if (extract(state.cache, 0).includes("") && state.cacheFilled) {
      // automatische Cache-Füllung
      let i = 1;
      while (extract(state.cache, 0).includes(i)) i++;
      return i;
    }

    let randomNr = Math.floor(Math.random() * state.currentRange + 1);

    if (state.input_is_adversary || extract(state.cache, 0).includes("")) {
      // find number which is not in cache
      while (extract(state.cache, 0).includes(randomNr))
        randomNr = Math.floor(Math.random() * state.currentRange + 1);
      if (!state.fillingCache) randomNr = findAdversary(randomNr);
    }

    if (state.input_is_distributed) {
      const inputColors = extract(state.input, 1);
      if (
        inputColors.filter((e) => e === "salmon").length <=
        state.cache.length &&
        !inputColors.includes("red") &&
        !inputColors.includes("green")
      )
        // last number in fillingCache
        return randomNr;
      else return gaussian_random(state.input[0][0]);
    }

    return randomNr;
  };

  const findAdversary = (randomNr) => {
    const inputColors = extract(state.input, 1);
    if (
      inputColors.filter((e) => e === "salmon").length <= state.cache.length &&
      !inputColors.includes("red") &&
      !inputColors.includes("green")
    )
      // last number in fillingCache
      return randomNr;
    return state.output[0];
  };

  const gaussian_random = (last) => {
    const deviation = Math.round(
      Math.sqrt(Math.sqrt(state.currentRange) * state.cache.length)
    );
    const max = last + deviation;
    const min = last - deviation;

    const randn_bm = (min, max) => {
      // taken from https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve
      var u = 0,
        v = 0;
      while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
      while (v === 0) v = Math.random();
      let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

      num = num / 10 + 0.5; // Translate to 0 -> 1
      if (num > 1 || num < 0) num = randn_bm(min, max); // resample between 0 and 1 if out of range

      num *= max - min; // Stretch to fill range
      num += min; // offset to min
      return num;
    };

    do last = Math.round(randn_bm(min, max));
    while (last < 1 || last > state.currentRange);
    return last;
  };

  const reset = () => {
    clearInterval(state.fillCache_Loop);
    clearInterval(state.nextInput_Loop);
    clearTimeout(state.step_Loop);
    setStep("step1");
    setInputClickable(true);
    setButtonText("Pause");
    setStepText("Lass uns beginnen!");
    setStepButtonText("Seite anfragen");
    setFinishText("Input beenden");
    if (state.cacheClicked || !state.fillingCache) {
      setSw_variables({
        ...sw_variables,
        randomNr: "",
        index: "",
        indexLRU: "",
        fifoCacheIndex: 0,
        cacheBGColor: "",
      });
      set({
        ...state,
        cache: Array.from({ length: state.cache.length }, () => ["", "", "", 0, "",]),
        input: [],
        output: [],
        pageFaults: 0,
        fillingCache: true,
        visualisation_run: true,
        showCloseButton: true,
        dummyReset: Math.random(),
      });
    }
  };

  useEffect(() => {
    clearInterval(state.fillCache_Loop);
    clearInterval(state.nextInput_Loop);
    sw_variables.randomNr = getRandomNr();
    sw_variables.fifoCacheIndex = 0;
    sw_variables.lifoCacheIndex = state.cache.length - 1;
    state.cache[sw_variables.fifoCacheIndex][2] = "X";
    if (!state.fillingCache && !state.stepWise_mode)
      state.step_Loop = setTimeout(
        () => nextStep(sw_variables.inputNr),
        state.timeInterval
      );
    state.showCloseButton = true;
  }, [state.fillingCache]);

  useEffect(() => {
    const alg = state.selectedAlgorithm;
    if (state.input_is_random[0] || (state.cacheFilled && state.fillingCache)) {
      if (alg === "lifo" || alg === "random" || alg === "hand" || alg === "lfd")
        fillCache();
      else nextInput();
    }
  }, [state.dummyReset, state.dummyClicked]);

  useEffect(() => {
    if (!state.fillingCache && !state.stepWise_mode && state.visualisation_run) {
      if (!(state.selectedAlgorithm === "hand" && step === "step3" && state.input[0][1] === "red"))
        if (!(!state.input_is_random[0] && step === "step1"))
          state.step_Loop = setTimeout(
            () => nextStep(sw_variables.inputNr),
            state.timeInterval
          );
    }
  }, [step]);

  useEffect(() => {
    if (
      !state.fillingCache &&
      !state.stepWise_mode &&
      state.visualisation_run &&
      state.selectedAlgorithm === "hand" &&
      step === "step3" &&
      state.input[0][1] === "red"
    ) {
      state.step_Loop = setTimeout(() => nextStep(sw_variables.inputNr), state.timeInterval);
    }
  }, [state.dummyClicked]);

  useEffect(() => {    // Hard Reset
    setStep("step1");
    setFinishText("Input beenden");
    setStepText("Lass uns beginnen!");
    set({
      ...state,
      input_save: [],
      store_statistics: [],
      selectedAlgorithm:
        state.algorithms[state.selected_algorithms.indexOf(true)],
      allDone: false,
    });
  }, [state.showCloseButton, state.dummyHardReset]);

  const toggleRun = () => {

    clearInterval(state.fillCache_Loop);
    clearInterval(state.nextInput_Loop);
    clearTimeout(state.step_Loop);
    setButtonText("Weiter");
    state.visualisation_run = !state.visualisation_run;
    if (state.visualisation_run) {
      const alg = state.selectedAlgorithm;
      if (
        (alg === "lifo" || alg === "random" || alg === "hand") &&
        state.fillingCache
      )
        state.input_is_random[0]
          ? fillCache()
          : fillCache_choose(sw_variables.inputNr);
      else {
        if (state.fillingCache) nextInput();
        else {
          if (step !== "step1") nextStep(sw_variables.inputNr);
        }
      }
      setButtonText("Pause");
    }
  };

  useEffect(() => { // Closing Settings-Window
    if (!state.visualisation_run) {

      if (state.fillingCache) {

        if (!state.input_is_random[0]) {
          clear(state.cache, 1)
          if (!state.stepWise_mode){
            toggleRun()

            fillCache_choose(sw_variables.inputNr)
          console.log('here')}
        }
        else
          toggleRun()
      }
      setInputClickable(true);
      set({ ...state, visualisation_run: true });
      if (!state.stepWise_mode) {
        if (state.selectedAlgorithm !== "hand") {
          if (step === 'step1')
            setStep('step0')
          toggleRun()

        } else {    // alg = 'hand'
          if (state.input[0][1] !== "red")
            toggleRun()
          else  // input is red
          {
            state.visualisation_run = true
            if (step === 'step2')
              nextStep(sw_variables.inputNr)
          }

          if (!state.input_is_random[0] && step === "step3" && state.input[0][1] === "red") {
            clear(state.cache, 1);
            set({ ...state, cacheClicked: false });
          }

          if (state.input_is_random[0]) {
            if (step === 'step1') {
              setStep('step0')
            }
            toggleRun()
            if (sw_variables.inputNr !== '')
              nextStep(sw_variables.inputNr)
          }
        }
      }
    }
  }, [state.dummyCloseWindow]);


  const finish = () => {
    if (
      step !== "step1" &&
      state.input_save.length === 0 &&
      state.selectedAlgorithm !== "hand"
    )
      step3_inside();
    const newIndex = state.selected_algorithms.indexOf(
      true,
      state.algorithms.indexOf(state.selectedAlgorithm) + 1
    );
    const lastIndex = state.selected_algorithms.lastIndexOf(true);
    if (finishText === "Input beenden") {
      state.selectedAlgorithm === state.algorithms[lastIndex]
        ? setFinishText("Beenden")
        : setFinishText("Nächster Algorithmus");
      clearTimeout(state.step_Loop);
      state.visualisation_run = false;
      let saveInput = [...state.input];
      for (var i = 0; i < saveInput.length; i++)
        saveInput[i] = [saveInput[i][0], saveInput[i][1], state.output[i]];
      saveInput = saveInput.reverse();
      state.input_save = saveInput;
      state.store_statistics = [
        ...state.store_statistics,
        [state.selectedAlgorithm, saveInput, state.pageFaults],
      ];

      if (newIndex !== -1) setCurrentAlg(state.algorithms[newIndex]);
    } else {
      if (newIndex === -1) {
        reset();
        set({ ...state, allDone: true });
      } else {
        state.selectedAlgorithm = currentAlg;
        state.input_is_random[0] = true;
        reset();
      }
    }
  };

  const hardReset = () => {
    state.input_save = [];
    state.store_statistics = [];
    state.input_is_random[0] = state.input_is_random[1];
    state.selectedAlgorithm =
      state.algorithms[state.selected_algorithms.indexOf(true)];
    reset();
  };

  const showStepButton = () => {
    let answer =
      state.stepWise_mode &&
      !state.fillingCache &&
      !(state.selectedAlgorithm == "hand" && step === "step3" && replacePage);
    if (state.cacheClicked && step === "step3") answer = true;
    if (!state.stepWise_mode || (state.stepWise_mode && finishText === "Beenden")
    )
      answer = false;
    if (finishText === "Nächster Algorithmus") answer = false;
    if (!state.input_is_random[0] && step === "step1") answer = false;

    return answer;
  };

  const showFinishButton = () => {
    let answer = !state.fillingCache && state.input_save.length === 0 && state.input.length > state.cache.length;
    if (finishText === "Nächster Algorithmus" || finishText === "Beenden")
      answer = true;
    if (state.input.length === state.input_save.length && state.output[0] !== null)
      answer = true;
    if (extract(state.input, 1).filter((e) => e === "red" || e === "green").length === 0)
      answer = false;
    return answer;
  };

  const showStopButton = () => {
    let answer = state.fillingCache || !state.stepWise_mode;
    if (finishText === "Nächster Algorithmus" || finishText === "Beenden")
      answer = false;
    if (state.selectedAlgorithm === "hand" && state.input.length > 0 && state.input[0][1] === "red")
      answer = false;
    if (!state.input_is_random[0] && step === "step1") answer = false;
    return answer;
  };

  const showHardResetButton = () => {
    return state.input_save.length > 0;
  };

  const showResetButton = () => {
    return finishText !== "Nächster Algorithmus" && finishText !== "Beenden";
  };

  function NextPage() {

    const showInput = () => {
      const inputColors = extract(state.input, 1)
      let answer = (inputColors.includes('red') || inputColors.includes('green'))

      return answer
    }
    return (
      <> {showInput() &&
        <table  id = 'nextPage'>
          <td key={0}  >{(state.input[0] == null ? null : state.input[0][0])} </td>
        </table>
      }</>)
  }

  const getModulo = () =>
  {
      return window.innerWidth > 600? 10 : 5      
  }

  return (
    <div>
      <NextPage />
      <br />
      {state.fillingCache && <h3>Cache wird aufgefüllt...</h3>}
      {!state.fillingCache && <h3 style={{ color: "black" }}>{stepText}</h3>}
      {(step === 'step2' || stepText === 'Die Seite wurde ersetzt.' ) && window.innerWidth < 360 && <br/>}
      
      {showStepButton() && (
        <button id='step-button'
          onClick={() => nextStep(sw_variables.inputNr)}
        >
          {stepButtonText}
        </button>
      )}
      <br />



      {state.input_is_random[0] === false &&
        (state.fillingCache || step === "step1") && (
          <>
            <h3>Wähle den nächsten Input: </h3>

            <table className="userChoice hovereffect">
              <tbody>
                {inputFields.map((value, index) => {
                  return (
                    <>
                      {index % getModulo() == 0 && <tr></tr>}
                      <td
                        key={index + 1}
                        onClick={() => InputClickHandler(index + 1)}
                      >
                        {" "}
                        {value}{" "}
                      </td>
                    </>
                  );
                })}
              </tbody>
            </table>
          </>
        )}

      <br />

      {showStopButton() && <button onClick={toggleRun}>{buttonText}</button>}
      {showResetButton() && <button onClick={reset}>Reset</button>}
      {showFinishButton() && <button onClick={finish}>{finishText}</button>}
      {showHardResetButton() && (
        <button onClick={hardReset}>Alles neu starten</button>
      )}
    </div>
  );
}

export default Input;
