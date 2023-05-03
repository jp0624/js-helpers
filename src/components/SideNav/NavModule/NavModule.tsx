import { useContext } from "react"
import { SiteContext } from "../../../context/SiteContext"

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
			<li
				className={
					module.title === activeModule.title &&
					category.title === activeCategory.title
						? "active"
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
			>
				{module.title === activeModule.title &&
					category.title === activeCategory.title &&
					"*"}
				{module.title}
			</li>
		</>
	)
}

export default NavModule
