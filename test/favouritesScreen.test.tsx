import React from "react"
import { create } from "react-test-renderer"
import { FavouritesScreen } from "../app/features/settings/screens/favourites.screen"
import { FavouritesContextProvider } from "../app/services/favourites/favourites.context"
import { AuthenticationContextProvider } from "../app/services/authentication/authentication.context"
import { ThemeProvider } from "styled-components/native"
import { theme } from "../app/infrastructure/theme"

const navigation = {
  navigate: jest.fn(),
}

const tree = create(
  <ThemeProvider theme={theme}>
    <AuthenticationContextProvider>
      <FavouritesContextProvider>
        <FavouritesScreen navigation={navigation} />
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

describe("Favourites screen tests", () => {
  test("should match snapshot", () => {
    expect(tree).toMatchSnapshot()
  })
})
