import React from "react"
import { create } from "react-test-renderer"
import { LoginScreen } from "../app/features/account/screens/login.screen"
import { AuthenticationContextProvider } from "../app/services/authentication/authentication.context"
import { ThemeProvider } from "styled-components/native"
import { theme } from "../app/infrastructure/theme"

const navigation = {
  navigate: jest.fn(),
}

const tree = create(
  <ThemeProvider theme={theme}>
    <AuthenticationContextProvider>
      <LoginScreen navigation={navigation} />
    </AuthenticationContextProvider>
  </ThemeProvider>,
)

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

describe("Login screen tests", () => {
  test("should match snapshot", () => {
    expect(tree).toMatchSnapshot()
  })
})
