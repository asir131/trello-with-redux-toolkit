import { useState } from "react";
// import { BoardContext } from "../contexts/Board";
import { useDispatch } from "react-redux";
import { createBoard } from "../store/reducers/board";

const BoardCreatingForm = () => {
	const [boardTitle, setBoardTitle] = useState("");

	

	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!boardTitle.trim()) {
			return alert(`Please provide a valid board title`);
		}
		dispatch(createBoard(boardTitle));
		// dispatchBoardAction({ type: "CREATE_BOARD", payload: boardTitle });
		setBoardTitle("");
	};
	return (
		<div className="align-center m-top-md">
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={boardTitle}
					onChange={(e) => setBoardTitle(e.target.value)}
				/>
				<button type="submit">Create Board</button>
			</form>
		</div>
	);
};

export default BoardCreatingForm;
