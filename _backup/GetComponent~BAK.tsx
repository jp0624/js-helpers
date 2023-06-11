import { useContext } from "react"
import { SiteContext } from "../context/SiteContext"

interface Category {
	title: string
	folder: string
	modules: moduleInterface[]
}

interface moduleInterface {
	component?: string
	folder: string
	keywords?: string[]
	title: string
}

interface Component {
	title: string
	component?: string
}

interface ParamsInterface {}

function ComponentFetcher(
	categories: Category[],
	params: any
): Promise<Component> {
	const { setActiveCategory, setActiveModule } = useContext(SiteContext)
	return new Promise((resolve, reject) => {
		try {
			const defaultComponent: Component = {
				title: "Home Page",
				component: "HomePage",
			}
			const category = categories.find(
				(cat) => cat.folder === params.categoryName
			)
			if (category) {
				setActiveCategory(category)
				const module = category.modules.find(
					(mod) => mod.folder === params.moduleName
				)

				if (module) {
					setActiveModule(module)
					const component: Component = {
						title: module.title,
						component: module.component,
					}
					resolve(component)
				} else if (category) {
					const component: Component = {
						title: category.title,
						component: "CategoryPage",
					}
					resolve(component)
				}
			} else {
				resolve(defaultComponent)
			}
		} catch (err) {
			console.error(err)
		}
	})
}

function getActiveComponent(categories: any, params: any) {
	const fetchComponent = async () => {
		try {
			const component = await ComponentFetcher(categories, params)
			console.log("Fetched category:", component)
			return component
		} catch (error) {
			console.error(error)
		}
	}

	return fetchComponent()
}

export default getActiveComponent
