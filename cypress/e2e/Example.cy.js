import ExamplePage from "../pages/example.po";
describe("User Data Test", () => {
  before(() => {
    cy.fixture("example1.json").as("userData");
  });
  it("should access user data from fixture", function () {
    cy.visit(Cypress.env("baseUrl"));
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
});
