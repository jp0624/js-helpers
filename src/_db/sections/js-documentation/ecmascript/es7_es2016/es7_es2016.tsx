import { useContext } from "react"
import FileImporter from "../../../../../helpers/FileImporter"
import { SiteContext } from "../../../../../context/SiteContext"
import AddCode from "../../../../../components/structure/AddCode/AddCode"

function Default() {
	const { currentHost } = useContext(SiteContext)
	let loadedData: any = {
		code01: FileImporter(
			`${currentHost}/src/_db/sections/js-documentation/ecmascript/es7_es2016/code_01.txt`
		),
	}
	return (
		<>
			<p>
				<h4>New Features:</h4>
				<ul>
					<li>
						<strong>Array.includes():</strong> Check if an array
						contains a specific element.
					</li>
					<li>
						<strong>Exponentiation Operator:</strong> Simplifies
						exponentiation calculations.
					</li>
				</ul>
			</p>
			{loadedData.code01 ? (
				<AddCode data={loadedData.code01} height='300' />
			) : null}
		</>
	)
}

export default Default
