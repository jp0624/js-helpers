import { useContext } from "react"
import FileImporter from "../../../../../helpers/FileImporter"
import { SiteContext } from "../../../../../context/SiteContext"
import AddCode from "../../../../../components/structure/AddCode/AddCode"

function Default() {
	const { currentHost } = useContext(SiteContext)
	let loadedData: any = {
		code01: FileImporter(
			`${currentHost}/src/_db/sections/js-documentation/ecmascript/es8_es2017/code_01.txt`
		),
	}
	return (
		<>
			<p>
				<h4>New Features:</h4>
				<ul>
					<li>
						<strong>Async Functions:</strong> Simplifies
						asynchronous programming with async/await syntax.
					</li>
					<li>
						<strong>Object.entries():</strong> Returns an array of
						key-value pairs from an object.
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
