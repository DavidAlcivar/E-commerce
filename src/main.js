const BASE__URL = "https://ecommercebackend.fundamentos-29.repl.co/";

async function getProducts() {
    try {
        const data = await fetch(BASE__URL);
        const response = await data.json();
        return response

    } catch (error) {
        console.log(error);

    }

}
async function main() {
    const products = await getProducts();
    let html = "";
    products.forEach(function(products) {
        console.log(products);

    });
    html += "products";

    document.querySelector(".products").innerHTML = html;
    

}
main();