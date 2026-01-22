const saveMarketerRequest = (event) =>{
    event.preventDefault()
    const marketerName = document.getElementById('marketer-name').value.trim()
    const produce = document.getElementById('marketer-produce').value.toLowerCase()
    const quantity = Number(document.getElementById('marketer-quantity').value)
    const marketerBudget = Number(document.getElementById('marketer-budget').value)
    const marketerLocation = document.getElementById('marketer-location').value.toLowerCase()
    const region = document.getElementById('pickup-region').value.toLowerCase()

    const marketerRequest={
        id: Date.now(),
        role: "Marketer",
        marketerName,
        produce,
        quantity,
        marketerBudget,
        marketerLocation,
        region,
        status: "Available",
    }

    let currentJobs = JSON.parse(localStorage.getItem("agro_market_data")) || []

    currentJobs.push(marketerRequest)
    localStorage.setItem("agro_market_data", JSON.stringify(currentJobs))

    event.target.reset()
}