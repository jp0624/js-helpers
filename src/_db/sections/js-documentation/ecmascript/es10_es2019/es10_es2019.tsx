import { useContext } from "react"
import FileImporter from "../../../../../helpers/FileImporter"
import { SiteContext } from "../../../../../context/SiteContext"
import AddCode from "../../../../../components/structure/AddCode/AddCode"

function Default() {
	const { currentHost } = useContext(SiteContext)
	let loadedData: any = {
		code01: FileImporter(
			`${currentHost}/src/_db/sections/js-documentation/ecmascript/es10_es2019/code_01.txt`
		),
	}
	return (
		<>
			<h4>New Features:</h4>
			<ul>
				<li>
					<strong>Optional Catch Binding:</strong> Allows omission of
					the catch parameter in try-catch blocks.
				</li>
				<li>
					<strong>Array.flat() and Array.flatMap():</strong> Flatten
					and manipulate arrays more easily.
				</li>
			</ul>
			{loadedData.code01 ? (
				<AddCode data={loadedData.code01} height='300' />
			) : null}
		</>
	)
}

export default Default
