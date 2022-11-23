<template>
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

            <v-btn class="red white--text ma-2" color="red"
                   button

                   text-color="white"   target="blank"
                   @click="deleteById(service.id_service)"
            >

              <v-icon left>
                mdi-delete
              </v-icon>
              Delete
            </v-btn>

          </v-card-actions>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ServiceServices from "../core/services/services.services"
export default {
  name: "viewMyServices",
  data: () => ({
    listServices:[]
  }),
  methods:{
    getMyServices(){
      ServiceServices.getAllServicesByUser(1).then(
          response=>{
            this.listServices=response.data;
          }
      )
    },
    deleteById(Id){
      ServiceServices.deleteService(Id).then(
          ()=>{

            window.location.reload();
          }
      );

      //window.location.reload();
    }
  },
  mounted() {
    this.getMyServices();
  }
}
</script>

<style scoped>

</style>