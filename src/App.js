// import { useState, useReducer } from "react";
// import "./App.css";
// // import { noteReducer } from "./reducers/note";

// const initState = {
// 	noteTitle: "",
// 	notes: [],
// 	editMode: false,
// 	editableNote: null,
// };

// const noteReducer = (state, action) => {
// 	// dispatch({ type: "CREATE_NOTE" })
// 	// action = { type: "CREATE_NOTE" }
// 	// if (action.type === "CHANGE_NOTE_INPUT") {

// 	// } else if (action.type === "CREATE_NOTE") {

// 	// } else if (action.type === "EDIT_NOTE") {

// 	// }
// 	switch (action.type) {
// 		case "CHANGE_NOTE_INPUT": {
// 			console.log(action);
// 			return {
// 				...state,
// 				noteTitle: action.payload,
// 			};
// 		}

// 		case "CREATE_NOTE": {
// 			const newNote = {
// 				id: Date.now() + "",
// 				title: state.noteTitle,
// 			};

// 			return {
// 				...state,
// 				notes: [...state.notes, newNote],
// 				noteTitle: "",
// 			};
// 		}

// 		case "EDIT_NOTE": {
// 			return {
// 				...state,
// 				editMode: true,
// 				editableNote: action.payload,
// 				noteTitle: action.payload.title,
// 			};
// 		}
// 		case "UPDATE_NOTE": {
// 			return {
// 				...state,
// 				notes: state.notes.map((item) => {
// 					if (item.id === state.editableNote.id) {
// 						return { ...item, title: state.noteTitle };
// 					}

// 					return item;
// 				}),
// 				editMode: false,
// 				editableNote: null,
// 				noteTitle: "",
// 			};
// 		}

// 		case "REMOVE_NOTE": {
// 			return {
// 				...state,
// 				notes: state.notes.filter((item) => item.id !== action.payload),
// 			};
// 		}

// 		case "demo_case": {
// 			return state;
// 		}
// 		default: {
// 			return state;
// 		}
// 	}
// 	// return state;
// };

// const App = () => {
// 	const [noteStates, dispatch] = useReducer(noteReducer, initState);

// 	const submitHandler = (e) => {
// 		e.preventDefault();
// 		noteStates.editMode
// 			? dispatch({ type: "UPDATE_NOTE" })
// 			: dispatch({ type: "CREATE_NOTE" });
// 	};
// 	return (
// 		<div className="App">
// 			{/* Hello World */}
// 			<form onSubmit={submitHandler}>
// 				<input
// 					type="text"
// 					value={noteStates.noteTitle}
// 					onChange={(event) =>
// 						dispatch({
// 							type: "CHANGE_NOTE_INPUT",
// 							payload: event.target.value,
// 						})
// 					}
// 				/>
// 				<button type="submit">
// 					{noteStates.editMode ? "Update Note" : "Add Note"}
// 				</button>
// 			</form>
// 			<div className="notes">
// 				<h2>All Notes</h2>
// 				<ul className="note-list">
// 					{noteStates.notes.map((note) => (
// 						<li key={note.id}>
// 							<span>{note.title}</span>
// 							<button
// 								onClick={() =>
// 									dispatch({
// 										type: "EDIT_NOTE",
// 										payload: note,
// 									})
// 								}
// 							>
// 								Edit
// 							</button>
// 							<button
// 								onClick={() =>
// 									dispatch({
// 										type: "REMOVE_NOTE",
// 										payload: note.id,
// 									})
// 								}
// 							>
// 								Remove
// 							</button>
// 						</li>
// 					))}
// 				</ul>
// 			</div>
// 		</div>
// 	);
// };

// export default App;

import "./App.css";

import StudentForm from "./components/StudentForm";
import StudentSection from "./components/StudentSection";

const App = ({ children }) => {
	return (
		<div className="App">
			{children}
			<StudentForm />
			<StudentSection />
		</div>
	);
};

export default App;
