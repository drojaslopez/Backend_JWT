import{Router} from "express";
import {verifyToken} from "../../middleware/jwt"
import { userController } from "./controller";

const route = Router();

//route.use(verifyToken)

// leer los usuarios
route.get("/", userController.getUsers);

// leer un único usuario por id
route.get("/:id",verifyToken, userController.getUser);

// crear un usuario
route.post("/",verifyToken, userController.createUser); 

// eliminar un usuario por id
route.delete("/:id",verifyToken, userController.deleteUser);

// actualizar un usuario por id
route.put("/:id", verifyToken,userController.updateUser);

export default route;