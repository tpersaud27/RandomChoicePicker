// These are the user inputs, also known was the tags
const userTags = document.querySelector('#tags');
// Textarea
const textArea = document.querySelector('#textarea');

// This will put the cursor in the text area in the beginning for us 
textArea.focus()

// This event listener will check for when the user lets go of the key being pressed
textArea.addEventListener('keyup', (event)=>{
  createTags(event.target.value);

  // Check to see if the user clicks enter
  if(event.key === 'Enter'){
    // We will wait 10 miliseconds before clearing the value
    setTimeout(()=>{
      event.target.value = '';
    },10)
    
    randomSelect();
  }

  
})

function createTags(input){

  // Here we are splitting the input into an array and we filter out any elements where after we trim them are empty strings and then map the elements after they are trimmed into an array called tags
  const tags = input.split(',').filter(tag => tag.trim() !== '').map(tag => tag.trim())


  //  We start off by clearning the text
  userTags.innerHTML = '';
  // Loop through the tags that are entered
  for(let tag of tags){
    // Create a new html spam element for the tag
    const tagElement = document.createElement('span');
    // Add the class of tag to the new element
    tagElement.classList.add('tag');
    // Set the innerText of the element to the tag (user input)
    tagElement.innerText = tag;
    // Now we append each span element to the tags div 
    userTags.appendChild(tagElement);
    
  }
}

function randomSelect(){
  // This is the number of times each choice will be highlighted before stopping
  const times = 30;

  // This is responsible for going through the tags and choosing one of them
  // This will be the interval in which the choice is being highlighted
  const interval = setInterval(()=>{
    
    // This will choose a randomTag
    const randomTag = pickRandomTag();
    // Highlights the randomly chosen tag
    highlightTag(randomTag);

    // Time interval to unhighlight the tag
    setTimeout(()=>{
      unhightlightTag(randomTag);
    },100)
    
  },100)

  // This is responsible for stopping the previous timeout and picking a tag element
  setTimeout(()=>{
    // Stops the interval
    clearInterval(interval)

    // Picking a random tag to land on and highlight
    setTimeout(()=>{
      const randomTag = pickRandomTag()

      highlightTag(randomTag)
    }, 100)
  }, times * 100)
  
}

function pickRandomTag(){
  // querySelectorAll returns a node list similar to an array, so we can index the elements in that list
  const tags = document.querySelectorAll('.tag')
  // This will return a random tag indexed from the list
  return tags[Math.floor(Math.random()*tags.length)]
}

// This adds the highlight class to a tag element
function highlightTag(tag){
  tag.classList.add('highlight')
}
// This removes a highlight class from a tag element
function unhightlightTag(tag){
  tag.classList.remove('highlight')
}