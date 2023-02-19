beforeEach(function() {
  cy.request('POST', `${Cypress.env('backendUrl')}/testing/reset`)
  cy.visit('')
})

describe('Blog page', function() {
  it('the page render contents correctly', function() {
    cy.contains('signup / login')
  })

  describe('Signup Form', function() {
    it('User can sign up to the page', function() {
      cy.contains('signup / login').click()
      cy.get('.signup-name').type('Cypress Test')
      cy.get('.signup-uname').type('cypresstest')
      cy.get('.signup-pass').type('cypresstest1234')
      cy.get('.signup-cpass').type('cypresstest1234')
      cy.get('.signup-btn').click()
      cy.contains('Cypress Test')
      cy.get('.success').contains('Signed in successfully')
    })

    it('Signup fails with missing username', function() {
      cy.contains('signup / login').click()
      cy.get('.signup-name').type('Cypress Test')
      cy.get('.signup-pass').type('cypresstest1234')
      cy.get('.signup-cpass').type('cypresstest1234')
      cy.get('.signup-btn').click()
      cy.get('.danger').contains('Username is missing!')
    })

    it('Signup fails with unmatching password', function() {
      cy.contains('signup / login').click()
      cy.get('.signup-name').type('Cypress Test')
      cy.get('.signup-uname').type('cypresstest')
      cy.get('.signup-pass').type('cypresstest1234')
      cy.get('.signup-cpass').type('cypresstest4321')
      cy.get('.signup-btn').click()
      cy.get('.danger').contains('Passwords are unmatched')
      cy.contains('Cypress Test').should('not.exist')
    })
  })

  describe('Login and Blog posting', function() {
    beforeEach(function() {
      cy.signup({ username: 'cypresstest', name: 'Cypress Test', password: 'cypresstest1234' })
    })

    describe('Login Form', function() {
      it('User can sign in to the page', function() {
        cy.contains('signup / login').click()
        cy.contains('Login').click()
        cy.get('#username').type('cypresstest')
        cy.get('#password').type('cypresstest1234')
        cy.get('.login-btn').click()
        cy.contains('Cypress Test')
        cy.get('.success').contains('Logged in successfully')
      })

      it('login fails with wrong password', function() {
        cy.contains('signup / login').click()
        cy.contains('Login').click()
        cy.get('#username').type('cypresstest')
        cy.get('#password').type('cypressfakepass')
        cy.get('.login-btn').click()
        cy.get('.danger').contains('Incorrect username or password')
        cy.get('.danger').should('have.css', 'color', 'rgb(0, 0, 0)')
        cy.get('html').should('not.contain', 'Cypress Test')
      })

      describe('Blog Form', function() {
        beforeEach(function() {
          cy.login({ username: 'cypresstest', password: 'cypresstest1234' })
        })

        it('user can write blogs', function() {
          cy.contains('write a blog').click()
          cy.get('.blog-ttl').type('Cypress new blog')
          cy.get('.blog-ath').type('Cypress')
          cy.get('.blog-url').type('www.cypress.com')
          cy.get('.blog-creat-btn').click()
          cy.contains('Cypress new blog Cypress')
        })

        describe('Blog writing and reading', function() {
          beforeEach(function() {
            cy.addblog({ title: 'Cypress new blog', author: 'Cypress', url: 'www.cypress.com' })
          })

          it('user can view blogs', function() {
            cy.get('.viewhide:first').click()
            cy.contains('Title').parents().contains('Cypress new blog')
            cy.contains('Author').parents().contains('Cypress')
            cy.contains('Url').parents().contains('www.cypress.com')
            cy.contains('Likes').parents().contains('0')
          })

          it('user can click on like button', function() {
            cy.get('.viewhide:first').click()
            cy.get('.like').click()
            cy.contains('Likes').parents().contains('1')
          })

          it('user can delete the blog it created', function() {
            cy.get('.blogdel').click()
            cy.get('.success').should('have.css', 'color', 'rgb(0, 0, 0)')
              .and('contain', 'Blog \'Cypress new blog\' deleted successfully')
          })

          describe('Blog delete button is not visible to non creators', function() {
            beforeEach(function() {
              window.localStorage.clear()
              cy.signup({ username: 'othertestuser', name: 'Other Test', password: 'other1234' })
              cy.login({ username: 'othertestuser', password: 'other1234' })
            })

            it('user can not view delete button', function() {
              cy.get('.blogdel').should('not.exist')
            })

            it('blogs are ordered using like', function() {
              cy.addblog({ title: 'Other Test new blog', author: 'Other Test', url: 'www.othertest.com' })
              cy.contains('Other Test new blog Other Test').find('.viewhide').as('viewbtn')
              cy.get('@viewbtn').click()
              cy.contains('Other Test new blog Other Test').contains('Likes: ').parent().find('button').as('likebtn')
              cy.get('@likebtn').click()
              cy.visit('')
              cy.get('.bloglist:first').should('contain', 'Other Test new blog Other Test')
              cy.addblog({ title: 'Third new test blog', author: 'Other Test', url: 'www.othertest.com' })
              cy.get('@viewbtn').click()
              cy.get('@likebtn').click()
              cy.contains('Third new test blog Other Test').find('.viewhide').as('secviewbtn')
              cy.get('@secviewbtn').click()
              cy.contains('Third new test blog Other Test').contains('Likes: ').parent().find('button').as('secbtn')
              cy.get('@secbtn').click()
              cy.visit('')
              cy.get('.bloglist').eq(0).should('contain', 'Other Test new blog Other Test')
              cy.get('.bloglist').eq(1).should('contain', 'Third new test blog Other Test')
              cy.get('.bloglist').eq(2).should('contain', 'Cypress new blog Cypress')
            })
          })

        })

      })
    })

  })


})
