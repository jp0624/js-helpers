import { useContext } from "react"
import { SiteContext } from "../../context/SiteContext"
import CardSection from "../../components/Cards/CardSection/CardSection"
import CardCategory from "../../components/Cards/CardCategory/CardCategory"
import CardModule from "../../components/Cards/CardModule/CardModule"
import PillModule from "../../components/Pills/PillModule/PillModule"
import styles from "./styles.module.scss"

interface termSearchInterface {
	title: string
	description: string
	keywords: string[]
	folder: string
	score: number
	component: string
	type: string
	// modules?: ModuleInterface[]
	category: {
		title: string
		folder: string
	}
	section: {
		title: string
		folder: string
	}
}

// Interface for a category
// interface CategoryInterface {
// 	folder: string
// 	keywords: string[]
// 	modules?: ModuleInterface[]
// 	title: string
// 	type: string
// 	description: string
// }
// // Interface for a module
// interface ModuleInterface {
// 	component?: string
// 	folder: string
// 	keywords: string[]
// 	title: string
// 	description: string
// }

const SearchPage = () => {
	const { siteData, searchTerms, setSearchTerms } = useContext(SiteContext)

	let results = []

	for (let sec of siteData) {
		if (sec && sec.categories.length) {
			for (let cat of sec.categories) {
				// let category: termSearchInterface = {
				// 	title: cat.title,
				// 	description: cat.description,
				// 	keywords: cat.keywords,
				// 	folder: cat.folder,
				// 	score: 0,
				// 	modules: cat.modules || [],
				// }
				// category.score = findTerm(category)
				// !!category.score && results.push(category)

				if (cat && cat.modules?.length) {
					for (let mod of cat.modules) {
						let module: termSearchInterface = {
							title: mod.title,
							description: mod.description || "",
							keywords: mod.keywords || [],
							folder: mod.folder,
							type: mod.type || "",
							component: mod.component || "",
							score: 0,
							category: {
								title: cat.title,
								folder: cat.folder,
							},
							section: {
								title: sec.title,
								folder: sec.folder,
							},
						}
						module.score += findTerm(module)
						!!module.score && results.push(module)
					}
				}
			}
		}
	}
	const sortedResults = results.sort((a, b) => b.score - a.score)
	console.log("results: ", sortedResults)

	function findTerm(item: termSearchInterface, score: number = 0) {
		for (let term of searchTerms) {
			if (item.title && item.title.toLowerCase().includes(term)) {
				score += 5
			}
			if (
				item.description &&
				item.description.toLowerCase().includes(term)
			) {
				score += 1
			}
			for (let keyword of item.keywords) {
				if (keyword.toLowerCase().includes(term)) {
					score += 3
				}
			}
		}
		!!score && console.log(`${item.title} Score: ${score}`)
		return score
	}
	return (
		<>
			<div className={`${styles.pill__container__modules}`}>
				{results?.map((item: any, index: number) => (
					<>
						<PillModule
							section={item.section}
							category={item.category}
							module={item}
							key={index}
						/>
					</>
				))}
			</div>
		</>
	)
}

export default SearchPage
