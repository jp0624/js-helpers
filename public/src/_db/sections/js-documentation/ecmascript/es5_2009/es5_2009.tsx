import { useContext } from "react"
import FileImporter from "../../../../../helpers/FileImporter"
import { SiteContext } from "../../../../../context/SiteContext"
import AddCode from "../../../../../components/structure/AddCode/AddCode"

function Default() {
	const { currentHost } = useContext(SiteContext)
	let loadedData: any = {
		code01: FileImporter(
			`${currentHost}/src/_db/sections/js-documentation/ecmascript/es5_2009/code_01.txt`
		),
	}
	return (
		<>
			<h4>New Features:</h4>
			<ul>
				<li>
					<strong>Strict Mode:</strong> Provides a stricter syntax and
					error handling. JSON
				</li>
				<li>
					<strong>Support:</strong> Built-in support for parsing and
					serializing JSON data.
				</li>
				<li>
					<strong>Array Iteration Methods:</strong> forEach(), map(),
					filter(), etc.
				</li>
			</ul>
			{loadedData.code01 ? (
				<AddCode data={loadedData.code01} height='150' />
			) : null}
		</>
	)
}

export default Default
