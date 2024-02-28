import { createBrowserRouter } from "react-router-dom";
import Boards from "../pages/Boards";
import BoardDetails from "../pages/BoardDetails";

export const ourRouter = createBrowserRouter([
	{
		path: "/",
		element: <Boards />,
	},
	{
		path: "/boards/:boardId",
		element: <BoardDetails />,
	},
	
]);
