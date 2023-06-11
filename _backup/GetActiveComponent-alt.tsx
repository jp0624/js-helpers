import { useEffect } from "react"
import { useParams } from "react-router"

interface Category {
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
	component: string
}

const categories: Category[] = [
	{
		folder: "category1",
		modules: [
			{
				folder: "module1",
				title: "Module 1",
				component: "Module1Component",
			},
			{
				folder: "module2",
				title: "Module 2",
				component: "Module2Component",
			},
		],
	},
	{
		folder: "category2",
		modules: [
			{
				folder: "module3",
				title: "Module 3",
				component: "Module3Component",
			},
		],
	},
	{
		folder: "category3",
		modules: [],
	},
]

function findComponent(
	categoryName: string,
	moduleName: string
): Promise<Component> {
	return new Promise<Component>((resolve) => {
		const defaultComponent: Component = {
			title: "Home Page",
			component: "HomePage",
		}

		const category = categories.find((cat) => cat.folder === categoryName)

		if (category) {
			const module = category.modules.find(
				(mod) => mod.folder === moduleName
			)

			if (module) {
				const component: Component = {
					title: module.title,
					component: "CategoryPage",
				}
				resolve(component)
			} else {
				const component: Component = {
					title: "",
					component: "CategoryPage",
				}
				resolve(component)
			}
		} else {
			resolve(defaultComponent)
		}
	})
}

function App() {
	const params = useParams<{ categoryName?: string; moduleName?: string }>()

	useEffect(() => {
		async function loadComponent() {
			try {
				const component = await findComponent(
					params.categoryName || "",
					params.moduleName || ""
				)
				console.log("Component:", component)
				// Do something with the component, such as rendering it
			} catch (error) {
				console.error(error)
			}
		}

		loadComponent()
	}, [params.categoryName, params.moduleName])

	return null // You can render your actual component here
}

async function ParentComponent() {
	const component = await findComponent("category1", "module2")
	console.log("Parent Component - Component:", component)
	// Do something with the component
}

export default App
