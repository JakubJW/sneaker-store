export const state = () => ({
  products: [
    { 
      id: 0, 
      name: 'Nike React Infinity Run Flyknit 3', 
      price: 749.99, 
      category: 'Bieganie', 
      image: require('@/assets/NikeReactInfinityRunFlyknit3.webp'), 
      quantity: 0, 
      
  },

    { 
      id: 1, 
      name: 'Nike ZoomX Vaporfly NEXT% 2 Ekiden', 
      price: 1229.99, 
      category: 'Bieganie', 
      image: require('@/assets/NikeZoomXVaporflyNEXT2Ekiden.webp'), 
      quantity: 0, 

  },

    { 
      id: 2, 
      name: "Nike Blazer Mid '77",
      price: 469.99, 
      category: 'Lifestyle', 
      image: require('@/assets/NikeBlazerMid77.webp'), 
      quantity: 0, 
      
    },

    { 
      id: 3, 
      name: 'Nike Air Max Pre-Day', 
      price: 629.99, 
      category: 'Lifestyle', 
      image: require('@/assets/NikeAirMaxPreDay.webp'), 
      quantity: 0, 
       
    },

    { 
      id: 4, 
      name: 'Nike Crater Impact', 
      price: 529.99, 
      category: 'Lifestyle', 
      image: require('@/assets/NikeCraterImpact.webp'), 
      quantity: 0, 
      
    },

    { 
      id: 5,
      name: 'Nike Air Max Bolt', 
      price: 429.99, 
      category: 'Lifestyle', 
      image: require('@/assets/NikeAirMaxBolt.webp'), 
      quantity: 0, 
      
    },

    { 
      id: 6, 
      name: 'Nike Air Zoom Pegasus 39', 
      price: 549.99, 
      category: 'Bieganie', 
      image: require('@/assets/NikeAirZoomPegasus39.webp'), 
      quantity: 0, 
      
    },

    { 
      id: 7, 
      name: 'Nike Air Zoom Vomero 16', 
      price: 699.99, 
      category: 'Bieganie', 
      image: require('@/assets/NikeAirZoomVomero16.webp'), 
      quantity: 0, 
      
    },

    { 
      id: 8, 
      name: 'Nike Winflo 8', 
      price: 469.99, 
      category: 'Bieganie', 
      image: require('@/assets/NikeWinflo8.webp'), 
      quantity: 0,
      
    },

    { 
      id: 9, 
      name: 'Jordan One Take 3', 
      price: 469.99, 
      category: 'Koszykówka', 
      image: require('@/assets/JordanOneTake3.webp'), 
      quantity: 0, 
       
    },

    { 
      id: 10, 
      name: 'KD Trey 5 IX', 
      price: 329.97, 
      category: 'Koszykówka', 
      image: require('@/assets/KDTrey5IXwebp.webp'), 
      quantity: 0, 

    }
  ]
})

export const getters = {
  products: state => () => {
    return state.products
  },

  productsFilter: (state) => (category) => {
    if(!category) { 
      return state.products
    } else { 
      return state.products.filter(product => product.category === category) 
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
  
}

export const actions = {
  
}

export const modules = {
  cart: {
    namespaced: true,
    state: () => ({
      items: [],
      quantity: 0,
      price: 0,
    }),

    getters: {
      cartProducts: (state, getters, rootState) => {
        return state.items.map(({ id, quantity, size }) => {
          const product = rootState.products.find(product => product.id === id) 
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
      },

      totalPrice: (state) => {
        return state.price.toFixed(2)
      },

      totalQuantity: (state) => {
        return state.quantity
      }
    },

    actions: {
      addProduct({state, commit}, {product, size}) {
        const cartItem = state.items.find(item => item.id === product.id && (item.size === size || size === null))
        if(!cartItem) {
          commit('pushProductToCart', {id: product.id, size: size})
        } else {
          commit('incrementQuantity', cartItem)
        }
        commit('incrementTotalPrice',  {price: product.price})
      },

      removeProduct({state, commit}, {product, size}) {
        const cartItem = state.items.find(item => item.id === product.id && item.size === size)
        if(cartItem.quantity===1) {
          commit('removeProductFromCart', cartItem)
        } else {
          commit('decrementQuantity', cartItem)
        }
        commit('decrementTotalPrice',{price: product.price})
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
        const cartItem = state.items.find(item => item.id === product.id && item.size === product.size)
        state.items.splice(state.items.indexOf(cartItem), 1)
      },

      decrementQuantity(state, { id, size }) {
        const cartItem = state.items.find(item => item.id === id && item.size === size)
        cartItem.quantity--
      },

      decrementTotalPrice(state, { price }) {
        state.price -= price
        state.quantity--
      },

      setItemSize(state, { id, size } ) {
        const cartItem = state.items.find(item => item.id === id)
        cartItem.size = size
      },

      incrementQuantity (state, { id, size }) {
        const cartItem = state.items.find(item => item.id === id && item.size === size)
        cartItem.quantity++
      },

      incrementTotalPrice (state, { price }) {
        state.price += price
        state.quantity++
      },

      setCartItems (state, { items }) {
        state.items = items
      }
    }
  }
}
