import {
  fireEvent,
  render,
  screen,
  waitFor
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
import UserTable from "./components/UserTable";



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
            <Home>
              <UserTable/>
              </Home>
          </MemoryRouter>
        </Provider>
      );
      homeHeader = getByTestId("navbar-title");
    });
    await expect(homeHeader.textContent).toBe(`Home`);
  });


  it("Renders the home page correctly with the usertable", async () => {
    let userTable;
   await act(async () => {
      const {getByTestId, asFragment} = render(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/"]}>
            <Home>
              <UserTable/>
              </Home>
          </MemoryRouter>
        </Provider>
      );
      userTable = await waitFor(()=>{
        return getByTestId("user-table");
      });
    expect(userTable.children).toHaveLength(2);
    expect(asFragment()).toMatchSnapshot();
    });
    
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

});