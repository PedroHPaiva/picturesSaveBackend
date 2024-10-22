import Profiles from "../models/profiles";

//Database table: profiles
export const getPerfilById = async (perfilId) => {
  try {
    const checkIdExists = await Profiles.findOne({
      raw: true,
      where: { id_profile: perfilId },
    });

    return checkIdExists;
  } catch (err) {
    throw new Error(`não foi possível encontrar o perfil com id ${perfilId}`);
  }
};