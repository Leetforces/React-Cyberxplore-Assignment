
import { createMuiTheme } from "@material-ui/core";


const arcBlue = "#0B72B9"
const arcOrange = "#FFBA60"
//overrides the default theme
const theme = createMuiTheme({
    palette: {
        common: {
            blue: `${arcBlue}`,
            orange: `${arcOrange}`,
        },
        primary: {
            main: `${arcBlue}`
        },
        secondary: {
            main: `${arcOrange}`
        }
    },
    typography: {
        tab: {
            textTransform: 'none',
            fontWeight: '700',
            fontSize: "1rem",
        },
    }
});

export default theme;