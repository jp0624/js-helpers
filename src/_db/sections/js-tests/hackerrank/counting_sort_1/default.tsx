import FileImporter from '../../../../../helpers/FileImporter'
import AddCode from '../../../../../components/structure/AddCode/AddCode'
import code01 from './code_01.txt'

function Default() {
	let loadedData: any = {
		code01: FileImporter(code01),
	}
	return (
		<>
			<h4>Counting Sort 1</h4>
			<p>
				Quicksort usually has a running time of , but is there an algorithm that
				can sort even faster? In general, this is not possible. Most sorting
				algorithms are comparison sorts, i.e. they sort a list just by comparing
				the elements to one another. A comparison sort algorithm cannot beat
				(worst-case) running time, since represents the minimum number of
				comparisons needed to know where to place each element. For more
				details, you can see these notes (PDF).
			</p>
			<h3>Alternative Sorting</h3>
			<p>
				Another sorting method, the counting sort, does not require comparison.
				Instead, you create an integer array whose index range covers the entire
				range of values in your array to sort. Each time a value occurs in the
				original array, you increment the counter at that index. At the end, run
				through your counting array, printing the value of each non-zero valued
				index that number of times.
			</p>
			<h3>Example</h3>
			<p>
				All of the values are in the range , so create an array of zeros, . The
				results of each iteration follow:
			</p>
			<code>
				i arr[i] result
				<br />
				0 1 [0, 1, 0, 0]
				<br />
				1 1 [0, 2, 0, 0]
				<br />
				2 3 [0, 2, 0, 1]
				<br />
				3 2 [0, 2, 1, 1]
				<br />
				4 1 [0, 3, 1, 1]
				<br />
			</code>
			<p>
				The frequency array is . These values can be used to create the sorted
				array as well: .
			</p>
			<h3>Note</h3>
			<p>
				For this exercise, always return a frequency array with 100 elements.
				The example above shows only the first 4 elements, the remainder being
				zeros.
			</p>
			<h3>Challenge</h3>
			<p>
				Given a list of integers, count and return the number of times each
				value appears as an array of integers.
			</p>
			<h3>Function Description</h3>
			<p>Complete the countingSort function in the editor below.</p>
			<p>countingSort has the following parameter(s):</p>
			<code>arr[n]: an array of integers</code>
			<h3>Returns</h3>
			<code>int[100]: a frequency array</code>
			<h3>Input Format</h3>
			<p>
				The first line contains an integer , the number of items in .<br />
				Each of the next lines contains an integer where .
			</p>
			<h3>Constraints</h3>
			<h3>Sample Input</h3>
			<code>
				100
				<br />
				63 25 73 1 98 73 56 84 86 57 16 83 8 25 81 56 9 53 98 67 99 12 83 89 80
				91 39 86 76 85 74 39 25 90 59 10 94 32 44 3 89 30 27 79 46 96 27 32 18
				21 92 69 81 40 40 34 68 78 24 87 42 69 23 41 78 22 6 90 99 89 50 30 20 1
				43 3 70 95 33 46 44 9 69 48 33 60 65 16 82 67 61 32 21 79 75 75 13 87 70
				33
			</code>
			<h3>Sample Output</h3>
			<code>
				0 2 0 2 0 0 1 0 1 2 1 0 1 1 0 0 2 0 1 0 1 2 1 1 1 3 0 2 0 0 2 0 3 3 1 0
				0 0 0 2 2 1 1 1 2 0 2 0 1 0 1 0 0 1 0 0 2 1 0 1 1 1 0 1 0 1 0 2 1 3 2 0
				0 2 1 2 1 0 2 2 1 2 1 2 1 1 2 2 0 3 2 1 1 0 1 1 1 0 2 2{' '}
			</code>
			<h3>Explanation</h3>
			<p>
				Each of the resulting values represents the number of times appeared in
				.
			</p>
			{loadedData.code01 ? (
				<AddCode data={loadedData.code01} height='500' />
			) : null}
		</>
	)
}

export default Default
