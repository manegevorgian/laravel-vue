<template>
    <div>
        <b-container class="mt-5 w-50 align-items-center " >
            <b-list-group>
                <b-list-group-item class="text-center" variant="dark">{{ product.name}}</b-list-group-item>
                <b-list-group-item class="text-center">{{ product.category }}</b-list-group-item>
                <b-list-group-item class="text-center">{{ product.price }}</b-list-group-item>
            </b-list-group>
        </b-container>
    </div>




</template>

<script>
    export default {
        data() {
            return {
                product_id: this.$route.params.product_id
            }
        },
        mounted() {
            this.$store.dispatch('getProduct', this.product_id)
        },
        computed: {
            product() {
                return this.$store.getters.currentProduct
            }
        }
    }
</script>

<style scoped>

</style>
