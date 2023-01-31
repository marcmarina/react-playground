import React from "react";
import "./App.css";

import { useMachine } from "@xstate/react";
import { EVENTS, onboardingStateMachine, STATES } from "./onboarding-machine";

const parentToAhnenDab = {
  root: 1,
  father: 2,
  mother: 3,
  paternal_father: 4,
  paternal_mother: 5,
  maternal_father: 6,
  maternal_mother: 7,
};

const ahnenDabToParent = {
  1: "root",
  2: "father",
  3: "mother",
  4: "paternal_father",
  5: "paternal_mother",
  6: "maternal_father",
  7: "maternal_mother",
};

const toParent = (ahnenDab) => ahnenDabToParent[ahnenDab];

function App() {
  const [state, send] = useMachine(onboardingStateMachine);

  return (
    <div>
      <h1>Onboarding</h1>
      {state.matches(STATES.ADD_PERSON) && (
        <>
          <h2>Adding: {toParent(state.context.adding)}</h2>
          <h2>Selected: {toParent(state.context.current)}</h2>
          <button
            onClick={() => {
              send(EVENTS.PERSON_ADDED);
            }}
          >
            Next
          </button>

          <button
            onClick={() => {
              send(EVENTS.SKIP);
            }}
          >
            Skip
          </button>
        </>
      )}
      {state.matches(STATES.COMPLETE) && <h2>Complete</h2>}
    </div>
  );
}

export default App;
