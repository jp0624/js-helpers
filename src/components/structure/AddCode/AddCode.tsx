import { CopyBlock } from "react-code-blocks"
import { FaCopy } from "react-icons/fa"
import copy from "copy-to-clipboard"

const AddCode = ({
	data = "Content Missing",
	lang = "text",
	height = "250",
}: any) => {
	return (
		<CopyBlock
			text={data}
			language={lang}
			showLineNumbers={true}
			wrapLines={true}
			theme='dracula'
			codeBlock
			icon={<FaCopy />}
			onCopy={() => copy(data)}
			customStyle={{
				height: `${height}px`,
				overflowY: "scroll",
				margin: "0px 0.75rem",
				borderRadius: "5px",
				boxShadow: "1px 1px 5px rgba(0,0,0,0.25)",
				fontSize: "1rem",
			}}
		/>
	)
}

export default AddCode
