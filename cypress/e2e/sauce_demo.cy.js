describe('Sauce Demo Cart Functionality', () => {
    beforeEach(() => {
        // Log in user
        cy.visit('https://www.saucedemo.com');
        cy.get('input[name="user-name"]').type('standard_user');
        cy.get('input[name="password"]').type('secret_sauce');

        cy.get('input[type="submit"]').click();
    });
        
    it('should add items to the cart', () => {
        
        // Add first item to cart
        cy.get('.inventory_item').first().find('.btn_inventory').click();
        
        // Verify the cart count (assertion 1)
        cy.get('.shopping_cart_badge').should('have.text', '1');
        
        // Add second item to cart
        cy.get('.inventory_item').eq(1).find('.btn_inventory').click();
        
        // Verify the cart count (assertion 2)
        cy.get('.shopping_cart_badge').should('have.text', '2');
    });

    it('should view the cart and check items', () => {

        // Add items to cart
        cy.get('.inventory_item').first().find('.btn_inventory').click();
        
        cy.get('.inventory_item').eq(1).find('.btn_inventory').click();

        // Go to the cart
        cy.get('.shopping_cart_link').click();

        // Verify items in the cart (assertion)
        cy.get('.cart_item').should('have.length', 2);
        cy.get('.cart_item').first().find('.inventory_item_name').should('exist');
        cy.get('.cart_item').eq(1).find('.inventory_item_name').should('exist');
        cy.get('.shopping_cart_badge').should('have.text', '2');
    });

    it('should remove items from the cart', () => {
        
        // Add items to cart
        cy.get('.inventory_item').first().find('.btn_inventory').click();
        cy.get('.inventory_item').eq(1).find('.btn_inventory').click();
        
        // Go to the cart
        cy.get('.shopping_cart_link').click();
        
        // Remove first item
        cy.get('.cart_item').first().find('#remove-sauce-labs-backpack').click();
        
        // Verify the cart count (assertion)
        cy.get('.cart_item').should('have.length', 1);
        cy.get('.shopping_cart_badge').should('have.text', '1');
    });
});