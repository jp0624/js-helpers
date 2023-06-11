async function detectDuplicates() {
	try {
		// Fetch the JSON data from the specified URL
		const response = await fetch("/src/sandbox/data.json")

		// Check if the response is successful
		if (!response.ok) {
			throw new Error("Failed to fetch data. Status: " + response.status)
		}

		// Parse the response JSON data
		const data = await response.json()

		// Validate the data format
		if (
			!data ||
			!data.idinaResponse ||
			!data.idinaResponse.sources ||
			!Array.isArray(data.idinaResponse.sources)
		) {
			throw new Error("Invalid data format")
		}

		// Extract the sources array from the data
		const { sources } = data.idinaResponse

		// Create maps to store duplicate spam scores and domain authorities
		const spamMap = {}
		const domainMap = {}

		// Iterate over each source
		sources.forEach(({ spamScore, domainAuthority, url }) => {
			// Store the URLs with the same spam score together
			spamMap[spamScore] = [...(spamMap[spamScore] || []), url]

			// Store the URLs with the same domain authority together
			domainMap[domainAuthority] = [
				...(domainMap[domainAuthority] || []),
				url,
			]
		})

		// Extract duplicate spam scores from the spamMap
		const duplicateSpamScores = Object.values(spamMap).flatMap((urls) =>
			urls.length > 1 ? urls : []
		)

		// Extract duplicate domain authorities from the domainMap
		const duplicateDomainAuthorities = Object.values(domainMap).flatMap(
			(urls) => (urls.length > 1 ? urls : [])
		)

		// Create the result object
		const result = {
			duplicateSpamScores,
			duplicateDomainAuthorities,
		}

		// Log the result
		console.log(result)

		// Return the result
		return result
	} catch (error) {
		// Handle any errors and log them
		console.error(error)
	}
}

// Call the function to process the JSON data
detectDuplicates()
