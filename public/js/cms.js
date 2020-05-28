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
  var url = window.location.search
  var postId
  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false

  // If we have this section in our url, we pull out the post id from the url
  // In '?post_id=1', postId is 1
  if (url.indexOf('?post_id=') !== -1) {
    postId = url.split('=')[1]
    getPostData(postId, 'post')
  // eslint-disable-next-line brace-style
  }
  // Otherwise if we have an author_id in our url, preset the author select box to be our Author
  else if (url.indexOf('?author_id=') !== -1) {
    console.log('there is a problem')
  }

  // Getting the authors, and their posts
  getAuthors()

  // A function for handling what happens when the form to create a new post is submitted
  function handleFormSubmit (event) {
    event.preventDefault()
    // Wont submit the post if we are missing a body, title, or author
    if (
      !nameInput.val().trim() ||
        !descriptionInput.val().trim() ||
        !priceInput.val().trim() ||
        !pictureInput.val().trim()
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
    $.post('/posts', post, function () {
      window.location.href = '/'
    })
  }

  // Gets post data for the current post if we're editing, or if we're adding to an author's existing posts
  function getPostData (id, type) {
    var queryUrl
    switch (type) {
      case 'post':
        queryUrl = '/posts/' + id
        break

      default:
        return
    }
    // eslint-disable-next-line no-undef
    $.get(queryUrl, function ({ data }) {
      if (data) {
        console.log(data.AuthorId || data.id)
        // If this post exists, prefill our cms forms with its data
        nameInput.val(data.name)
        descriptionInput.val(data.description)
        priceInput.val(data.price)
        pictureInput.val(data.picture)
        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
        updating = true
      }
    })
  }

  // A function to get Authors and then render our list of Authors
  function getAuthors () {
    // eslint-disable-next-line no-undef
    $.get('/posts', renderAuthorList)
  }

  // Update a given post, bring user to the blog page when done
  function updatePost (post) {
    // eslint-disable-next-line no-undef
    $.ajax({
      method: 'PUT',
      url: '/posts/' + post.id,
      data: post
    }).then(function () {
      window.location.href = '/blog'
    })
  }
})
