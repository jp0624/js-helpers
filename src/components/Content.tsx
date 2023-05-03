import { useContext } from "react"
import { SiteContext } from "../context/SiteContext"
import BlockScope from "../content/functions/block_scope/BlockScope"
import FunctionScope from "../content/functions/function_scope/FunctionScope"
import HomePage from "../content/home/Home"
import CategoryPage from "../content/category/Category"

const Content = () => {
	const {
		activeComponent,
		activeCategory,
		activeModule,
		setActiveComponent,
	} = useContext(SiteContext)
	const components: any = {
		HomePage: HomePage,
		BlockScope: BlockScope,
		FunctionScope: FunctionScope,
		CategoryPage: CategoryPage,
	}

	let Component = { title: "Home", component: "HomePage" }
	if (!!activeComponent.component && !!activeComponent.title) {
		Component = {
			title: activeComponent.title,
			component: activeComponent.component,
		}
	} else {
		setActiveComponent(Component)
	}

	let DynamicComponent = components[Component.component]
	console.log("-----")
	console.log("Component: ", Component)
	console.log("activeCategory: ", activeCategory)
	console.log("activeModule: ", activeModule)
	console.log("-----")

	return (
		<>
			<article>
				<h1>{activeComponent.title}</h1>
				<section>{<DynamicComponent />}</section>
			</article>
		</>
	)
}

export default Content
