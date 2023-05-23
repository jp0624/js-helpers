import { useContext } from "react"
import { SiteContext } from "../../../context/SiteContext"
import { NavLink } from "react-router-dom"

const CardSection = ({ module, category }: any) => {
	const { setActiveModule, setActiveCategory, setActiveComponent } =
		useContext(SiteContext)
	return (
		<>
			<NavLink
				to={`/${category.folder}/${module.folder}`}
				className='card card-section'
				onClick={() => {
					setActiveModule(module)
					setActiveCategory(category)
					setActiveComponent({
						title: module.title,
						component: module.component,
					})
				}}
			>
				<h5 className='card-title'>{module.title}</h5>
				<p className='card-text'>{module.title}</p>
			</NavLink>
		</>
	)
}

export default CardSection
