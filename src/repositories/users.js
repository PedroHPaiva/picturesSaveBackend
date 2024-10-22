import Profiles from "../models/profiles";
import Users from "../models/users";

//Database table: users
export const getAllUsers = async () => {
  try {
    const allUsers = await Users.findAll({
      raw: true,
    });

    return allUsers;
  } catch (err) {
    throw new Error(
      `não foi possível encontrar dados dos usuários`
    );
  }
};

export const getUserAndProfile = async (email) => {
  const user = await Users.findOne({
      raw: true,
      include: {
          model: Profiles,
          as: 'profile',
          attributes: ['name'],
      },
      where: { email: email }
  });

  return user
}

export const getUserById = async (userId) => {
  try {
    const user = await Users.findOne({
      raw: true,
      where: {
        id_user: userId,
      },
    });

    return user;
  } catch (err) {
    throw new Error(`não foi possível encontrar dados do usuário ${userId}`);
  }
};

export const getUserByEmail = async (email) => {
  try {
    const response = await Users.findOne({
      raw: true,
      where: { email: email },
    });

    return response;
  } catch (err) {
    throw new Error(`o email ${email} não foi encontrado na base de usuários`);
  }
};

export const createNewUser = async (name, email, PasswordHash, perfilId) => {
  try {
    const user = await Users.create({
      name,
      email,
      password: PasswordHash,
      id_profile: perfilId,
    });

    return user;
  } catch (err) {
    throw new Error(`Não foi possível criar o usuário ${email}`);
  }
};

export const updateUserNameAndPassword = async (
  newName,
  actualName,
  PasswordHash,
  actualUser
) => {
  try {
    const user = await Users.update(
      {
        name: newName ? newName : actualName,
        password: PasswordHash,
      },
      {
        where: { id_user: actualUser },
      }
    );

    return user;
  } catch (err) {
    throw new Error(`Não foi possível atualizar o usuário ${actualUser}`);
  }
};

export const deleteUser = async (email) => {
  try {
    const user = await Users.destroy({
      where: {
        email: email,
      },
    });

    return user;
  } catch (err) {
    throw new Error(`Não foi possível deletar o usuário ${email}`);
  }
};

