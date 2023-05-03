import NavModule from "../NavModule/NavModule"
import { useContext } from "react"
import { SiteContext } from "../../../context/SiteContext"

const NavCategory = ({ category }: any) => {
	const {
		activeCategory,
		setActiveCategory,
		setActiveComponent,
		setActiveModule,
	} = useContext(SiteContext)

	console.log("category: ", category)
	return (
		<>
			<li
				className={
					category.title === activeCategory.title ? "active" : ""
				}
			>
				<h3
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
					{category.title === activeCategory.title && "*"}
					{category.title}
				</h3>
				<ul className={"subNav"}>
					{category.modules.map((module: any, index: number) => (
						<NavModule
							module={module}
							category={category}
							key={index}
						/>
					))}
				</ul>
			</li>
		</>
	)
}

export default NavCategory
