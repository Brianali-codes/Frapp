import { Platform } from "react-native"
import appconfig from "../app.json"

export const APP_REPO_URL = "https://github.com/Brianali-codes/Frapp"

export const APP_URLS = {
    FREE_TO_GAME_URL: "https://www.freetogame.com/",
    GAME_POWER_URL: "https://www.gamerpower.com/",
    GITHUB_ISSUES: `${APP_REPO_URL}/issues`,
    IOS_SETTINGS: "app-settings:",
    ANDROID_SETTINGS: `android.settings.APP_NOTIFICATION_SETTINGS?package=${appconfig.expo.android.package}`
}

// com.brianali.Frapp
export const DEVICE_SETTINGS_URL = Platform.select({
    ios: APP_URLS.IOS_SETTINGS,
    android: APP_URLS.ANDROID_SETTINGS
}) || ""