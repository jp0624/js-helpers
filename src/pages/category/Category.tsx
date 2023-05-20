import { useContext } from "react"
import { SiteContext } from "../../context/SiteContext"
import CardModule from "../../components/Cards/CardModule/CardModule"

const CategoryPage = () => {
	const { activeCategory } = useContext(SiteContext)

	return (
		<>
			<div className='row'>
				{activeCategory.modules?.map((module: any, index: number) => (
					<div className='col-sm-4 mb-6 mb-sm-0' key={Math.random()}>
						<CardModule
							module={module}
							key={index}
							category={activeCategory}
						/>
					</div>
				))}
			</div>
		</>
	)
}

export default CategoryPage
