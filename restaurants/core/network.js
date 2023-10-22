import { Alert } from "react-native";
import { constServer } from "./constats";

export default {};

// function formatDateToMMDDYYYY(date) {
//   const mm = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
//   const dd = String(date.getDate()).padStart(2, "0");
//   const yyyy = date.getFullYear();

//   return `${mm}-${dd}-${yyyy}`;
// }

// let foods = [
//   {
//     name: "Apple",
//     origin: "Vietnam",
//     price: 10,
//     date: formatDateToMMDDYYYY(new Date()),
//     image: "https://picsum.photos/200",
//   },
//   {
//     name: "Orange",
//     origin: "China",
//     price: 8,
//     date: formatDateToMMDDYYYY(new Date()),
//     image: "https://picsum.photos/200",
//   },
//   {
//     name: "Watermelon",
//     origin: "USA",
//     price: 6,
//     date: formatDateToMMDDYYYY(new Date()),
//     image: "https://picsum.photos/200",
//   },
//   {
//     name: "Rise",
//     origin: "Mongolia",
//     price: 2,
//     date: formatDateToMMDDYYYY(new Date()),
//     image: "https://picsum.photos/200",
//   },
// ];

export async function login(email, password) {
  try {
    const ret = await fetch(constServer + "/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "content-type": "application/json",
      },
    });

    const obj = await ret.json();
    return obj;
  } catch (error) {
    Alert.alert(error.message);
    return { success: false, error: error.message };
  }
}

export async function signup(user) {
  try {
    const ret = await fetch(constServer + "/signup/", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "content-type": "application/json",
      },
    });
    const obj = await ret.json();
    return obj;
  } catch (error) {
    Alert.alert(error.message);
  }
}

export async function getFoodList(token, userId) {
  try {
    const ret = await fetch(constServer+'/'+userId+'/foods', {
      method: "GET",
      headers: {
        "content-type": "application/json",
        'Authorization': `Bearer ${token}`
      }
    });
    const obj = await ret.json();
    console.log('network: ', obj)
    return { success: true, data: obj };
  } catch (error) {
    throw error;
  }
}

export async function addFood(food) {
  try {
    const ret = await fetch(constServer+'/foods', {
      method: "POST",
      body: food,
      headers: {
        "content-type": "application/json"
      }
    });
    const obj = await ret.json();
    console.log(obj)    
    return { success: true };
  } catch (error) {
    throw error;
  }
}


export async function deleteFood(foodId) {
  try {
    // const ret = await fetch("http://localhost:5005/departments/653156f7b20ca0c4152c373a/courses", {
    //   method: "DELETE",
    //   headers: {
    //     "content-type": "application/json"
    //   }
    // });
    // const obj = await ret.json();
    return { success: true };
  } catch (error) {
    throw error;
  }
}

export async function editFood(foodId) {
  try {
    // const ret = await fetch("http://localhost:5005/departments/653156f7b20ca0c4152c373a/courses", {
    //   method: "PUT",
    //   headers: {
    //     "content-type": "application/json"
    //   }
    // });
    // const obj = await ret.json();
    return { success: true };
  } catch (error) {
    throw error;
  }
}



const BASE_URL = 'http://localhost:5001/users/65343946e323fd94f34b4790'; 
// const user_Id = "65343946e323fd94f34b4790";

// network.js



export const addNoteToDB = async (noteData, token) => {
  try {
    const response = await fetch(`${BASE_URL}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
      body: JSON.stringify(noteData),
    });

    if (response.ok) {
      return true; 
    } else {
      return false;
    }
  } catch (error) {
    console.error('An error occurred:', error);
    return false; 
  }
};
  export async function getDailyNotes(token) {
    try {
      const uri = `${BASE_URL}/notes`;
      const headers = {
        Authorization: `Bearer ${token}`, 
      };
      
      const response = await fetch(uri, {
        method: 'GET',
        headers: headers,
      });
      
      if (response.ok) {
        const obj = await response.json();
        console.log(obj);
        return obj.data;
      } else {
        console.log('Request failed with status:', response.status);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  }
export async function editDailyNote(editedNote, token){
  try {
    const response = await fetch(`${BASE_URL}/notes/65347a46c8d17111ccc2f296`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(editedNote),
    });

    if (response.ok) {
      return true; 
    } else {
      return false; 
    }
  } catch (error) {
    console.error('An error occurred:', error);
    return false; 
  }
};

  export async function deleteNote(tobeDeleted, token){
    try {
      const response = await fetch(`${BASE_URL}/notes/6534b30543b15dc39b3eb7ed`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(tobeDeleted),
      });
  
      if (response.ok) {
        return true; 
      } else {
        return false; 
      }
    } catch (error) {
      console.error('An error occurred:', error);
      return false; 
    }
  };