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

            form.appendChild(document.createElement("br"));

            form.appendChild(document.createElement("br"));
        })

        const button = document.createElement("button");
        button.textContent = "Submit";

        form.appendChild(button);

        form.addEventListener("submit", (event) => {
            event.preventDefault(); // Prevent the default form submission behavior

            const formData = {};

            data.fields.forEach(field => {

                const value = document.getElementById(field.id).value;
                formData[field.id] = value;
            })

            console.log(formData); // Log the form data to the console
        })

    })