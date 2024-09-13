// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

// Get the input elements
const windowsInput = document.getElementById('num-windows');
const materialInput = document.getElementById('material-type');
const insuranceInput = document.getElementById('insurance-cost');
const utilityInput = document.getElementById('utility-bill');
const builtSizeInput = document.getElementById('built-size');
const calculateButton = document.querySelector('.btn-calculate');

// Function to calculate the results based on user inputs
function calculateResults() {
    const windows = parseInt(windowsInput.value) || 0;
    const insurance = parseFloat(insuranceInput.value) || 0;
    const utility = parseFloat(utilityInput.value) || 0;
    const material = materialInput.value;
    const builtSize = parseFloat(builtSizeInput.value) || 0;

    // 20% of the built size is glass
    const glassSquareFootage = builtSize * 0.2;

    // Material-based pricing (price per square foot)
    const materialCostPerSqFt = {
        vinyl: 25,  // Example pricing
        aluminum: 30,
        wood: 35,
        fiberglass: 40
    };

    // Get the price per square foot for the selected material
    const glassCost = glassSquareFootage * materialCostPerSqFt[material];

    // Labor cost: based on a combination of glass square footage and number of windows
    const laborCostPerSqFt = 15;  // Example labor cost per square foot of glass
    const laborCostPerWindow = 100;  // Example labor cost per window

    const totalLaborCost = (glassSquareFootage * laborCostPerSqFt) + (windows * laborCostPerWindow);

    // Project cost is the total glass cost + labor cost
    const projectCost = glassCost + totalLaborCost;

    // Fixed percentage reduction for insurance and utility savings
    const insuranceSavings = insurance * 0.2;  // 20% savings on insurance
    const utilitySavings = utility * 0.15 * 12;  // 15% yearly savings on utilities (multiplied by 12 months)

    // Return the calculated values
    return { projectCost, insuranceSavings, utilitySavings };
}

// Function to display results dynamically below the original section
function displayResults() {
    const results = calculateResults();

    // Check if the results section already exists
    let resultsContainer = document.getElementById('results-section');
    
    // If the results section doesn't exist, create it
    if (!resultsContainer) {
        resultsContainer = document.createElement('div');
        resultsContainer.id = 'results-section';
        resultsContainer.classList.add('container');
        resultsContainer.style.marginTop = '80px';  // Add margin to separate sections

        // Create the left column (description)
        const leftColumn = document.createElement('div');
        leftColumn.classList.add('left-column');
        leftColumn.innerHTML = `
            <h2>Here’s what you could save with hurricane windows:</h2>
            <ul class="benefits-list">
                <li>Estimated project cost for your windows</li>
                <li>Fixed insurance savings of 20%</li>
                <li>Fixed utility savings of 15% yearly</li>
            </ul>
        `;

        // Create the right column for results
        const rightColumn = document.createElement('div');
        rightColumn.classList.add('right-column', 'result-section');
        rightColumn.innerHTML = `
            <h2>Your Results</h2>
            <div class="result-item">
                <p>Estimated Project Cost</p>
                <p id="project-cost" class="result-value"></p>
            </div>
            <div class="result-item">
                <p>Insurance Savings</p>
                <p id="insurance-savings" class="result-value"></p>
            </div>
            <div class="result-item">
                <p>Utility Savings</p>
                <p id="utility-savings" class="result-value"></p>
            </div>
            <button class="btn-personalized-offer">Get my personalized offers</button>
            <a href="#" class="edit-entries-link">Edit my entries</a>
        `;

        // Append the columns to the results container
        resultsContainer.appendChild(leftColumn);
        resultsContainer.appendChild(rightColumn);

        // Append the results container below the first section
        const mainContainer = document.querySelector('.container');
        mainContainer.parentNode.insertBefore(resultsContainer, mainContainer.nextSibling);

        // Create disclaimer text below the results section
        const disclaimerText = document.createElement('div');
        disclaimerText.classList.add('disclaimer-text');
        disclaimerText.style.marginTop = '80px';  // Add margin between the results and disclaimer
        disclaimerText.innerHTML = `
            <p>This calculator provides estimated costs and savings for hurricane windows based on your inputs. The results are for illustrative purposes only and do not guarantee the final cost or savings. Actual costs may vary based on the specific details of your project, material prices, installation costs, and local conditions. For an accurate estimate, please consult with a professional contractor or window installer. Insurance and utility savings are approximate and will depend on your specific policy and utility provider.</p>
        `;

        // Append the disclaimer below the results
        resultsContainer.parentNode.insertBefore(disclaimerText, resultsContainer.nextSibling);
    }

    // Update the values in the existing results section
    document.getElementById('project-cost').textContent = formatCurrency(results.projectCost);
    document.getElementById('insurance-savings').textContent = formatCurrency(results.insuranceSavings);
    document.getElementById('utility-savings').textContent = formatCurrency(results.utilitySavings);
}

// Event listener for the Calculate button
calculateButton.addEventListener('click', (e) => {
    e.preventDefault();
    displayResults(); // Call the function to display or update results
});
