import { useContext } from "react"
import { SiteContext } from "../../../context/SiteContext"
import styles from "./styles.module.scss"
import { NavLink } from "react-router-dom"

const NavModule = ({ module, category, section }: any) => {
	const {
		setActiveCategory,
		setActiveSection,
		setActiveComponent,
		setActiveModule,
		activeModule,
		activeCategory,
	} = useContext(SiteContext)
	// console.log("module", module)
	return (
		<>
			<NavLink
				className={`${styles.navModule} 
					${
						module.title === activeModule.title &&
						category.title === activeCategory.title
							? styles.active
							: ""
					}`}
				onClick={() => {
					setActiveCategory(category)
					setActiveSection({
						title: section.title,
						component: "SectionPage",
					})
					setActiveComponent({
						title: module.title,
						component: module.component,
					})
					setActiveModule(module)
				}}
				to={`/${category.folder}/${module.folder}`}
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
