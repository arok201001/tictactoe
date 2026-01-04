describe('<GamePage />', () => {
  
  it('renders correctly', () => {
    cy.visit('/game')
    
    cy.contains('TIC TAC TOE').should('be.visible')
    cy.get('.grid button').should('have.length', 9)
  })

  it('detects winner X', () => {
    cy.visit('/game')

    // Simulera drag (X börjar)
    cy.get('.grid button').eq(0).click() // X
    cy.get('.grid button').eq(3).click() // O
    cy.get('.grid button').eq(1).click() // X
    cy.get('.grid button').eq(4).click() // O
    cy.get('.grid button').eq(2).click() // X -> Vinst!

    cy.contains('VICTORY!').should('be.visible')
    cy.contains('Player X Wins').should('be.visible')
  })
})