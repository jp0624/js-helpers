import { useContext } from "react"
import { SiteContext } from "../../context/SiteContext"
import { NavLink } from "react-router-dom"

const Header = () => {
	const {
		categories,
		setActiveCategory,
		setActiveModule,
		setActiveComponent,
		setActiveSection,
	} = useContext(SiteContext)
	return (
		<header>
			<img src='/img/monsters/monster-07-oj.svg' />
			<NavLink
				to='/'
				className={"main-logo"}
				onClick={() => {
					setActiveComponent({
						title: "Home Page",
						component: "HomePage",
					})
					setActiveSection({
						folder: "",
						title: "",
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
				Dev Helpers
			</NavLink>
		</header>
	)
}

export default Header
