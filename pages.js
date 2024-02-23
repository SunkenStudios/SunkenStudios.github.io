
        // Function to fetch JSON data and create clickable boxes
        async function createClickableBoxesFromJSON() {
            try {
                const response = await fetch('./pages.json');
                const data = await response.json();

                data.forEach(page => {
                    createClickableBox(page.pageName, page.pageDescription, page.thumb, page.directory);
                });
            } catch (error) {
                console.error('Error fetching or parsing JSON:', error);
            }
        }

        // Function to create a clickable box
        function createClickableBox(title, description, imageUrl, linkUrl) {
            // Create elements
            var box = document.createElement('div');
            var content = document.createElement('div');
            var titleElement = document.createElement('h2');
            var descriptionElement = document.createElement('p');
            var imageElement = document.createElement('img');
            // Set content and attributes
            titleElement.textContent = title;
            descriptionElement.textContent = description;
            imageElement.src = imageUrl;
            imageElement.alt = title;
            imageElement.onclick = function() {
                window.location.href = linkUrl;
            };

            // Append elements
            content.appendChild(titleElement);
            content.appendChild(descriptionElement);
            box.appendChild(content);
            box.appendChild(imageElement);

            // Style elements
            box.classList.add('box');
            content.classList.add('content');

            // Append box to container
            document.getElementById('container').appendChild(box);
        }

        // Call the function to create clickable boxes from JSON data
        createClickableBoxesFromJSON();