import React from "react"
import { create } from "react-test-renderer"
import { AccountScreen } from "../app/features/account/screens/account.screen"
import { ThemeProvider } from "styled-components/native"
import { theme } from "../app/infrastructure/theme"

const navigation = {
  navigate: jest.fn(),
}

const tree = create(
  <ThemeProvider theme={theme}>
    <AccountScreen navigation={navigation} />
  </ThemeProvider>,
)

jest.mock("lottie-react-native")
jest.requireActual("lottie-react-native")

describe("Account screen tests", () => {
  test("should match snapshot", () => {
    expect(tree).toMatchSnapshot()
  })
})
