import { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import { icons } from "../assets";


import AddItem from "./AddItem";
import AddItemForm from "./AddItemForm";

// import { BoardContext } from "../contexts/Board";
// import { ListContext } from "../contexts/List";

import TaskCard from "./TaskCard";

import { useDispatch } from "react-redux";

import {createTask, removeTask} from "../store/reducers/task";
import {addTaskIdToAList,removeList, createList, changeBoardIdOfAList} from "../store/reducers/list";
import {
	addListIdToABoard,
	addTaskIdToABoard,
	removeListIdFromABoard,
} from "../store/reducers/board";

import { useSelector } from "react-redux";
import { selectBoardInitialState } from "../store/reducers/board"
import { selectTaskInitialState } from "../store/reducers/task"

const TaskList = ({ taskList }) => {
	const boardInitialState = useSelector(selectBoardInitialState);
	const TaskInitialState = useSelector(selectTaskInitialState);
	const dispatch = useDispatch();
	const [editMode, setEditMode] = useState(false);
	const [taskTitle, setTaskTitle] = useState("");

	const boardWithoutThis = boardInitialState.filter(board => board.id!==taskList.boardId);
	
const submitHandler = (e) => {
		e.preventDefault();

		const newTaskId = Date.now() + "";
		
		
		dispatch(createTask({
			id: newTaskId,
				title: taskTitle,
				listId: taskList.id,
				boardId: taskList.boardId,
		}));

		
		dispatch(addTaskIdToAList({
			id: taskList.id, taskId: newTaskId
		}));

		
		dispatch(addTaskIdToABoard({
			id: taskList.boardId, taskId: newTaskId
		}))

		setEditMode(false);
		setTaskTitle("");
	};

	const removeHandler = () => {
		// dispatchListAction({ type: "REMOVE_LIST", payload: taskList.id });
		dispatch(removeList(taskList.id))

		// dispatchBoardAction({
		// 	type: "REMOVE_LIST_ID_FROM_A_BOARD",
		// 	payload: { id: taskList.boardId, listId: taskList.id },
		// });
		dispatch(removeListIdFromABoard({
			id: taskList.boardId, listId: taskList.id
		}))
		taskList.tasks.forEach((taskId) => {
			// dispatchTaskAction({ type: "REMOVE_TASK", payload: taskId });
			dispatch(removeTask(taskId));
		});
	};
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = () => {
		
	  setIsOpen(!isOpen);
	};
	const [isOpenMove, setIsOpenMove] = useState(false);

	const handleClickMove = () => {
		
		setIsOpenMove(!isOpenMove);
	};

	const [isOpenCopy, setIsOpenCopy] = useState(false);

	const handleClickCopy = () => {
		
	  setIsOpenCopy(!isOpenCopy);
	};
const prevent=(e) => {
  e.stopPropagation();
};



const [selectedBoard, setSelectedBoard] = useState('');




  const handleClickCopied=(e) => {
	if(selectedBoard!==""){
		const listId= (Date.now()-1).toString();
		
		dispatch(addListIdToABoard({
			id:selectedBoard, listId: listId
		}))
		const taskIds=[];
		
		taskList.tasks.forEach((Tid)=> {
			const taskObj = TaskInitialState.find((ele)=>ele.id===Tid)
			const TaskID=(Math.floor(Math.random() * 100)).toString();
			console.log(Tid);
			dispatch(createTask({
				id: TaskID,
					title: taskObj.title,
					listId:listId,
					boardId:selectedBoard,
			}));
			taskIds.push(TaskID);
			
			
		});
		
			dispatch(createList({
				id:listId,
				title:taskList.title,
				boardId:selectedBoard,
				tasks: taskIds,
			}));
	}
	else
	alert("Please select a Board");
   
   
			
  };
  const handleClickMoved = (e) => {
		if(selectedBoard!==""){
			dispatch(changeBoardIdOfAList({
				id: taskList.id, boardId: selectedBoard 
			}));
	
			// taskList.tasks.forEach((Tid)=> {
				
				
			// 	dispatch(changeBoardIdofTask({
			// 		id:Tid,
			// 		boardId: selectedBoard 
			// 	}));
				
				
				
			// });
		}
		else
	alert("Please select a Board");

			
		
};
  

  const handleBoardChange = (event) => {
	
    setSelectedBoard(event.target.value);
	
  };


return (
		<Droppable droppableId={taskList.id}>
			{(provided) => {
				
				return (
					
					<div
						{...provided.droppableProps}
						ref={provided.innerRef}
						className="list-container"
					>
						
						<div className="list-title-container">
						
							<h5>{taskList.title}</h5>
							<img
								onClick={handleClick}
								src={icons.editIcon}
								alt=""
								className="add-item-icon"
							/>
							{isOpen && (
							<div className="dropdown-menu">
	<form >
      <div onClick={handleClickMove}>
        Move
        {isOpenMove && (
          <div className="dropdown-menu">
            <div onClick={prevent}>
              <select value={selectedBoard} onChange={handleBoardChange}>
                <option>Select a board</option>
                {boardWithoutThis.map((board) => (
                  <option key={board.id} value={board.id}>
                    {board.title}
                  </option>
                ))}
              </select>
            </div>
           
            <button className="add-button" onClick={handleClickMoved}>
              Move
            </button>
          </div>
        )}
      </div>
    </form>
							
							
							
							
							
							
<div onClick={handleClickCopy}>Copy

{isOpenCopy && (
<div className="dropdown-menu">
		<form >

			<div onClick={prevent}>
			<select value={selectedBoard} onChange={handleBoardChange}>
				<option>Select a board</option>
				{boardWithoutThis.map((board) => (
				<option key={board.id} value={board.id}>
					{board.title}
				</option>
				))}
			</select>	
			
			</div>
			<button className="add-button" type="submit" onClick={handleClickCopied}>
				Copy to
				</button>		
		</form>
				
	</div>
				)}	
</div>
</div>
)}
			<img
				onClick={removeHandler}
				src={icons.crossIcon}
				alt=""
				className="add-item-icon"
			/>
		</div>
		{taskList.tasks
			.map((item) => {
				return TaskInitialState.find((ele) => ele.id === item);
			})
			.map((task, index) => (
				<TaskCard
					index={index}
					key={task.id}
					task={task}
				/>
				
			))}
		{!editMode ? (
			<AddItem setEditMode={setEditMode} />
		) : (
			<AddItemForm
				title={taskTitle}
				onChangeHandler={(e) => {
					setTaskTitle(e.target.value);
				}}
				setEditMode={setEditMode}
				submitHandler={submitHandler}
			/>
		)}
		{provided.placeholder}
	</div>
);
}}
		</Droppable>
	);
};

export default TaskList;
