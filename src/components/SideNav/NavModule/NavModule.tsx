import { useContext } from "react"
import { SiteContext } from "../../../context/SiteContext"
import styles from "./styles.module.scss"
import { NavLink } from "react-router-dom"

const NavModule = ({ module, category }: any) => {
	const {
		setActiveCategory,
		setActiveComponent,
		setActiveModule,
		activeModule,
		activeCategory,
	} = useContext(SiteContext)
	// console.log("module", module)
	return (
		<>
			<NavLink
				className={
					module.title === activeModule.title &&
					category.title === activeCategory.title
						? styles.active
						: ""
				}
				onClick={() => {
					setActiveCategory(category)
					setActiveComponent({
						title: module.title,
						component: module.component,
					})
					setActiveModule(module)
				}}
				to={`cat/${category.folder}/mod/${module.folder}`}
			>
				{module.title === activeModule.title &&
					category.title === activeCategory.title &&
					"*"}
				{module.title}
			</NavLink>
		</>
	)
}

export default NavModule
