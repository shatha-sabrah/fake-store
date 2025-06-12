const loader =document.querySelector(".loader");

const showLoader = ()=> {
    document.querySelector(".loader").classList.remove("hidden")}
    ;
const hideLoader =() =>{
    document.querySelector(".loader").classList.add("hidden")};
    
const productsContainer = document.querySelector(".products_row");


 const getCategories = async () => {
    const{data} = await axios.get("https://fakestoreapi.com/products/categories");
    return data;
};

const getCategoryProducts= async() => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category");
    console.log("category from URL:",category);

    const {data} = await axios.get(`https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`);
    return data;
};

let currentPage=1;
const itemsPerPage=2;
let allProducts = [];

const displayProducts = async() =>{
    showLoader();

    const products=await getCategoryProducts ();
    allProducts=products;


    const start = (currentPage-1)*itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedProducts = allProducts.slice(start,end);
    
    const result=paginatedProducts.map(product => {
        return`
        <div class="product">
        <img class="product-image" src="${product.image}" alt="${product.title}"/>
        <h2>${product.title}</h2>
        <span>${product.price}</span>
        </div>
        `;
    }).join('');
    console.log(products);
    document.querySelector(".products_row").innerHTML=result;
    
    let pagination="";

if(currentPage>1){
    pagination +=`
    <li><button onclick="changePage(${currentPage-1})">&lt;</button></li>`;
}

for(let i=1; i<=Math.ceil(allProducts.length/itemsPerPage);i++){
    pagination+=`
    <li>
    <button onclick="changePage(${i})" class= "${i===currentPage?'active':''}">${i}
    </button></li>
    `;
}

if(currentPage < Math.ceil(allProducts.length/itemsPerPage)){
    pagination +=`
    <li><button onclick ="changePage(${currentPage+1})">&gt;</button></li>
    `;
}
document.querySelector(".pagination").innerHTML=pagination;
    hideLoader();
    customModal();

};
displayProducts();
function changePage(page){
    currentPage= page;
    displayProducts()
}



function customModal(){
const imges = Array.from(document.querySelectorAll(".product-image"));

const modal=document.querySelector('.my-modal');
const modalImg =document.querySelector(".modal-img");
const BtnClose = document.querySelector(".close-btn");
const leftBtn = document.querySelector(".left-btn");
const rightBtn = document.querySelector(".right-btn");

let currentIndex = 0;

imges.forEach((img)=> {
    img.addEventListener ( "click",(e)=>{
    modal.classList.remove("d-none");
    modalImg.setAttribute("src",e.target.src);
    currentIndex=imges.indexOf(e.target);
});
});

BtnClose.addEventListener("click",() =>{
    modal.classList.add("d-none");
});

rightBtn.addEventListener("click",()=>{
    currentIndex++;
    if (currentIndex>=imges.length)currentIndex=0;
    modalImg.setAttribute("src",imges[currentIndex].src);
});

leftBtn.addEventListener("click",()=>{
    currentIndex--
    if(currentIndex<0)currentIndex=imges.length-1;
   modalImg.setAttribute("src",imges[currentIndex].src);
});
};


