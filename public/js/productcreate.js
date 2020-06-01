// eslint-disable-next-line no-undef
$(document).ready(function () {
    // Getting jQuery references to the post body, title, form, and author select
    // eslint-disable-next-line no-undef
    var nameInput = $('#name')
    // eslint-disable-next-line no-undef
    var descriptionInput = $('#description')
    // eslint-disable-next-line no-undef
    var cmsForm = $('#cms')
    // eslint-disable-next-line no-undef
    var priceInput = $('#price')
    // eslint-disable-next-line no-undef
    var pictureInput = $('#picture')
    // Adding an event listener for when the form is submitted
    // eslint-disable-next-line no-undef
    $(cmsForm).on('submit', handleFormSubmit)
    // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
    // var url = window.location.search
    var postId
    // Sets a flag for whether or not we're updating a post to be false initially
    var updating = false
  
    // A function for handling what happens when the form to create a new post is submitted
    function handleFormSubmit (event) {
      event.preventDefault()
      // Wont submit the post if we are missing a description,price,picture,name
      if (
        !nameInput.val().trim() ||
          !descriptionInput.val().trim() ||
          !priceInput.val().trim() ||
          !pictureInput.val().trim() ||
          !nameInput.val().trim()
      ) {
        return
      }
      // Constructing a newPost object to hand to the database
      var newProduct = {
        name: nameInput.val().trim(),
        description: descriptionInput.val().trim(),
        price: priceInput.val().trim(),
        picture: pictureInput.val().trim()
      }
  
      // If we're updating a post run updatePost to update a post
      // Otherwise run submitPost to create a whole new post
      if (updating) {
        newProduct.id = postId
        updatePost(newProduct)
      } else {
        submitPost(newProduct)
      }
    }
  
    // Submits a new post and brings user to blog page upon completion
    function submitPost (post) {
      // eslint-disable-next-line no-undef
      $.post('/productcreate', post, function () {
        window.location.href = '/'
      })
    }
  
    // Update a given post, bring user to the blog page when done
    function updatePost (post) {
      // eslint-disable-next-line no-undef
      $.ajax({
        method: 'POST',
        url: '/productcreate/' + post.id,
        data: post
      }).then(function () {
        window.location.href = '/'
      })
    }
  })