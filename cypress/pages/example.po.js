class CAWStudio{
    clickOnTableData(){
       return cy.get('div[class="centered"]>details>summary')
    }
    clickOnInputBox(){
       return cy.get('textarea[id="jsondata"]')
    }
    clickOnRefreshTableButton(){
       return cy.get('button[id="refreshtable"]')
    }

}

const ExamplePage=new CAWStudio()
export default ExamplePage