import React, {FunctionComponent, useReducer} from 'react';

// Types for the inputs to create a context
type ReducerFunction<State, Action> = (state: State, action: Action) => State;
type BoundActionFunction = (...args: any[]) => void;
export type DispatchBase<Action> = (arg0: Action) => void;

// Takes a dispatch returns a bound action function which can just be any function
type UnboundActionFunction<Action> = (
  dispatch: (arg0: Action) => void,
) => BoundActionFunction;

// Contains multiple UnboundActionFunction that become BoundActionFunctions once bound
interface UnboundActionFunctionRecord<A> {
  [key: string]: UnboundActionFunction<A>;
}

// Mirrors UnboundActionFunctionRecord except that this stores the functions once bound
type BoundActions<
  Action,
  Unbound extends UnboundActionFunctionRecord<Action>
> = {
  [K in keyof Unbound]: ReturnType<Unbound[K]>;
};

// The typing to get the function to work is a bit gross but the results are really quite nice
// The "actions" object from the useContext hook will have all of the bound action functions fully typed in an
// editor that supports it
function createDataContext<
  State,
  Action,
  ActionFunctions extends UnboundActionFunctionRecord<Action>
>(
  reducer: ReducerFunction<State, Action>,
  actions: ActionFunctions,
  initialState: State,
) {
  // The type that the context will provide. Gives access to the state and the bound actions.
  interface ContextValue {
    state: State;
    actions: BoundActions<Action, ActionFunctions>;
  }

  const Context = React.createContext({} as ContextValue);

  const Provider: FunctionComponent = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Bind all of the unbound actions with the reducer's dispatch
    const boundActions = {} as BoundActions<Action, ActionFunctions>;
    for (let key in actions) {
      // @ts-ignore
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{state, actions: boundActions}}>
        {children}
      </Context.Provider>
    );
  };

  return {Context, Provider};
}

export default createDataContext;
