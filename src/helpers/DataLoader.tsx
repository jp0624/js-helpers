import { useContext } from "react"
import { SiteContext } from "../context/SiteContext"
// import GetCategories from "./GetCategories"
import GetSiteData from "./GetSiteData"
import getActiveComponent from "./GetComponent"

const DataLoader = () => {
	const {
		activeComponent,
		params,
		setActiveComponent,
		setActiveCategory,
		setActiveModule,
		setSiteData,
	} = useContext(SiteContext)

	async function loadSiteData() {
		try {
			const siteData = await GetSiteData()
			setSiteData(siteData)
			// console.log("Site Data: ", siteData)

			if (!activeComponent.component) {
				getActiveComponent(
					siteData,
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
