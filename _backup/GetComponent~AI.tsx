import { useEffect, useContext } from "react"
import { SiteContext } from "../context/SiteContext"

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

const GetComponentWrapper = ({ categories }: { categories: Category[] }) => {
	const { setActiveComponent, params } = useContext(SiteContext)

	useEffect(() => {
		const GetComponent = async () => {
			try {
				const fetchComponent = async () => {
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

							if (module) {
								const component: Component = {
									title: module.title,
									component: module.component,
								}
								setActiveComponent(component)
							} else if (category) {
								const component: Component = {
									title: category.title || "missing title",
									component: "CategoryPage",
								}
								setActiveComponent(component)
							}
						} else {
							setActiveComponent(defaultComponent)
						}
					} catch (err) {
						console.error(err)
					}
				}

				fetchComponent()
			} catch (error) {
				console.error(error)
			}
		}

		GetComponent()
	}, [categories, params, setActiveComponent])

	return null
}

export default GetComponentWrapper
