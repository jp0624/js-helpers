import { Route, Routes } from "react-router-dom"
import SideNav from "./components/SideNav/SideNav"
import Content from "./components/Content"
import { SiteProvider } from "./context/SiteContext"
import { useContext, useState, useEffect } from "react"
import { SiteContext } from "./context/SiteContext"
import GetCategories from "./helpers/GetCategories"
import "./App.scss"
import DataLoader from "./helpers/DataLoader"
import Header from "./components/Header"
import Footer from "./components/Footer"

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
					</Routes>
				</section>
				<Footer />
			</SiteProvider>
		</>
	)
}

export default App
