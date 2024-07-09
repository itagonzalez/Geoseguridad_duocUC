describe('Attendance Test', () => {
  beforeEach(() => {
    cy.visit('/login'); // Visitar la página de inicio de sesión antes de cada prueba
    cy.get('input[name="user"]').type('testuser');
    cy.get('input[name="password"]').type('testpassword');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/attendance'); // Verificar la redirección a la página de attendance
  });

  it('should mark attendance successfully', () => {
    // Simular el proceso de check-in
    cy.get('button[name="checkInButton"]').click();
    cy.contains('Check-in realizado correctamente.');
    
    // Simular el proceso de check-out
    cy.get('button[name="checkOutButton"]').click();
    cy.contains('Check-out realizado correctamente.');
  });
});
