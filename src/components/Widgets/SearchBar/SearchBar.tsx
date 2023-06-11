import { useState, useContext } from "react"
import styles from "./styles.module.scss"
import { SiteContext } from "../../../context/SiteContext"

const SearchBar = () => {
	const { setSearchTerms, setActiveComponent } = useContext(SiteContext)
	const [inputValue, setInput] = useState("")

	const inputUpdate = (event: any) => {
		setInput(event.target.value)
	}
	const clearInput = () => {
		setInput("")
	}
	const submitSearch = (event: any) => {
		event.preventDefault()
		let termsArr: string[] = inputValue.split(",")
		let cleanTerms: string[] = []
		termsArr.forEach((term: any) => {
			cleanTerms.push(term.toLowerCase().trim().split(" "))
		})
		setSearchTerms(cleanTerms.flat())
		setActiveComponent({
			title: `Search Results for: ${
				!!termsArr[0] ? termsArr.join(",") : "Everything"
			}`,
			component: "SearchPage",
		})
	}

	return (
		<>
			<div className={`${styles.searchBar__container}`}>
				<form
					onSubmit={submitSearch}
					className={`${styles.searchBar__form}`}
				>
					<button
						type='button'
						className={`
                            ${styles.searchBar__form__clear}
                            ${!!inputValue ? styles.visible : styles.hidden}
                            `}
						value={``}
						onClick={clearInput}
					></button>
					<input
						type='text'
						className={`${styles.searchBar__form__input}`}
						placeholder={`Search for modules`}
						value={`${inputValue}`}
						onInput={inputUpdate}
					/>
					<button
						type='button'
						className={`${styles.searchBar__form__search}`}
						onClick={submitSearch}
					></button>
				</form>
			</div>
		</>
	)
}

export default SearchBar
