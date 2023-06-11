async function processJSONData() {
	try {
		const response = await fetch("/src/sandbox/data.json")
		if (!response.ok) {
			throw new Error("Failed to fetch data")
		}

		const {
			idina_response: { sources },
		} = await response.json()

		const spamScoreMap = new Map()
		const domainAuthorityMap = new Map()

		// Create a map to store duplicate spam scores and domain authorities
		sources.forEach(({ spam_score, domain_authority, url }) => {
			// Check for duplicate spam scores
			const spamUrls = spamScoreMap.get(spam_score) || []
			spamUrls.push(url)
			spamScoreMap.set(spam_score, spamUrls)

			// Check for duplicate domain authorities
			const domainUrls = domainAuthorityMap.get(domain_authority) || []
			domainUrls.push(url)
			domainAuthorityMap.set(domain_authority, domainUrls)
		})

		const duplicate_spam_scores = Array.from(spamScoreMap.values())
			.filter((urls) => urls.length > 1)
			.flatMap((urls) => urls)

		const duplicate_domain_authorities = Array.from(
			domainAuthorityMap.values()
		)
			.filter((urls) => urls.length > 1)
			.flatMap((urls) => urls)

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
