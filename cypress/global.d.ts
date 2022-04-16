declare namespace Cypress {
  type CypressInstance = Chainable<JQuery>

  interface Chainable {
    waitForRouteChange(): void
    isInViewport(element: string): void
    getByTestId(selector: string): CypressInstance
    getByTestIdLike(selector: string): CypressInstance
    containsClass(selector: string, expectedClass: string): CypressInstance
    omitsClass(selector: string, expectedClass: string): CypressInstance
  }
}
