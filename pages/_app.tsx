import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { lightTheme, darkTheme } from "../themes";
import { UIProvider } from '../context/ui';
import { EntriesProvider } from '../context/entries';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <EntriesProvider>
      <UIProvider>
        <ThemeProvider theme={darkTheme}>
          {/* Aplicar el css base para que se muestre correctamente */}
          <CssBaseline>
            <Component {...pageProps} />
          </CssBaseline>
        </ThemeProvider>
      </UIProvider>
    </EntriesProvider>
  );
}

export default MyApp
