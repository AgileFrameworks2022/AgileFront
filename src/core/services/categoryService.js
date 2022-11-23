import http from "./http-common-2"

class CategoryService {
    getAllCategories(){
        return http.get("/listar-categorias");
    }
}

export default new CategoryService();

