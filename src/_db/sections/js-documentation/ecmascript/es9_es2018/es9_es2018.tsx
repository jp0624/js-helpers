import { useContext } from "react"
import FileImporter from "../../../../../helpers/FileImporter"
import { SiteContext } from "../../../../../context/SiteContext"
import AddCode from "../../../../../components/structure/AddCode/AddCode"

function Default() {
	const { currentHost } = useContext(SiteContext)
	let loadedData: any = {
		code01: FileImporter(
			`${currentHost}/src/_db/sections/js-documentation/ecmascript/es9_es2018/code_01.txt`
		),
	}
	return (
		<>
			<p>
				<h4>New Features:</h4>
				<ul>
					<li>
						<strong>Rest/Spread Properties:</strong> Allows
						spreading of object properties and gathering them into a
						new object.
					</li>
					<li>
						<strong>Asynchronous Iteration:</strong> Provides a
						simpler way to iterate over asynchronous data.
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
