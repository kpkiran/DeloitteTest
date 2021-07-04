class Products {
   
    getProductName() {
        return cy.get('.img-fluid + p');
    }

    getCartLink() {
        return cy.get('[href="/cart"]')
    }
}

export default Products;