// script.js
document.addEventListener('DOMContentLoaded', () => {
    const addNodeButton = document.getElementById('addNode');
    const deleteNodeButton = document.getElementById('deleteNode');
    const resetListButton = document.getElementById('resetList');
    const nodeValueInput = document.getElementById('nodeValue');
    const linkedListContainer = document.getElementById('linkedList');
    const feedback = document.getElementById('feedback');
  
    // Function to display feedback messages
    const showFeedback = (message, type = 'error') => {
      feedback.textContent = message;
      feedback.style.color = type === 'error' ? '#d9534f' : '#5cb85c';
      setTimeout(() => {
        feedback.textContent = '';
      }, 2000);
    };
  
    // Function to add a new node
    addNodeButton.addEventListener('click', () => {
      const value = nodeValueInput.value.trim();
  
      if (value === '') {
        showFeedback('Please enter a value for the node.');
        return;
      }
  
      // Create a new node
      const node = document.createElement('div');
      node.className = 'node';
      node.textContent = value;
  
      // Create an arrow if there are existing nodes
      if (linkedListContainer.children.length > 0) {
        const arrow = document.createElement('div');
        arrow.className = 'arrow';
        linkedListContainer.appendChild(arrow);
      }
  
      // Append the node to the linked list container
      linkedListContainer.appendChild(node);
      nodeValueInput.value = ''; // Clear the input field
      showFeedback('Node added successfully!', 'success');
    });
  
    // Function to delete the last node
    deleteNodeButton.addEventListener('click', () => {
      const children = linkedListContainer.children;
      if (children.length === 0) {
        showFeedback('No nodes to delete!');
        return;
      }
  
      // Remove the last node and its preceding arrow (if any)
      if (children.length > 1) {
        linkedListContainer.removeChild(children[children.length - 1]); // Remove the last node
        linkedListContainer.removeChild(children[children.length - 1]); // Remove the arrow
      } else {
        linkedListContainer.removeChild(children[0]); // Remove the last remaining node
      }
  
      showFeedback('Node deleted successfully!', 'success');
    });
  
    // Function to reset the linked list
    resetListButton.addEventListener('click', () => {
      linkedListContainer.innerHTML = '';
      showFeedback('Linked list cleared!', 'success');
    });
  });