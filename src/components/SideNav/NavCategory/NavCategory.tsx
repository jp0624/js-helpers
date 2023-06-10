import NavModule from "../NavModule/NavModule"
import { useContext } from "react"
import { SiteContext } from "../../../context/SiteContext"
import styles from "./styles.module.scss"
import { NavLink } from "react-router-dom"

const NavCategory = ({ category, section }: any) => {
	const {
		activeCategory,
		setActiveCategory,
		setActiveComponent,
		setActiveModule,
		setActiveSection,
	} = useContext(SiteContext)

	return (
		<>
			<li
				className={`
					${styles.category__list}
					${category.title === activeCategory.title ? styles.active : ""}
					`}
			>
				<NavLink
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
					to={`/${category.folder}`}
				>
					{category.title === activeCategory.title && "*"}
					{category.title}
				</NavLink>
				<ul className={styles.module__list}>
					{category.modules.map((module: any, index: number) => (
						<NavModule
							section={section}
							module={module}
							category={category}
							key={index}
						/>
					))}
				</ul>
			</li>
		</>
	)
}

export default NavCategory
