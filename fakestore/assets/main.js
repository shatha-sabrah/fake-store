const loader =document.querySelector(".loader")

const showLoader = ()=> {
    document.querySelector(".loader").classList.remove("hidden")}
    ;
const hideLoader =() =>{
    document.querySelector(".loader").classList.add("hidden")
};
 const getCategories = async () => {
    const{data} = await axios.get("https://fakestoreapi.com/products/categories");
    return data;
};

const displayCategories = async () => {
    showLoader ();

    const categories = await getCategories() 

    const result= categories.map( category => 
    `<a href="details.html?category=${encodeURIComponent(category)}" class="category-link">
    <h2>${category}</h2>
    </a>
    `).join(' ');

    document.querySelector(".categories_row").innerHTML=result; 
   
hideLoader();
};
displayCategories();


