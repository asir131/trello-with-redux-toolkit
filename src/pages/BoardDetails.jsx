import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";

import AddItem from "../components/AddItem";
import AddItemForm from "../components/AddItemForm";
import TaskList from "../components/TaskList";


import { useDispatch } from "react-redux";

import {changeListIdofaTask} from "../store/reducers/task";
import {createList,  sortTaskIdsInList} from "../store/reducers/list";
import {
	addListIdToABoard
} from "../store/reducers/board";
import { useSelector } from "react-redux";
import {selectListInitialState} from "../store/reducers/list";

const BoardDetails = () => {
	
	const dispatch = useDispatch();
	const [editMode, setEditMode] = useState(false);
	const [listTitle, setListTitle] = useState("");

	const { boardId } = useParams();

	
	const ListInitialState = useSelector(selectListInitialState);
	

	

	const renderedList = ListInitialState.filter((item) => item.boardId === boardId);

	const submitHandler = (e) => {
		e.preventDefault();

		const newListId = Date.now() + "";

		// dispatchListAction({
		// 	type: "CREATE_LIST",
		// 	payload: { title: listTitle, boardId: boardId, id: newListId },
		// });
		dispatch(createList({
			title: listTitle, boardId: boardId, id: newListId
		}));
		

		// dispatchBoardAction({
		// 	type: "ADD_LIST_ID_TO_A_BOARD",
		// 	payload: { id: boardId, listId: newListId },
		// });
		dispatch(addListIdToABoard({
			id: boardId, listId: newListId
		}));
		setEditMode(false);
		setListTitle("");
	};

	const dragEndHandler = (result) => {
		console.log(result, "D&D ended");

		const { draggableId, source, destination } = result;
		console.log(draggableId);
		if (!destination) {
			return;
		}
		if (
			source.droppableId === destination.droppableId &&
			source.index === destination.index
		) {
			return;
		}

		if (source.droppableId !== destination.droppableId) {
			// dispatchTaskAction({
			// 	type: "CHANGE_LIST_ID_OF_A_TASK",
			// 	payload: {
			// 		id: draggableId,
			// 		listId: destination.droppableId,
			// 	},
			// });
			dispatch(changeListIdofaTask({
				id: draggableId,
					listId: destination.droppableId,
			}));
		}

		// dispatchListAction({
		// 	type: "SORT_TASK_IDS_IN_LIST",
		// 	payload: {
		// 		draggableId,
		// 		source,
		// 		destination,
		// 	},
		// });
		dispatch(sortTaskIdsInList({
			draggableId,
				source,
				destination,
		}));
	};

	return (
		<DragDropContext onDragEnd={dragEndHandler}>
			<div className="d-flex m-top-sm flex-direction-row">
				<Link to="/">Back to Boards</Link>
				{renderedList.map((taskList) => (
					<TaskList key={taskList.id} taskList={taskList} />
					
				))}

				{!editMode ? (
					<AddItem listAddItem={true} setEditMode={setEditMode} />
				) : (
					<AddItemForm
						title={listTitle}
						listForm={true}
						onChangeHandler={(e) => {
							setListTitle(e.target.value);
						}}
						setEditMode={setEditMode}
						submitHandler={submitHandler}
					/>
				)}
			</div>
		</DragDropContext>
	);
};

export default BoardDetails;
