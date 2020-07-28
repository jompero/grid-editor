import 'cypress-localstorage-commands'

describe('Login', () => {
    beforeEach(() => {
        cy.restoreLocalStorage()
      });

      afterEach(() => {
        cy.saveLocalStorage()
      });

    it('Login through Google', () => {
      const username = Cypress.env('TEST_GOOGLE_MAIL');
      const password = Cypress.env('TEST_GOOGLE_PWD');
      const loginUrl = Cypress.env('GOOGLE_LOGIN_URL');
      const cookieName = Cypress.env('COOKIENAME');
      const localStorageItem = Cypress.env('LSD_ITEMNAME');

      const socialLoginOptions = {
        username,
        password,
        loginUrl,
        headless: true,
        logs: true,
        loginSelector: 'button[class="login-button"]',
        loginSelectorDelay: 1000,
        postLoginSelector: 'button[class="login-button"]',
        isPopup: true,
        popupDelay: 2000,
      }

      cy.visit('http://localhost:3000');

      cy.clearLocalStorageSnapshot();

      return cy.task('GoogleSocialLogin', socialLoginOptions).then(({lsd, cookies}) => {
        // Check for localStorage item, such as a JWT or similar
        const hasLsd = Object.keys(lsd)
            .filter(item => item === localStorageItem)
            .pop()

        if (hasLsd) {
            cy.window().then(() => {
            Object.keys(lsd).forEach(key => {
                cy.setLocalStorage(key, lsd[key])
            })
            })

            // Saves a snapshot of localStorage
            cy.saveLocalStorage()
        }
        })

        cy.clearCookies();
   
        const cookie = cookies.filter(cookie => cookie.name === cookieName).pop()
        if (cookie) {
          cy.setCookie(cookie.name, cookie.value, {
            domain: cookie.domain,
            expiry: cookie.expires,
            httpOnly: cookie.httpOnly,
            path: cookie.path,
            secure: cookie.secure
          })
  
          Cypress.Cookies.defaults({
            whitelist: cookieName
          })
        }
      })
    })

    it('user is logged in', () => {
        cy.visit('http://localhost:3000');
    })
  })