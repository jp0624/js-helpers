import NavModule from "../NavModule/NavModule"
import { useContext } from "react"
import { SiteContext } from "../../../context/SiteContext"
import styles from "./styles.module.scss"
import { NavLink } from "react-router-dom"
import NavCategory from "../NavCategory/NavCategory"

const NavSection = ({ section }: any) => {
	const {
		activeSection,
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
					${section.title === activeSection.title ? styles.active : ""}
					`}
			>
				<NavLink
					onClick={() => {
						setActiveSection(section)
						setActiveComponent({
							title: section.title,
							component: "SectionPage",
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
					{section.title === activeSection.title && "*"}
					{section.title}
				</NavLink>
				<ul className={styles.category__list}>
					{section.categories.map((category: any, index: number) => (
						<NavCategory
							category={category}
							section={section}
							key={index}
						/>
					))}
				</ul>
			</li>
		</>
	)
}

export default NavSection
