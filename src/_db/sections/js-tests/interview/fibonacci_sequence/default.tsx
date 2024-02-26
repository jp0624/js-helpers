import FileImporter from '../../../../../helpers/FileImporter'
import AddCode from '../../../../../components/structure/AddCode/AddCode'
import code01 from './code_01.txt'
import code02 from './code_02.txt'

function Default() {
	let loadedData: any = {
		code01: FileImporter(code01),
		code02: FileImporter(code02),
	}
	return (
		<>
			<h4>Function Description</h4>

			<p>
				Write a function to detect is a number is within the fibonacci sequence
			</p>
			<h3>Sample Input</h3>

			<code>24</code>

			{loadedData.code01 ? (
				<AddCode data={loadedData.code01} height='300' />
			) : null}
			<p>Write a function to get value of n in fibonacci sequence</p>
			<h3>Sample Input</h3>

			<code>24</code>

			{loadedData.code02 ? (
				<AddCode data={loadedData.code02} height='500' />
			) : null}
		</>
	)
}

export default Default
