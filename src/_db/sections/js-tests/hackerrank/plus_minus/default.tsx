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
				Given an array of integers, calculate the ratios of its elements
				that are positive, negative, and zero. Print the decimal value
				of each fraction on a new line with 6 places after the decimal.
			</p>
			<p>
				Note: This challenge introduces precision problems. The test
				cases are scaled to six decimal places, though answers with
				absolute error of up to 10<sup>-4</sup> are acceptable.
			</p>
			<p>plusMinus has the following parameter(s):</p>
			<p>int arr[n]: an array of integers</p>

			<h3>Print</h3>

			<p>
				Print the ratios of positive, negative and zero values in the
				array. Each value should be printed on a separate line with 6
				digits after the decimal. The function should not return a
				value.
			</p>

			<h3>Input Format</h3>

			<p>
				The first line contains an integer, , the size of the array. The
				second line contains space-separated integers that describe .
			</p>

			<h3>Constraints</h3>
			<p></p>
			<h3>Sample Input</h3>

			<code>
				STDIN Function
				<br />
				----- --------
				<br />
				6 arr[] size n = 6<br />
				-4 3 -9 0 4 1 arr = [-4, 3, -9, 0, 4, 1]
			</code>

			<h3>Sample Output</h3>

			<code>
				0.500000
				<br />
				0.333333
				<br />
				0.166667
			</code>

			{loadedData.code01 ? (
				<AddCode data={loadedData.code01} height='500' />
			) : null}
		</>
	)
}

export default Default
