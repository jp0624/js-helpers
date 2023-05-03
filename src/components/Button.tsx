import React from "react"

interface ButtonProps {
	type?: "primary" | "secondary" | "danger"
	text: string
	onClick: () => void
}
const Button = ({ type = "primary", text, onClick }: ButtonProps) => {
	return (
		<button type='button' className={"btn btn-" + type} onClick={onClick}>
			{text}
		</button>
	)
}

export default Button
