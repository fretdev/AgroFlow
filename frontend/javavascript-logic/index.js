let availableJobs = []
const locations = ["Lagos", "Ibadan", "Kano", "Port Harcourt", "Abuja"]

// Objects schema
// id,farmerName,produce,quantity,pickupLocation,destination,priceOffer,harvestTime,status




const addJobs = (event)=>{
    event.preventDefault()

    const farmerName = document.getElementById('farmer-name').value
    const produce = document.getElementById('produce').value
    const quantity = Number(document.getElementById('quantity').value)
    const pickupLocation = document.getElementById('pickup-location').value
    const destination = document.getElementById('destination').value
    const priceOffer = Number(document.getElementById('price-offer').value)

    if(!farmerName || !produce || !quantity){
        alert("Please provide valid harvest details")
        return
    }
    

    const newJob = {
        id: Date.now(),
        farmerName,
        produce,
        quantity: Number(quantity),
        pickupLocation,
        destination,
        priceOffer: Number(priceOffer),
        harvestTime:new Date(),
        status: "Available",
    }

    availableJobs.push(newJob)
    event.target.reset()
    console.log(availableJobs)
    console.log(newJob)
    renderJobs()
}

const renderJobs = ()=>{
    const jobBoard = document.getElementById('job-board')
    jobBoard.innerHTML = ""

    if(availableJobs.length === 0){
        jobBoard.innerHTML = "No harvests available yet. Be the first to post!"
    }

    for(const {farmerName,produce,quantity,pickupLocation,destination,priceOffer} of availableJobs){
        const jobContainer = document.createElement('div')
        jobContainer.innerHTML = `
            <h1>${farmerName}</h1>
            <p>${produce}</p>
            <p>${quantity}</p>
            <p>${pickupLocation}</p>
            <p>${destination}</p>
            <p>${priceOffer}</p>
        `
        jobBoard.appendChild(jobContainer)
    }
}

