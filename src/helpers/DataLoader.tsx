import { useContext } from "react"
import { SiteContext } from "../context/SiteContext"
// import GetCategories from "./GetCategories"
import GetSiteData from "./GetSiteData"
import getActiveComponent from "./GetComponent"

const DataLoader = () => {
	console.log("++++++++++++++++++++++++++++++++++++++++++++++++")

	const {
		activeComponent,
		params,
		setActiveComponent,
		setActiveSection,
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
					setActiveSection,
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
