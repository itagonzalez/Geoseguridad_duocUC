describe('Profile Test', () => {
  beforeEach(() => {
    cy.visit('/login'); // Visitar la página de inicio de sesión antes de cada prueba
    cy.get('input[name="user"]').type('testuser');
    cy.get('input[name="password"]').type('testpassword');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/attendance'); // Verificar la redirección a la página de attendance
    cy.get('button[name="profileButton"]').click(); // Navegar a la página de profile
    cy.url().should('include', '/profile'); // Verificar la redirección a la página de profile
  });

  it('should update profile information', () => {
    // Simular la actualización de información en el formulario de perfil
    cy.get('input[name="name"]').clear().type('Updated Name');
    cy.get('input[name="lastName"]').clear().type('Updated Last Name');
    cy.get('button[type="submit"]').click();
    
    // Verificar que se muestre un mensaje de éxito
    cy.contains('Perfil actualizado correctamente.');
  });
});
