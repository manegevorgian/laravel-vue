import axios from 'axios'
export default {
    state: {
        products_list: [],
        product: {}
    },
    getters: {
        productsList(state) {
            return state.products_list
        },
        currentProduct(state) {
            return state.product
        }
    },
    mutations: {
        storeProductsList(state, data) {
            state.products_list = data
        },
        storeProduct(state, data) {
            state.product = data
        }
    },
    actions: {
        getProducts(context) {
            return new Promise((resolve, reject) => {
                axios.get('/products').then(res => {
                    if(res.data.success) {
                        context.commit('storeProductsList', res.data.data.data);
                        resolve(res.data)
                    }else {
                        reject()
                    }
                }).catch(err => {
                    reject(err.response)
                })
            })
        },
        getProduct(context, id) {
            return new Promise((resolve, reject) => {
                axios.get(`/products/${id}`).then(res => {
                    if(res.data.success) {
                        context.commit('storeProduct', res.data.data);
                        resolve(res.data)
                    }else {
                        reject()
                    }
                }).catch(err => {
                    reject(err.response)
                })
            })
        },
        saveProduct(context, product) {
            return new Promise((resolve, reject) => {
                axios.post('/products', product).then(res => {
                    if(res.data.success){
                        context.dispatch('getProducts');
                        resolve(res.data)
                    }else {
                        reject()
                    }
                }).catch(err => {
                    reject(err.response)
                })
            })
        },
        updateProduct(context, product) {
            return new Promise((resolve, reject) => {
                axios.post(`/products/${product.id}`,
                    {
                        _method: 'put',
                        'name': product.name,
                        'category': product.category,
                        'description': product.description,
                        'price': product.price,
                        'thumbnail': product.thumbnail,
                    }).then(res => {
                    if(res.data.success){
                        context.dispatch('getProducts');
                        resolve(res.data)
                    }else {
                        reject()
                    }
                }).catch(err => {
                    reject(err.response)
                })
            })
        },

        deleteProduct(context, product) {
            return new Promise((resolve, reject) => {
                axios.post(`/products/${product}`, {
                    _method: 'delete',
                    'name': product.name,
                    'category': product.category,
                    'description': product.description,
                    'price': product.price,
                    'thumbnail': product.thumbnail,
                }).then(res => {
                    if(res.data.success) {
                        context.dispatch('getProducts');
                        resolve(res.data)
                    }else {
                        reject()
                    }
                }).catch(err => {
                    reject(err.response)
                })
            })
        }
    }
}
