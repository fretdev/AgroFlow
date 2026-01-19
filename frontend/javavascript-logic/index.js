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

    if(!farmerName || !produce || quantity <=0){
        alert("Please provide valid harvest details")
        return
    }
    

    const newJob = {
        id: Date.now(),
        farmerName,
        produce,
        quantity,
        pickupLocation,
        destination,
        priceOffer,
        harvestTime:new Date(),
        status: "Available",
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

    if(jobsToDisplay.length === 0){
        jobBoard.textContent = "No harvests available yet. Be the first to post!"
        return
    }

    for(const {id,farmerName,produce,quantity,pickupLocation,destination,priceOffer,status} of jobsToDisplay){
        const jobContainer = document.createElement('div')
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
            <h2>${farmerName.charAt(0).toUpperCase()+farmerName.slice(1)}</h2>
            <p><strong>PRODUCE:</strong> ${produce.charAt(0).toUpperCase()+produce.slice(1)}</p>
            <p><strong>QUANTITY:</strong> ${quantity}KG</p>
            <p><strong>PICKUP:</strong> ${pickupLocation.charAt(0).toUpperCase()+pickupLocation.slice(1)}</p>
            <p><strong>DESTINATION:</strong> ${destination.charAt(0).toUpperCase()+destination.slice(1)}</p>
            <p><strong>PRICE:</strong> ₦${priceOffer.toLocaleString()}</p>
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
    
    if(selectedLocation === "all"){
        renderJobs()
    }
    else{
        const filteredJob = availableJobs.filter(job => job.pickupLocation.toLowerCase() === selectedLocation)
        renderJobs(filteredJob)
    }

}
renderJobs()

