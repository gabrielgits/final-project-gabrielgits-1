export default {};
export async function getFoodList() {

    const foods=[
        {name: 'Apple', origin: 'Vietnam', price: 10, date: new Date(), image:'https://picsum.photos/200' },
        {name: 'Orange', origin: 'China', price: 8, date: new Date(), image:'https://picsum.photos/200' },
        {name: 'Watermelon', origin: 'USA', price: 6, date: new Date(), image:'https://picsum.photos/200' },
        {name: 'Rise', origin: 'Mongolia', price: 2, date: new Date(), image: 'https://picsum.photos/200'}

    ]

  try {
    // const ret = await fetch("http://localhost:5005/departments/653156f7b20ca0c4152c373a/courses", {
    //   method: "GET",
    //   headers: {
    //     "content-type": "application/json"
    //   }
    // });
    // const obj = await ret.json();
    return foods;
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
    return "";
  } catch (error) {
    throw error;
  }
}
