import { useReducer } from "react";
import "./App.css";

const counterReducer = (currentState, action) => {
	// action ===
	console.log(currentState, "currState");
	console.log(action, "action");
	// return 1000;
	switch (action.type) {
		case "INCREASE_COUNTER": {
			return currentState + action.payload;
		}

		case "DECREASE_COUNTER": {
			return currentState - action.payload;
		}

		default: {
			return currentState;
		}
	}
};

const App2 = () => {
	const [counter, dispatch] = useReducer(counterReducer, 7);
	// console.log("Rerendered");
	return (
		<div className="App">
			<p>The value of the counter is {counter}</p>
			<button
				onClick={() =>
					dispatch({ type: "INCREASE_COUNTER", payload: 1 })
				}
			>
				Increase By 1
			</button>
			<button
				onClick={() =>
					dispatch({ type: "DECREASE_COUNTER", payload: 1 })
				}
			>
				Decrease By 1
			</button>
			<button
				onClick={() =>
					dispatch({ type: "INCREASE_COUNTER", payload: 10 })
				}
			>
				Increase By 10
			</button>
			<button
				onClick={() =>
					dispatch({ type: "DECREASE_COUNTER", payload: 5 })
				}
			>
				Decrease By 5
			</button>
		</div>
	);
};

export default App2;
