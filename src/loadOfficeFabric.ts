import { loadTheme } from '@uifabric/styling/lib/styles';

export const fabricThemePalette = {
    themePrimary: '#d45100',
    themeLighterAlt: '#fdf7f3',
    themeLighter: '#f8e0d0',
    themeLight: '#f2c5a9',
    themeTertiary: '#e5905c',
    themeSecondary: '#d9631a',
    themeDarkAlt: '#be4900',
    themeDark: '#a13e00',
    themeDarker: '#772d00',
    neutralLighterAlt: '#dddddd',
    neutralLighter: '#d9d9d9',
    neutralLight: '#d0d0d0',
    neutralQuaternaryAlt: '#c2c2c2',
    neutralQuaternary: '#b9b9b9',
    neutralTertiaryAlt: '#b2b2b2',
    neutralTertiary: '#b9b7b4',
    neutralSecondary: '#a2a09d',
    neutralPrimaryAlt: '#8b8986',
    neutralPrimary: '#302f2d',
    neutralDark: '#5e5b59',
    black: '#474543',
    white: '#e3e3e3',
};

export function loadFabricTheme() {
    loadTheme({
        palette: fabricThemePalette,
        fonts: {},
    });
}