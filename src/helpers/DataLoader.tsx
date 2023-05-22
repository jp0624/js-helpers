import { useContext, useEffect } from "react"
import { SiteContext } from "../context/SiteContext"
import GetCategories from "./GetCategories"
import getActiveComponent from "./GetComponent"

function DataLoader() {
	const {
		activeComponent,
		params,
		setActiveComponent,
		setActiveCategory,
		setActiveModule,
		setCategories,
		setParams,
	} = useContext(SiteContext)
	async function loadSiteData() {
		try {
			const categoriesObject = await GetCategories()
			setCategories(categoriesObject)

			if (!activeComponent.component) {
				await getActiveComponent(
					categoriesObject,
					params,
					setActiveComponent,
					setActiveCategory,
					setActiveModule
				)
			}
		} catch (error) {
			console.error(`Failed to load site data: ${error}`)
		}
	}
	loadSiteData()

	return null
}

export default DataLoader
