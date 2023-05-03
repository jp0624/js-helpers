import { useState, useEffect } from "react"

function FileImporter(url: string) {
	const [result, setResult] = useState("")

	useEffect(() => {
		async function fetchFile(url: string) {
			try {
				const response = await fetch(url)
				const content = await response.text()
				setResult(content)
			} catch (error) {
				console.error(`Failed to fetch ${url}: ${error}`)
			}
		}

		fetchFile(url)
	}, [url])

	return result
}

export default FileImporter
