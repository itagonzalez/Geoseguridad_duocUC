describe('Register Test', () => {
  beforeEach(() => {
    cy.visit('/register'); // Visitar la página de registro antes de cada prueba
  });

  it('should successfully register a new user', () => {
    // Completar el formulario de registro con datos válidos
    cy.get('input[name="user"]').type('newuser');
    cy.get('input[name="password"]').type('newpassword');
    cy.get('input[name="email"]').type('newuser@example.com');
    cy.get('input[name="address"]').type('1234 Test Street');
    cy.get('input[name="name"]').type('John');
    cy.get('input[name="lastName"]').type('Doe');
    cy.get('input[name="companyName"]').type('Test Company');
    cy.get('input[name="dateBirth"]').type('1990-01-01');

    // Hacer clic en el botón de registrar
    cy.get('button[type="submit"]').click();

    // Verificar que se muestre un mensaje de éxito
    cy.contains('Usuario registrado correctamente.');

    // Verificar la navegación a la página de inicio de sesión
    cy.url().should('include', '/login');
  });

  it('should display error message on registration failure', () => {
    // Completar el formulario de registro con datos inválidos y hacer clic en registrar
    cy.get('input[name="user"]').type('existinguser');
    cy.get('input[name="password"]').type('newpassword');
    cy.get('input[name="email"]').type('existinguser@example.com');
    cy.get('input[name="address"]').type('5678 Test Street');
    cy.get('input[name="name"]').type('Jane');
    cy.get('input[name="lastName"]').type('Smith');
    cy.get('input[name="companyName"]').type('Another Company');
    cy.get('input[name="dateBirth"]').type('1995-01-01');

    cy.get('button[type="submit"]').click();

    // Verificar que se muestre un mensaje de error
    cy.contains('Usuario ya registrado');
  });
});
