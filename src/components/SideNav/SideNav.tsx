import { useContext } from "react"
import { SiteContext } from "../../context/SiteContext"
import styles from "./styles.module.scss"
import NavCategory from "./NavCategory/NavCategory"

const SideNav = () => {
	const {
		categories,
		setActiveCategory,
		setActiveModule,
		setActiveComponent,
	} = useContext(SiteContext)

	if (categories.length > 0) {
		return (
			<>
				<aside className='sideNav'>
					<ul>
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
