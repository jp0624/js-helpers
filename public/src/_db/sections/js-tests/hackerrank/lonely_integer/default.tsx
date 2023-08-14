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
				Given an array of integers, where all elements but one occur
				twice, find the unique element.
			</p>

			<h3>Example</h3>
			<code>a = [1,2,3,4,3,2,1]</code>
			<p>The unique element is 4.</p>

			<h3>Returns</h3>
			<p>int: the element that occurs only once</p>

			<h3>Input Format</h3>
			<p>
				The first line contains a single integer, <em>n</em>, the number
				of integers in the array. The second line contains <em>n</em>{" "}
				space-separated integers that describe the values in <em>a</em>.
			</p>

			{loadedData.code01 ? (
				<AddCode data={loadedData.code01} height='500' />
			) : null}
		</>
	)
}

export default Default
