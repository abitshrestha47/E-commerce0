import bcrypt from 'bcrypt';
const saltRounds=10;

export const hashPassword=async(password)=>{
    try{
        const hashedPassword=await bcrypt.hash(password,saltRounds);
        return hashedPassword;
    }catch(err){
        console.log(err);
    }
}

export const comparePassword=async(password,hashedPassword)=>{
    return bcrypt.compare(password,hashedPassword);
}