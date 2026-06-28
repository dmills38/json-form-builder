fetch("form.json") // gets the JSON file
    // then converts the response to JSON
    .then(response => response.json())
    .then(data => {
        document.getElementById("form-title").textContent = data.title;
        
        const form = document.getElementById("dynamic-form");

        // Loop through each field in the JSON data and create corresponding form elements
        data.fields.forEach(field => {
            const label = document.createElement("label");
            label.textContent = field.label;

            let input;

            if (field.type === "textarea") {
                input = document.createElement("textarea");
            } else {
                input = document.createElement("input");
                input.type = field.type;
            }

            input.id = field.id;

            form.appendChild(label);
            form.appendChild(document.createElement("br"));


            form.appendChild(input);

            const error = document.createElement("small");
            error.id = `${field.id}-error`;
            error.style.color = "red"; // Set the error message color to red

            form.appendChild(error);

            form.appendChild(document.createElement("br"));

            form.appendChild(document.createElement("br"));
        })

        const button = document.createElement("button");
        button.textContent = "Submit";
        button.type = "submit";

        form.appendChild(button);

        form.addEventListener("submit", (event) => {
            event.preventDefault(); // Prevent the default form submission behavior

            const formData = {};

            let isValid = true; // Flag to track overall form validity

            data.fields.forEach(field => {

                const value = document.getElementById(field.id).value;

                const inputEl = document.getElementById(field.id);

                const errorEl = document.getElementById(`${field.id}-error`);

                if (field.required && value.trim() === "") {

                    inputEl.style.border = "2px solid red"; // Highlight the input field with a red border
                    errorEl.textContent = `${field.label} is required.`; // Display an error message
                    isValid = false; // Set the flag to false if any required field is empty
                    
                } else {

                    inputEl.style.border = ""; // Reset the border if the field is valid
                    errorEl.textContent = ""; // Clear any previous error message
                    formData[field.id] = value; // Store the value in formData if valid
                    
                }

            })

            if (!isValid) {
                    console.log("Please fill in all required fields."); // Log a message if any required field is empty
                    return; // Exit the function early if any required field is empty
                }

            console.log(formData); // Log the form data to the console
        })

    })