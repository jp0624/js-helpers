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

const addErrorSuffix = (title: string, error: any): string => {
	return error ? `${title}X` : title
}

const GetSiteData = async (): Promise<Category[]> => {
	const [siteData, setSiteData] = useState<Category[]>([])
	const [error, setError] = useState<string | null>(null)
	const { currentHost } = useContext(SiteContext)

	useEffect(() => {
		const buildSections = async (url: string) => {
			try {
				const secs = await fetchFile(url)
				if (secs) {
					const promises = secs.map(async (section: Section) => {
						const cats = await fetchFile(
							`${currentHost}/src/content/sections/${section.folder}/default.json`
						)
						section.categories = cats ?? []
						if (cats) {
							const categoryPromises = cats.map(
								async (category: Category) => {
									try {
										const mods = await fetchFile(
											`${currentHost}/src/content/sections/${section.folder}/${category.folder}/default.json`
										)
										category.modules = mods ?? []
										return {
											...category,
											title: addErrorSuffix(
												category.title,
												null
											),
										}
									} catch (error) {
										console.error(
											`Error fetching modules for category: ${category.title}`,
											error
										)
										return {
											...category,
											title: addErrorSuffix(
												category.title,
												error
											),
										}
									}
								}
							)
							section.categories = (
								await Promise.all(categoryPromises)
							).filter(
								(category) => category !== null
							) as Category[]
						}
						return {
							...section,
							title: addErrorSuffix(section.title, null),
						}
					})
					const sections = await Promise.all(promises)
					setSiteData(sections)
				}
			} catch (err) {
				console.log("Error importing", err)
				setError("Failed to fetch site data.")
			}
		}

		buildSections(`${currentHost}/src/content/sections/default.json`)
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
