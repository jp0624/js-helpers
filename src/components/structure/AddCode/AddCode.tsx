import { CopyBlock } from 'react-code-blocks'
import { FaCopy } from 'react-icons/fa'
import copy from 'copy-to-clipboard'

function twoArrays(k: number, A: number[], B: number[]) {
	let result = 'YES'
	console.log(A + ' ' + B)
	A = A.sort((a, b) => a - b)
	B = B.sort((a, b) => b - a)
	console.log(A + ' ' + B)

	A.map((data, index) => {
		console.log(A[index] + B[index])
		if (A[index] + B[index] < k) result = 'NO'
	})
	return result
}
console.log('-------------')
console.log('-------------')
console.log(twoArrays(10, [1, 2, 3], [7, 9, 8]))
console.log('-------------')
console.log(twoArrays(5, [1, 2, 2, 1], [3, 3, 3, 4]))

const AddCode = ({
	data = 'Content Missing',
	lang = 'javascript',
	height = '250',
}: any) => {
	return (
		<CopyBlock
			text={data}
			language={lang}
			showLineNumbers={true}
			codeBlock
			onCopy={() => copy(data)}
			customStyle={{
				height: `${height}px`,
				overflowY: 'scroll',
				borderRadius: '5px',
				boxShadow: '1px 1px 5px rgba(0,0,0,0.25)',
				fontSize: '1rem',
				margin: '1rem 2rem',
			}}
		/>
	)
}

export default AddCode
