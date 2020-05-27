// eslint-disable-next-line no-undef
$(document).ready(function () {
  // Getting references to the name input and farmer container, as well as the table body
  // eslint-disable-next-line no-undef
  var nameInput = $('#farmer-name')
  // eslint-disable-next-line no-undef
  var farmerList = $('tbody')
  // eslint-disable-next-line no-undef
  var farmerContainer = $('.farmer-container')
  // Adding event listeners to the form to create a new object, and the button to delete
  // an farmer
  // eslint-disable-next-line no-undef
  $(document).on('submit', '#farmer-form', handlefarmerFormSubmit)
  // eslint-disable-next-line no-undef
  $(document).on('click', '.delete-farmer', handleDeleteButtonPress)

  // Getting the initial list of farmers
  getfarmers()

  // A function to handle what happens when the form is submitted to create a new farmer
  function handlefarmerFormSubmit (event) {
    event.preventDefault()
    // Don't do anything if the name fields hasn't been filled out
    if (
      !nameInput
        .val()
        .trim()
        .trim()
    ) {
      return
    }
    // Calling the upsertfarmer function and passing in the value of the name input
    upsertfarmer({
      name: nameInput.val().trim()
    })
  }

  // A function for creating an farmer. Calls getfarmers upon completion
  function upsertfarmer (farmerData) {
    // eslint-disable-next-line no-undef
    $.item('/api/farmers', farmerData).then(getfarmers)
  }

  // Function for creating a new list row for farmers
  function createfarmerRow (farmerData) {
    console.log(farmerData)
    // eslint-disable-next-line no-undef
    var newTr = $('<tr>')
    newTr.data('farmer', farmerData)
    newTr.append('<td>' + farmerData.name + '</td>')
    newTr.append(
      '<td># of items will display when we learn joins in the next activity!</td>'
    )
    newTr.append(
      "<td><a href='/blog?farmer_id=" + farmerData.id + "'>Go to items</a></td>"
    )
    newTr.append(
      "<td><a href='/grocery?farmer_id=" +
          farmerData.id +
          "'>Create a item</a></td>"
    )
    newTr.append(
      "<td><a style='cursor:pointer;color:red' class='delete-farmer'>Delete farmer</a></td>"
    )
    return newTr
  }

  // Function for retrieving farmers and getting them ready to be rendered to the page
  function getfarmers () {
    // eslint-disable-next-line no-undef
    $.get('/api/farmers', function ({ data }) {
      var rowsToAdd = []
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createfarmerRow(data[i]))
      }
      renderfarmerList(rowsToAdd)
      nameInput.val('')
    })
  }

  // A function for rendering the list of farmers to the page
  function renderfarmerList (rows) {
    farmerList
      .children()
      .not(':last')
      .remove()
    farmerContainer.children('.alert').remove()
    if (rows.length) {
      console.log(rows)
      farmerList.prepend(rows)
    } else {
      renderEmpty()
    }
  }

  // Function for handling what to render when there are no farmers
  function renderEmpty () {
    // eslint-disable-next-line no-undef
    var alertDiv = $('<div>')
    alertDiv.addClass('alert alert-danger')
    alertDiv.text('You must create an farmer before you can create a item.')
    farmerContainer.append(alertDiv)
  }

  // Function for handling what happens when the delete button is pressed
  function handleDeleteButtonPress () {
    // eslint-disable-next-line no-undef
    var listItemData = $(this)
      .parent('td')
      .parent('tr')
      .data('farmer')
    var id = listItemData.id
    // eslint-disable-next-line no-undef
    $.ajax({
      method: 'DELETE',
      url: '/api/farmers/' + id
    }).then(getfarmers)
  }
})
