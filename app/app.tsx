/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigators, so head over there
 * if you're interested in adding screens and navigators.
 */
import "./i18n"
import "./utils/ignore-warnings"
import React, { useState, useEffect } from "react"
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context"
import { initFonts } from "./theme/fonts" // expo
import * as storage from "./utils/storage"
import { useBackButtonHandler, AppNavigator, canExit, useNavigationPersistence } from "./navigators"
import { RootStore, RootStoreProvider, setupRootStore } from "./models"
import { ToggleStorybook } from "../storybook/toggle-storybook"
import { ErrorBoundary } from "./screens/error/error-boundary"

/**
 * MealsToGo imports
 */
 import { StatusBar as ExpoStatusBar } from "expo-status-bar";
 import { ThemeProvider } from "styled-components/native";
 import * as firebase from "firebase";
 
 import {
   useFonts as useOswald,
   Oswald_400Regular,
 } from "@expo-google-fonts/oswald";
 import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";
 
 import { theme } from "./infrastructure/theme";
 import { Navigation } from "./infrastructure/navigation";
 
 import { AuthenticationContextProvider } from "./services/authentication/authentication.context";


 /**
  * fire base configuration
  */
  const firebaseConfig = {
    apiKey: "AIzaSyDGXuSG43153r8yQknk2zmPP256wZyHr5Q",
    authDomain: "mealstogo-36b2f.firebaseapp.com",
    projectId: "mealstogo-36b2f",
    storageBucket: "mealstogo-36b2f.appspot.com",
    messagingSenderId: "523514317460",
    appId: "1:523514317460:web:9091cae892bef5829e8281",
  };
  
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

// This puts screens in a native ViewController or Activity. If you want fully native
// stack navigation, use `createNativeStackNavigator` in place of `createStackNavigator`:
// https://github.com/kmagiera/react-native-screens#using-native-stack-navigator

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

/**
 * This is the root component of our app.
 */
function App() {
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined)

  /**
   * MealsToGo fonts
   */
   const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  useBackButtonHandler(canExit)
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

  // Kick off initial async loading actions, like loading fonts and RootStore
  useEffect(() => {
    ;(async () => {
      await initFonts() // expo
      setupRootStore().then(setRootStore)
    })()
  }, [])

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color.
  // In iOS: application:didFinishLaunchingWithOptions:
  // In Android: https://stackoverflow.com/a/45838109/204044
  // You can replace with your own loading component if you wish.
  if (!rootStore || !isNavigationStateRestored) return null

  // otherwise, we're ready to render the app

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <Navigation />
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}

export default App
