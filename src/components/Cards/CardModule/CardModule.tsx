import { useContext } from "react"
import { SiteContext } from "../../../context/SiteContext"
import { NavLink } from "react-router-dom"
import styles from "./styles.module.scss"

const CardModule = ({ module, category, section }: any) => {
	const {
		setActiveModule,
		setActiveCategory,
		setActiveComponent,
		setActiveSection,
	} = useContext(SiteContext)
	return (
		<>
			<NavLink
				to={`/${category.folder}/${module.folder}`}
				className={`${styles.card} ${styles.card__module} ${
					styles[module.type?.toLowerCase()]
				}`}
				onClick={() => {
					setActiveModule(module)
					setActiveCategory(category)
					setActiveSection({
						title: section.title,
						component: "SectionPage",
					})
					setActiveComponent({
						title: module.title,
						component: module.component,
					})
				}}
			>
				<h5 className='card-title'>{module.title}</h5>
				<p className='card-text'>{module.title}</p>
				<p className='pill-text'>{module.type}</p>
			</NavLink>
		</>
	)
}

export default CardModule
