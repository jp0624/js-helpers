import { useState, useEffect } from "react"
import { useContext } from "react"
import { SiteContext } from "../context/SiteContext"
import { useParams } from "react-router"

interface ActiveComponent {
	title: string
	component: string
}
function GetActiveComponent(): Promise<ActiveComponent> {
	const { setActiveModule, categories } = useContext(SiteContext)
	const [activeComponent, setActiveComponent] = useState<ActiveComponent>()
	const params = useParams()

	useEffect(() => {
		async function buildActiveComponent() {
			let Component = { title: "", component: "" }

			if (!params) {
				Component = { title: "Home Page", component: "HomePage" }
			} else {
				try {
					////////////////////////////////

					if (!!params.categoryName) {
					}
					console.log("params: ", params)

					////////////////////////////////
					if (!!params.categoryName) {
						const curCategory = categories.find(
							(cat: any) => cat.folder === params.categoryName
						)
						if (!!curCategory) {
							setActiveComponent(curCategory)
							Component = {
								title: curCategory!.title,
								component: "CategoryPage",
							}
						}

						if (
							!!params.moduleName &&
							!!curCategory &&
							!!curCategory.modules
						) {
							const curModule = curCategory.modules.find(
								(mod: any) => mod.folder === params.moduleName
							)
							if (curModule?.component) {
								Component = {
									title: curModule!.title,
									component: curModule!.component,
								}
							}
							setActiveModule(curModule)
							setActiveComponent(Component)
						}
					}

					////////////////////////////////
				} catch (err) {
					console.log("Component: ", Component)
					// console.log("Error importing", err)
				}
			}

			console.log(
				"Component: ",
				Component.title + " " + Component.component
			)
			return Component
		}
		buildActiveComponent().then(function (result) {
			console.log(result)
		})
	}, [])
}

export default GetActiveComponent
