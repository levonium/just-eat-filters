(() => {
  window.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0].url.match(/.*just-eat.*\/area\/.*/g)) {
        document.querySelector('.restaurant-filters').style.display = 'block'
        document.querySelector('.meal-filters').style.display = 'none'
      } else {
        document.querySelector('.restaurant-filters').style.display = 'none'
        document.querySelector('.meal-filters').style.display = 'block'
      }
    })
  })

  document.getElementById('filter-meals').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs[0].url.includes('just-eat')) {
        document.getElementById('message').style.display = 'block'
        return
      } else {
        document.getElementById('message').style.display = 'none'
        chrome.tabs.executeScript({ code:
          `
          document.querySelectorAll('.menuCard-category')
            .forEach(category => {
              let vegetarianMeals = 0
              category.querySelectorAll('.product.menu-product')
                .forEach(meal => {
                  const vegetarianMeal = meal.querySelector('.icon-product.icon-product--vegetarian')
                  vegetarianMeal ? vegetarianMeals++ : meal.style.display = 'none'
              })
              if (!vegetarianMeals) {
                category.style.display = 'none'
              }
            })
          `
        })
      }
    })
  })

  document.getElementById('reset-meals').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs[0].url.includes('just-eat')) {
        document.getElementById('message').style.display = 'block'
        return
      } else {
        document.getElementById('message').style.display = 'none'
        chrome.tabs.executeScript({  code:
          `
          document.querySelectorAll('.menuCard-category')
            .forEach(category => {
              category.style.display = 'block'
              category.querySelectorAll('.product.menu-product')
                .forEach(meal => meal.style.display = 'flex')
          })
          `
        })
      }
    })
  })

  document.getElementById('filter-restaurants').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs[0].url.includes('just-eat')) {
        document.getElementById('message').style.display = 'block'
        return
      } else {
        document.getElementById('message').style.display = 'none'
        chrome.tabs.executeScript({ code:
          `
          document.querySelectorAll('.c-listing').forEach(listing => {
            listing.querySelectorAll('.c-listing-item').forEach(section => {
              window.fetch(section.querySelector('a').href)
                .then(response => response.text())
                .then(html => {
                  section.style.backgroundColor = html.includes('vegetarian') ? '#67b959' : '#b94848'
                })
            })
          })
          `
        })
      }
    })
  })
})()
