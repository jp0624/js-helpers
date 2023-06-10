import { useContext } from "react"
import { SiteContext } from "../../../context/SiteContext"
import { NavLink } from "react-router-dom"
import SearchBar from "../../Widgets/SearchBar/SearchBar"
import styles from "./styles.module.scss"

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
			<div className={`${styles.logo__container}`}>
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
					<img src='/img/monsters/monster-07-oj.svg' />
					Dev Helpers
				</NavLink>
			</div>
			<SearchBar />
		</header>
	)
}

export default Header
