const availableJobs = JSON.parse(localStorage.getItem("agro_market_data")) || []
const locations = ["Lagos", "Ibadan", "Kano", "Port Harcourt", "Abuja"]

// Objects schema
// id,farmerName,produce,quantity,pickupLocation,destination,priceOffer,harvestTime,status




const addJobs = (event)=>{
    event.preventDefault()

    const farmerName = document.getElementById('farmer-name').value.trim()
    const produce = document.getElementById('produce').value.trim()
    const quantity = Number(document.getElementById('quantity').value)
    const pickupLocation = document.getElementById('pickup-location').value
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

const renderJobs = ()=>{
    const jobBoard = document.getElementById('job-board')
    jobBoard.innerHTML = ""

    if(availableJobs.length === 0){
        jobBoard.textContent = "No harvests available yet. Be the first to post!"
        return
    }

    for(const {farmerName,produce,quantity,pickupLocation,destination,priceOffer} of availableJobs){
        const jobContainer = document.createElement('div')
        jobContainer.innerHTML = `
            <h2>${farmerName}</h2>
            <p>${produce}</p>
            <p>${quantity}</p>
            <p>${pickupLocation}</p>
            <p>${destination}</p>
            <p>${priceOffer}</p>
        `
        jobBoard.appendChild(jobContainer)
    }
}
renderJobs()
