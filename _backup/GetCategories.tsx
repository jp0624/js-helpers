import { useState, useEffect } from "react"
import { useContext } from "react"
import { SiteContext } from "../context/SiteContext"
interface Category {
	folder: string
	modules: any[]
}

async function fetchFile(url: string) {
	try {
		const response = await fetch(url)
		const content = await response.text()
		return JSON.parse(content)
	} catch (error) {
		console.error(`Failed to fetch ${url}: ${error}`)
	}
}

function GetCategories(): Promise<Category[]> {
	const [categories, setCategories] = useState<Category[]>([])
	const { currentHost } = useContext(SiteContext)

	useEffect(() => {
		async function buildCategories(url: string) {
			try {
				const cats = await fetchFile(url)
				if (cats) {
					const promises = cats.map(async (category: Category) => {
						const result = await fetchFile(
							`${currentHost}/src/content/sections/fundamentals/${category.folder}/default.json`
						)
						category.modules = result
						return category
					})
					const categories = await Promise.all(promises)
					return categories
				}
			} catch (err) {
				console.log("Error importing", err)
			}
		}

		buildCategories(
			`${currentHost}/src/content/sections/fundamentals/default.json`
		).then(function (result) {
			setCategories(result as any)
		})
	}, [])

	return new Promise<Category[]>((resolve) => {
		if (categories.length) {
			resolve(categories)
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
