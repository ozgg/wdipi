document.addEventListener('DOMContentLoaded', () => {
  const widget = document.querySelector('.widget')
  let items
  const storedItems = localStorage.getItem('items')
  if (storedItems !== null) {
    items = new Map(JSON.parse(storedItems))
  } else {
    items = new Map()
  }

  const populate = (list:HTMLElement) => {
    list.innerHTML = ''
    items.keys().forEach((item) => {
      const option = document.createElement('option')
      option.value = item
      list.appendChild(option)
    })
  }

  const putItem = (item:String, place:String) => {
    if (place) {
      items.set(item, place)
    } else {
      items.delete(item)
    }
    localStorage.setItem('items', JSON.stringify(Array.from(items.entries())))
  }

  if (widget) {
    const applyButton = widget.querySelector('button.apply')
    const itemField:HTMLInputElement|null = widget.querySelector('input[name="item"]')
    const placeField:HTMLInputElement|null = widget.querySelector('input[name="place"]')
    const list = document.getElementById('items')

    if (list && applyButton && itemField && placeField && list) {
      populate(list)

      itemField.addEventListener('input', e => {
        if (items.has(itemField.value)) {
          placeField.value = items.get(itemField.value)
        } else {
          placeField.value = ''
        }
      })

      applyButton.addEventListener('click', () => {
        if (itemField.value) {
          putItem(itemField.value, placeField.value)
          populate(list)
        }
        itemField.value = ''
        placeField.value = ''
      })
    }
  }
})
