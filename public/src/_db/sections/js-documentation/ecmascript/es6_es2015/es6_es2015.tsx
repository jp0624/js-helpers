import { useContext } from "react"
import FileImporter from "../../../../../helpers/FileImporter"
import { SiteContext } from "../../../../../context/SiteContext"
import AddCode from "../../../../../components/structure/AddCode/AddCode"

function Default() {
	const { currentHost } = useContext(SiteContext)
	let loadedData: any = {
		code01: FileImporter(
			`${currentHost}/src/_db/sections/js-documentation/ecmascript/es6_es2015/code_01.txt`
		),
	}
	return (
		<>
			<h4>New Features:</h4>
			<ul>
				<li>
					<strong>let and const:</strong> Block-scoped variables with
					let and constant variables with const.
				</li>
				<li>
					<strong>Arrow Functions:</strong> Shorter function syntax
					with implicit this binding.
				</li>
				<li>
					<strong>Classes:</strong> Simplified syntax for
					object-oriented programming.
				</li>
				<li>
					<strong>Template Literals:</strong> String interpolation and
					multiline strings.
				</li>
				<li>
					<strong>Destructuring Assignment:</strong> Easily extract
					values from objects and arrays.
				</li>
				<li>
					<strong>Default Parameters:</strong> Specifydefault values
					for function parameters.
				</li>
			</ul>
			{loadedData.code01 ? (
				<AddCode data={loadedData.code01} height='175' />
			) : null}
		</>
	)
}

export default Default
