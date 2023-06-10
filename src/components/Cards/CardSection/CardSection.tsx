import { useContext } from "react"
import { SiteContext } from "../../../context/SiteContext"
import CardCategory from "../CardCategory/CardCategory"
import { NavLink } from "react-router-dom"
import styles from "./styles.module.scss"

const CardSection = ({ module, category, section }: any) => {
	const { setActiveModule, setActiveCategory, setActiveComponent } =
		useContext(SiteContext)
	return (
		<>
			<div className={``}>
				{section?.categories.map((category: any, index: number) => (
					<CardCategory
						section={section}
						category={category}
						key={index}
					/>
				))}
			</div>
		</>
	)
}

export default CardSection
