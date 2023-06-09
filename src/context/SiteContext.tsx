import { createContext, useState, ReactNode } from "react"

// Get the current host URL
export const currentHost = `${window.location.protocol}//${window.location.hostname}:5173`

// Interface for a module
interface ModuleInterface {
	component?: string
	folder: string
	keywords?: string[]
	title: string
}

// Interface for a section
interface SectionInterface {
	folder: string
	components?: ModuleInterface[]
	title: string
}

// Interface for a category
interface CategoryInterface {
	folder: string
	keywords?: string[]
	modules?: ModuleInterface[]
	title: string
	type: string
	description?: string
}

// Interface for a component
interface ComponentInterface {
	component?: string
	title?: string
}

// Interface for route parameters
interface ParamsInterface {
	[key: string]: string
}

// Props for the SiteContext
type SiteContextProps = {
	categories: CategoryInterface[]
	activeCategory: CategoryInterface
	activeSection: SectionInterface
	activeComponent: ComponentInterface
	activeModule: ModuleInterface
	currentHost: string
	language: string
	params: ParamsInterface
	siteData: any
	setActiveSection: (section: any) => void
	setActiveCategory: (category: any) => void
	setActiveComponent: (component: any) => void
	setActiveModule: (module: any) => void
	setCategories: (categories: any) => void
	setLanguage: (language: string) => void
	setParams: (params: any) => void
	setSiteData: (siteData: any) => void
}

// Create the SiteContext and provide initial values
export const SiteContext = createContext<SiteContextProps>({
	activeSection: { folder: "", title: "" },
	activeCategory: { folder: "", title: "", type: "" },
	activeComponent: { component: "", title: "" },
	activeModule: { folder: "", title: "" },
	currentHost: currentHost,
	categories: [],
	language: "",
	params: {},
	siteData: [],
	setActiveSection: () => {},
	setActiveCategory: () => {},
	setActiveComponent: () => {},
	setActiveModule: () => {},
	setCategories: () => {},
	setLanguage: () => {},
	setParams: () => {},
	setSiteData: () => {},
})

// Props for the SiteProvider component
type SiteProviderProps = {
	children: ReactNode
}

// SiteProvider component that wraps the children components with the SiteContext
export const SiteProvider = ({ children }: SiteProviderProps) => {
	// Define state variables and their setters using useState hook
	const [activeSection, setActiveSection] = useState<SectionInterface>({
		folder: "",
		title: "",
	})
	const [activeCategory, setActiveCategory] = useState<CategoryInterface>({
		folder: "",
		title: "",
		type: "",
	})
	const [activeComponent, setActiveComponent] = useState<ComponentInterface>({
		component: "",
		title: "",
	})
	const [activeModule, setActiveModule] = useState<ModuleInterface>({
		component: "",
		folder: "",
		title: "",
	})
	const [categories, setCategories] = useState<CategoryInterface[]>([])
	const [language, setLanguage] = useState("")
	const [params, setParams] = useState<ParamsInterface>({})
	const [siteData, setSiteData] = useState<any>([])

	return (
		<SiteContext.Provider
			value={{
				activeSection,
				activeCategory,
				activeComponent,
				activeModule,
				categories,
				currentHost,
				language,
				params,
				siteData,
				setActiveSection,
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
