export default {};

function formatDateToMMDDYYYY(date) {
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const dd = String(date.getDate()).padStart(2, '0');
    const yyyy = date.getFullYear();

    return `${mm}/${dd}/${yyyy}`;
}

let foods = [
    { name: 'Apple', origin: 'Vietnam', price: 10, date: formatDateToMMDDYYYY(new Date()), image: 'https://picsum.photos/200' },
    { name: 'Orange', origin: 'China', price: 8, date: formatDateToMMDDYYYY(new Date()), image: 'https://picsum.photos/200' },
    { name: 'Watermelon', origin: 'USA', price: 6, date: formatDateToMMDDYYYY(new Date()), image: 'https://picsum.photos/200' },
    { name: 'Rise', origin: 'Mongolia', price: 2, date: formatDateToMMDDYYYY(new Date()), image: 'https://picsum.photos/200' }

]

export async function getFoodList() {

    


    try {
        // const ret = await fetch("http://localhost:5005/departments/653156f7b20ca0c4152c373a/courses", {
        //   method: "GET",
        //   headers: {
        //     "content-type": "application/json"
        //   }
        // });
        // const obj = await ret.json();
        return { success: true, data: foods };
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

export async function addFood(food) {

    try {
        foods.push(food)
        return { success: true };
    } catch (error) {
        throw error;
    }
}