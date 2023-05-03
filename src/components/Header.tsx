import { useContext } from "react"
import { SiteContext } from "../context/SiteContext"

const Header = () => {
	const {
		categories,
		setActiveCategory,
		setActiveModule,
		setActiveComponent,
	} = useContext(SiteContext)
	return (
		<header>
			<button
				onClick={() => {
					setActiveComponent({
						title: "Home Page",
						component: "HomePage",
					})
					setActiveCategory({
						folder: "",
						title: "",
						type: "",
					})
					setActiveModule({
						folder: "",
						title: "",
					})
				}}
			>
				Home
			</button>
		</header>
	)
}

export default Header
