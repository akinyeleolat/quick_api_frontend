import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import {act} from "react-dom/test-utils";
import Home from "./pages/Home";
import App from "./App";
import CreateUser from "./pages/CreateUser";
import EditUser from "./pages/EditUser";
import {server} from "./mocks/server";
import {MemoryRouter} from "react-router-dom";
import {Provider} from 'react-redux'
import thunk from "redux-thunk";
import configureMockStore from 'redux-mock-store';



beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


describe("AppTest", () => {
  // mock store for testing
  const middlewares = [thunk]
  const initialState = {app: {users: []}};
  const mockStore = configureMockStore(middlewares)
  let store = mockStore(initialState)

  it("Renders react app without crashing", async () => {
    act(() => {
      render(
        <Provider store={store}>
          <App />
        </Provider>
      );
    });
  });


  it("Renders the home page correctly", async () => {
    let homeHeader;
    act(() => {
      const {getByTestId} = render(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/"]}>
            <Home />
          </MemoryRouter>
        </Provider>
      );
      homeHeader = getByTestId("navbar-title");
    });
    await expect(homeHeader.textContent).toBe(`Home`);
  });


  it("Renders the create user page correctly", async () => {
    let createUserHeader;
    act(() => {
      const {getByTestId} = render(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/create-user"]}>
            <CreateUser />
          </MemoryRouter>
        </Provider>
      );
      createUserHeader = getByTestId("navbar-title");
    });
    await expect(createUserHeader.textContent).toBe(`Create User`);
  });

  // it("Renders the edit user page correctly", async () => {
  //   let editUserHeader;
  //   act(() => {
  //     const {getByTestId} = render(
  //       <Provider store={store}>
  //         <MemoryRouter initialEntries={["/edit-user"]}>
  //           <EditUser />
  //         </MemoryRouter>
  //       </Provider>
  //     );
  //     editUserHeader = getByTestId("navbar-title");
  //   });
  //   await expect(editUserHeader.textContent).toBe(`Edit User`);
  // });



  // it("Updates the componenent when it receives api data", async () => {
  //   act(() => {
  //     render(
  //       <Provider store={store}>
  //         <MemoryRouter initialEntries={["/"]}>
  //           <Home />
  //         </MemoryRouter>
  //       </Provider>
  //     );
  //   });


  //   expect(
  //     await screen.findByText(`Firstname Lastname`)
  //   ).toBeInTheDocument();
  // });


  // it("Updates the form when the input when the user types in it", async () => {
  //   await act(async () => {
  //     const {getByTestId} = render(
  //       <Provider store={store}>
  //         <MemoryRouter initialEntries={["/edit-user"]}>
  //           <EditUser />
  //         </MemoryRouter>
  //       </Provider>
  //     );


  //     const firstInput = getByTestId("firstname-input");
  //     const lastInput = getByTestId("lastname-input");
  //     const address1Input = getByTestId("address1-input");
  //     const address2Input = getByTestId("address2-input");
  //     const townInput = getByTestId("town-input");
  //     const regionInput = getByTestId("region-input");
  //     const postcodeInput = getByTestId("postcode-input");
  //     const countryInput = getByTestId("country-input");
  //     const phoneInput = getByTestId("contact-number-input");


  //     const firstInputWord = "Testing";
  //     const lastInputWord = "Another";
  //     const address1InputWord = "Address1Test";
  //     const address2InputWord = "Address2Test";
  //     const townInputWord = "TownTest";
  //     const regionInputWord = "RegionTest";
  //     const postcodeInputWord = "PostcodeTest";
  //     const countryInputWord = "CountryTest";
  //     const phoneInputWord = "PhoneTest";

  //     await fireEvent.change(firstInput, {target: {value: firstInputWord}});
  //     // await fireEvent.change(lastInput, {target: {value: lastInputWord}});
  //     // await fireEvent.change(address1Input,  {target: {value: address1InputWord}});
  //     // await fireEvent.change(address2Input, {target: {value: address2InputWord}});
  //     // await fireEvent.change(townInput, {target: {value: townInputWord}});
  //     // await fireEvent.change(regionInput, {target: {value: regionInputWord}});
  //     // await fireEvent.change(postcodeInput, postcodeInputWord);
  //     // await fireEvent.change(countryInput, countryInputWord);
  //     // await fireEvent.change(phoneInput, phoneInputWord);



  //     await expect(firstInput.textContent).toBe(firstInputWord);
  //     // await expect(lastInput.nodeValue).toBe(lastInputWord);
  //     // await expect(address1Input.nodeValue).toBe(address1InputWord);
  //     // await expect(address2Input.nodeValue).toBe(address2InputWord);
  //     // await expect(townInput.nodeValue).toBe(townInputWord);
  //     // await expect(regionInput.nodeValue).toBe(regionInputWord);
  //     // await expect(postcodeInput.nodeValue).toBe(postcodeInputWord);
  //   });
  // });
});
