import { useContext } from "react"
import { useParams } from "react-router"
import { SiteContext } from "../../../context/SiteContext"
import styles from "./styles.module.scss"
// Compoent List
// Global Pages
import HomePage from "../../../pages/home/Home"
import CategoryPage from "../../../pages/category/Category"
// Unique Pages
import BlockScope from "../../../content/sections/fundamentals/functions/block_scope/BlockScope"
import FunctionScope from "../../../content/sections/fundamentals/functions/function_scope/FunctionScope"
import OPBlockScope from "../../../content/sections/fundamentals/operators/op_block_scope/BlockScope"
import OPFunctionScope from "../../../content/sections/fundamentals/operators/op_function_scope/FunctionScope"

const Content = () => {
	const { activeComponent, setParams } = useContext(SiteContext)
	const components: any = {
		//Global
		HomePage: HomePage,
		CategoryPage: CategoryPage,
		//--Fundamentals Section
		//----Functions Category
		BlockScope: BlockScope,
		FunctionScope: FunctionScope,
		//----Operators Category
		OPBlockScope: OPBlockScope,
		OPFunctionScope: OPFunctionScope,
	}
	setParams(useParams())

	let Component = {
		title: activeComponent.title || "Home Page",
		component: activeComponent.component || "HomePage",
	}
	let DynamicComponent = components[Component.component]
	return (
		<>
			<article className={`${styles.article}, ${activeComponent.title}`}>
				<h1>{activeComponent.title}</h1>
				<section>{<DynamicComponent />}</section>
			</article>
		</>
	)
}

export default Content
