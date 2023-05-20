import { useContext } from "react"
import { SiteContext } from "../../context/SiteContext"
import styles from "./styles.module.scss"
import NavCategory from "./NavCategory/NavCategory"

const SideNav = () => {
	const { categories } = useContext(SiteContext)

	if (categories.length > 0) {
		return (
			<>
				<aside className={styles.sideNav}>
					<ul className={styles.sideNav__category}>
						{categories.map((category: any, index: number) => (
							<NavCategory category={category} key={index} />
						))}
					</ul>
				</aside>
			</>
		)
	} else {
		return <aside>Loading...</aside>
	}
}

export default SideNav
