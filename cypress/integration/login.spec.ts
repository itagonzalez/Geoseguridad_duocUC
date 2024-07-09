describe('Login Test', () => {
    it('should navigate to /attendance on successful login', () => {
      cy.visit('/login');
      
      // Ingresa el nombre de usuario y la contraseña
      cy.get('input[name="user"]').type('testuser');
      cy.get('input[name="password"]').type('testpassword');
  
      // Haz clic en el botón de iniciar sesión
      cy.get('button[type="submit"]').click();
  
      // Verifica la navegación a la página de asistencia
      cy.url().should('include', '/attendance');
    });
  });
  