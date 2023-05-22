interface Category {
	title?: string
	folder: string
	component?: string
	modules: Module[]
}

interface Module {
	component?: string
	folder: string
	keywords?: string[]
	title: string
}

interface Component {
	title?: string
	component?: string
}

interface Params {
	[key: string]: string
}

function ComponentFetcher(
	categories: Category[],
	params: Params,
	setActiveComponent: any,
	setActiveCategory: any,
	setActiveModule: any
): Promise<Component> {
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
				const module = category.modules.find(
					(mod) => mod.folder === params.moduleName
				)
				setActiveCategory(category)

				if (module) {
					const component: Component = {
						title: module.title,
						component: module.component,
					}
					setActiveModule(module)
					setActiveComponent(component)
					console.warn("Fetched category:", component)
					resolve(component)
				} else {
					const component: Component = {
						title: category.title || "Missing Title",
						component: category.component || "CategoryPage",
					}
					setActiveComponent(component)
					console.warn("Fetched category:", component)
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

function getActiveComponent(
	categories: Category[],
	params: Params,
	setActiveComponent: any,
	setActiveCategory: any,
	setActiveModule: any
): React.ReactElement {
	const fetchComponent = async (): Promise<void> => {
		try {
			const component = await ComponentFetcher(
				categories,
				params,
				setActiveComponent,
				setActiveCategory,
				setActiveModule
			)
			console.log("Fetched category:", component)
		} catch (error) {
			console.error(error)
		}
	}
	fetchComponent()
	return <div>Fetching category...</div>
}

export default getActiveComponent
