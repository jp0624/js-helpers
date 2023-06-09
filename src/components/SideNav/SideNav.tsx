import { useContext } from "react"
import { SiteContext } from "../../context/SiteContext"
import styles from "./styles.module.scss"
import NavSection from "./NavSection/NavSection"

const SideNav = () => {
	const { siteData } = useContext(SiteContext)
	if (siteData.length > 0) {
		return (
			<>
				<aside className={styles.sideNav}>
					<ul className={styles.sideNav__category}>
						{siteData.map((section: any, index: number) => (
							// <NavCategory category={category} key={index} />
							<NavSection section={section} key={index} />
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
