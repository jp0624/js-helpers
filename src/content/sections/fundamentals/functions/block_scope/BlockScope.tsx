import { useContext } from "react"
import Editor from "@monaco-editor/react"
import FileImporter from "../../../../../helpers/FileImporter"
import { SiteContext } from "../../../../../context/SiteContext"

function Default() {
	const { currentHost } = useContext(SiteContext)
	let loadedData: any = {
		code01: FileImporter(
			`${currentHost}/src/content/sections/fundamentals/functions/block_scope/code_01.txt`
		),
		code02: FileImporter(
			`${currentHost}/src/content/sections/fundamentals/functions/block_scope/code_02.txt`
		),
	}
	return (
		<>
			<p>
				Lorem Ipsum is simply dummy text of the printing and typesetting
				industry. Lorem Ipsum has been the industry's standard dummy
				text ever since the 1500s, when an unknown printer took a galley
				of type and scrambled it to make a type specimen book. It has
				survived not only five centuries, but also the leap into
				electronic typesetting, remaining essentially unchanged. It was
				popularised in the 1960s with the release of Letraset sheets
				containing Lorem Ipsum passages, and more recently with desktop
				publishing software like Aldus PageMaker including versions of
				Lorem Ipsum.
			</p>
			{loadedData.code01 ? (
				<Editor
					key='1'
					height='250px'
					defaultLanguage='text'
					defaultValue={loadedData.code01}
				/>
			) : null}
			<p>
				Lorem Ipsum is simply dummy text of the printing and typesetting
				industry. Lorem Ipsum has been the industry's standard dummy
				text ever since the 1500s, when an unknown printer took a galley
				of type and scrambled it to make a type specimen book. It has
				survived not only five centuries, but also the leap into
				electronic typesetting, remaining essentially unchanged. It was
				popularised in the 1960s with the release of Letraset sheets
				containing Lorem Ipsum passages, and more recently with desktop
				publishing software like Aldus PageMaker including versions of
				Lorem Ipsum.
			</p>
			{loadedData.code02 ? (
				<Editor
					key='2'
					height='250px'
					defaultLanguage='text'
					defaultValue={loadedData.code02}
				/>
			) : null}
		</>
	)
}

export default Default
