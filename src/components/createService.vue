<template>
<v-app>
  <v-dialog
      v-model="dialog"
      max-width="500px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
          color="primary"
          dark
          class="mb-2"
          v-bind="attrs"
          v-on="on"
      >
        New Service
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        <span class="text-h5">New Service</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <v-row>

            <v-col
                cols="12"
                sm="6"
                md="4"
            >
              <v-text-field
                  v-model="defaultItem.name"
                  label="title"
              ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                sm="6"
                md="4"
            >
              <v-text-field
                  v-model="defaultItem.description"
                  label="description"
              ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                sm="6"
                md="4"
            >
              <v-text-field
                  v-model="defaultItem.price"
                  label="discount"
              ></v-text-field>
            </v-col>
            <v-col
                cols="12"
                sm="6"
                md="4"
            >
              <v-text-field
                  v-model="defaultItem.url_image"
                  label="urlToImage"
              ></v-text-field>

              <div class="container " style="text-align:center" >
                <vs-row>
                  <vs-col  v-for="cat in listCategories" :key="cat.id"  vs-type="flex" vs-justify="center" vs-align="center" w="3">
                    <v-btn class="green white--text ma-2" color="white"
                           button
                           text-color="black"   target="blank"
                           @click="updateCurrentCat(cat)"
                    >
                      #{{cat.name}}
                    </v-btn>

                  </vs-col>
                </vs-row>
              </div>
            </v-col>
            <p>Current Category:{{this.currentCategory.name}}</p>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="blue darken-1"
            text
            @click="close"
        >
          Cancel
        </v-btn>
        <v-btn
            color="blue darken-1"
            text
            @click="save"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
</v-app>
</template>

<script>
import CategoryService from "../core/services/categoryService"
import ServiceServices from "../core/services/services.services"
export default {
  name: "createService",
  data: () => ({
    dialog: false,
    show: -1,
    showAux: -1,
    headers: [
      {
        text: 'id',
        align: 'start',
        sortable: false,
        value: 'id',
      },
      { text: 'name', value: 'title' },
      { text: 'description', value: 'description' },
      { text: 'price', value: 'discount' },
      { text: 'urlToImage', value: 'urlToImage' },
    ],
    defaultItem:{
      name:'None',
      price:0,
      description:'None',
      id_user:1,
      id_category: 0,
      url_image:''
    },
    listCategories:[],
    category:{
      id:0,
      name:'',
      urlToImage:'',
    },
    currentCategory:{
      id:0,
      name:'None',
      price:0,
      description:'None',
      id_user:1,
      id_category: 0
    },
  }),
  watch:{
    dialog (val) {
      val || this.close()
    }
  },
  methods:{
    close () {
      this.dialog = false;
    },
    save(){
      this.defaultItem.id_user=1;
      this.defaultItem.id_category=this.currentCategory.id_category;
      console.log(this.defaultItem);
      ServiceServices.postNewService(this.defaultItem).then(
         ()=>{
           this.dialog=false
         }
      )
    },
    getCategories(){
      CategoryService.getAllCategories().then(
          response =>{
            this.listCategories=response.data;
          }
      )
    },
    updateCurrentCat(cat){
      this.currentCategory=cat;
    },

  },
  mounted() {
    this.getCategories();
  }
}
</script>

<style scoped>

</style>