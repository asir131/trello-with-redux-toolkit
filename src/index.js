import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { ourRouter } from "./router/router";
import BoardProvider from "./contexts/Board";
import ListProvider from "./contexts/List";
import TaskProvider from "./contexts/Task";
import {store} from "./store";
import { Provider } from "react-redux";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
		<BoardProvider store={store}>
			<ListProvider store={store}>
				<TaskProvider store={store}>
					<RouterProvider router={ourRouter} />
				</TaskProvider>
			</ListProvider>
		</BoardProvider>
		</Provider>
	</React.StrictMode>,
	
);


