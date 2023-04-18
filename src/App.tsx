import './App.css'
import { useMachine } from '@xstate/react'
import { assign, createMachine } from 'xstate'

const multiStepFormMachineWithoutAssign = createMachine(
  {
    id: 'multiStepForm',
    initial: 'stepOne',
    states: {
      stepOne: {
        entry: 'trackStepLoad',
        on: { NEXT: 'stepTwo' },
      },
      stepTwo: {
        entry: 'trackStepLoad',
        on: { NEXT: 'stepThree' },
      },
      stepThree: {
        entry: 'trackStepLoad',
        on: { RESET: 'stepOne' },
      },
    },
  },
  {
    actions: {
      trackStepLoad: (context, event, actionMeta) => {
        console.log(
          'multiStepFormMachineWithoutAssign current finite state:',
          actionMeta.state.value
        )
      },
    },
  }
)

const multiStepFormMachineWithAssign = createMachine(
  {
    id: 'multiStepForm',
    initial: 'stepOne',
    states: {
      stepOne: {
        entry: 'trackStepLoad',
        on: { NEXT: 'stepTwo' },
      },
      stepTwo: {
        entry: 'trackStepLoad',
        on: { NEXT: 'stepThree' },
      },
      stepThree: {
        entry: 'trackStepLoad',
        on: { RESET: 'stepOne' },
      },
    },
  },
  {
    actions: {
      trackStepLoad: assign((context, event, actionMeta) => {
        console.log(
          'multiStepFormMachineWithAssign current finite state:',
          actionMeta?.state?.value
        )
      }),
    },
  }
)

function App() {
  const [stateWithoutAssign, transitionWithoutAssign] = useMachine(
    multiStepFormMachineWithoutAssign
  )
  const [stateWithAssign, transitionWithAssign] = useMachine(
    multiStepFormMachineWithAssign
  )
  const currentFiniteStateWithoutAssign = stateWithoutAssign.value as string
  const currentFiniteStateWithAssign = stateWithAssign.value as string

  return (
    <>
      <h1>
        Current State (without assign): '{currentFiniteStateWithoutAssign}'
      </h1>
      <h1>Current State (with assign): '{currentFiniteStateWithAssign}'</h1>
      <button
        onClick={() => {
          transitionWithoutAssign(
            currentFiniteStateWithoutAssign === 'stepThree' ? 'RESET' : 'NEXT'
          )
          transitionWithAssign(
            currentFiniteStateWithAssign === 'stepThree' ? 'RESET' : 'NEXT'
          )
        }}
      >
        Transition State
      </button>
    </>
  )
}

export default App
