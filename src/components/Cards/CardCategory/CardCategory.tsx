import { useContext } from "react"
import { SiteContext } from "../../../context/SiteContext"
import CardModule from "../CardModule/CardModule"

const CardCategory = ({ category }: any) => {
	const { setActiveCategory, setActiveComponent, setActiveModule } =
		useContext(SiteContext)
	return (
		<>
			<div className='card card-category'>
				<div className='card-body'>
					<div
						onClick={() => {
							setActiveCategory(category)
							setActiveComponent({
								title: category.title,
								component: "CategoryPage",
							})
							setActiveModule({
								folder: "",
								title: "",
							})
						}}
					>
						<h5 className='card-title'>{category.title}</h5>
					</div>
					<div className='row'>
						{category.modules?.map((module: any, index: number) => (
							<div className='col-sm-4 mb-6 mb-sm-0'>
								<CardModule
									category={category}
									module={module}
									key={index}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	)
}

export default CardCategory
