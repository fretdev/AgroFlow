🌾 AgroFlow
A localized marketplace platform designed to bridge the gap between rural farmers and logistics transporters in Nigeria. This application allows farmers to list their harvests and enables transporters to claim delivery jobs in real-time.

🚀 Key Features
👨‍🌾 Farmer Dashboard
Produce Listing: Farmers can post details about their harvest, including produce type, quantity (KG), and pickup/destination locations.

Dynamic Pricing: Includes automatic currency formatting in Naira (₦) for price offers.

Harvest Management: Farmers can view the status of their posts and delete listings that are no longer needed.

Delete Protection: A built-in security rule prevents farmers from deleting a job once it has been "Claimed" by a transporter.

🚛 Transporter Marketplace
Job Board: A real-time view of all available agricultural hauls across the country.

Job Claiming: Transporters can claim available jobs, which updates the status across the entire system.

Smart UI: Buttons are automatically disabled once a job is claimed to prevent double-booking.

🛠️ Technical Implementation
Persistent Storage: Uses localStorage to sync data between the Farmer and Transporter pages without a backend database.

Conditional Rendering: A single JavaScript engine detects the user's page (window.location.pathname) to show relevant actions (Delete for Farmers vs. Claim for Transporters).

Data Validation: Implements advanced array methods like .filter(), .find(), and .findIndex() for robust data manipulation and state management.

📊 Data Schema
The application uses a structured object model for every listing:

id: Unique timestamp for identification.

farmerName: Name of the posting farmer.

produce: Type of agricultural product.

quantity: Weight in Kilograms (KG).

priceOffer: Formatted currency value in ₦.

status: Tracking for "Available" or "Claimed" states.

🏗️ How to Run
Clone the repository.

Open index.html to navigate to the Farmer or Transporter sections.

No installation required (Pure Vanilla JavaScript).
