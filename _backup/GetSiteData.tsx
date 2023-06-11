import { useState, useEffect } from "react"

interface Module {
	// Define the properties of a module
}

interface Category {
	folder: string
	modules: Module[]
}

interface Section {
	folder: string
	categories: Category[]
}

async function fetchJSON(url: string) {
	try {
		const response = await fetch(url)
		const data = await response.json()
		return data
	} catch (error) {
		console.error(`Failed to fetch ${url}: ${error}`)
	}
}

interface CombinedData {
	sections: Section[]
}

interface DataViewerProps {
	data: CombinedData
}

const DataViewer: React.FC<DataViewerProps> = ({ data }) => {
	// Render the combined data
	return <pre>{JSON.stringify(data, null, 2)}</pre>
}

function GetCategories(): Promise<any> {
	const [combinedData, setCombinedData] = useState<CombinedData[]>([])

	useEffect(() => {
		async function fetchData() {
			const currentHost = `${window.location.protocol}//${window.location.hostname}:5173` // Add the currentHost value from the SiteContext

			try {
				const sectionsData = await fetchJSON(
					`${currentHost}/src/content/sections/default.json`
				)

				const sectionPromises = sectionsData.map(
					async (section: Section) => {
						const categoryData = await fetchJSON(
							`${currentHost}/src/content/sections/${section.folder}/default.json`
						)

						const categoryPromises = categoryData.map(
							async (category: Category) => {
								const modulesData = await fetchJSON(
									`${currentHost}/src/content/sections/${section.folder}/${category.folder}/default.json`
								)

								category.modules = modulesData
								return category
							}
						)

						section.categories = await Promise.all(categoryPromises)
						return section
					}
				)

				const sections = await Promise.all(sectionPromises)
				setCombinedData({ sections })
			} catch (error) {
				// console.error("Error fetching data:", error)
			}
		}

		fetchData()
	}, [])

	if (!combinedData) {
		console.error("no data to fetch")
	}

	// console.log(combinedData)
	// return <DataViewer data={combinedData} />
	return new Promise<Category[]>((resolve) => {
		if (combinedData!.length) {
			resolve(combinedData)
		} else {
			const intervalId = setInterval(() => {
				if (categories.length) {
					clearInterval(intervalId)
					resolve(categories)
				}
			}, 100)
		}
	})
}

export default GetCategories
