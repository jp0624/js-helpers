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
				There is a collection of input strings and a collection of query
				strings. For each query string, determine how many times it
				occurs in the list of input strings. Return an array of the
				results.
			</p>
			<p>
				Complete the function matchingStrings in the editor below. The
				function must return an array of integers representing the
				frequency of occurrence of each query string in strings.
			</p>
			<p>
				matchingStrings has the following parameters:
				<br />
				string strings[n] - an array of strings to search
				<br />
				string queries[q] - an array of query strings
			</p>

			<h3>Retruns</h3>

			<p>int[q]: an array of results for each query</p>

			<h3>Input Format</h3>

			<p>
				The first line contains and integer <em>n</em>, the size of{" "}
				<em>strings[]</em>.
				<br />
				Each of the next <em>n</em> lines contains a string{" "}
				<em>strings[i]</em>.
				<br />
				The next line contains <em>q</em>, the size of{" "}
				<em>queries[]</em>.
				<br />
				Each of the next <em>q</em> lines contains a string{" "}
				<em>queries[i]</em>.
			</p>

			{/* <h3>Output Format</h3> */}
			<p></p>
			<h3>Sample Input</h3>

			<code>
				4
				<br />
				aba
				<br />
				baba
				<br />
				aba
				<br />
				xzxb
				<br />
				3<br />
				aba
				<br />
				xzxb
				<br />
				ab
			</code>

			<h3>Sample Output</h3>

			<code>
				2<br />
				1<br />0
			</code>

			{loadedData.code01 ? (
				<AddCode data={loadedData.code01} height='500' />
			) : null}
		</>
	)
}

export default Default
