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
  it.only('number of links',()=>{
  cy.visit('https://www.google.com/search?q=cricket&oq=cricket&gs_lcrp=EgZjaHJvbWUyDggAEEUYJxg5GIAEGIoFMhIIARAuGEMYxwEY0QMYgAQYigUyEggCEAAYQxiDARixAxiABBiKBTISCAMQABhDGIMBGLEDGIAEGIoFMhIIBBAuGEMY1AIYsQMYgAQYigUyEggFEC4YQxjUAhixAxiABBiKBTISCAYQLhhDGNQCGLEDGIAEGIoFMhIIBxAAGEMYgwEYsQMYgAQYigUyDQgIEAAYkgMYgAQYigUyDwgJEAAYQxjJAxiABBiKBagCCLACAQ&sourceid=chrome&ie=UTF-8#cobssid=s')
    cy.get('div[id="res"]').find('a').its('length').then((count)=>{
    var no_of_links=count
    cy.log(no_of_links)
  })
  cy.get('span[jsname="KJZ0wb"]').click()
  
  // cy.get("loc").its('length').then((val)=>{
  //   cy.log(val)
  //   for(let i=0;i<=val.length-1;i++){
  //     if(val%2==0){
  //       cy.get('locater').eq(i).check()
  //     }
  //   }
  // })
  
  })
});
