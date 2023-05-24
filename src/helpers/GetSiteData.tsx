import React, { useState, useEffect, useContext } from "react"
import { SiteContext } from "../context/SiteContext"

// Interface for a section
interface Section {
	title: string
	folder: string
	categories: Category[]
}

// Interface for a category
interface Category {
	title: string
	folder: string
	modules: Module[]
}

// Interface for a module
interface Module {
	title: string
	folder: string
}

// Function to fetch a file from a given URL
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

// Function to fetch and parse a file from a given URL
const fetchAndParseFile = async (url: string) => {
	const content = await fetchFile(url)
	return content ?? []
}

// Function to add an error suffix to a category's title
const addErrorSuffixToCategory = (category: Category, error: any): Category => {
	return {
		...category,
		title: addErrorSuffix(category.title, error),
	}
}

// Function to fetch the modules for a category
const fetchCategoryModules = async (
	currentHost: string,
	sectionFolder: string,
	categoryFolder: string
): Promise<Module[]> => {
	const url = `${currentHost}/src/_db/sections/${sectionFolder}/${categoryFolder}/default.json`
	const modules = await fetchAndParseFile(url)
	return modules ?? []
}

// Function to fetch the categories for a section
const fetchSectionCategories = async (
	currentHost: string,
	section: Section
): Promise<Category[]> => {
	const url = `${currentHost}/src/_db/sections/${section.folder}/default.json`
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

// Function to fetch the site data
const fetchSiteData = async (
	currentHost: string,
	setSiteData: React.Dispatch<React.SetStateAction<Category[]>>,
	setError: React.Dispatch<React.SetStateAction<string | null>>
) => {
	try {
		const sections = await fetchAndParseFile(
			`${currentHost}/src/_db/sections/default.json`
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

// Function to add an error suffix to a title
const addErrorSuffix = (title: string, error: any): string => {
	return error ? `${title}X` : title
}

// Component to get the site data
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
