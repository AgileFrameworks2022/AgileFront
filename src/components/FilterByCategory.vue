<template>

  <v-app  >
    <div class="container " style="text-align:center" >
      <vs-row>
        <vs-col  v-for="cat in listCategories" :key="cat.id"  vs-type="flex" vs-justify="center" vs-align="center" w="3">
          <v-btn class="green white--text ma-2" color="white"
                 button
                 text-color="black"   target="blank"
                  @click="getServices(cat.id_category)"
          >
            #{{cat.name}}
          </v-btn>

        </vs-col>
      </vs-row>
    </div>
    <div  v-if="isEmpty"  class="container " style="text-align:center">
      {{textInit }}
    </div>
    <div v-if="!isEmpty" >
      <v-container >
        <v-row >
          <v-col v-for="service in listServices"
                 :key="service.id_service"
                 cols="12"
                 md="6">
            <v-card>
              <v-card-title class="font-weight-bold">
                {{service.name}}
              </v-card-title>
              <v-img :src=service.url_image>
              </v-img>
              <v-card-text >
                <v-chip class="ma-2"
                        color="green"
                        label
                        text-color="white">
                  {{ service.description }}
                  <v-avatar right>
                    <v-icon >mdi-bullhorn</v-icon>
                  </v-avatar>
                </v-chip>
                <br/>

              </v-card-text>
              <v-card-actions fluid class="btns">

                <v-btn class="green white--text ma-2" color="green"
                       button
                       text-color="white"   target="blank">

                  <v-icon left>
                    mdi-whatsapp
                  </v-icon>
                  More Info
                </v-btn>

              </v-card-actions>

            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-app>

</template>

<script>
import CategoryService from "../core/services/categoryService"
import ServiceServices from "../core/services/services.services"
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
    getCategories(){
      CategoryService.getAllCategories().then(
          response =>{
          this.listCategories=response.data;
      }
      )
    },
    getServices(id){
      console.log(id);
      ServiceServices.getAllServicesByCategory(id).then(
          response =>{
            this.listServices=response.data;
            if(this.listServices.isEmpty){
              this.textInit="No hay Servicios en Esta categoria";
              this.isEmpty=true;

            }else{
              this.isEmpty=false;
            }
          }
      )
    },
  },
  mounted() {
    this.getCategories();
  },
  watch:{

  }

}
</script>

<style scoped>

</style>