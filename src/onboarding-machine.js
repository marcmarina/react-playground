import { assign, createMachine } from "xstate";

export const STATES = {
  WELCOME: "welcome",
  ADD_PERSON: "add_person",
  FIND_NEXT: "find_next",
  COMPLETE: "onboarding_completed",
};

export const EVENTS = {
  CONTINUE: "CONTINUE",
  PERSON_ADDED: "PERSON_ADDED",
  SKIP: "SKIP",
  COMPLETE: "COMPLETE",
};

export const onboardingStateMachine = createMachine(
  {
    id: "treeOnboarding",
    initial: STATES.ADD_PERSON,
    context: () => ({
      max_generations: 3,
      current: 1,
      adding: 3,
      added: [],
      skipped: [],
    }),
    states: {
      [STATES.ADD_PERSON]: {
        on: {
          [EVENTS.PERSON_ADDED]: [
            {
              actions: assign({
                added: (context) => [...context.added, context.adding],
              }),
              target: STATES.FIND_NEXT,
            },
          ],
          [EVENTS.SKIP]: [
            {
              actions: assign({
                skipped: (context) => [...context.skipped, context.adding],
              }),
              target: STATES.FIND_NEXT,
            },
          ],
        },
      },
      [STATES.FIND_NEXT]: {
        invoke: {
          id: "findNextPerson",
          src: "findNextPerson",
          onDone: [
            {
              cond: (_, event) => {
                return event.data === null;
              },
              target: STATES.COMPLETE,
            },
            {
              actions: assign((_, event) => {
                return {
                  current: getChild(event.data),
                  adding: event.data,
                };
              }),
              target: STATES.ADD_PERSON,
            },
          ],
        },
      },
      [STATES.COMPLETE]: {
        type: "final",
      },
    },
  },
  {
    services: {
      findNextPerson: (context) => {
        const nextAvailable = getNextAvailable(
          1,
          context.added,
          context.skipped,
          context.max_generations
        );

        return Promise.resolve(nextAvailable);
      },
    },
  }
);

function getChild(ahnenDab) {
  return Math.floor(ahnenDab / 2);
}

function getFather(ahnenDab) {
  return ahnenDab * 2;
}

function getMother(ahnenDab) {
  return getFather(ahnenDab) + 1;
}

function getNextAvailable(current, added, skipped, maxGenerations) {
  const generation = getGeneration(current);

  if (generation >= maxGenerations) {
    return null;
  }

  const mother = getMother(current);
  if (!added.includes(mother) && !skipped.includes(mother)) return mother;

  const father = getFather(current);
  if (!added.includes(father) && !skipped.includes(father)) return father;

  if (!skipped.includes(mother)) {
    const mothersBranch = getNextAvailable(
      mother,
      added,
      skipped,
      maxGenerations
    );
    if (mothersBranch) return mothersBranch;
  }

  if (!skipped.includes(father)) {
    const fathersBranch = getNextAvailable(
      father,
      added,
      skipped,
      maxGenerations
    );
    if (fathersBranch) return fathersBranch;
  }

  return null;
}

function lowerPowerOfTwo(x) {
  return 2 ** Math.floor(Math.log2(x));
}

function getGeneration(ahnenDab) {
  return Math.log2(lowerPowerOfTwo(ahnenDab)) + 1;
}
