import { createSlice } from "@reduxjs/toolkit";

const boardSlice = createSlice({
    name:"boards",
    initialState: [],
    reducers: {
        createBoard(state,action){
            const newBoard = {
                id:Date.now()+"",
                title:action.payload,
                lists:[],
                tasks:[],
            };
            state.push(newBoard);
        },
        updateBoardTitle(state,action){
            return state.map(item=>{
                if(item.id === action.payload.id){
                    return { ...item, title: action.payload.title };
                }
                return item;
            });
        },
        removeBoard(state,action){
            return state.filter((item) => item.id !== action.payload);
        },
        addListIdToABoard: (state, action) => {
            return state.map((item) => {
              if (item.id === action.payload.id) {
                return {
                  ...item,
                  lists: [...item.lists, action.payload.listId],
                };
              }
              return item;
            });
          },
          addTaskIdToABoard: (state, action) => {
            return state.map((item) => {
              if (item.id === action.payload.id) {
                return {
                  ...item,
                 tasks: [...item.tasks, action.payload.taskId],
                };
              }
              return item;
            });
          },
          removeListIdFromABoard: (state, action) => {
            return state.map((item) => {
              if (item.id === action.payload.id) {
                return {
                  ...item,
                  lists: item.lists.filter(
                    (listId) => listId !== action.payload.listId,
                  ),
                };
              }
              return item;
            });
          },
          removeTaskIdFromABoard: (state, action) => {
            return state.map((item) => {
              if (item.id === action.payload.id) {
                return {
                  ...item,
                  tasks: item.tasks.filter(
                    (taskId) => taskId !== action.payload.taskId,
                  ),
                };
              }
              return item;
            });
          },



    },
});

export const {createBoard,updateBoardTitle,removeBoard,addListIdToABoard,addTaskIdToABoard,removeListIdFromABoard,removeTaskIdFromABoard} = boardSlice.actions;
export default boardSlice.reducer;
export const selectBoardInitialState = (state) => state.board;
