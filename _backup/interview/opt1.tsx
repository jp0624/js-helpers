async function processJSONData() {
	try {
		const response = await fetch("/src/sandbox/data.json")
		if (!response.ok) {
			throw new Error("Failed to fetch data")
		}

		const data = await response.json()

		const idina_response = data.idina_response
		const sources = idina_response.sources

		const duplicate_spam_scores = []
		const duplicate_domain_authorities = []

		// Create a map to store duplicate spam scores and domain authorities
		const spamScoreMap = new Map()
		const domainAuthorityMap = new Map()

		sources.forEach((source, index) => {
			// Check for duplicate spam scores
			if (spamScoreMap.has(source.spam_score)) {
				spamScoreMap.get(source.spam_score).push(source.url)
			} else {
				spamScoreMap.set(source.spam_score, [source.url])
			}

			// Check for duplicate domain authorities
			if (domainAuthorityMap.has(source.domain_authority)) {
				domainAuthorityMap.get(source.domain_authority).push(source.url)
			} else {
				domainAuthorityMap.set(source.domain_authority, [source.url])
			}
		})

		// Combine all arrays found in duplicate_spam_scores
		spamScoreMap.forEach((urls) => {
			if (urls.length > 1) {
				duplicate_spam_scores.push(...urls)
			}
		})

		// Combine all arrays found in duplicate_domain_authorities
		domainAuthorityMap.forEach((urls) => {
			if (urls.length > 1) {
				duplicate_domain_authorities.push(...urls)
			}
		})

		const result = {
			duplicate_spam_scores,
			duplicate_domain_authorities,
		}

		console.log(result)
		return result
	} catch (error) {
		console.error(error)
	}
}

// Call the function to process the JSON data
processJSONData()
