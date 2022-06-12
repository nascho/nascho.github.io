/* todo list */

// add item to list, grab form
const addForm = document.querySelector('.add');
// ul
const list = document.querySelector('.todos');
// .search[input] to access the input directly not the search form inself
const search = document.querySelector('.search input');

addForm.addEventListener('submit', (e) => {

  e.preventDefault();

  // html template which will be added to the browser to create a new entry
  // generate a html template and output the todo variable inside it
  const generateTemplate = (todo) => {
    
    const html = `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${todo}</span>
        <i class="far fa-trash-alt delete"></i>
      </li>
    `;

    // inject li/html into the ul
    list.innerHTML += html;
  };

  // add the value inputted into a variable, addInput is the name of the form input field, .trim() removes any white spaces before and after the string value
  const todo = addForm.addInput.value.trim();
  // console.log(todo);

  // check that there is a value length in the field before adding to the list, if 1+ === true, if 0- === false

  if(todo.length) {
    generateTemplate(todo);
    // clear the form by resetting all the input fields
    addForm.reset();
  };

});

// using event delegation and adding eventlistener to the ul to delete li not on li as unnecessary for js to check every li

list.addEventListener('click', (e) => {

  // check to see if the target element that has been clicked contains a class called 'delete'
  if(e.target.classList.contains('delete')) {
    // the parentElement of the <i> (fontawesome icon) is the li to be deleted
    e.target.parentElement.remove();
  };

});


/* filtering todo's */

// search function, to match pattern against the ul/li and filter them
const filterTodos = (term) => {
  /*
  //rtn a ul/li with there input in a htmlCollection
  console.log(list.children);
  */
  /*
  // converted above to array, so able to access array methods
  console.log(Array.from(list.children));
  */
  // chain array methods together to match patterns in the li's, will rtn a new array of true/matching items
  Array.from(list.children)
    .filter((todo) => {
      // this is a ISNOT match as ! used before hand as I want an array of non match's as I want to add a class to remove the entry
      return !todo.textContent.toLowerCase().includes(term);
    })
    // run a forEach on each element within the array and add a class to display: none.
    .forEach((todo) => {
      todo.classList.add('filtered');
    })

    // new array of matching filtered elements - what this does is if class filtered added and when charactered deleted from the seach input originally filtered was not removed however, with this will remove
    Array.from(list.children)
      .filter((todo) => todo.textContent.toLowerCase().includes(term))
      .forEach((todo) => todo.classList.remove('filtered'));
};

// keyup event
search.addEventListener('keyup', (e) => {
  
  // select and trim the value that is inputted into the input field
  const term = search.value.trim().toLowerCase();

  filterTodos(term);
});
