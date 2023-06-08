import FileImporter from "../../../../../helpers/FileImporter"
import AddCode from "../../../../../components/structure/AddCode/AddCode"
import code01 from "./code_01.txt"

function Default() {
	let loadedData: any = {
		code01: FileImporter(code01),
	}
	return (
		<>
			<h4>Function Description</h4>

			<p>
				Write a function to detect is a number is within the fibonacci
				sequence
			</p>

			{loadedData.code01 ? (
				<AddCode data={loadedData.code01} height='500' />
			) : null}
		</>
	)
}

export default Default
