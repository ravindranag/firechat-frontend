import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppRoot from "./app/root/AppRoot";
import AppThemeProvider from "./theme/AppThemeProvider";

const router = createBrowserRouter([
	{
		path: '/',
		element: <AppRoot />
	}
])

const App = () => {
	return (
		<AppThemeProvider>
			<RouterProvider router={router} />
		</AppThemeProvider>
	)
}

export default App