document.addEventListener("DOMContentLoaded", () => {
  const dogs = window.data;

  const dogsList = document.querySelector(".dogs-list");
  const dogSection = document.querySelector(".main__dog-section");
  const addButton = document.querySelector(".dogs-list__button--add");

  // Render buttons
  function renderButtons() {
    dogsList.innerHTML = ""; // Clear previous buttons, including the add button

    // Re-add the plus button
    const plusButton = document.createElement("li");
    plusButton.className = "dogs-list__button dogs-list__button--add";
    plusButton.textContent = "+";
    plusButton.addEventListener("click", showAddDogForm);
    dogsList.appendChild(plusButton);

    // Add dog buttons
    dogs.forEach((dog) => {
      const listItem = document.createElement("li");
      listItem.className = "dogs-list__button";
      listItem.textContent = dog.name;
      listItem.addEventListener("click", () => handleDogClick(dog));
      dogsList.appendChild(listItem);
    });
  }

  // Handle button click
  function handleDogClick(dog) {
    console.log(dog.name);
    renderDogCard(dog);
  }

  // Render the dog card
  function renderDogCard(dog) {
    dogSection.innerHTML = ""; // Clear the card content

    // Create the dog name
    const dogName = document.createElement("h2");
    dogName.textContent = dog.name;

    dogSection.appendChild(dogName); // Add the dog name to the card

    // Create the dog image
    const dogImage = document.createElement("img");
    dogImage.src = dog.image;
    dogImage.alt = dog.name;

    dogSection.appendChild(dogImage); // Add the dog image to the card

    // Create the dog bio
    const dogBio = document.createElement("p");
    dogBio.textContent = dog.bio;

    dogSection.appendChild(dogBio); // Add the dog bio to the card

    // Create the dog status
    const dogStatus = document.createElement("p");
    dogStatus.textContent = dog.isGoodDog
      ? "Is Naughty? No!"
      : "Is Naughty? Yes!";

    dogSection.appendChild(dogStatus); // Add the dog status to the card

    // Create toggle button for good/bad dog status
    const toggleButton = document.createElement("button");
    toggleButton.textContent = dog.isGoodDog ? "Bad Dog" : "Good Dog";
    toggleButton.addEventListener("click", () => {
      dog.isGoodDog = !dog.isGoodDog;
      renderDogCard(dog); // Re-render the card to reflect the updated status
    });

    dogSection.appendChild(toggleButton); // Add the toggle button to the card
  }

  // Show the form to add a new dog
  function showAddDogForm() {
    dogSection.innerHTML = ""; // Clear the current dog card

    const form = document.createElement("form");
    form.className = "form";
    form.innerHTML = `
            <h2>Add a New Dog</h2>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" required><br>
            <label for="bio">Bio:</label>
            <textarea id="bio" name="bio" required></textarea><br>
            <label for="image">Image URL:</label>
            <input type="url" id="image" name="image" required><br>
            <label for="isGoodDog">Is Good Dog:</label>
            <input type="checkbox" id="isGoodDog" name="isGoodDog"><br>
            <input type="submit" id="submit" name="submit" value="Let's add a dog!" class="form__button">
        `;
    dogSection.appendChild(form);

    // Handle form submission
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const newDog = {
        id: dogs.length + 1,
        name: form.name.value,
        bio: form.bio.value,
        image: form.image.value,
        isGoodDog: form.isGoodDog.checked,
      };
      addNewDog(newDog);
    });
  }

  // Add the new dog to the list and re-render buttons
  function addNewDog(dog) {
    dogs.unshift(dog);
    renderButtons();
    renderDogCard(dog);
  }

  // Initialize
  renderButtons();
});
