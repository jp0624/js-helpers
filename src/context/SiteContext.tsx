import { createContext, useState, ReactNode } from "react"
export const currentHost = `${window.location.protocol}//${window.location.hostname}:5173`

interface moduleInterface extends Object {
	component?: string
	folder: string
	keywords?: string[]
	title: string
}
interface CategoryInterface extends Object {
	folder: string
	keywords?: string[]
	modules?: moduleInterface[]
	title: string
	type: string
	description?: string
}
interface ComponentInterface extends Object {
	component?: string
	title?: string
}

interface ParamsInterface {
	[key: string]: string
}

type SiteContextProps = {
	categories: CategoryInterface[]
	activeCategory: CategoryInterface
	activeComponent: ComponentInterface
	activeModule: moduleInterface
	currentHost: string
	language: string
	params: ParamsInterface
	siteData: any
	setActiveCategory: (category: any) => void
	setActiveComponent: (component: any) => void
	setActiveModule: (module: any) => void
	setCategories: (categories: any) => void
	setLanguage: (language: string) => void
	setParams: (params: any) => void
	setSiteData: (siteData: any) => void
}

export const SiteContext = createContext<SiteContextProps>({
	activeCategory: { folder: "", title: "", type: "" },
	activeComponent: { component: "", title: "" },
	activeModule: { folder: "", title: "" },
	currentHost: currentHost,
	categories: [],
	language: "",
	params: {},
	siteData: [],
	setActiveCategory: () => {},
	setActiveComponent: () => {},
	setActiveModule: () => {},
	setCategories: () => {},
	setLanguage: () => {},
	setParams: () => {},
	setSiteData: () => {},
})

type SiteProviderProps = {
	children: ReactNode
}

export const SiteProvider = ({ children }: SiteProviderProps) => {
	const [activeCategory, setActiveCategory] = useState({
		folder: "",
		title: "",
		type: "",
	})
	const [activeComponent, setActiveComponent] = useState({
		component: "",
		title: "",
	})
	const [activeModule, setActiveModule] = useState({
		component: "",
		folder: "",
		title: "",
	})
	const [categories, setCategories] = useState([])
	const [language, setLanguage] = useState("")
	const [params, setParams] = useState({})
	const [siteData, setSiteData] = useState([])

	return (
		<SiteContext.Provider
			value={{
				activeCategory,
				activeComponent,
				activeModule,
				categories,
				currentHost,
				language,
				params,
				siteData,
				setActiveCategory,
				setActiveComponent,
				setActiveModule,
				setCategories,
				setLanguage,
				setParams,
				setSiteData,
			}}
		>
			{children}
		</SiteContext.Provider>
	)
}
