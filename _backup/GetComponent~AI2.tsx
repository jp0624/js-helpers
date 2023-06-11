interface Category {
	title?: string
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
	title?: string
	component?: string
}

interface ParamsInterface {
	[key: string]: string
}
interface ActiveComponentProps {
	categories?: Category[]
	params: ParamsInterface
}

function GetActiveComponent(
	categories: Category[],
	params: ParamsInterface,
	setActiveCategory: (component: Component) => void,
	setActiveModule: (component: Component) => void
): Promise<Component> {
	return new Promise((resolve, reject) => {
		try {
			const defaultComponent: Component = {
				title: "Home Page",
				component: "HomePage",
			}
			const category = categories.find(
				(cat: Category) => cat.folder === params.categoryName
			)
			if (category) {
				const module = category.modules.find(
					(mod: moduleInterface) => mod.folder === params.moduleName
				)

				if (module) {
					const component: Component = {
						title: module.title,
						component: module.component,
					}
					setActiveCategory(component)
					resolve(component)
				} else {
					const component: Component = {
						title: category.title,
						component: "CategoryPage",
					}
					setActiveModule(component)
					resolve(component)
				}
			} else {
				setActiveCategory(defaultComponent)
				setActiveModule(defaultComponent)
				resolve(defaultComponent)
			}
		} catch (err) {
			console.error(err)
			reject(err)
		}
	})
}

export default GetActiveComponent
