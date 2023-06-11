import { useContext, useEffect } from "react"
import { SiteContext } from "../context/SiteContext"
import GetCategories from "./GetCategories"
import GetActiveComponent from "./GetComponent"

const DataLoaderComponent = () => {
	const {
		activeComponent,
		setCategories,
		setActiveCategory,
		setActiveModule,
		setActiveComponent,
		params,
	} = useContext(SiteContext)

	useEffect(() => {
		async function loadSiteData() {
			try {
				const categoriesObject = await GetCategories()
				setCategories(categoriesObject)

				if (categoriesObject && params) {
					const component = await GetActiveComponent(
						categoriesObject,
						params,
						setActiveCategory,
						setActiveModule
					)
					setActiveCategory(component)
					setActiveModule(component)
					if (component?.component !== activeComponent.component) {
						setActiveComponent(component)
					}
					console.warn(
						"Fetched activecomponent(dataloader):",
						activeComponent
					)
					console.error("Fetched component(dataloader):", component)
				}
			} catch (error) {
				console.error(`Failed to load site data: ${error}`)
			}
		}
		loadSiteData()
	}, [
		setCategories,
		setActiveComponent,
		setActiveModule,
		setActiveCategory,
		activeComponent,
		params,
	])

	return null
}

const DataLoader = () => {
	return <DataLoaderComponent />
}

export default DataLoader
