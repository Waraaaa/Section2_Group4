// Get the select element and the container for the tags
const selectElement = document.getElementById('type-select');
const tagContainer = document.querySelector('.selected-category-tags');

// Listen for a change event on the select element
selectElement.addEventListener('change', function() {
  const selectedValue = selectElement.value;
  
  // If a valid category is selected and it's not already added, add it as a tag
  if (selectedValue && !isTagPresent(selectedValue)) {
    const tag = createTag(selectedValue);
    tagContainer.appendChild(tag);
  }
});

// Function to check if the tag already exists in the container
function isTagPresent(tagValue) {
  return Array.from(tagContainer.children).some(tag => tag.textContent.includes(tagValue));
}

// Function to create a new tag element
function createTag(tagValue) {
  const tag = document.createElement('div');
  tag.classList.add('tag');
  tag.textContent = tagValue;
  
  // Create the remove button
  const removeButton = document.createElement('button');
  removeButton.classList.add('remove');
  removeButton.textContent = '×';
  
  // Add click event to remove the tag
  removeButton.addEventListener('click', () => {
    tagContainer.removeChild(tag);
  });

  tag.appendChild(removeButton);
  return tag;
}
