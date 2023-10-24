import { Alert } from "react-native";
import { constServer } from "./constats";

export default {};

export async function login(email, password) {
  try {
    const ret = await fetch(constServer + "/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "content-type": "application/json"
      },
    });

    const obj = await ret.json();
    return obj;
  } catch (error) {
    Alert.alert(error.message);
    return { success: false, error: error.message };
  }
}

export async function getUser(token, userId) {
  try {
    const ret = await fetch(constServer + "/users/" + userId, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
    const obj = await ret.json();
    return obj;
  }
  catch (error) {
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
        "content-type": "application/json"
      }
    });
    const obj = await ret.json();
    return obj;
  } catch (error) {
    Alert.alert(error.message);
  }
}

export async function editUser(token, userId, user) {
  try {
    const ret = await fetch(constServer + "/users/" + userId, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    const obj = await ret.json();
    return obj;
  } catch (error) {
    Alert.alert(error.message);
  }
}

export async function changePassword(token, userId, passwords) {
  try {
    const ret = await fetch(constServer + "/users/" + userId + "/password", {
      method: "PUT",
      body: JSON.stringify(passwords),
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    });
    const obj = await ret.json();
    return obj;
  } catch (error) {
    Alert.alert(error.message);
  }
}

export async function getFoodList(token, userId) {
  try {
    const ret = await fetch(constServer + "/users/" + userId + "/foods", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
    const obj = await ret.json();
    return obj;
  } catch (error) {
    throw error;
  }
}

export async function addFood(food, token, userId) {
  try {
    const ret = await fetch(constServer + '/users/' + userId + '/foods', {
      method: "POST",
      body: JSON.stringify(food),
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
    const obj = await ret.json();
    //console.log(obj)
    return { success: true };
  } catch (error) {
    throw error;
  }
}

export async function deleteFood(foodId, token, userId) {
  try {
    const ret = await fetch(constServer + '/users/' + userId + '/foods/' + foodId, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        'Authorization': `Bearer ${token}`
      }
    });
    const obj = await ret.json();
    return { success: true };
  } catch (error) {
    throw error;
  }
}

export async function editFood(food, token, userId) {
  try {
    const ret = await fetch(constServer + '/users/' + userId + '/foods/' + food._id, {
      method: "PUT",
      body: JSON.stringify(food),
      headers: {
        "content-type": "application/json",
        'Authorization': `Bearer ${token}`
      }
    });
    const obj = await ret.json();
    return { success: true };
  } catch (error) {
    throw error;
  }
}

export const addNoteToDB = async (token, userId, noteData) => {
  try {
    const uri = constServer + "/users/" + userId + "/notes";
    const response = await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(noteData),
    });

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return false;
  }
};

export async function getDailyNotes(token, userId) {
  try {
    const uri = constServer + "/users/" + userId + "/notes";
    const headers = {
      "Authorization": `Bearer ${token}`
    };

    const response = await fetch(uri, {
      method: "GET",
      headers: headers,
    });

    if (response.ok) {
      const obj = await response.json();
      return obj.data;
    } else {
      console.log("Request failed with status:", response.status);
    }
  } catch (error) {
    console.log("Error:", error);
  }
}

export async function editDailyNote(token, userId, note) {
  try {
    const uri = `${constServer}/users/${userId}/notes/${note._id}`;
    const response = await fetch(uri, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(note),
    });

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return false;
  }
}

export async function deleteNote(token, userId, noteId) {
  try {
    const uri = constServer + "/users/" + userId + "/notes/" + noteId;
    const response = await fetch(uri, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return false;
  }
}


export async function addCustomer(customer, token, userId) {
  try {
    const ret = await fetch(constServer + '/users/' + userId + '/orders', {
      method: "POST",
      body: JSON.stringify(customer),
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
    const obj = await ret.json();
    return { success: true };
  } catch (error) {
    throw error;
  }
}

export async function findCustomer(customer, token, userId) {
  try {
    const ret = await fetch(constServer + '/users/' + userId + '/orders', {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
    const obj = await ret.json();

    const found = obj.data.find((i) => i.customer === customer)

    if (found) {
      return { success: true, orderId: found._id };
    } else {
      return { success: false };
    }

  } catch (error) {
    throw error;
  }
}


export async function addOrder(orderId, orders, token, userId) {
  try {
    console.log(orderId, token, userId, orders)
    const ret = await fetch(constServer + '/users/' + userId + '/orders/'+orderId+'/foods', {
      method: "PUT",
      body: JSON.stringify(orders),
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
    const obj = await ret.json();
    return { success: true, response: obj };
  } catch (error) {
    throw error;
  }
}
