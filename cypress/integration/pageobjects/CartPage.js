class CartPage {

    getTotalItems() {
        return cy.get('h4.mb-3');
    }

    getQuantity() {
        return cy.get('p.mb-0');
    }

    getTotalPayment() {
        return cy.get('h3.m-0');
    }

    getCheckoutButton() {
        return cy.get('button.btn.btn.btn-primary.mb-2');
    }

    getClearButton() {
        return cy.get('button.btn.btn-outlineprimary.btn-sm');
    }

    getDeleteButton() {
        return cy.get('button.btn.btn-danger.btn-sm.mb-1');
    }

    getCartEmptyMessage() {
        return cy.get('div.p-3.text-center.text-muted');
    }

    getPrice() {
        return cy.get('div.card.card-body.border-0 p.mb-1');
    }

    getFirstProducts() {
        return cy.get('div.card.card-body.border-0');
    }

    getFirstIncrementButton() {
        return cy.get(':nth-child(1) > .text-right > .btn-primary');
    }

    getFirstItemQuantity() {
        return cy.get(':nth-child(1) > .text-center > .mb-0');
    }

    getFirstReduceButton() {
        return cy.get(':nth-child(1) > .text-right > .btn-danger > svg > path');
    }

    getSecondDeleteButton() {
        return cy.get(':nth-child(2) > .text-right > .btn-danger > svg');
    }

    getCheckoutSuccess() {
        return cy.get('.text-success > p');
    }

}

export default CartPage