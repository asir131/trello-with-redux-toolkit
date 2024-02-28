import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
    name: "tasks",
    initialState: [],
    reducers:{
        createTask(state,action){
            const newTask = {
				id: action.payload.id,
				title: action.payload.title,
				listId: action.payload.listId,
				boardId: action.payload.boardId,
			};
            state.push(newTask);
        },
        updateTaskTitle(state, action){
            return state.map((item) => {
				if (item.id === action.payload.id) {
					return { ...item, title: action.payload.title };
				}

				return item;
			});
        },
        changeListIdofaTask(state, action){
            return state.map((item) => {
				
				if (item.id === action.payload.id) {
					
					return { ...item, listId: action.payload.listId };
				}

				return item;
			});
        },
        changeBoardIdofTask(state, action){
            return state.map((item) => {
				if (item.id === action.payload.id) {
					return { ...item, boardId: action.payload.boardId };
				}

				return item;
			});
        },
        removeTask(state,action){
            return state.filter((item) => item.id !== action.payload);
        },



    }
});
export const {createTask,updateTaskTitle,changeListIdofaTask,changeBoardIdofTask,removeTask}=tasksSlice.actions;

export default tasksSlice.reducer;
export const selectTaskInitialState = (state) => state.task;