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
    console.log(products);

}
main();