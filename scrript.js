const cart = document.querySelectorAll('#cart');
// console.log(cart.length);
const cart_data = document.querySelector('#cart_data')
const showCartDetails = document.querySelector('#showCartDetails');

var totalPrice = 0
// var qty = 1
// var form = "<p>ello</p>"

for (let index = 0; index < cart.length; index++) {
    // console.log(cart[index]);

    cart[index].addEventListener('click', addToCart);

}

function addToCart() {

    // console.log(this.classList[4]);
    const divTitle = document.querySelector(`#card-title-${this.classList[4]}`);
    // console.log(divTitle.innerText);
    const divImg = document.querySelector(`#card-img-${this.classList[4]}`);
    // console.log(divImg.src);
    // console.log(divImg.src[22]);
    const divPrice = document.querySelector(`#card-price-${this.classList[4]}`);
    // console.log(divPrice.innerText);
    totalPrice += Number(divPrice.innerText);
    // console.log(totalPrice);
    // cart_data.innerText = `My cart $${totalPrice}`;
    saveToLocal(divTitle.innerText, divImg.src[22], divPrice.innerText, this.classList[5]);
    // console.log(this.classList[5]);

    // document.querySelector(`.${this.classList[5]}`).remove();

    // document.querySelector('.design_btn').innerHTML = `<p class="btn btn-primary rounded-0" >Added in cart</p>`
    location.reload()

}

function removeBtn() {
    //    console.log(document.querySelector(`.${list}`)); 
    let cartData;
    if (localStorage.getItem('cartData') === null) {
        cartData = [];
    } else {
        cartData = JSON.parse(localStorage.getItem('cartData'));
    }


    cartData.forEach(function showCart(value) {
        
     totalPrice =   Number(totalPrice) + Number(`${value[2]}`)
    // console.log(totalPrice);
    cart_data.innerText = `My cart $${totalPrice}`;
        // console.log(value[3]);
        // console.log(document.querySelector(`.${value[3]}`).innerText);
        if (document.querySelector(`.${value[3]}`).innerText == "Add to cart") {
            // document.querySelector('.${value[3]}').removeChild(input.parentNode);
            // console.log(document.querySelector(`.${value[3]}`));
        //    console.log(document.querySelector(`.${value[3]}`));
        document.querySelector(`.${value[3]}`).style.cursor = 'not-allowed'
            document.querySelector(`.${value[3]}`).innerHTML = `Added in cart`
             document.querySelector(`.${value[3]}`).removeEventListener("click", addToCart);
        }
    })
 


}
removeBtn()

function saveToLocal(title, src, price, class_name) {
    console.log(title, src, price);

    let cartData;
    if (localStorage.getItem('cartData') === null) {
        cartData = [];
    } else {
        cartData = JSON.parse(localStorage.getItem('cartData'));
    }
    // console.log(JSON.parse(localStorage.getItem('cartData'))[0][0]);
    // console.log(JSON.parse(localStorage.getItem('cartData'))[0][3]); 
    // for( i in cartData){
    // console.log(i);
    // console.log(cartData[i][0]);
    // console.log(title);
    // console.log(JSON.parse(localStorage.getItem('cartData'))[i][0]);
    // console.log(JSON.parse(localStorage.getItem('cartData'))[i][3]); 
    //  if (JSON.parse(localStorage.getItem('cartData'))[i][0] == title) {
    //       document.querySelector(`.${list}`).remove();
    // document.querySelector('.design_btn').innerHTML = `<p class="btn btn-primary rounded-0" >Added in cart</p>`
    // qty = JSON.parse(localStorage.getItem('cartData'))[i][3]
    // qty++
    // }
    // }
    // console.log(qty);
    //  cartData.forEach(function showCart(value) {

    //  totalPrice =   Number(totalPrice) + Number(`${value[2]}`)
    // console.log(totalPrice);
    // cart_data.innerText = `My cart $${totalPrice}`;
    //  })
    cartData.push([title, src, price, class_name])
    localStorage.setItem("cartData", JSON.stringify(cartData))
}


cart_data.addEventListener('click', getLocal);
function getLocal() {
    //    const showCartDetails = document.createElement('div');
    // showCartDetails.setAttribute('id', 'showCartDetails')
    // console.log(showCartDetails);
    // console.log(showCartDetails.style.display);
    // console.log(document.querySelector('#cart_data').attributes[6]);
    const popup = document.createElement('div')
    if (showCartDetails.style.display === "none" || showCartDetails.style.display == "") {
        showCartDetails.style.display = "block";
        let cartData;
        if (localStorage.getItem('cartData') === null) {
            cartData = [];
        } else {
            cartData = JSON.parse(localStorage.getItem('cartData'));
        }

        popup.className = 'popup';
        popup.innerHTML = `
                            <table class="table">
    <thead>
        <tr>
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Remove</th>
        </tr>
    </thead>`
        showCartDetails.appendChild(popup)
        // console.log(showCartDetails);
        cartData.forEach(function showCart(value) {
            // console.log(value[0] == );
            const tbody = document.createElement('tbody')

            tbody.innerHTML = `    
        <tbody>
        <tr>
            <th><img src=${value[1]}.jpg width="50" height="50"></th>
            <td>$${value[2]}</td>
            <td>
               <input min="1" max="10" type="number" value="${value[1]}">
            </td>
            <td><i class="fa fa-trash" aria-hidden="true" onclick="deleteLocal('${value[0]}')"></i></td>
        </tr>
    </tbody>
</table>`
            
        //   <nav aria-label="Page navigation example">
        //             <ul class="pagination">
        //                 <li class="page-item">
        //                 <button class="page-link" href="#"><i class="fa fa-minus" aria-hidden="true"></i></button>
        //                 </li>
        //                 <li class="page-item">
        //                 <input class="page-link" type="number" value="${value[1]}">
        //                 </li>
        //                 <li class="page-item">
        //                 <button class="page-link" href="#"><i class="fa fa-plus" aria-hidden="true"></i></button>
        //                 </li>
        //             </ul>
        //         </nav>
            // console.log(popup);
            // console.log(document.querySelector('.table').appendChild(tbody));
            document.querySelector('.table').appendChild(tbody)
            // console.log(typeof(document.querySelector('.popup')));
            // console.log(document.querySelector('.popup'));
            // console.log(typeof(document.querySelector('.popup').outerHTML));
            document.querySelector('#cart_data').attributes[6].value = document.querySelector('.popup').outerHTML
            //  console.log(typeof(document.querySelector('#cart_data').attributes[6]));
            // console.log(document.querySelector('#cart_data').attributes[6]);

        })
    }
    else {
        showCartDetails.style.display = "none";
        console.log(document.querySelector('.popup'));
        document.querySelector('.popup').remove()
        // console.log(document.querySelector('.popup').remove());
    }
    document.querySelector('.show').remove();
}


function deleteLocal(title) {
    console.log("delete process");
     let cartData;
        if (localStorage.getItem('cartData') === null) {
            cartData = [];
        } else {
            cartData = JSON.parse(localStorage.getItem('cartData'));
        }
    // console.log(title);
    cartData.forEach(function showCart(value, index) {
        if (value[0] === title) {
            console.log("delete this");
            console.log(cartData);
            // console.log(cartData[index]);
            // console.log(splice(cartData[index],1));
            console.log(cartData[index].indexOf(title));
            cartData.splice(cartData[index].indexOf(title),1)
            console.log(cartData);
        }
        localStorage.setItem("cartData", JSON.stringify(cartData))
        // console.log(value[0], title);
        location.reload();
    })
}