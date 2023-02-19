// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Cypress custom command for user signup
Cypress.Commands.add('signup', ({ username, name, password }) => {
  cy.request('POST', `${Cypress.env('backendUrl')}/users`, {
    username,
    name,
    password
  })
  cy.visit('')
})

// Cypress custom command for user login
Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${Cypress.env('backendUrl')}/login`, {
    username,
    password
  })
    .then(response => {
      localStorage.setItem('blogappuser', JSON.stringify(response.body))
      cy.visit('')
    })
})

// Cypress custom command for blog posting
Cypress.Commands.add('addblog', ({ title, url, author }) => {
  let token = JSON.parse(localStorage.getItem('blogappuser'))
  let config = { Authorization: `Bearer ${token.token}` }
  let blog = {
    title,
    author,
    url
  }
  cy.request({
    method: 'POST',
    url: `${Cypress.env('backendUrl')}/blogs`,
    headers: config,
    body: blog
  })
  cy.visit('')
})