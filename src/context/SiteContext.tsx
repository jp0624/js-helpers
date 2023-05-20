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

type SiteContextProps = {
	categories: CategoryInterface[]
	activeCategory: CategoryInterface
	activeComponent: ComponentInterface
	activeModule: moduleInterface
	language: string
	currentHost: string
	setCategories: (categories: any) => void
	setActiveCategory: (category: any) => void
	setActiveComponent: (component: any) => void
	setActiveModule: (module: any) => void
	setLanguage: (language: string) => void
}

export const SiteContext = createContext<SiteContextProps>({
	categories: [],
	activeCategory: { folder: "", title: "", type: "" },
	activeComponent: { component: "", title: "" },
	activeModule: { folder: "", title: "" },
	language: "",
	currentHost: currentHost,
	setCategories: () => {},
	setActiveCategory: () => {},
	setActiveComponent: () => {},
	setActiveModule: () => {},
	setLanguage: () => {},
})

type SiteProviderProps = {
	children: ReactNode
}

export const SiteProvider = ({ children }: SiteProviderProps) => {
	const [categories, setCategories] = useState([])
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
	const [language, setLanguage] = useState("")

	return (
		<SiteContext.Provider
			value={{
				categories,
				activeCategory,
				activeComponent,
				activeModule,
				language,
				currentHost,
				setCategories,
				setActiveCategory,
				setActiveComponent,
				setActiveModule,
				setLanguage,
			}}
		>
			{children}
		</SiteContext.Provider>
	)
}
