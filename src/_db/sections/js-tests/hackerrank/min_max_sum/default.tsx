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
				miniMaxSum has the following parameter(s): arr: an array of 5
				integers
			</p>

			<h3>Print</h3>

			<p>
				Print two space-separated integers on one line: the minimum sum
				and the maximum sum of 4 of 5 elements.
			</p>

			<h3>Input Format</h3>

			<p>A single line of five space-separated integers.</p>

			<h3>Output Format</h3>
			<p>
				Print two space-separated long integers denoting the respective
				minimum and maximum values that can be calculated by summing
				exactly four of the five integers. (The output can be greater
				than a 32 bit integer.)
			</p>
			<h3>Sample Input</h3>

			<code>1 2 3 4 5</code>

			<h3>Sample Output</h3>

			<code>10 14</code>

			{loadedData.code01 ? (
				<AddCode data={loadedData.code01} height='200' />
			) : null}
		</>
	)
}

export default Default
