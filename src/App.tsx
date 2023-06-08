import "./App.scss"
import { Route, Routes } from "react-router-dom"
import { SiteProvider } from "./context/SiteContext"
import DataLoader from "./helpers/DataLoader"
import Header from "./components/structure/Header"
import Footer from "./components/structure/Footer"
import SideNav from "./components/SideNav/SideNav"
import Content from "./components/structure/Content/Content"

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
						<Route path='/:sectionName' element={<Content />} />
						<Route
							path='/:sectionName/:categoryName'
							element={<Content />}
						/>
						<Route
							path='/:sectionName/:categoryName/:moduleName'
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
