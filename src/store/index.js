import { configureStore } from "@reduxjs/toolkit";


import  boardReducer  from "./reducers/board";
import  listReducer  from "./reducers/list";
import  taskReducer  from "./reducers/task";


const rootReducer = {
    board : boardReducer,
    list : listReducer,
    task : taskReducer,
}

export const store = configureStore({
    reducer: rootReducer,
    
});
