// eslint-disable-next-line no-undef
$(document).ready(function () {
  // Getting jQuery references to the item body, title, form, and farmer select
  // eslint-disable-next-line no-undef
  var bodyInput = $('#body')
  // eslint-disable-next-line no-undef
  var titleInput = $('#title')
  // eslint-disable-next-line no-undef
  var groceryForm = $('#grocery')
  // eslint-disable-next-line no-undef
  var farmerSelect = $('#farmer')
  // Adding an event listener for when the form is submitted
  // eslint-disable-next-line no-undef
  $(groceryForm).on('submit', handleFormSubmit)
  // Gets the part of the url that comes after the "?" (which we have if we're updating a item)
  var url = window.location.search
  var itemId
  var farmerId
  // Sets a flag for whether or not we're updating a item to be false initially
  var updating = false

  // If we have this section in our url, we pull out the item id from the url
  // In '?item_id=1', itemId is 1
  if (url.indexOf('?item_id=') !== -1) {
    itemId = url.split('=')[1]
    getitemData(itemId, 'item')
  // eslint-disable-next-line brace-style
  }
  // Otherwise if we have an farmer_id in our url, preset the farmer select box to be our farmer
  else if (url.indexOf('?farmer_id=') !== -1) {
    farmerId = url.split('=')[1]
  }

  // Getting the farmers, and their items
  getfarmers()

  // A function for handling what happens when the form to create a new item is submitted
  function handleFormSubmit (event) {
    event.preventDefault()
    // Wont submit the item if we are missing a body, title, or farmer
    if (
      !titleInput.val().trim() ||
        !bodyInput.val().trim() ||
        !farmerSelect.val()
    ) {
      return
    }
    // Constructing a newitem object to hand to the database
    var newitem = {
      title: titleInput.val().trim(),
      body: bodyInput.val().trim(),
      farmerId: farmerSelect.val()
    }

    // If we're updating a item run updateitem to update a item
    // Otherwise run submititem to create a whole new item
    if (updating) {
      newitem.id = itemId
      updateitem(newitem)
    } else {
      submititem(newitem)
    }
  }

  // Submits a new item and brings user to blog page upon completion
  function submititem (item) {
    // eslint-disable-next-line no-undef
    $.item('/api/items', item, function () {
      window.location.href = '/blog'
    })
  }

  // Gets item data for the current item if we're editing, or if we're adding to an farmer's existing items
  function getitemData (id, type) {
    var queryUrl
    switch (type) {
      case 'item':
        queryUrl = '/api/items/' + id
        break
      case 'farmer':
        queryUrl = '/api/farmers/' + id
        break
      default:
        return
    }
    // eslint-disable-next-line no-undef
    $.get(queryUrl, function ({ data }) {
      if (data) {
        console.log(data.farmerId || data.id)
        // If this item exists, prefill our grocery forms with its data
        titleInput.val(data.title)
        bodyInput.val(data.body)
        farmerId = data.farmerId || data.id
        // If we have a item with this id, set a flag for us to know to update the item
        // when we hit submit
        updating = true
      }
    })
  }

  // A function to get farmers and then render our list of farmers
  function getfarmers () {
    // eslint-disable-next-line no-undef
    $.get('/api/farmers', renderfarmerList)
  }
  // Function to either render a list of farmers, or if there are none, direct the user to the page
  // to create an farmer first
  function renderfarmerList ({ data }) {
    if (!data.length) {
      window.location.href = '/farmers'
    }
    var rowsToAdd = []
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createfarmerRow(data[i]))
    }
    farmerSelect.empty()
    console.log(rowsToAdd)
    console.log(farmerSelect)
    farmerSelect.append(rowsToAdd)
    farmerSelect.val(farmerId)
  }

  // Creates the farmer options in the dropdown
  function createfarmerRow (farmer) {
    // eslint-disable-next-line no-undef
    var listOption = $('<option>')
    listOption.attr('value', farmer.id)
    listOption.text(farmer.name)
    return listOption
  }

  // Update a given item, bring user to the blog page when done
  function updateitem (item) {
    // eslint-disable-next-line no-undef
    $.ajax({
      method: 'PUT',
      url: '/api/items/' + item.id,
      data: item
    }).then(function () {
      window.location.href = '/blog'
    })
  }
})
