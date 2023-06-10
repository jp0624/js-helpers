import { useContext } from "react"
import { SiteContext } from "../../../context/SiteContext"
import PillModule from "../../Pills/PillModule/PillModule"
import { NavLink } from "react-router-dom"
import styles from "./styles.module.scss"

const CardCategory = ({ category, section }: any) => {
	const {
		setActiveCategory,
		setActiveComponent,
		setActiveModule,
		setActiveSection,
	} = useContext(SiteContext)
	return (
		<>
			<div className='card card-category'>
				<div className='card-body'>
					<NavLink
						to={`/${category.folder}`}
						className={`card-heading`}
						onClick={() => {
							setActiveCategory(category)
							setActiveSection({
								title: section.title,
								component: "SectionPage",
							})
							setActiveComponent({
								title: category.title,
								component: "CategoryPage",
							})
							setActiveModule({
								folder: "",
								title: "",
							})
						}}
					>
						<h5 className='card-title'>{category.title}</h5>
					</NavLink>
				</div>
				<p>{category.description}</p>
				<div className={`${styles.pill__container__modules}`}>
					{category.modules?.map((module: any, index: number) => (
						<PillModule
							section={section}
							category={category}
							module={module}
							key={index}
						/>
					))}
				</div>
			</div>
		</>
	)
}

export default CardCategory
