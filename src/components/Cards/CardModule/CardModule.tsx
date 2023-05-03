import { useContext } from "react"
import { SiteContext } from "../../../context/SiteContext"

const CardModule = ({ module, category }: any) => {
	const { setActiveModule, setActiveCategory, setActiveComponent } =
		useContext(SiteContext)
	return (
		<>
			<div className='card card-module'>
				<div className='card-body'>
					<h5 className='card-title'>{module.title}</h5>
					<p className='card-text'>{module.title}</p>
					<a
						onClick={() => {
							setActiveModule(module)
							setActiveCategory(category)
							setActiveComponent({
								title: module.title,
								component: module.component,
							})
						}}
						className='btn btn-primary'
					>
						View
					</a>
				</div>
			</div>
		</>
	)
}

export default CardModule
