describe('Login Test', () => {
  beforeEach(() => {
    cy.visit('/login'); // Visit the login page before each test
  });

  it('should navigate to /attendance on successful login', () => {
    // Ingresar credenciales válidas y hacer clic en el botón de inicio de sesión
    cy.get('input[name="user"]').type('testuser');
    cy.get('input[name="password"]').type('testpassword');
    cy.get('button[type="submit"]').click();

    // Verificar la redirección a la página de asistencia
    cy.url().should('include', '/attendance');
  });

  it('should display error message on invalid credentials', () => {
    // Ingresar credenciales inválidas y hacer clic en el botón de inicio de sesión
    cy.get('input[name="user"]').type('invaliduser');
    cy.get('input[name="password"]').type('invalidpassword');
    cy.get('button[type="submit"]').click();

    // Verificar que se muestre un mensaje de error
    cy.contains('Credenciales inválidas');
  });
});
