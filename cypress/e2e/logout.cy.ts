describe('Logout Test', () => {
  beforeEach(() => {
    cy.visit('/login'); // Visitar la página de inicio de sesión antes de cada prueba
    cy.get('input[name="user"]').type('testuser');
    cy.get('input[name="password"]').type('testpassword');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/attendance'); // Verificar la redirección a la página de attendance
  });

  it('should log out successfully', () => {
    // Simular el proceso de log out
    cy.get('button[name="logoutButton"]').click();
    cy.url().should('include', '/login'); // Verificar que se redirige a la página de inicio de sesión
  });
});
