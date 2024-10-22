import { Router } from "express";
import { hash, compare } from "bcryptjs";

//Constants
import { ADMINISTRATOR } from "../constants/allUserPerfils";

//Middlewares
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensurePermissions } from "../middlewares/ensurePermissions";

import {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createNewUser,
  updateUserNameAndPassword,
  deleteUser,
} from "../repositories/users";

import { getPerfilById } from '../repositories/profiles';

const usersRouter = Router();

usersRouter.use(ensureAuthenticated);

usersRouter.get(
  "/",
  (req, res, next) => {
    ensurePermissions(req, res, next, [ADMINISTRATOR]);
  },
  async (req, res) => {
    try {
      const getAllUsersInformation = await getAllUsers();

      const allUsers = getAllUsersInformation.map((user) => {
        return {
          email: user.email,
          name: user.name,
        };
      });

      return res.json(allUsers);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
);

usersRouter.get(
  "/:id",
  (req, res, next) => {
    ensurePermissions(req, res, next, [
      ADMINISTRATOR
    ]);
  },
  async (req, res) => {
    try {
      const { id } = req.params;

      const usersInformation = getUserById(Number(id));
      
      return res.json({
        email: usersInformation.email,
        name: usersInformation.name,
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

usersRouter.post(
  "/",
  (req, res, next) => {
    ensurePermissions(req, res, next, [ADMINISTRATOR]);
  },
  async (req, res) => {
    try {
      const { name, email, password, id_perfil } = req.body;

      const checkUserExists = await getUserByEmail(email);

      if (checkUserExists) {
        throw new Error("E-mail já utilizado.");
      }

      //Check if id_perfil existis
      const checkPerfilIdExists = await getPerfilById(id_perfil);

      if (!checkPerfilIdExists) {
        throw new Error("Permissão não encontrada");
      }

      //Hash Password
      const PasswordHash = await hash(password, 8);

      const user = await createNewUser(name, email, PasswordHash, id_perfil);

      return res.json({
        id_user: user.id_user,
        name,
        email,
        id_perfil: user.id_profile,
        created_at: user.created_at,
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

usersRouter.put(
  "/",
  (req, res, next) => {
    ensurePermissions(req, res, next, [
      ADMINISTRATOR
    ]);
  },
  async (req, res) => {
    try {
      const { name, email, password, oldPassword } = req.body;

      const atualUser = parseInt(req.user.id);

      //Check if user existis
      const checkUserExists = await getUserByEmail(email);

      if (!checkUserExists) {
        throw new Error("O usuário não existe.");
      }

      // Check if user is equal
      if (atualUser !== checkUserExists.id_user) {
        throw new Error("Impossível editar um usuário diferente do seu.");
      }

      //Check if Old Password is correct
      const passwordMatch = await compare(
        oldPassword,
        checkUserExists.password
      );

      if (!passwordMatch) {
        throw new Error("O Password antigo está incorreto.");
      }

      //Hash Password
      const PasswordHash = password
        ? await hash(password, 8)
        : checkUserExists.password;

      const user = await updateUserNameAndPassword(
        name,
        checkUserExists.name,
        PasswordHash,
        atualUser
      );

      return res.json({
        id_user: user.id_user,
        name,
        email,
        id_perfil: user.id_profile,
        created_at: user.created_at,
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
);

usersRouter.delete(
  "/",
  (req, res, next) => {
    ensurePermissions(req, res, next, [ADMINISTRATOR]);
  },
  async (req, res) => {
    try {
      const { email } = req.body;

      //Check if user existis
      const checkUserExists = await getUserByEmail(email);

      if (!checkUserExists) {
        throw new Error("O usuário não existe.");
      }

      await deleteUser(email);

      return res.json({
        success: `o usuário ${email} foi excluido com sucesso`,
      });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
);

export default usersRouter;
