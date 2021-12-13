import React from "react"
import { create } from "react-test-renderer"
import App from "../app/app"
import { RestaurantsContextProvider } from "../app/services/restaurants/restaurants.context"
import { FavouritesContextProvider } from "../app/services/favourites/favourites.context"
import { AuthenticationContextProvider } from "../app/services/authentication/authentication.context"
import { LocationContextProvider } from "../app/services/location/location.context"
import { ThemeProvider } from "styled-components/native"
import { theme } from "../app/infrastructure/theme"

const tree = create(
  <ThemeProvider theme={theme}>
    <AuthenticationContextProvider>
      <FavouritesContextProvider>
        <LocationContextProvider>
          <RestaurantsContextProvider>
            <App />
          </RestaurantsContextProvider>
        </LocationContextProvider>
      </FavouritesContextProvider>
    </AuthenticationContextProvider>
  </ThemeProvider>,
)

jest.mock("@expo/vector-icons", () => ({
  Ionicons: "",
}))

jest.mock("@expo-google-fonts/oswald", () => ({
  useFonts: () => [],
  useOswald: () => []
}))

jest.mock("@expo-google-fonts/lato", () => ({
  useFonts: () => [],
  useLato: () => []
}))

jest.mock("firebase", () => {
  const firebaseObject = {
    onAuthStateChanged: () => {
      return null
    },
  }

  return {
    apps: { length: 1 },
    auth: () => {
      return { ...firebaseObject }
    },
  }
})

describe("app test", () => {
  test("app should match snapshot", () => {
    expect(tree).toMatchSnapshot()
  })
})
