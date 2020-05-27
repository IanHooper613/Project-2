// eslint-disable-next-line no-undef
$(document).ready(function () {
  /* global moment */

  // blogContainer holds all of our items
  // eslint-disable-next-line no-undef
  var blogContainer = $('.blog-container')
  // eslint-disable-next-line no-undef
  var itemCategorySelect = $('#category')
  // Click events for the edit and delete buttons
  // eslint-disable-next-line no-undef
  $(document).on('click', 'button.delete', handleitemDelete)
  // eslint-disable-next-line no-undef
  $(document).on('click', 'button.edit', handleitemEdit)
  // Variable to hold our items
  var items

  // The code below handles the case where we want to get blog items for a specific farmer
  // Looks for a query param in the url for farmer_id
  var url = window.location.search
  var farmerId
  if (url.indexOf('?farmer_id=') !== -1) {
    farmerId = url.split('=')[1]
    getitems(farmerId)
  // eslint-disable-next-line brace-style
  }
  // If there's no farmerId we just get all items as usual
  else {
    getitems()
  }

  // This function grabs items from the database and updates the view
  function getitems (farmer) {
    farmerId = farmer || ''
    if (farmerId) {
      farmerId = '/?farmer_id=' + farmerId
    }
    // eslint-disable-next-line no-undef
    $.get('/api/items' + farmerId, function ({ data }) {
      console.log('items', data)
      items = data
      if (!items || !items.length) {
        displayEmpty(farmer)
      } else {
        initializeRows()
      }
    })
  }

  // This function does an API call to delete items
  function deleteitem (id) {
    // eslint-disable-next-line no-undef
    $.ajax({
      method: 'DELETE',
      url: '/api/items/' + id
    }).then(function () {
      getitems(itemCategorySelect.val())
    })
  }

  // InitializeRows handles appending all of our constructed item HTML inside blogContainer
  function initializeRows () {
    blogContainer.empty()
    var itemsToAdd = []
    for (var i = 0; i < items.length; i++) {
      itemsToAdd.push(createNewRow(items[i]))
    }
    blogContainer.append(itemsToAdd)
  }

  // This function constructs a item's HTML
  function createNewRow (item) {
    var formattedDate = new Date(item.createdAt)
    formattedDate = moment(formattedDate).format('MMMM Do YYYY, h:mm:ss a')
    // eslint-disable-next-line no-undef
    var newitemCard = $('<div>')
    newitemCard.addClass('card')
    // eslint-disable-next-line no-undef
    var newitemCardHeading = $('<div>')
    newitemCardHeading.addClass('card-header')
    // eslint-disable-next-line no-undef
    var deleteBtn = $('<button>')
    deleteBtn.text('x')
    deleteBtn.addClass('delete btn btn-danger')
    // eslint-disable-next-line no-undef
    var editBtn = $('<button>')
    editBtn.text('EDIT')
    editBtn.addClass('edit btn btn-info')
    // eslint-disable-next-line no-undef
    var newitemTitle = $('<h2>')
    // eslint-disable-next-line no-undef
    var newitemDate = $('<small>')
    // eslint-disable-next-line no-undef
    var newitemfarmer = $('<h5>')
    newitemfarmer.text('Written by: ' + item.farmer.name)
    newitemfarmer.css({
      float: 'right',
      color: 'blue',
      'margin-top': '-10px'
    })
    // eslint-disable-next-line no-undef
    var newitemCardBody = $('<div>')
    newitemCardBody.addClass('card-body')
    // eslint-disable-next-line no-undef
    var newitemBody = $('<p>')
    newitemTitle.text(item.title + ' ')
    newitemBody.text(item.body)
    newitemDate.text(formattedDate)
    newitemTitle.append(newitemDate)
    newitemCardHeading.append(deleteBtn)
    newitemCardHeading.append(editBtn)
    newitemCardHeading.append(newitemTitle)
    newitemCardHeading.append(newitemfarmer)
    newitemCardBody.append(newitemBody)
    newitemCard.append(newitemCardHeading)
    newitemCard.append(newitemCardBody)
    newitemCard.data('item', item)
    return newitemCard
  }

  // This function figures out which item we want to delete and then calls deleteitem
  function handleitemDelete () {
    // eslint-disable-next-line no-undef
    var currentitem = $(this)
      .parent()
      .parent()
      .data('item')
    deleteitem(currentitem.id)
  }

  // This function figures out which item we want to edit and takes it to the appropriate url
  function handleitemEdit () {
    // eslint-disable-next-line no-undef
    var currentitem = $(this)
      .parent()
      .parent()
      .data('item')
    window.location.href = '/grocery?item_id=' + currentitem.id
  }

  // This function displays a message when there are no items
  function displayEmpty (id) {
    var query = window.location.search
    var partial = ''
    if (id) {
      partial = ' for farmer #' + id
    }
    blogContainer.empty()
    // eslint-disable-next-line no-undef
    var messageH2 = $('<h2>')
    messageH2.css({ 'text-align': 'center', 'margin-top': '50px' })
    messageH2.html(
      'No items yet' +
          partial +
          ", navigate <a href='/grocery" +
          query +
          "'>here</a> in order to get started."
    )
    blogContainer.append(messageH2)
  }
})
