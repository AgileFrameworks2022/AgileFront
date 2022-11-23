import http from "./http-common-2"

class ServiceServices {
    getAllServicesByUser(id){
        return http.get("/listar-servicios-usuario",{params:{id_user:id}});
    }
    getAllServicesByCategory(idCat){

        return http.get("/listar-servicios-categoria",{params:{id_category:idCat}});
    }
    postNewService(data){
        return http.post("/agregar-servicio",data);
    }
    deleteService(id){
        return http.delete("/eliminar-servicio",{params:{id_service:id}})
    }
}

export default new ServiceServices();

