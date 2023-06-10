import { useContext } from "react"
import { SiteContext } from "../../context/SiteContext"
import CardCategory from "../../components/Cards/CardCategory/CardCategory"
import styles from "./styles.module.scss"

const SectionPage = () => {
	const { activeSection } = useContext(SiteContext)

	const isSingle = activeSection.categories?.length === 1 ? true : false
	return (
		<>
			<h2>SEC</h2>
			<div
				className={`${styles.row} ${styles.row__section} ${
					isSingle
						? styles.row__section__single
						: styles.row__section__multi
				}`}
			>
				{activeSection.categories?.map(
					(category: any, index: number) => (
						<CardCategory
							category={category}
							key={index}
							section={activeSection}
						/>
					)
				)}
			</div>
		</>
	)
}

export default SectionPage
