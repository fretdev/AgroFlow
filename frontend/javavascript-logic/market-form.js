const saveMarketerRequest = (event) =>{
    event.preventDefault()
    const marketerName = document.getElementById('marketer-name').value.trim()
    const produce = document.getElementById('marketer-produce').value.toLowerCase()
    const quantity = Number(document.getElementById('marketer-quantity').value)
    const marketerBudget = Number(document.getElementById('marketer-budget').value)
    const marketerLocation = document.getElementById('marketer-location').value.toLowerCase()
    const region = document.getElementById('pickup-region').value.toLowerCase()
    const phoneNumber = document.getElementById('marketer-phone-number').value

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
        phoneNumber,
    }

    let currentJobs = JSON.parse(localStorage.getItem("agro_market_data")) || []

    currentJobs.push(marketerRequest)
    localStorage.setItem("agro_market_data", JSON.stringify(currentJobs))
    event.target.reset()
    availableJobs = currentJobs
    renderJobs()
}
 const renderJobs = (jobsToDisplay = availableJobs)=>{
    const jobBoard = document.getElementById('job-board')
    const isFarmerPage = window.location.pathname.includes("produce-form")
    if(!jobBoard) return
    jobBoard.innerHTML = ""

    if(availableJobs.length === 0){
        jobBoard.textContent = "No harvests available yet. Be the first to post!"
        return
    }
    if(jobsToDisplay.length === 0){
        jobBoard.textContent = "No results match your search. Try adjusting your filters"
        return
    }


    for(const {id,farmerName,marketerName,marketerLocation,role,marketerBudget, region,produce,quantity,pickupLocation,destination,priceOffer,status,phoneNumber} of jobsToDisplay){
        const jobContainer = document.createElement('div')
        let displayName
        const displayPrice = role === 'Marketer' ? marketerBudget : priceOffer
        const roleBadge = role === 'Marketer' ? "[BUYER]" : "[FARMER]"
        let fromLocation 
        let toLocation

        if(role === "Marketer"){
            displayName = `${marketerName}`
            fromLocation = region
            toLocation = marketerLocation
        }
        else{
            displayName = `${farmerName}`
            fromLocation = pickupLocation
            toLocation = destination
        }


        const foundMatch = availableJobs.some(otherJob =>
            otherJob.role !== role && otherJob.produce === produce && (otherJob.pickupLocation === fromLocation || otherJob.region === fromLocation)
        )
        let matchBadgeHtml 
        if(foundMatch){
            matchBadgeHtml =`<span class="match-found">MAtch Found</span>`
        }
        else{
            matchBadgeHtml = ""
        }


        jobContainer.classList.add('job-card')
        if(status === "Claimed"){
            jobContainer.classList.add('status-claimed')
        }

        let buttonHtml
        if(isFarmerPage){
            buttonHtml = `
        <p><strong>Status:</strong> ${status}</p>
        <button onclick="deleteJob(${id})">Delete Harvest</button>
    `
        }
        else{
            buttonHtml = `<button class="claim-btn" data-id="${id}" onclick="claimJob(${id})" ${status === "Claimed" ? "disabled" : ""}>${status === "Claimed" ? "Claimed" : "Claim Job"}</button>`
        }

        jobContainer.innerHTML = `
            <h2>${displayName.charAt(0).toUpperCase()+displayName.slice(1)}${roleBadge}</h2>
            ${matchBadgeHtml}
            <p><strong>PRODUCE:</strong> ${produce.charAt(0).toUpperCase()+produce.slice(1)}</p>
            <p><strong>QUANTITY:</strong> ${quantity}KG</p>
            <p><strong>From:</strong> ${fromLocation.charAt(0).toUpperCase()+fromLocation.slice(1)}</p>
            <p><strong>To:</strong> ${toLocation.charAt(0).toUpperCase()+toLocation.slice(1)}</p>
            <p><strong>PRICE:</strong> ₦${displayPrice.toLocaleString()}</p>
            <p><strong>Contact:</strong><a href="tel:${phoneNumber}">${phoneNumber || "Not Provided"}</a></p>
            ${buttonHtml}
        `
        jobBoard.appendChild(jobContainer)
    }
}
renderJobs()