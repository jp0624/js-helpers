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
				Given a square matrix, calculate the absolute difference between
				the sums of its diagonals.
			</p>
			<p>For example, the square matrix is shown below:</p>
			<code>
				1 2 3<br />
				4 5 6<br />9 8 9
			</code>
			<p>
				diagonalDifference takes the following parameter:
				<br />
				int arr[n][m]: an array of integers
			</p>

			<h3>Return</h3>
			<p>int: the absolute diagonal difference</p>

			<h3>Input Format</h3>
			<p>
				The first line contains a single integer, <em>n</em>, the number
				of rows and columns in the square matrix <em>arr</em>. Each of
				the next <em>n</em> lines describes a row, <em>arr[i]</em>, and
				consists of space-separated integers <em>arr[i][i]</em>.
			</p>

			<h3>Ouput Format</h3>
			<p>
				Return the absolute difference between the sums of the matrix's
				two diagonals as a single integer.
			</p>

			<h3>Sample Input</h3>
			<code>
				3<br />
				11 2 4<br />
				4 5 6<br />
				10 8 -12
			</code>

			<h3>Sample Output</h3>
			<code>15</code>
			{loadedData.code01 ? (
				<AddCode data={loadedData.code01} height='500' />
			) : null}
		</>
	)
}

export default Default
