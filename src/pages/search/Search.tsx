import { useContext } from "react"
import { SiteContext } from "../../context/SiteContext"
import CardSection from "../../components/Cards/CardSection/CardSection"
import CardCategory from "../../components/Cards/CardCategory/CardCategory"
import CardModule from "../../components/Cards/CardModule/CardModule"

const SearchPage = () => {
	const { siteData, activeSection, searchTerms, setSearchTerms } =
		useContext(SiteContext)
	return (
		<>
			<div className={``}>
				{searchTerms?.map((term: any, index: number) => (
					// <CardSection section={section} key={index} />
					<>
						<span>{term}</span>
						<br />
					</>
				))}
			</div>
		</>
	)
}

export default SearchPage
