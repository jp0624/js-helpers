import NavModule from "../NavModule/NavModule"
import { useContext } from "react"
import { SiteContext } from "../../../context/SiteContext"
import styles from "./styles.module.scss"
import { NavLink } from "react-router-dom"
import NavCategory from "../NavCategory/NavCategory"

const NavSection = ({ section }: any) => {
	const {
		activeCategory,
		setActiveCategory,
		setActiveSection,
		setActiveComponent,
		setActiveModule,
	} = useContext(SiteContext)

	return (
		<>
			<li
				className={`
					${styles.section__list}
					${section.title === activeCategory.title ? styles.active : ""}
					`}
			>
				<NavLink
					onClick={() => {
						setActiveSection(section)
						setActiveComponent({
							title: section.title,
							component: "CategoryPage",
						})
						setActiveCategory({
							folder: "",
							title: "",
						})
						setActiveModule({
							folder: "",
							title: "",
						})
					}}
					to={`/${section.folder}`}
				>
					{section.title === activeCategory.title && "*"}
					{section.title}
				</NavLink>
				<h4 className={styles.category__list}>
					{section.categories.map((category: any, index: number) => (
						<NavCategory category={category} key={index} />
					))}
				</h4>
			</li>
		</>
	)
}

export default NavSection
