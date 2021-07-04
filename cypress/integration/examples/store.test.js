/// <reference types="Cypress" />

import ProductsPage from '../pageobjects/ProductsPage'
import CartPage from '../pageobjects/CartPage'


describe('Add items to cart and clear', () => {

    const products = new ProductsPage();
    const carts = new CartPage();

    beforeEach(function() {
        cy.fixture('example').then(function (data) {
            this.data = data;
        })
    })

    it('should add an item to cart and clear it', function() {
        let sum = 0;
        let totalQuantity = 0;
        cy.visit(this.data.url)
        cy.selectProduct(this.data.productName)
        products.getCartLink().click()
        cy.get('div.col-sm-4.p-2').find('h5.mb-1')
           .invoke('text').then((text) => {
               expect(text.trim()).equal(this.data.productName)
           })
        
        carts.getQuantity().each((el, index, list) => {
           const qantity = el.text();
           let qty = qantity.split(" ");
           qty = qty[1].trim();
           totalQuantity = Number(totalQuantity) + Number(qty)
        })

        carts.getTotalItems().then((element) => {
           const item = element.text();
           let totalItem = item.trim();
           expect(Number(totalItem)).to.equal(totalQuantity);
           expect(carts.getDeleteButton()).to.exist;
        })

        carts.getPrice().each((el, index, list) => {
           const amount = el.text();
           let res = amount.split("$")
           res = res[1].trim()
           sum = Number(sum) + Number(res);
        })

        carts.getTotalPayment().then((element) => {
           const amount = element.text();
           let res = amount.split("$");
           let total = res[1].trim()
           expect(Number(total)).to.equal(sum)
        })

        carts.getClearButton().click()
           .then(() => {
               carts.getCartEmptyMessage().should('have.text', this.data.emptyCart)
           })        
    })

    it('should add items to cart and checkout', function() {
        let sum = 0;
        let totalQuantity = 0;
        let qty = 0;
        let totalItem = 0;
        let res = 0;
        let prod = 0;
        
        // Go to Store Page
        cy.visit(this.data.url);
        // Add two items to cart
        this.data.productNames.forEach(function(element) {
            cy.selectProduct(element);
        });
        // Go to Cart
        products.getCartLink().click();
        
        // For the first item, increase quantity to 3 
        carts.getFirstIncrementButton().click();
        
        carts.getQuantity().each((el, index, list) => {
            if(index === 0) {
                const qantity = el.text();
                qty = qantity.split(" ");
                qty = qty[1].trim();
                totalQuantity = Number(totalQuantity) + Number(qty)
            }
         })
        carts.getFirstIncrementButton().click();

        carts.getQuantity().each((el, index, list) => {
            if(index === 0) {
                const qantity = el.text();
                qty = qantity.split(" ");
                qty = qty[1].trim();
                totalQuantity = Number(totalQuantity) + Number(qty) - 1
            }
         })

        //  Check value of Total Items, Total Payment
         carts.getTotalItems().then((element) => {
            const item = element.text();
            totalItem = item.trim();
            expect(Number(totalItem)).to.equal(totalQuantity);
         })
         
         carts.getPrice().each((el, index, list) => {
            const amount = el.text();
            res = amount.split("$")
            res = res[1].trim()

            if(index === 0) {
                prod = Number(res) * Number(qty);
                sum = Number(sum) + Number(prod);
            } else {
                prod = Number(res);
                sum = Number(sum) + Number(prod);
            }
         })

         carts.getTotalPayment().then((element) => {
            const amount = element.text();
            let res = amount.split("$");
            let total = res[1].trim()

            expect(Number(total)).to.equal(Number(sum))
         })

         // Check that Reduce button displays for the first item
        expect(carts.getFirstReduceButton()).to.exist;

        // Check that Delete button displays for the second item
        carts.getDeleteButton().each((el,index, list) => {
            if(index === 1) {
                expect(':nth-child(2) > .text-right > .btn-danger > svg').to.exist;
            }
        })

        // For the first item, decrease quantity to 2
        carts.getFirstReduceButton().click({force:true})
          
        carts.getFirstReduceButton().click({force:true});
    

        carts.getQuantity().each((el, index, list) => {
            if(index === 0) {
                const qantity = el.text();
                qty = qantity.split(" ");
                qty = qty[1].trim();
                totalQuantity = Number(totalQuantity) - Number(qty) - 1
            }
         })
        //  Check value of Total Items, Total Payment
         carts.getTotalItems().then((element) => {
            const item = element.text();
            totalItem = item.trim();
            expect(Number(totalItem)).to.equal(totalQuantity);
         })
         
         carts.getPrice().each((el, index, list) => {            
           if(index === 0) {
                const amount = el.text();
                res = amount.split("$");
                res = res[1].trim();
                sum = Number(sum) - Number(res) - Number(res)
           }
         })

         carts.getTotalPayment().then((element) => {
            const amount = element.text();
            let amt = amount.split("$");
            let total = amt[1].trim()
            let finalSum = sum.toFixed(2).toString();
            expect(Number(total)).to.equal(Number(finalSum))
         })

         //Delete the second item
         carts.getSecondDeleteButton().click();
        
         //Check that the first item is removed from cart
         carts.getTotalItems().should('have.text', 1)

        //Click Checkout button
         carts.getCheckoutButton().click();
        
        carts.getCheckoutSuccess().invoke('text')
         .then((text) => {
            expect(text).to.equal('Checkout successfull')
         })

         carts.getCartEmptyMessage().invoke('text')
            .then((text) => {
                expect(text).to.equal('Your cart is empty');
            })
    })
})
