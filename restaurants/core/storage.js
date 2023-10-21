import { constLoginKey as constLoginKey } from "./constats";
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setLocalUser(login){
    try {
        const localLogin = JSON.stringify(login);
        await AsyncStorage.setItem(constLoginKey, localLogin);
        return true;
    } catch (error){
        alert('Error save login:', error.message);
        return false;
    }
}
export async function getLocalUser(){
    try {
        const localLogin = await AsyncStorage.getItem(constLoginKey);
        if (localLogin === null){
            return false;
        }
        const login = JSON.parse(localLogin);
        if (login.email === null || login.token === null){
            return false;
        }
        return login;
    } catch (error){
        alert(error.message);
        return false;
    }
}

export async function removeLocalUser(){
    try {
        await AsyncStorage.removeItem(constLoginKey);
        return true;
    } catch (error){
        alert(error.message);
        return false;
    }
}