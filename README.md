Overview
This project is a Ferry Booking App built using Next.js, Ant Design for UI components, MobX for state management, and Incremental Static Regeneration (ISR) for efficient data fetching. Users can view ferry products, add them to the cart, and provide passenger information. The app is designed to handle dynamic passenger entries and calculates the total cost based on the given price per ticket.

Project Setup
1. Initialize Next.js Project and Setup Ant Design
# Create a new Next.js project
npx create-next-app Insta - Dukan

# Install Ant Design and its CSS
npm install antd
2. Create HomePage Component
Create a page.js file inside the app folder. Use Ant Design cards to display ferry products with descriptions and images.
3. MobX Store Setup
# Install MobX and MobX React
npm install mobx mobx-react

Create a cart.js file to manage the cart state, including adding items to the cart and storing passenger information.

4. Add to Cart & Passenger Info Modal
Implement an "Add to Cart" button on each product card. Upon clicking, open a modal to collect passenger information (date, name, email, age, gender, nationality). Allow dynamic addition of passengers. Use MobX to manage and store this data.


How to Run the Project

git clone <repository-url>
Install dependencies: npm install
Run the development server: npm run dev

Access the application in your browser at http://localhost:3000.

Project Structure
app/page.js: Home page component displaying ferry products and handling user interactions.
stores/CartStore.js: MobX store managing cart state and passenger information.
public/products.json: JSON file containing ferry product information.
utils/api.js: Utility functions for fetching data from GitHub repository.
components/MainContent.jsx: Reusable component for displaying individual ferry products.
components/PassengerForm.js: Modal component for collecting passenger information.

Technologies Used
Next.js: A React framework for building server-rendered React applications.
Ant Design: A popular React UI framework for building elegant and responsive user interfaces.
MobX: A state management library for React applications, ensuring efficient state updates and reactions.
Incremental Static Regeneration (ISR): Next.js feature for efficient and dynamic data fetching and updating.

Author
Soumya Ranjan Nayak
soumyanayak.raju@gmail.com

Acknowledgements
Special thanks to the developers of Next.js, Ant Design, MobX, and the open-source community for their valuable contributions.

