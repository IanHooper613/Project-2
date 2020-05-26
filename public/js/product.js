$(document).ready(function () {
    /* global moment */
  
    // blogContainer holds all of our items
    var blogContainer = $('.blog-container')
    var itemCategorySelect = $('#category')
    // Click events for the edit and delete buttons
    $(document).on('click', 'button.delete', handleitemDelete)
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
      var newitemCard = $('<div>')
      newitemCard.addClass('card')
      var newitemCardHeading = $('<div>')
      newitemCardHeading.addClass('card-header')
      var deleteBtn = $('<button>')
      deleteBtn.text('x')
      deleteBtn.addClass('delete btn btn-danger')
      var editBtn = $('<button>')
      editBtn.text('EDIT')
      editBtn.addClass('edit btn btn-info')
      var newitemTitle = $('<h2>')
      var newitemDate = $('<small>')
      var newitemfarmer = $('<h5>')
      newitemfarmer.text('Written by: ' + item.farmer.name)
      newitemfarmer.css({
        float: 'right',
        color: 'blue',
        'margin-top': '-10px'
      })
      var newitemCardBody = $('<div>')
      newitemCardBody.addClass('card-body')
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
      var currentitem = $(this)
        .parent()
        .parent()
        .data('item')
      deleteitem(currentitem.id)
    }
  
    // This function figures out which item we want to edit and takes it to the appropriate url
    function handleitemEdit () {
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