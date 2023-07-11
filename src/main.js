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
            <h3>${name}</h3>
            <p>$${price}.0 - ${quantity} unidades</p>
            <button class="product__btn" id= "${id}">Agregar</button>

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
                store.bag[productFound.id].amount++;
            } else {
                store.bag[productFound.id] = {
                    ...productFound,
                    amount: 1,
                };
            }

        }

        let html = "";

        for (const key in store.bag) {
            const { amount, id, image, name, price } = store.bag[key]
            html += `
                <div class="bag__products">
                    <div className="bag__products__img">
                        <img src="${image}" alt="" />
                    </div>

                    <div class="bag__products__body">
                        <p>
                            <b>${name}/<b>
                        </p>
                        <p>
                            <small>price: $${price} | <b>$${amount * price}</b></small>
                        </p>
                        <div class="cart__product__opt">
                            <i class='bx bx-minus-circle'></i>
                            <span>${amount}</span>
                            <i class='bx bx-minus-circle'></i>
                            <i class='bx bxs-trash'></i>
                         </div>
                        
                    </div>
                </div>

            `;
            console.log(store.bag[key]);

        }

        document.querySelector(".bag__products").innerHTML = html;

    });

}

async function main() {
    const store = {
        products: await getProducts(),
        bag: {},
    };

    printProducts(store);
    handleShowBag();
    addToBagFromProducts(store);
}

main();