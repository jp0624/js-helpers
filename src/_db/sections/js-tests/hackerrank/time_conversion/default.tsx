import FileImporter from '../../../../../helpers/FileImporter'
import AddCode from '../../../../../components/structure/AddCode/AddCode'
import code01 from './code_01.txt'

function Default() {
	let loadedData: any = {
		code01: FileImporter(code01),
	}
	function timeConversion(s: string): string {
		const isPM = s.includes('PM')
		const timeParts = s.slice(0, -2).split(':')
		let hours = parseInt(timeParts[0], 10)

		if (isPM && hours < 12) {
			hours += 12
		} else if (!isPM && hours === 12) {
			hours = 0
		}

		const hoursString = hours.toString().padStart(2, '0')
		const formattedTime = `${hoursString}:${timeParts[1]}:${timeParts[2]}`

		return formattedTime
	}
	return (
		<>
			<h4>Function Description</h4>

			<p>
				Complete the timeConversion function in the editor below. It should
				return a new string representing the input time in 24 hour format.
			</p>

			<p>timeConversion has the following parameter(s):</p>

			<p>string s: a time in hour format</p>

			<h3>Returns</h3>

			<p>string: the time in hour format</p>

			<h3>Input Format</h3>

			<p>
				A single string that represents a time in -hour clock format (i.e.: or
				).
			</p>

			<h3>Constraints</h3>

			<p>All input times are valid</p>

			<h3>Sample Input</h3>

			<code>07:05:45PM</code>

			<h3>Sample Output</h3>

			<code>19:05:45</code>

			{loadedData.code01 ? (
				<AddCode data={loadedData.code01} height='500' />
			) : null}
			<code>timeConversion(07:05:45PM)</code>
			<code>{timeConversion('07:05:45PM')}</code>
		</>
	)
}

export default Default
