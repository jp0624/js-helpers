import { useContext } from "react"
import { SiteContext } from "../../../context/SiteContext"
import CardModule from "../../Cards/CardModule/CardModule"
import { NavLink } from "react-router-dom"

const PanelSection = ({ category }: any) => {
	const { setActiveCategory, setActiveComponent, setActiveModule } =
		useContext(SiteContext)
	return (
		<>
			<div className='panel panel-section'>
				<div className='panel-body'>
					<NavLink
						to={`/${category.folder}`}
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
						<h5 className='panel-title'>{category.title}</h5>
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

export default PanelSection
