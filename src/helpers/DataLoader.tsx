import { useContext, useEffect } from "react"
import { SiteContext } from "../context/SiteContext"
import GetCategories from "./GetCategories"

function DataLoader() {
	const { setCategories } = useContext(SiteContext)

	async function loadCategories() {
		const categoriesObject = await GetCategories()
		setCategories(categoriesObject)
	}
	loadCategories()

	return null
}

export default DataLoader
