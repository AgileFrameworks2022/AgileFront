import http from "./http-common-2"

class ServiceServices {
    getAllServicesByUser(id){
        return http.get("/listar-servicios-usuario?id_user="+id);
    }
    getAllServicesByCategory(idCat){

        return http.get("/listar-servicios-categoria?id_category="+idCat);
    }
    postNewService(data){
        return http.post("/agregar-servicio",data);
    }
    deleteService(id){
        return http.delete("/eliminar-servicio?id_service="+id)
    }
}

export default new ServiceServices();

