import { useContext } from "react"
import { SiteContext } from "../../../context/SiteContext"
import PillModule from "../PillModule/PillModule"
import { NavLink } from "react-router-dom"
import styles from "./styles.module.scss"

const PillCategory = ({ category }: any) => {
	const { setActiveCategory, setActiveComponent, setActiveModule } =
		useContext(SiteContext)
	return (
		<>
			<div className={`${styles.pill__container}`}>
				<div className={`${styles.pill__container__body}`}>
					<NavLink
						to={`/${category.folder}`}
						className={`${styles.pill__container__heading}`}
						onClick={() => {
							setActiveCategory(category)
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
						<h5 className={`${styles.pill__container__title}`}>
							{category.title}
						</h5>
					</NavLink>
				</div>
				<p>{category.description}</p>
				<div className={`${styles.pill__container__modules}`}>
					{category.modules?.map((module: any, index: number) => (
						<PillModule
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

export default PillCategory
