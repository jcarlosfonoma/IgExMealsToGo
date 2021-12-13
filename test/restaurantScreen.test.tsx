import React from "react"
import { create } from "react-test-renderer"
import { RestaurantsScreen } from "../app/features/restaurants/screens/restaurants.screen"
import { RestaurantsContextProvider } from "../app/services/restaurants/restaurants.context"
import { FavouritesContextProvider } from "../app/services/favourites/favourites.context"
import { AuthenticationContextProvider } from "../app/services/authentication/authentication.context"
import { LocationContextProvider } from "../app/services/location/location.context"
import { ThemeProvider } from "styled-components/native"
import { theme } from "../app/infrastructure/theme"

const navigation = {
  navigate: jest.fn(),
}

const tree = create(
  <ThemeProvider theme={theme}>
    <AuthenticationContextProvider>
      <FavouritesContextProvider>
        <LocationContextProvider>
          <RestaurantsContextProvider>
            <RestaurantsScreen navigation={navigation} />
          </RestaurantsContextProvider>
        </LocationContextProvider>
      </FavouritesContextProvider>
    </AuthenticationContextProvider>
  </ThemeProvider>,
)

jest.mock("@expo/vector-icons", () => ({
  Ionicons: "",
}))

jest.mock("firebase", () => {
  const firebaseObject = {
    onAuthStateChanged: () => {
      return null
    },
  }

  return {
    auth: () => {
      return { ...firebaseObject }
    },
  }
})

describe("Reatuarants screen test", () => {
  test("RestaurantsScreen should match Snapshot", () => {
    expect(tree).toMatchSnapshot()
  })
})
