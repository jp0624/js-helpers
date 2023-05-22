import { useContext } from "react"
import { SiteContext } from "../../../context/SiteContext"
import CardModule from "../CardModule/CardModule"
import { NavLink } from "react-router-dom"

const CardCategory = ({ category }: any) => {
	const { setActiveCategory, setActiveComponent, setActiveModule } =
		useContext(SiteContext)
	return (
		<>
			<div className='card card-category'>
				<div className='card-body'>
					<NavLink
						to={`/cat/${category.folder}/}`}
						className={`card-heading`}
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
					</NavLink>
				</div>
				<p>{category.description}</p>
				<div className='row'>
					{category.modules?.map((module: any, index: number) => (
						<CardModule
							category={category}
							module={module}
							key={index}
						/>
					))}
				</div>
			</div>
		</>
	)
}

export default CardCategory
