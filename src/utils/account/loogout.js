import { NEXIS_LOGGED_IN_MNEMONIC } from "../lsIdents";

export const logout = async()=>{
    try {
        await localStorage.removeItem(NEXIS_LOGGED_IN_MNEMONIC)
        window.location.reload()
    } catch (error) {
        console.log(error);
    }
}