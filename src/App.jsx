import React from "react";
import "./App.css";

function dataReducer(state, action) {
  switch (action.type) {
    case "FETCHING":
      return {
        ...state,
        loading: true,
      };

    case "DONE":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    default:
      return state;
  }
}

function waitFor(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function App() {
  const [state, dispatch] = React.useReducer(dataReducer, {
    loading: true,
    data: null,
  });

  const fetchData = React.useCallback(async () => {
    dispatch({ type: "FETCHING" });

    await waitFor(2000);

    dispatch({
      type: "DONE",
      payload: {
        name: "John Doe",
        age: 30,
      },
    });
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <h1>{JSON.stringify(state)}</h1>
    </div>
  );
}

export default App;
