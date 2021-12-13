import React from "react"
import { create } from "react-test-renderer"
import { RestaurantDetailScreen } from "../app/features/restaurants/screens/restaurant-detail.screen"
import { FavouritesContextProvider } from "../app/services/favourites/favourites.context"
import { AuthenticationContextProvider } from "../app/services/authentication/authentication.context"
import { ThemeProvider } from "styled-components/native"
import { theme } from "../app/infrastructure/theme"

const route = { params: { id: 1, name: "restaurant" } }

const tree = create(
  <ThemeProvider theme={theme}>
    <AuthenticationContextProvider>
      <FavouritesContextProvider>
        <RestaurantDetailScreen route={route} />
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

describe("RestaurantDetail screen tests", () => {
  test("should match snapshot", () => {
    expect(tree).toMatchSnapshot()
  })
})
