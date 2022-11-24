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

    <template>
        <v-card>
          <v-container>
            <validation-observer
                ref="observer"
            >
              <form @submit.prevent="submit">
                <validation-provider
                    name="Name"
                >
                  <v-text-field
                      v-model="name"
                      label="Name"
                      required
                  ></v-text-field>
                </validation-provider>
                <validation-provider
                    name="price"
                >
                  <v-text-field
                      v-model="price"
                      label="Price"
                      required
                  ></v-text-field>
                </validation-provider>
                <validation-provider
                    name="description"
                >
                  <v-text-field
                      label="Description"
                      v-model="description"
                      required
                  ></v-text-field>
                </validation-provider>
                <validation-provider
                >
                  <v-text-field
                      label="URL Image"
                      v-model="url_image"
                      required
                  ></v-text-field>
                </validation-provider>
                <validation-provider
                >
                  <v-select
                      item-text="name"
                      v-model="select"
                      :items="listCategories"
                      label="Select"
                      return-object
                  >
                  </v-select>
                </validation-provider>

                <v-btn
                    class="mr-4"
                    type="submit"
                    :disabled="loading"
                >
                  <v-progress-circular
                      v-if="loading"
                      indeterminate
                      color="primary"
                      :width="3"
                      :size="20"
                  ></v-progress-circular>
                  submit
                </v-btn>
                <v-btn @click="clear" :disabled="loading">
                  clear
                </v-btn>
              </form>
            </validation-observer>
          </v-container>
        </v-card>
    </template>

  </v-dialog>
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
                  :disabled="loading_delete"
                   text-color="white"   target="blank"
                   @click="deleteById(service.id_service)"
            >
              <v-progress-circular
                  v-if="loading_delete"
                  indeterminate
                  color="danger"
                  :width="3"
                  :size="20"
              ></v-progress-circular>
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
</v-app>
</template>

<script>
import CategoryService from "../core/services/categoryService"
import ServiceServices from "../core/services/services.services"
import { ValidationObserver, ValidationProvider} from 'vee-validate'
import Swal from "sweetalert2";

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  name: "createService",
  data: () => ({
    loading: false,
    loading_delete: false,
    name: '',
    select: null,
    price:0,
    description:'',
    url_image:'',

    listServices:[],
    dialog: false,
    listCategories:[],
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
    async getCategories(){
      await CategoryService.getAllCategories().then(
          async response =>{
            this.listCategories= await response.data;
          }
      )
    },
    async getMyServices(){
      await ServiceServices.getAllServicesByUser(Number(localStorage.getItem("user"))).then(
          async response=>{
            this.listServices= await response.data;
          }
      )
    },
    async deleteById(Id){
      this.loading_delete = true;
      await ServiceServices.deleteService(Id).then(
          async()=>{
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'El servicio ha sido borrado',
              showConfirmButton: false,
              timer: 1500
            }).then();
            await this.getMyServices().then(()=>{this.loading_delete = false;}).catch(()=>{this.dialog=false;});
          }
      ).catch(()=>{
        Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Ha ocurrido un problema, intentelo de nuevo',
        showConfirmButton: false,
        timer: 1500
      }).then();this.dialog=false;this.loading_delete = false;});
    },
    async submit () {
      this.loading = true;
      await ServiceServices.postNewService({
        name: this.name,
        price: this.price,
        description: this.description,
        url_image: this.url_image,
        id_user: Number(localStorage.getItem("user")),
        id_category: this.select.id_category,
      }).then(
          ()=>{
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'El servicio ha sido publicado',
              showConfirmButton: false,
              timer: 1500
            }).then();
            this.loading = false;
            this.dialog=false;
          }
      ).catch(()=>{
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ha ocurrido un problema, intentelo de nuevo',
          showConfirmButton: false,
          timer: 1500
        }).then()
        this.loading=false;})

      await this.getMyServices().catch(()=>{this.loading=false;});
    },
    clear () {
      this.name= '';
      this.select= null;
      this.price=0;
      this.description='';
      this.url_image='';
    },
  },
  async mounted() {
    await this.getCategories();
    await this.getMyServices();
  }
}
</script>

<style scoped>

</style>
