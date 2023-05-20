import { useContext } from "react"
import { SiteContext } from "../../context/SiteContext"
import { NavLink } from "react-router-dom"

const Header = () => {
	const {
		categories,
		setActiveCategory,
		setActiveModule,
		setActiveComponent,
	} = useContext(SiteContext)
	return (
		<header>
			<NavLink
				to='/'
				className={"main-logo"}
				onClick={() => {
					setActiveComponent({
						title: "Home Page",
						component: "HomePage",
					})
					setActiveCategory({
						folder: "",
						title: "",
						section: "",
					})
					setActiveModule({
						folder: "",
						title: "",
					})
				}}
			>
				JS Helpers
			</NavLink>
		</header>
	)
}

export default Header
