import ExamplePage from "../pages/example.po";

describe("User Data Test", () => {
  before(() => {
    cy.fixture("example1.json").as("userData");
  });
  it("should access user data from fixture", function () {
    //cy.intercept('POST', '**/login').as('login');
    cy.visit(Cypress.env("baseUrl"));
    //cy.wait('@login')
    ExamplePage.clickOnTableData().click({ force: true });
    ExamplePage.clickOnInputBox()
      .clear()
      .type(JSON.stringify(this.userData.typedData), {
        parseSpecialCharSequences: false,
      });
    ExamplePage.clickOnRefreshTableButton().click();
    for (let i = 3; i <= 7; i++) {
      cy.get(
        `table[id="dynamictable"] > tr:nth-child(${i}) > td:nth-child(1)`
      ).then((cell) => {
        const cellText = cell.text().trim();
        expect(cellText).to.equal(this.userData.typedData[i - 3].name);
      });
      cy.get(
        `table[id="dynamictable"] > tr:nth-child(${i}) > td:nth-child(2)`
      ).then((cell) => {
        const cellText = cell.text().trim();
        expect(cellText).to.equal(
          this.userData.typedData[i - 3].age.toString()
        );
      });
      cy.get(
        `table[id="dynamictable"] > tr:nth-child(${i}) > td:nth-child(3)`
      ).then((cell) => {
        const cellText = cell.text().trim();
        expect(cellText).to.equal(this.userData.typedData[i - 3].gender);
      });
    }
    cy.wait(4000);
  });
  it("number of links", () => {
    cy.visit(
      "https://www.google.com/search?q=cricket&oq=cricket&gs_lcrp=EgZjaHJvbWUyDggAEEUYJxg5GIAEGIoFMhIIARAuGEMYxwEY0QMYgAQYigUyEggCEAAYQxiDARixAxiABBiKBTISCAMQABhDGIMBGLEDGIAEGIoFMhIIBBAuGEMY1AIYsQMYgAQYigUyEggFEC4YQxjUAhixAxiABBiKBTISCAYQLhhDGNQCGLEDGIAEGIoFMhIIBxAAGEMYgwEYsQMYgAQYigUyDQgIEAAYkgMYgAQYigUyDwgJEAAYQxjJAxiABBiKBagCCLACAQ&sourceid=chrome&ie=UTF-8#cobssid=s"
    );
    cy.get('div[id="res"]')
      .find("a")
      .its("length")
      .then((count) => {
        var no_of_links = count;
        cy.log(no_of_links);
      });
  });
  it("number of links", () => {
    cy.visit(
      "https://www.google.com/search?q=cricket&oq=cricket&gs_lcrp=EgZjaHJvbWUyDggAEEUYJxg5GIAEGIoFMhIIARAuGEMYxwEY0QMYgAQYigUyEggCEAAYQxiDARixAxiABBiKBTISCAMQABhDGIMBGLEDGIAEGIoFMhIIBBAuGEMY1AIYsQMYgAQYigUyEggFEC4YQxjUAhixAxiABBiKBTISCAYQLhhDGNQCGLEDGIAEGIoFMhIIBxAAGEMYgwEYsQMYgAQYigUyDQgIEAAYkgMYgAQYigUyDwgJEAAYQxjJAxiABBiKBagCCLACAQ&sourceid=chrome&ie=UTF-8#cobssid=s"
    );
    cy.get('div[id="res"]')
      .find("a")
      .its("length")
      .then((count) => {
        var no_of_links = count;
        cy.log(no_of_links);
      });
    }) 
  });
 
  describe.only('CSV to JSON Test', () => {
      it.only("csv to json", () => {
        cy.readFile("D:/nagesh/cypress-project1/cypress/fixtures/industry (1).csv", 'binary').then((data) => {
          cy.task("csvToJson", data).then((jsonData) => {
            // Process data
            cy.log(JSON.stringify(jsonData));
    
            // Example assertions based on your JSON structure
            cy.writeFile("cypress/fixtures/expect1.json",jsonData)
            
            // expect(jsonData).to.have.length.greaterThan(0);
            // Adjust the assertions as per your data structure
          });
          cy.readFile('D:/nagesh/cypress-project1/cypress/fixtures/expect1.json').then((data)=>{

            expect(data[7].Industry).to.equal('Business Opportunity')
          })
        });
      });
    });
