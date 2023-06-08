import { useContext, useEffect } from "react"
import { useParams } from "react-router"
import { SiteContext } from "../../../context/SiteContext"
import styles from "./styles.module.scss"
// Compoent List
// Global Pages
import HomePage from "../../../pages/home/Home"
import CategoryPage from "../../../pages/category/Category"
// functions and scope
import BlockScope from "../../../_db/sections/fundamentals/functions/block_scope/BlockScope"
import FunctionScope from "../../../_db/sections/fundamentals/functions/function_scope/FunctionScope"
//operators
import OPBlockScope from "../../../_db/sections/fundamentals/operators/op_block_scope/BlockScope"
import OPFunctionScope from "../../../_db/sections/fundamentals/operators/op_function_scope/FunctionScope"
// ecmascript
import es5_2009 from "../../../_db/sections/js-documentation/ecmascript/es5_2009/es5_2009"
import es6_es2015 from "../../../_db/sections/js-documentation/ecmascript/es6_es2015/es6_es2015"
import es7_es2016 from "../../../_db/sections/js-documentation/ecmascript/es7_es2016/es7_es2016"
import es8_es2017 from "../../../_db/sections/js-documentation/ecmascript/es8_es2017/es8_es2017"
import es9_es2018 from "../../../_db/sections/js-documentation/ecmascript/es9_es2018/es9_es2018"
import es10_es2019 from "../../../_db/sections/js-documentation/ecmascript/es10_es2019/es10_es2019"
// js tests
import time_conversion from "../../../_db/sections/js-tests/hackerrank/time_conversion/default"
import plus_minus from "../../../_db/sections/js-tests/hackerrank/plus_minus/default"
import min_max_sum from "../../../_db/sections/js-tests/hackerrank/min_max_sum/default"
import sparse_arrays from "../../../_db/sections/js-tests/hackerrank/sparse_arrays/default"
import fibonacci_sequence from "../../../_db/sections/js-tests/hackerrank/fibonacci_sequence/default"

const Content = () => {
	const { activeComponent, setParams } = useContext(SiteContext)
	setParams(useParams())
	const components: any = {
		//Global
		HomePage,
		CategoryPage,
		//--Fundamentals Section
		//----Functions Category
		BlockScope,
		FunctionScope,
		//----Operators Category
		OPBlockScope,
		OPFunctionScope,
		//--JS Documentation
		//----ECMAScript Category
		es5_2009,
		es6_es2015,
		es7_es2016,
		es8_es2017,
		es9_es2018,
		es10_es2019,
		//--JS Tests
		//----Hacker Rank
		time_conversion,
		plus_minus,
		min_max_sum,
		sparse_arrays,
		fibonacci_sequence,
	}

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
