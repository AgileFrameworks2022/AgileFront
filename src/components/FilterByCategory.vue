<template>

  <v-app  >

    <v-container>
      <v-row >
        <v-col class="col-sm-12 col-md-4" v-for="category in listCategories" :key="category.id_category">

          <v-card>

            <v-img
                class="white--text align-end"
                :src="category.url_image" min-height="250px">
              <v-hover>
                <v-card-title style="background: rgba(9, 9, 9, 0.6);"  >
                  <a :href="'/categories/'+category.id_category" style="text-decoration: none; color: aliceblue">{{category.name}}</a>
                </v-card-title>
              </v-hover>
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

  </v-app>

</template>

<script>
import CategoryService from "../core/services/categoryService"
export default {
  name: "FilterByCategory",
  data: () => ({
    listCategories:[],
    listServices:[],
    category:{
      id:0,
      name:'',
      urlToImage:'',
    },
    service:{
      id:0,
      name:'',
      description:'',
      price:'',
      urlToImage:''
    },
    isEmpty:true,
    textInit:"Por favor escoga una categoria"
  }),
  methods: {
    async getCategories(){
      await CategoryService.getAllCategories().then(
          async response =>{
          this.listCategories= await response.data;
      }
      )
    },
  },
  mounted() {
    this.getCategories();
  }
}
</script>

<style scoped>

</style>
