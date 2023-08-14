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
				You will be given a list of 32 bit unsigned integers. Flip all
				the bits (1 to 0 and 0 to 1) and return the result as an
				unsigned integer.
			</p>

			<h3>Example</h3>
			<code>
				00000000000000000000000000000011 turns into
				11111111111111111111111111111100
			</code>
			<p>The result is 4294967292.</p>

			<h3>Sample Input</h3>
			<code>
				3 <br />
				2147483647 <br />
				1 <br />0
			</code>

			<h3>Sample Ouput</h3>
			<code>
				2147483648 <br />
				4294967294 <br />
				4294967295
			</code>

			<h3>Explanation</h3>
			<p>
				Take 1 for example, as unsigned 32-bits is
				00000000000000000000000000000001 and doing the flipping we get
				11111111111111111111111111111110 which in turn is 4294967294.
			</p>
			{loadedData.code01 ? (
				<AddCode data={loadedData.code01} height='500' />
			) : null}
		</>
	)
}

export default Default
