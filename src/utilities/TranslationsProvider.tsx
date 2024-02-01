import * as React from 'react';
import * as translationsDE from '../translations/translations-de.json';
import * as translationsEN from '../translations/translations-en.json';
import { readRecord } from './localStorageService';
import { darkTheme, lightTheme, ThemeProvider } from '../theme';
import { ReactNode, useState } from 'react';

export interface IAppContext {
  colorTheme: {
    primaryLightColor: string;
    secondaryLightColor: string;
    primaryDarkColor: string;
    secondaryDarkColor: string;
    messageBackgroundColor: string; 
  };
  translations: {
    clockDisplay: string;
    clockModes: {
      hours12: string;
      hours24: string;
    },
    colors: {
      color1: string;
      color2: string;
    };
    interfaceColor: string;
    langCode: string;
    langLabel: string;
    languageEN: string;
    languageDE: string;
    nav: {
      chatTabLabel: string,
      settingsTabLabel: string
    };
    resetButtonLabel: string;
    userName: string;
    ctrlEnterOptionsTitle: string;
    ctrlEnterSendingOptions: {
      option1: string;
      option2: string;
    };
  }
  changeLanguage: () => void;
  changeTheme: () => void;
}

export const AppContext = React.createContext<IAppContext>({
  colorTheme: {
    primaryLightColor: '',
    secondaryLightColor: '',
    primaryDarkColor: '',
    secondaryDarkColor: '',
    messageBackgroundColor: '',
  },
  translations: {
    clockDisplay: "Clock Display",
    clockModes: {
      hours12: "12 Hours",
      hours24: "24 Hours"
    },
    colors: {
      color1: "Light",
      color2: "Dark"
    },
    interfaceColor: "Interface Color",
    langCode: "EN",
    langLabel: "Language",
    languageEN: "English",
    languageDE: "Deutsch",
    nav: {
      chatTabLabel: "Chat",
      settingsTabLabel: "Settings"
    },
    resetButtonLabel: "Reset",
    ctrlEnterOptionsTitle: "Send messages on CTRL+ENTER",
    ctrlEnterSendingOptions: {
      option1: "On",
      option2: "Off"
    },
    userName: "Username",
  },
  changeLanguage: () => {},
  changeTheme: () => {},
});

const AppContextProvider = AppContext.Provider;
export const AppContextConsumer = AppContext.Consumer;

const TranslationProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [translations, setTranslations] = useState(readRecord('lang') !== 'de' ? translationsEN : translationsDE)
  const [colorTheme, setColorTheme] = useState(readRecord('theme') !== 'dark' ? lightTheme : darkTheme)

  const changeTheme = () => {
    setColorTheme(theme =>
      theme === lightTheme ? darkTheme : lightTheme
    );
  };
  
  const changeLanguage = () => {
    setTranslations(translations =>
      translations.langCode === 'DE' ? translationsEN : translationsDE
    );
  }

  return (
    <AppContextProvider value={{
      colorTheme,
      translations,
      changeLanguage: changeLanguage,
      changeTheme: changeTheme,
    }}>
      <ThemeProvider theme={colorTheme}>
        {children}
      </ThemeProvider>
    </AppContextProvider>
  )
}
export default TranslationProvider