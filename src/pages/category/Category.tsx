import { useContext } from "react"
import { SiteContext } from "../../context/SiteContext"
import CardModule from "../../components/Cards/CardModule/CardModule"

const CategoryPage = ({ section }: any) => {
	const { activeCategory, activeSection } = useContext(SiteContext)

	return (
		<>
			<div className='row row-category'>
				{activeCategory.modules?.map((module: any, index: number) => (
					<CardModule
						section={activeSection}
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
