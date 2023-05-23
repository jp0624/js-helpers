import React, { useState, useEffect, useContext } from "react"
import { SiteContext } from "../context/SiteContext"

interface Section {
	title: string
	folder: string
	categories: Category[]
}

interface Category {
	title: string
	folder: string
	modules: Module[]
}

interface Module {
	title: string
	folder: string
}

const fetchFile = async (url: string) => {
	try {
		const response = await fetch(url)
		const content = await response.text()
		return JSON.parse(content)
	} catch (error) {
		console.error(`Failed to fetch ${url}: ${error}`)
		return null
	}
}

const fetchAndParseFile = async (url: string) => {
	const content = await fetchFile(url)
	return content ?? []
}

const addErrorSuffixToCategory = (category: Category, error: any): Category => {
	return {
		...category,
		title: addErrorSuffix(category.title, error),
	}
}

const fetchCategoryModules = async (
	currentHost: string,
	sectionFolder: string,
	categoryFolder: string
): Promise<Module[]> => {
	const url = `${currentHost}/src/content/sections/${sectionFolder}/${categoryFolder}/default.json`
	const modules = await fetchAndParseFile(url)
	return modules ?? []
}

const fetchSectionCategories = async (
	currentHost: string,
	section: Section
): Promise<Category[]> => {
	const url = `${currentHost}/src/content/sections/${section.folder}/default.json`
	const categories = await fetchAndParseFile(url)

	if (categories) {
		const categoryPromises = categories.map(async (category: Category) => {
			try {
				const modules = await fetchCategoryModules(
					currentHost,
					section.folder,
					category.folder
				)
				category.modules = modules
				return addErrorSuffixToCategory(category, null)
			} catch (error) {
				console.error(
					`Error fetching modules for category: ${category.title}`,
					error
				)
				return addErrorSuffixToCategory(category, error)
			}
		})

		return (await Promise.all(categoryPromises)).filter(
			(category) => category !== null
		) as Category[]
	}

	return []
}

const fetchSiteData = async (
	currentHost: string,
	setSiteData: React.Dispatch<React.SetStateAction<Category[]>>,
	setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
	try {
		const sections = await fetchAndParseFile(
			`${currentHost}/src/content/sections/default.json`
		)

		const sectionPromises = sections.map(async (section: Section) => {
			const categories = await fetchSectionCategories(
				currentHost,
				section
			)
			return {
				...section,
				categories,
				title: addErrorSuffix(section.title, null),
			}
		})

		const siteData = await Promise.all(sectionPromises)
		setSiteData(siteData)
	} catch (err) {
		console.log("Error importing", err)
		setError("Failed to fetch site data.")
	}
}

const addErrorSuffix = (title: string, error: any): string => {
	return error ? `${title}X` : title
}

const GetSiteData = (): Promise<Category[]> => {
	const [siteData, setSiteData] = useState<Category[]>([])
	const [error, setError] = useState<string | null>(null)
	const { currentHost } = useContext(SiteContext)

	useEffect(() => {
		fetchSiteData(currentHost, setSiteData, setError)
	}, [])

	if (error) {
		console.error(error)
	}

	return new Promise<Category[]>((resolve) => {
		if (siteData.length) {
			resolve(siteData)
		} else {
			const intervalId = setInterval(() => {
				if (siteData.length) {
					clearInterval(intervalId)
					resolve(siteData)
				}
			}, 100)
		}
	})
}

export default GetSiteData
