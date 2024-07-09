describe('History Page Test', () => {
    beforeEach(() => {
      // Antes de cada prueba, asegúrate de iniciar sesión para acceder al historial
      cy.visit('/login');
      cy.get('input[name="user"]').type('testuser');
      cy.get('input[name="password"]').type('testpassword');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/attendance'); // Verifica que se haya redirigido a la página de asistencia
      cy.visit('/history'); // Visita la página de historial
    });
  
    it('should display user attendance history', () => {
      // Verifica que la página de historial esté cargada
      cy.contains('Historial de Asistencia').should('be.visible');
  
      // Verifica que se muestre al menos un registro de historial
      cy.get('.attendance-entry').should('have.length.greaterThan', 0);
  
      // Verifica que los detalles del registro de historial sean visibles
      cy.get('.attendance-entry').first().click(); // Simula hacer clic en el primer registro
      cy.contains('Detalles del Registro').should('be.visible');
      cy.contains('Fecha de Entrada').should('be.visible');
      cy.contains('Fecha de Salida').should('be.visible');
      cy.contains('Ubicación').should('be.visible');
    });
  
    it('should navigate back to attendance page', () => {
      // Verifica que el botón de regresar esté presente y funcione
      cy.contains('Regresar').click();
      cy.url().should('include', '/attendance'); // Verifica que se haya regresado a la página de asistencia
    });
  });
  