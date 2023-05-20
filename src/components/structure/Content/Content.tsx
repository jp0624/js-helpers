import { useContext } from "react"
import { SiteContext } from "../../../context/SiteContext"
import BlockScope from "../../../content/sections/fundamentals/functions/block_scope/BlockScope"
import FunctionScope from "../../../content/sections/fundamentals/functions/function_scope/FunctionScope"
import OPBlockScope from "../../../content/sections/fundamentals/operators/op_block_scope/BlockScope"
import OPFunctionScope from "../../../content/sections/fundamentals/operators/op_function_scope/FunctionScope"
import HomePage from "../../../pages/home/Home"
import CategoryPage from "../../../pages/category/Category"
import { useParams } from "react-router"
import styles from "./styles.module.scss"

const Content = () => {
	//path='/cat/:categoryName/mod/:moduleName'
	const params = useParams()
	const {
		categories,
		activeComponent,
		setActiveComponent,
		setActiveCategory,
		setActiveModule,
	} = useContext(SiteContext)
	const components: any = {
		//Main Page
		HomePage: HomePage,
		CategoryPage: CategoryPage,
		//Fundamentals Section
		//Functions Category
		BlockScope: BlockScope,
		FunctionScope: FunctionScope,
		//Operators Category
		OPBlockScope: OPBlockScope,
		OPFunctionScope: OPFunctionScope,
	}

	let Component = { title: "", component: "" }

	if (
		!!params &&
		!!categories.length &&
		(!!params.categoryName || !!params.moduleName) &&
		activeComponent.component === "HomePage"
	) {
		if (!!params.categoryName) {
			const curCategory = categories.find(
				(cat) => cat.folder === params.categoryName
			)
			setActiveCategory(curCategory)
			Component = {
				title: curCategory!.title,
				component: "CategoryPage",
			}

			if (!!params.moduleName && !!curCategory && !!curCategory.modules) {
				const curModule = curCategory.modules.find(
					(mod) => mod.folder === params.moduleName
				)
				if (curModule?.component) {
					Component = {
						title: curModule!.title,
						component: curModule!.component,
					}
				}
				setActiveModule(curModule)
			}
		}

		setActiveComponent(Component)
	}

	if (!!activeComponent.component && !!activeComponent.title) {
		Component = {
			title: activeComponent.title,
			component: activeComponent.component,
		}
	} else {
		Component = { title: "Home Page", component: "HomePage" }
		setActiveComponent(Component)
	}

	let DynamicComponent = components[Component.component]
	return (
		<>
			<article className={[styles.article, activeComponent.title]}>
				<h1>{activeComponent.title}</h1>
				<section>{<DynamicComponent />}</section>
			</article>
		</>
	)
}

export default Content
