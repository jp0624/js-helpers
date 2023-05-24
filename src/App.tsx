import "./App.scss"
import { Route, Routes } from "react-router-dom"
import { SiteProvider } from "./context/SiteContext"
import DataLoader from "./helpers/DataLoader"
import Header from "./components/structure/Header"
import Footer from "./components/structure/Footer"
import SideNav from "./components/SideNav/SideNav"
import Content from "./components/structure/Content/Content"

function App() {
	// Function to fetch JSON from a URL
	async function fetch_json(url) {
		try {
			// Fetch the data from the specified URL
			const response = await fetch(url)

			if (!response.ok) {
				throw new Error(
					"Failed to fetch data. Status: " + response.status
				)
			}

			// Parse the response JSON data
			const data = await response.json()

			return data
		} catch (error) {
			// Throw an error if fetching or parsing fails
			throw new Error("Failed to fetch JSON data: " + error.message)
		}
	}

	// Function to extract duplicates from a map
	function extract_duplicates(map) {
		return Object.values(map).flatMap((urls) =>
			urls.length > 1 ? urls : []
		)
	}

	// Function to detect duplicates in the JSON data
	async function detect_duplicates(url) {
		try {
			// Fetch the JSON from the specified URL
			const data = await fetch_json(url)

			// Check the validity of the data format
			if (
				!data ||
				!data.idina_response ||
				!data.idina_response.sources ||
				!Array.isArray(data.idina_response.sources)
			) {
				throw new Error("Invalid data format")
			}

			// Extract the sources array from the data
			const { sources } = data.idina_response

			// Create maps to store duplicate spam scores and domain authorities
			const spam_map = new Map()
			const domain_map = new Map()

			// Iterate over each source and group URLs by spam scores and domain authorities
			sources.forEach(({ spam_score, domain_authority, url }) => {
				spam_map[spam_score] = [...(spam_map[spam_score] || []), url]
				domain_map[domain_authority] = [
					...(domain_map[domain_authority] || []),
					url,
				]
			})

			// Create the result object
			const result = {
				duplicate_spam_scores: extract_duplicates(spam_map),
				duplicate_domain_authorities: extract_duplicates(domain_map),
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
	detect_duplicates("./src/sandbox/data.json")

	return (
		<>
			<SiteProvider>
				<DataLoader />
				<Header />
				<section className='main'>
					<SideNav />
					<Routes>
						<Route path='/' element={<Content />} />
						<Route path='/:categoryName' element={<Content />} />
						<Route
							path='/:categoryName/:moduleName'
							element={<Content />}
						/>
						<Route path='*' element={<Content />} />
					</Routes>
				</section>
				<Footer />
			</SiteProvider>
		</>
	)
}

export default App
