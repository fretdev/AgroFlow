let availableJobs = JSON.parse(localStorage.getItem("agro_market_data")) || []
const locations = ["Lagos", "Ibadan", "Ogun", "Osun", "Abuja"]

// Objects schema
// id,farmerName,produce,quantity,pickupLocation,destination,priceOffer,harvestTime,status




const addJobs = (event)=>{
    event.preventDefault()

    const farmerName = document.getElementById('farmer-name').value.trim()
    const produce = document.getElementById('produce').value.trim()
    const quantity = Number(document.getElementById('quantity').value)
    const pickupLocation = document.getElementById('pickup-location').value.toLowerCase()
    const destination = document.getElementById('destination').value
    const priceOffer = Number(document.getElementById('price-offer').value)
    const phoneNumber = document.getElementById('phone-number').value.trim()

    if(!farmerName || !produce || quantity <=0){
        alert("Please provide valid harvest details")
        return
    }
    

    const newJob = {
        id: Date.now(),
        role: "Farmer",
        farmerName,
        produce,
        quantity,
        pickupLocation,
        destination,
        priceOffer,
        harvestTime:new Date(),
        status: "Available",
        phoneNumber,
    }

    availableJobs.push(newJob)

    localStorage.setItem("agro_market_data",JSON.stringify(availableJobs))
    
    event.target.reset()
    
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

const claimJob = (jobId)=>{
     const jobIndex = availableJobs.findIndex(job =>job.id === jobId)

     if (jobIndex === -1 || availableJobs[jobIndex].status === "Claimed"){
        return
     }

     availableJobs[jobIndex].status = "Claimed"
     localStorage.setItem("agro_market_data",JSON.stringify(availableJobs))
     renderJobs()
}

const deleteJob = (id) =>{
    const targetJob = availableJobs.find(job => job.id === id)
    if(targetJob && targetJob.status === "Claimed"){
        alert("You Can't delete this job it is already claimed")
        return
    }
    else{
        availableJobs= availableJobs.filter(job=>job.id != id)
        localStorage.setItem("agro_market_data",JSON.stringify(availableJobs))
        renderJobs()
    }
}
const filterJobs = () =>{
    const selectedLocation = document.getElementById("location-filter").value.toLowerCase()
    const searchInput = document.getElementById('search-input').value.toLowerCase()

    const filteredJobs = availableJobs.filter(job => {
        const locationMatch = selectedLocation === "all" || job.pickupLocation?.toLowerCase() === selectedLocation || job.region?.toLowerCase() === selectedLocation

        const produceMatch = job.produce.toLowerCase().includes(searchInput)
        
        return locationMatch && produceMatch
    
    })
    
    renderJobs(filteredJobs)
}

const clearFilters = ()=>{
    const selectedLocation = document.getElementById("location-filter")
    const searchInput = document.getElementById('search-input')
    searchInput.value = ""
    selectedLocation.value ="all"
    renderJobs()
}
renderJobs()

