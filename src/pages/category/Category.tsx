import { useContext } from "react"
import { SiteContext } from "../../context/SiteContext"
import CardModule from "../../components/Cards/CardModule/CardModule"

const CategoryPage = () => {
	const { activeCategory } = useContext(SiteContext)

	return (
		<>
			<h2>CAT</h2>
			<div className='row row-category'>
				{activeCategory.modules?.map((module: any, index: number) => (
					<CardModule
						module={module}
						key={index}
						category={activeCategory}
					/>
				))}
			</div>
		</>
	)
}

export default CategoryPage
