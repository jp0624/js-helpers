import { useContext } from "react"
import { SiteContext } from "../../context/SiteContext"
import CardCategory from "../../components/Cards/CardCategory/CardCategory"
import CardModule from "../../components/Cards/CardModule/CardModule"

const HomePage = () => {
	const { categories } = useContext(SiteContext)

	return (
		<>
			{categories.map((category: any, index: number) => (
				<CardCategory category={category} key={Math.random()} />
			))}
		</>
	)
}

export default HomePage
