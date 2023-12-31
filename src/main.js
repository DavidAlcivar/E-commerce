const BASE__URL = "https://ecommercebackend.fundamentos-29.repl.co/";

async function getProducts() {
    try {
        const data = await fetch(BASE__URL);
        const response = await data.json();

        localStorage.setItem("products", JSON.stringify(response))
        return response

    } catch (error) {
        console.log(error);

    }

}

function printProducts(store) {
    let html = "";

    store.products.forEach(function ({
        category,
        description,
        id,
        image,
        name,
        price,
        quantity

    }) {

        html += `
        <div class="product">
            <div class="product__img">
                <img src="${image}" alt="">
            </div>

            <div class="product__info">
                <h5>${name}</h5>
                <h5>$${price}.00 | Stock ${quantity}</h5>
                    ${quantity ? `<button class="product__btn" id= "${id}">Add</button>` : "<span class='soldOut'>Sold out</span>"
            } 
            </div>

        </div>
            
        `;
    });

    document.querySelector(".products").innerHTML = html;

}

function handleShowBag() {
    const iconBag = document.querySelector(".icon__bag");
    const bag = document.querySelector(".bag");

    iconBag.addEventListener("click", function () {
        bag.classList.toggle("bag__show");
    });
}

function addToBagFromProducts(store) {
    const productsHTML = document.querySelector(".products")

    productsHTML.addEventListener("click", function (e) {
        if (e.target.classList.contains("product__btn")) {
            const id = Number(e.target.id);

            const productFound = store.products.find(function (product) {
                return product.id === id

            });

            if (store.bag[productFound.id]) {
                if (productFound.quantity === store.bag[productFound.id].amount)
                    return alert("No tenemos más prendas");

                store.bag[productFound.id].amount++;
            } else {
                store.bag[productFound.id] = {
                    ...productFound,
                    amount: 1,
                };
            }

            localStorage.setItem('bag', JSON.stringify(store.bag))
            printProductsInBag(store);
            printTotal(store);
            amountPrintProducts(store);
        }



    });


}

function printProductsInBag(store) {
    let html = "";

    for (const key in store.bag) {
        const { amount, id, image, name, price, quantity } = store.bag[key]
        html += `
            <div class="bag__product">
                <div class="bag__product__img">
                    <img src="${image}" alt="imagen" />
                </div>

                <div className="bag__product__body">
                    <h4>${name} | $${price}</h4>
                    <p>Stock: ${quantity}</p>
                    <small>Price: $${price} | <b>$${amount * price}</b></small>
        
                    
                    <div class="bag__product__opt"  id='${id}'> 
                        <i class='bx bx-minus-circle'></i>
                        <span>${amount} unit</span>
                        <i class='bx bx-plus-circle'></i>
                        <i class='bx bxs-trash'></i>
                     </div>
                    
                </div>
            </div>

        `;
        console.log(store.bag[key]);
    }

    document.querySelector(".bag__products").innerHTML = html;

}
function buttonsInBag(store) {
    const bagProducts = document.querySelector(".bag__products");

    bagProducts.addEventListener("click", function (e) {
        if (e.target.classList.contains("bx-plus-circle")) {
            const id = Number(e.target.parentElement.id);

            const productFound = store.products.find(function (product) {
                return product.id === id

            });

            if (store.bag[productFound.id]) {
                if (productFound.quantity === store.bag[productFound.id].amount)
                    return alert("No tenemos más prendas");

                store.bag[id].amount++;
            }
        }
        if (e.target.classList.contains("bx-minus-circle")) {
            const id = Number(e.target.parentElement.id);
            if (store.bag[id].amount === 1) {
                const response = confirm("Seguro que quieres eliminar este producto?")
                if (!response) return;
                delete store.bag[id];
            } else {
                store.bag[id].amount--;

            }

        }
        if (e.target.classList.contains("bxs-trash")) {
            const id = Number(e.target.parentElement.id);
            const response = confirm("Seguro que quieres eliminar este producto?")
            if (!response) return;
            delete store.bag[id];
        }
        localStorage.setItem("bag", JSON.stringify(store.bag))
        printProductsInBag(store);
        printTotal(store);
        amountPrintProducts(store);


    });

}
function printTotal(store) {
    const infoTotal = document.querySelector(".info__total");
    const infoAmount = document.querySelector(".info__amount");

    let totalProducts = 0;
    let amountProducts = 0;

    for (const product in store.bag) {
        const { amount, price } = store.bag[product];
        totalProducts += price * amount;
        amountProducts += amount;

    }
    infoTotal.textContent = "$" + totalProducts + ".00";
    infoAmount.textContent = amountProducts + " Units";

}
function total(store) {
    const btnBuy = document.querySelector(".btn__buy");
    btnBuy.addEventListener("click", function () {
        if (!Object.values(store.bag).length)
            return alert("No has añadido nada")
        const response = confirm("Seguro que quieres comprar?");
        if (!response) return;

        const currentProducts = [];

        for (const product of store.products) {
            const productBag = store.bag[product.id];
            if (product.id === productBag?.id) {
                currentProducts.push({
                    ...product,
                    quantity: product.quantity - productBag.amount,
                });
            } else {
                currentProducts.push(product);
            }

        }

        store.products = currentProducts;
        store.bag = {};

        localStorage.setItem("products", JSON.stringify(store.products));
        localStorage.setItem("bag", JSON.stringify(store.bag));

        printTotal(store);
        printProductsInBag(store);
        printProducts(store);
        amountPrintProducts(store);



    });

}
function amountPrintProducts(store) {
    const amountProducts = document.querySelector(".amountProducts");

    let amount = 0;
    for (const product in store.bag) {
            amount += store.bag[product].amount;  
        }

        amountProducts.textContent = amount;
    
}
async function main() {
    const store = {
        products:
            JSON.parse(localStorage.getItem("products")) || (await getProducts()),
        bag: JSON.parse(localStorage.getItem("Bag")) || {},
    };

    printProducts(store);
    handleShowBag();
    addToBagFromProducts(store);
    printProductsInBag(store);
    buttonsInBag(store);
    printTotal(store);
    total(store);
    amountPrintProducts(store);
    


}




main();