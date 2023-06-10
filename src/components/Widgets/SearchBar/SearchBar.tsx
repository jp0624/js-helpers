import React from "react"
import styles from "./styles.module.scss"

const SearchBar = () => {
	return (
		<>
			<div className={`${styles.searchBar__container}`}>
				<form className={`${styles.searchBar__form}`}>
					<input
						type='button'
						className={`${styles.searchBar__form__clear}`}
						value={`X`}
					/>
					<input
						type='text'
						className={`${styles.searchBar__form__input}`}
						placeholder={`Search for modules`}
					/>
					<input
						type='button'
						className={`${styles.searchBar__form__button}`}
						value={`Search`}
					/>
				</form>
			</div>
		</>
	)
}

export default SearchBar
