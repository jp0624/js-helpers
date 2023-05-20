import { Route, Routes } from "react-router-dom"
import SideNav from "./components/SideNav/SideNav"
import Content from "./components/structure/Content/Content"
import { SiteProvider } from "./context/SiteContext"
import "./App.scss"
import DataLoader from "./helpers/DataLoader"
import Header from "./components/structure/Header"
import Footer from "./components/structure/Footer"

function App() {
	return (
		<>
			<SiteProvider>
				<DataLoader />
				<Header />
				<section className='main'>
					<SideNav />
					<Routes>
						<Route path='/' element={<Content />} />
						<Route
							path='/cat/:categoryName'
							element={<Content />}
						/>
						<Route
							path='/cat/:categoryName/mod/:moduleName'
							element={<Content />}
						/>
						<Route path='*' element={<Content />} />
					</Routes>
				</section>
				<Footer />
			</SiteProvider>
		</>
	)
}

export default App
