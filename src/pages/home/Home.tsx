import { useContext } from "react"
import { SiteContext } from "../../context/SiteContext"
import CardSection from "../../components/Cards/CardSection/CardSection"
import CardCategory from "../../components/Cards/CardCategory/CardCategory"
import CardModule from "../../components/Cards/CardModule/CardModule"

const HomePage = () => {
	const { siteData, activeSection } = useContext(SiteContext)
	console.log("siteData: ", siteData)
	return (
		<>
			<div className={``}>
				{siteData?.map((section: any, index: number) => (
					<CardSection section={section} key={index} />
				))}
			</div>
		</>
	)
}

export default HomePage
