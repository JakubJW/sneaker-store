export const state = () => ({
  products: [
    { 
      id: 0, 
      name: 'Nike React Infinity Run Flyknit 3', 
      price: '749,99zł', 
      category: 'Bieganie', 
      image: require('@/assets/NikeReactInfinityRunFlyknit3.webp'), 
      quantity: 0, 
      
  },

    { 
      id: 1, 
      name: 'Nike ZoomX Vaporfly NEXT% 2 Ekiden', 
      price: '1229,99zł', 
      category: 'Bieganie', 
      image: require('@/assets/NikeZoomXVaporflyNEXT2Ekiden.webp'), 
      
  },

    { 
      id: 2, 
      name: "Nike Blazer Mid '77",
      price: '469,99zł', 
      category: 'Lifestyle', 
      image: require('@/assets/NikeBlazerMid77.webp'), 
      quantity: 0, 
      
    },

    { 
      id: 3, 
      name: 'Nike Air Max Pre-Day', 
      price: '629,99zł', 
      category: 'Lifestyle', 
      image: require('@/assets/NikeAirMaxPreDay.webp'), 
      quantity: 0, 
       
    },

    { 
      id: 4, 
      name: 'Nike Crater Impact', 
      price: '529,99zł', 
      category: 'Lifestyle', 
      image: require('@/assets/NikeCraterImpact.webp'), 
      quantity: 0, 
      
    },

    { 
      id: 5,
      name: 'Nike Air Max Bolt', 
      price: '429,99zł', 
      category: 'Lifestyle', 
      image: require('@/assets/NikeAirMaxBolt.webp'), 
      quantity: 0, 
      
    },

    { 
      id: 6, 
      name: 'Nike Air Zoom Pegasus 39', 
      price: '549,99zł', 
      category: 'Bieganie', 
      image: require('@/assets/NikeAirZoomPegasus39.webp'), 
      quantity: 0, 
      
    },

    { 
      id: 7, 
      name: 'Nike Air Zoom Vomero 16', 
      price: '699,99zł', 
      category: 'Bieganie', 
      image: require('@/assets/NikeAirZoomVomero16.webp'), 
      quantity: 0, 
      
    },

    { 
      id: 8, 
      name: 'Nike Winflo 8', 
      price: '469,99zł', 
      category: 'Bieganie', 
      image: require('@/assets/NikeWinflo8.webp'), 
      quantity: 0,
      
    },

    { 
      id: 9, 
      name: 'Jordan One Take 3', 
      price: '469,99zł', 
      category: 'Koszykówka', 
      image: require('@/assets/JordanOneTake3.webp'), 
      quantity: 0, 
       
    },

    { 
      id: 10, 
      name: 'KD Trey 5 IX', 
      price: '329,97zł', 
      category: 'Koszykówka', 
      image: require('@/assets/KDTrey5IXwebp.webp'), 
      quantity: 0, 
      
    }
  ]
})

export const getters = {

  inFavs (state) {
    return state.products.filter(product => product.inFavs)
  },

  productsFilter: (rootState) => (category) => {
    if(!category) { 
      return rootState.essa.products
    } else { 
      return rootState.essa.products.filter(product => product.category === category) 
    }
  },

  search: state => (name) => {
    return state.products.filter(product => product.name.toUpperCase().match(name.toUpperCase()))
  },

  dialog: (state) => (value) => {
    return state.products.find( product => product.id === value)
  }
}

export const mutations = {
  addToFavs: (state, payload) => {
    state.products[payload].inFavs = true
  },

  removeFromFavs: (state, payload) => {
    state.products[payload].inFavs = false
  },
}

export const actions = {
  addToFavs: (context, payload) => {
    context.commit('addToFavs', payload)
  },

  removeFromFavs: (context, payload) => {
    context.commit('removeFromFavs', payload)
  },
}

export const modules = {
  cart: {
    namespaced: true,
    state: () => ({
      items: []
    }),

    getters: {
      cartProducts: (state, getters, rootState) => {
        return state.items.map(({ id, quantity, size }) => {
          const product = rootState.essa.products.find(product => product.id === id) 
          return {
            id: product.id,
            name: product.name,
            price: product.price,
            category: product.category,
            image: product.image,
            quantity,
            size
          }
        })
      }
    },

    actions: {
      addProduct({state, commit}, {product, size}) {
        const cartItem = state.items.find(item => item.id === product.id && item.size === size)
        if(!cartItem) {
          commit('pushProductToCart', { id: product.id, size: size } )
        } else {
          commit('incrementQuantity', cartItem)
        }
      },

      removeProduct({state, commit}, product) {
        const cartItem = state.items.find(item => item.id === product.id)
        if(cartItem.quantity===1) {
          commit('removeProductFromCart', cartItem)
        } else {
          commit('decrementQuantity', cartItem)
        }
      }
    },

    mutations: {
      pushProductToCart(state, { id, size }) {
        state.items.push({
          id,
          quantity: 1,
          size: size
        })
      },

      removeProductFromCart(state, product) {
        const cartItem = state.items.find(item => item.id === product.id)
        state.items.splice(state.items.indexOf(cartItem), 1)
      },

      decrementQuantity(state, { id }) {
        const cartItem = state.items.find(item => item.id ===id)
        cartItem.quantity--
      },

      setItemSize(state, { id, size } ) {
        const cartItem = state.items.find(item => item.id === id)
        cartItem.size = size
      },

      incrementQuantity (state, { id, size }) {
        const cartItem = state.items.find(item => item.id === id && item.size === size)
        cartItem.quantity++
      },

      setCartItems (state, {items}) {
        state.items = items
      }
    }
  }
}
