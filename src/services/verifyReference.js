import * as Yup from 'yup';

export const referenceMatch = async (reference) => {
    const splited = reference.split("_");

    console.log(splited);

    if(splited.length < 3){
        return false;
    }

    const newReference = `${splited[0]}_${splited[1]}_${splited[2]}`;
    const stringSchema = Yup.string().matches(/^.{1,15}_.{1,10}_.{1,5}$/).required();

    try {   
        await stringSchema.validate(newReference);
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
}