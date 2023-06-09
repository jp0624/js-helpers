import { useState, useEffect } from "react"

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

function findCategory(
	categories: Category[],
	categoryName: string
): Category | undefined {
	return categories.find((cat) => cat.folder === categoryName)
}

function findModule(
	category: Category,
	moduleName: string
): Module | undefined {
	return category.modules.find((mod) => mod.folder === moduleName)
}

function fetchCategoryComponent(
	category: Category,
	setActiveComponent: any,
	setActiveCategory: any,
	setActiveModule: any
): Component {
	const defaultComponent: Component = {
		title: category.title || "Missing Title",
		component: category.component || "CategoryPage",
	}

	setActiveComponent(defaultComponent)
	console.warn("Fetched category:", defaultComponent)
	setActiveCategory(category)

	return defaultComponent
}

function fetchModuleComponent(
	module: Module,
	setActiveComponent: any,
	setActiveModule: any
): Component {
	const component: Component = {
		title: module.title,
		component: module.component,
	}

	setActiveComponent(component)
	console.warn("Fetched category:", component)
	setActiveModule(module)

	return component
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
			const category = findCategory(categories, params.categoryName)
			if (category) {
				const module = findModule(category, params.moduleName)

				if (module) {
					const component = fetchModuleComponent(
						module,
						setActiveComponent,
						setActiveModule
					)
					resolve(component)
				} else {
					const component = fetchCategoryComponent(
						category,
						setActiveComponent,
						setActiveCategory,
						setActiveModule
					)
					resolve(component)
				}
			} else {
				const defaultComponent: Component = {
					title: "Home Page",
					component: "HomePage",
				}
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
	const [fetching, setFetching] = useState(true)

	useEffect(() => {
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
				setFetching(false)
			} catch (error) {
				console.error(error)
			}
		}
		fetchComponent()
	}, [])

	if (fetching) {
		return <div>Fetching category...</div>
	}

	return <div>Category fetched!</div>
}

export default getActiveComponent
