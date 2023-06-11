const liveSandbox = true
if (liveSandbox) {
	console.log("Sandbox Running...")
	function timeConversion(s: string): string {
		const isPM = s.includes("PM")
		console.log("isPM:", isPM)

		const timeParts = s.slice(0, -2).split(":")
		console.log("timeParts:", timeParts)

		let hours = parseInt(timeParts[0], 10)
		console.log("hours:", hours)

		if (isPM && hours < 12) {
			hours += 12
		} else if (!isPM && hours === 12) {
			hours = 0
		}

		const hoursString = hours.toString().padStart(2, "0")
		console.log("hoursString:", hoursString)

		const formattedTime = `${hoursString}:${timeParts[1]}`
		console.log("formattedTime:", formattedTime)

		return formattedTime
	}
	timeConversion("12:35")
}
