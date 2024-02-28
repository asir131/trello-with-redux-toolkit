
import { Link } from "react-router-dom";


import BoardItem from "./BoardItem";
import { useSelector } from "react-redux";
import { selectBoardInitialState } from "../store/reducers/board"

const BoardList = () => {
	
	const boardInitialState = useSelector(selectBoardInitialState);
	
	return (
		<div className="flex-wrap m-top-md d-flex justify-content-around">
			
			{boardInitialState.map((board) => (
				<Link key={board.id} to={`/boards/${board.id}`}>
					<BoardItem board={board} />
				</Link>
			))}
		</div>
	);
};

export default BoardList;
