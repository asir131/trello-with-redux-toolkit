import { createSlice } from "@reduxjs/toolkit";

export const listSlice = createSlice({

    name: "lists",
    initialState: [],
    reducers: {
        createList(state,action){
            const newList = {
              id: action.payload.id,
              title: action.payload.title,
              boardId: action.payload.boardId,
              tasks: action.payload.tasks? action.payload.tasks:[],
            };
              state.push(newList);
        },

        updateListName(state,action){
            return state.map((item)=>{
                if (item.id === action.payload.id) {
					return { ...item, title: action.payload.title };
				}

				return item;
            });
        },
        removeList(state,action){
            return state.filter((item) => item.id !== action.payload);
        },
        changeBoardIdOfAList(state,action){
            return state.map((item) => {
				if (item.id === action.payload.id) {
					return { ...item, boardId: action.payload.boardId };
				}

				return item;
			});
        },
        addTaskIdToAList(state,action){
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
        removeTaskIdFromAList(state,action){
            return state.map((item) => {
				if (item.id === action.payload.id) {
					return {
						...item,
						tasks: item.tasks.filter(
							(tId) => tId !== action.payload.taskId,
						),
					};
				}

				return item;
			});
		},
        sortTaskIdsInList: (state, action) => {
            const { draggableId, source, destination } = action.payload;
      
            return state.map((list) => {
              if (
                source.droppableId === destination.droppableId &&
                list.id === source.droppableId
              ) {
                const copyOfTaskIds = [...list.tasks];
                copyOfTaskIds.splice(source.index, 1);
                copyOfTaskIds.splice(destination.index, 0, draggableId);
                return {
                  ...list,
                  tasks: copyOfTaskIds,
                };
              }
      
              if (source.droppableId === list.id) {
                return {
                  ...list,
                  tasks: list.tasks.filter((itemId) => itemId !== draggableId),
                };
              }
      
              if (destination.droppableId === list.id) {
                return {
                  ...list,
                  tasks: [
                    ...list.tasks.slice(0, destination.index),
                    draggableId,
                    ...list.tasks.slice(destination.index),
                  ],
                };
              }
      
              return list;
            });
          },
        


    },
});
export const selectListInitialState = (state) => state.list;
export const { createList,updateListName,removeList,changeBoardIdOfAList,addTaskIdToAList,removeTaskIdFromAList,sortTaskIdsInList } = listSlice.actions;

export default listSlice.reducer;


