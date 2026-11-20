---
version: alpha
name: Railway
description: "Railway is a dark-first developer cloud brand: deep violet-black canvases (#13111C) layered with plum-tinted panels and charcoal hairlines, bright white and cool-gray text tiers, and a saturated purple (#853BCE) as the single signature accent for links, highlights and interactive emphasis. Typography pairs utilitarian Inter for nearly all UI and body copy with an editorial IBM Plex Serif for large tightly tracked hero headlines, plus JetBrains Mono for code. Green success tones mark status chips, a cool blue is reserved for focus and info. Corners are softly rounded (6–8px on most controls and cards) with pill shapes for badges and buttons, and elevation comes from faint white inset rings and long diffuse shadows rather than heavy drop shadows."
colors:
  primary: "#853BCE"
  primary-light: "#A667E4"
  surface: "#13111C"
  surface-raised: "#1F132A"
  hairline: "#33323E"
  ink: "#FFFFFF"
  ink-soft: "#F2F1F3"
  body: "#DCDCE0"
  muted-strong: "#C4C4CA"
  muted: "#A1A0AB"
  muted-2: "#878593"
  muted-3: "#6C6B7B"
  subtle: "#545260"
  success: "#367859"
  success-bright: "#42946E"
  success-surface: "#26543F"
  success-tint: "#DFF1E9"
  info: "#306EE8"
  info-light: "#82AAFF"
  focus-ring: "#99C8FF"
typography:
  hero-display:
    fontFamily: IBM Plex Serif
    fontSize: 56px
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: -1.4px
  display-lg:
    fontFamily: IBM Plex Serif
    fontSize: 54px
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: -1.96px
  display-md:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: 600
    lineHeight: 1.25
  heading-display:
    fontFamily: Inter Display
    fontSize: 32px
    fontWeight: 500
    lineHeight: 1.5
  title-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: 400
    lineHeight: 1.35
  title-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.4
  title-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.5
  lead:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.5
  lead-strong:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: 500
    lineHeight: 1.5
  body:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.65
  body-compact:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  body-strong:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.5
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.45
  nav-link:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.45
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.5
rounded:
  xs: 4px
  sm: 6px
  md: 8px
  lg: 10px
  xl: 12px
  2xl: 16px
  full: 9999px
spacing:
  section-padding-y: 96px
  header-landing-gap: 8px
  header-landing-inner-max-width: 12px
  header-inner-gap: 8px
  header-inner-inner-max-width: 12px
  card-grid-gap: 32px
  card-6-grid-gap: 24px
  card-8-grid-gap: 16px
  card-9-grid-gap: 12px
  card-10-grid-gap: 12px
  card-11-grid-gap: 12px
  button-primary-padding-y: 12px
  button-primary-padding-x: 24px
  button-secondary-padding-y: 12px
  button-secondary-padding-x: 24px
  button-ghost-padding-x: 12px
  button-primary-2-padding-y: 12px
  button-primary-2-padding-x: 24px
  button-primary-3-padding-y: 12px
  button-primary-3-padding-x: 24px
  button-secondary-2-padding-y: 8px
  button-secondary-2-padding-x: 12px
  button-secondary-3-padding-y: 8px
  button-secondary-3-padding-x: 12px
  button-ghost-2-padding-x: 12px
  button-primary-4-padding-x: 12px
  button-ghost-3-padding-y: 6px
  button-ghost-3-padding-x: 12px
  button-ghost-4-padding-y: 6px
  button-ghost-4-padding-x: 12px
  button-ghost-5-padding-y: 6px
  button-ghost-5-padding-x: 12px
  button-secondary-5-padding-x: 12px
  input-padding-y: 8px
  input-padding-left: 12px
  input-padding-right: 40px
  button-primary-5-padding-y: 12px
  button-primary-5-padding-x: 24px
  button-secondary-6-padding-y: 12px
  button-secondary-6-padding-x: 24px
components:
  button-primary:
    backgroundColor: "#553F83"
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 20px
      fontWeight: 500
      lineHeight: 32px
      letterSpacing: -0.2px
    rounded: 8px
    height: 58px
  button-secondary:
    backgroundColor: "#00000059"
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 20px
      fontWeight: 500
      lineHeight: 32px
      letterSpacing: -0.2px
    rounded: 8px
    height: 58px
  button-ghost:
    backgroundColor: transparent
    textColor: "#F7F7F8"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 500
      lineHeight: 20px
    rounded: 6px
    height: 40px
  button-ghost-hover:
    backgroundColor: "#FFFFFF0D"
  card:
    textColor: "#F7F7F8"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 26px
    height: 240px
  card-group:
    textColor: "#FFFFFF"
  card-icon:
    size: 20px
  card-text:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 600
      lineHeight: 24px
  card-text-2:
    textColor: "#FFFFFF80"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 24px
  nav-dropdown:
    backgroundColor: transparent
    textColor: "#F7F7F8"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 26px
    rounded: 6px
    height: 32px
  nav-dropdown-text:
    textColor: "#DCDCE0"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 500
      lineHeight: 20px
  nav-dropdown-group:
    textColor: "#A1A0AB"
  nav-dropdown-icon:
    size: 12px
  nav-dropdown-2:
    backgroundColor: transparent
    textColor: "#F7F7F8"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 26px
    rounded: 6px
    height: 32px
  nav-dropdown-2-text:
    textColor: "#DCDCE0"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 500
      lineHeight: 20px
  nav-dropdown-2-group:
    textColor: "#A1A0AB"
  nav-dropdown-2-icon:
    size: 12px
  nav-dropdown-3:
    backgroundColor: transparent
    textColor: "#F7F7F8"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 26px
    rounded: 6px
    height: 32px
  nav-dropdown-3-text:
    textColor: "#DCDCE0"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 500
      lineHeight: 20px
  nav-dropdown-3-group:
    textColor: "#A1A0AB"
  nav-dropdown-3-icon:
    size: 12px
  header-landing:
    textColor: "#F7F7F8"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 26px
    height: 32px
  header-landing-button:
    backgroundColor: transparent
    textColor: "#F7F7F8"
    rounded: 6px
  header-landing-text:
    textColor: "#DCDCE0"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 500
      lineHeight: 20px
  header-landing-inner:
    textColor: "#A1A0AB"
  header-landing-icon:
    size: 12px
  header-landing-nav-link:
    textColor: "#DCDCE0"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 500
      lineHeight: 20px
  header-landing-nav-link-hover:
    textColor: "#F2F1F3"
  footer:
    textColor: "#F7F7F8"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 26px
    height: 833px
  footer-text:
    textColor: "#F7F7F8"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 500
      lineHeight: 20px
  footer-link:
    backgroundColor: "#1C1A28"
    textColor: "#F7F7F8"
    rounded: 12px
  footer-group-2:
    textColor: "#C4C4CA"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 500
      lineHeight: 20px
  footer-text-3:
    textColor: "#A78BFA"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 500
      lineHeight: 20px
  footer-text-4:
    textColor: "#A1A0AB"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 400
      lineHeight: 20px
  footer-link-2:
    textColor: "#F7F7F8"
    height: 40px
    width: 131px
  footer-icon:
    height: 40px
    width: 74px
  footer-icon-2:
    height: 40px
    width: 41px
  footer-link-3:
    textColor: "#A1A0AB"
  footer-text-5:
    textColor: "#A1A0AB"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 400
      lineHeight: 20px
  footer-link-4:
    textColor: "#A1A0AB"
  footer-button:
    backgroundColor: transparent
    textColor: "#A1A0AB"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 400
      lineHeight: 20px
  footer-link-5:
    textColor: "#F7F7F8"
    size: 32px
  footer-logo:
    size: 32px
  footer-link-6:
    textColor: "#F7F7F8"
  footer-text-6:
    textColor: "#42946E"
    typography:
      fontFamily: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace
      fontSize: 12px
      fontWeight: 400
      lineHeight: 18px
  footer-text-7:
    textColor: "#A1A0AB"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 12px
      fontWeight: 400
      lineHeight: 18px
  footer-text-8:
    textColor: "#878593"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 12px
      fontWeight: 400
      lineHeight: 18px
  footer-link-3-hover:
    textColor: "#F7F7F8"
  footer-link-4-hover:
    textColor: "#F7F7F8"
  footer-button-hover:
    textColor: "#F7F7F8"
  footer-mobile:
    textColor: "#F7F7F8"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 26px
    height: 1249px
  footer-mobile-text:
    textColor: "#F7F7F8"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 500
      lineHeight: 20px
  footer-mobile-link:
    textColor: "#A1A0AB"
  footer-mobile-text-2:
    textColor: "#A1A0AB"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 400
      lineHeight: 20px
  footer-mobile-link-2:
    textColor: "#A1A0AB"
  footer-mobile-button:
    backgroundColor: transparent
    textColor: "#A1A0AB"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 400
      lineHeight: 20px
  footer-mobile-link-3:
    textColor: "#F7F7F8"
    size: 24px
  footer-mobile-logo:
    size: 24px
  footer-mobile-link-4:
    textColor: "#F7F7F8"
  footer-mobile-text-3:
    textColor: "#42946E"
    typography:
      fontFamily: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace
      fontSize: 12px
      fontWeight: 400
      lineHeight: 18px
  footer-mobile-text-4:
    textColor: "#A1A0AB"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 12px
      fontWeight: 400
      lineHeight: 18px
  footer-mobile-text-5:
    textColor: "#878593"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 12px
      fontWeight: 400
      lineHeight: 18px
  footer-mobile-link-hover:
    textColor: "#F7F7F8"
  footer-mobile-link-2-hover:
    textColor: "#F7F7F8"
  footer-mobile-button-hover:
    textColor: "#F7F7F8"
  button-primary-2:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 500
      lineHeight: 24px
    rounded: 8px
    height: 50px
  button-primary-3:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 500
      lineHeight: 20px
    rounded: 8px
    height: 46px
  button-secondary-2:
    backgroundColor: "#545260"
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 500
      lineHeight: 24px
    rounded: 6px
    height: 42px
  button-secondary-2-label:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 500
      lineHeight: 24px
  button-secondary-2-hover:
    backgroundColor: "#6C6B7B"
  button-secondary-3:
    backgroundColor: "#545260"
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 500
      lineHeight: 20px
    rounded: 6px
    height: 42px
  button-secondary-3-label:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 500
      lineHeight: 20px
  button-secondary-3-hover:
    backgroundColor: "#6C6B7B"
  button-ghost-2:
    backgroundColor: transparent
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 500
      lineHeight: 20px
    rounded: 6px
    height: 40px
  button-ghost-2-hover:
    backgroundColor: "#FFFFFF0D"
  card-2:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 26px
    height: 154px
  card-2-title:
    textColor: "#F3F6FC"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 20px
      fontWeight: 600
      lineHeight: 27.5px
  card-2-text:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 40px
      fontWeight: 600
      lineHeight: 50px
  card-2-text-3:
    textColor: "#A1A0AB"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 400
      lineHeight: 20px
  card-2-body-2:
    textColor: "#F2F1F3"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 26px
  card-3:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 26px
    height: 154px
  card-3-title:
    textColor: "#FAF6FD"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 20px
      fontWeight: 600
      lineHeight: 27.5px
  card-3-text:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 40px
      fontWeight: 600
      lineHeight: 50px
  card-3-text-3:
    textColor: "#A1A0AB"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 400
      lineHeight: 20px
  card-3-body-2:
    textColor: "#F2F1F3"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 26px
  card-4:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 26px
    height: 154px
  card-4-title:
    textColor: "#F7F7F8"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 20px
      fontWeight: 600
      lineHeight: 27.5px
  card-4-body:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 40px
      fontWeight: 600
      lineHeight: 50px
  card-4-body-2:
    textColor: "#F2F1F3"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 26px
  pricing-plan:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 26px
    height: 154px
  pricing-plan-title:
    textColor: "#F7F7F8"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 20px
      fontWeight: 600
      lineHeight: 27.5px
  pricing-plan-text:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 40px
      fontWeight: 600
      lineHeight: 50px
  pricing-plan-text-3:
    textColor: "#A1A0AB"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 400
      lineHeight: 20px
  pricing-plan-body-2:
    textColor: "#F2F1F3"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 26px
  pricing-plan-2:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 26px
  pricing-plan-2-title:
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 20px
      fontWeight: 600
      lineHeight: 27.5px
  pricing-plan-2-text:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 40px
      fontWeight: 600
      lineHeight: 50px
  pricing-plan-2-text-2:
    textColor: "#A1A0AB"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 400
      lineHeight: 20px
  pricing-plan-2-body-2:
    textColor: "#F2F1F3"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 26px
  pricing-plan-2-group-4:
    rounded: 9999px
  pricing-plan-2-icon:
    size: 10px
  pricing-plan-2-body-3:
    textColor: "#DCDCE0"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 400
      lineHeight: 20px
  pricing-plan-2-hover:
    backgroundColor: "#0B1428"
    padding: 32px
  pricing-plan-2-focus:
    backgroundColor: "#0B1428"
    padding: 32px
  pricing-plan-3:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 26px
    height: 85px
  pricing-plan-3-body:
    textColor: "#F7F7F8"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 18px
      fontWeight: 600
      lineHeight: 27px
  pricing-plan-3-cta:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 500
      lineHeight: 20px
  cta-section:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 26px
    height: 87px
  cta-section-title:
    textColor: "#F7F7F8"
    typography:
      fontFamily: "\"IBM Plex Serif\", serif, ui-serif, Georgia, Cambria, \"Times New Roman\", Times, serif"
      fontSize: 32px
      fontWeight: 500
      lineHeight: 44px
      letterSpacing: -0.8px
  cta-section-body:
    textColor: "#A1A0AB"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 18px
      fontWeight: 400
      lineHeight: 27px
  nav-dropdown-4:
    backgroundColor: transparent
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 26px
    rounded: 6px
    height: 32px
  nav-dropdown-4-text:
    textColor: "#DCDCE0"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 500
      lineHeight: 20px
  nav-dropdown-4-group:
    textColor: "#A1A0AB"
  nav-dropdown-4-icon:
    size: 12px
  nav-dropdown-5:
    backgroundColor: transparent
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 26px
    rounded: 6px
    height: 32px
  nav-dropdown-5-text:
    textColor: "#DCDCE0"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 500
      lineHeight: 20px
  nav-dropdown-5-group:
    textColor: "#A1A0AB"
  nav-dropdown-5-icon:
    size: 12px
  nav-dropdown-6:
    backgroundColor: transparent
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 26px
    rounded: 6px
    height: 32px
  nav-dropdown-6-text:
    textColor: "#DCDCE0"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 500
      lineHeight: 20px
  nav-dropdown-6-group:
    textColor: "#A1A0AB"
  nav-dropdown-6-icon:
    size: 12px
  plan-button:
    backgroundColor: "#2057C5"
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 500
      lineHeight: 24px
    rounded: 6px
    height: 42px
  plan-button-text:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 500
      lineHeight: 24px
  plan-button-hover:
    backgroundColor: "#306EE8"
  plan-button-2:
    backgroundColor: "#853BCE"
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 500
      lineHeight: 24px
    rounded: 6px
    height: 42px
  plan-button-2-text:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 500
      lineHeight: 24px
  plan-button-2-hover:
    backgroundColor: "#A667E4"
  plan-button-3:
    backgroundColor: "#2057C5"
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 500
      lineHeight: 20px
    rounded: 6px
    height: 42px
  plan-button-3-text:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 500
      lineHeight: 20px
  plan-button-3-hover:
    backgroundColor: "#306EE8"
  info-tooltip-button:
    backgroundColor: transparent
    textColor: "#6C6B7B"
    height: 16px
  info-tooltip-button-icon:
    size: 16px
  info-tooltip-button-hover:
    textColor: "#545260"
  button-primary-4:
    backgroundColor: transparent
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 500
      lineHeight: 20px
    rounded: 6px
    height: 40px
  button-primary-4-hover:
    backgroundColor: "#FFFFFF0D"
  button-secondary-4:
    backgroundColor: transparent
    textColor: "#FFFFFF"
    rounded: 12px
    height: 48px
  button-secondary-4-icon:
    size: 26px
  button-ghost-3:
    backgroundColor: transparent
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 26px
    rounded: 6px
    height: 32px
  button-ghost-3-label:
    textColor: "#DCDCE0"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 500
      lineHeight: 20px
  button-ghost-3-group:
    textColor: "#A1A0AB"
  button-ghost-3-icon:
    size: 12px
  button-ghost-4:
    backgroundColor: transparent
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 26px
    rounded: 6px
    height: 32px
  button-ghost-4-label:
    textColor: "#DCDCE0"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 500
      lineHeight: 20px
  button-ghost-4-group:
    textColor: "#A1A0AB"
  button-ghost-4-icon:
    size: 12px
  button-ghost-5:
    backgroundColor: transparent
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 26px
    rounded: 6px
    height: 32px
  button-ghost-5-label:
    textColor: "#DCDCE0"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 500
      lineHeight: 20px
  button-ghost-5-group:
    textColor: "#A1A0AB"
  button-ghost-5-icon:
    size: 12px
  card-5:
    backgroundColor: "#1C1A28"
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 26px
    rounded: 12px
    padding: 24px
    height: 501px
  card-5-group-2:
    rounded: 8px
  card-5-icon:
    size: 32px
  card-5-title:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 18px
      fontWeight: 500
      lineHeight: 27px
  card-5-body:
    textColor: "#6C6B7B"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 400
      lineHeight: 20px
  card-5-group-5:
    backgroundColor: "#211F2D"
    textColor: "#6C6B7B"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 12px
      fontWeight: 500
      lineHeight: 18px
    rounded: 6px
  card-5-icon-2:
    size: 14px
  card-5-body-2:
    textColor: "#6C6B7B"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 400
      lineHeight: 20px
  card-5-item:
    textColor: "#6C6B7B"
  card-5-icon-3:
    size: 16px
  card-5-group-6:
    textColor: "#6C6B7B"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 400
      lineHeight: 20px
  card-5-badge:
    backgroundColor: "#FFFFFF1A"
    textColor: "#FFFFFF"
    typography:
      fontFamily: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace
      fontSize: 11.9px
      fontWeight: 400
      lineHeight: 20px
    rounded: 4px
  card-5-item-2:
    textColor: "#6C6B7B"
  card-5-text-2:
    textColor: "#6C6B7B"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 400
      lineHeight: 20px
  card-5-body-3:
    textColor: "#6C6B7B"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 12px
      fontWeight: 500
      lineHeight: 18px
      letterSpacing: 0.3px
  card-5-cta:
    backgroundColor: "#211F2D"
    textColor: "#545260"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 12px
      fontWeight: 500
      lineHeight: 18px
    rounded: 6px
  card-5-group-9:
    textColor: "#6C6B7B"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 500
      lineHeight: 20px
  card-5-hover:
    backgroundColor: "#211F2D"
  card-6:
    backgroundColor: "#1C1A28"
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 26px
    rounded: 12px
    padding: 24px
    height: 181px
  card-6-group:
    rounded: 8px
  card-6-icon:
    size: 20px
  card-6-title:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 18px
      fontWeight: 500
      lineHeight: 27px
  card-6-body:
    textColor: "#6C6B7B"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 400
      lineHeight: 20px
  tag-link:
    backgroundColor: "#211F2D"
    textColor: "#545260"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 12px
      fontWeight: 500
      lineHeight: 18px
    rounded: 6px
    height: 30px
  tag-link-icon:
    size: 14px
  tag-link-hover:
    backgroundColor: "#33323E"
  table:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 26px
    height: 573px
  table-header-cell:
    textColor: "#6C6B7B"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 500
      lineHeight: 20px
    padding: 16px
  table-header-cell-2:
    textColor: "#6C6B7B"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 500
      lineHeight: 20px
  table-cell:
    textColor: "#FFFFFF"
    height: 65px
  table-link:
    textColor: "#FFFFFF"
    height: 32px
    width: 290px
  table-row:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 26px
    height: 65px
  table-row-cell:
    padding: 16px
  table-row-link:
    textColor: "#FFFFFF"
  table-row-group:
    rounded: 6px
  table-row-text:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 500
      lineHeight: 24px
  table-row-group-4:
    rounded: 9999px
  table-row-icon:
    size: 16px
  table-row-group-5:
    textColor: "#367859"
    rounded: 9999px
  table-row-group-6:
    textColor: "#878593"
    rounded: 9999px
  table-row-hover:
    backgroundColor: "#FFFFFF05"
  table-cell-group-2:
    rounded: 9999px
  table-cell-icon:
    size: 16px
  tab-4:
    backgroundColor: transparent
    textColor: "#FFFFFF"
    typography:
      fontFamily: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace
      fontSize: 12px
      fontWeight: 500
      lineHeight: 18px
      letterSpacing: 0.6px
    height: 42px
  tab-4-group:
    backgroundColor: "#82AAFF"
  tab-5:
    backgroundColor: transparent
    textColor: "#FFFFFF66"
    typography:
      fontFamily: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace
      fontSize: 12px
      fontWeight: 500
      lineHeight: 18px
      letterSpacing: 0.6px
    height: 42px
  tab-5-hover:
    textColor: "#FFFFFFB3"
  scroll-button:
    backgroundColor: transparent
    textColor: "#6C6B7B"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 26px
    height: 48px
  scroll-button-text:
    textColor: "#6C6B7B"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 500
      lineHeight: 20px
  scroll-button-icon:
    size: 20px
  header-inner:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 26px
    height: 32px
  header-inner-cta:
    backgroundColor: transparent
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 26px
    rounded: 6px
    height: 32px
  header-inner-text:
    textColor: "#DCDCE0"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 500
      lineHeight: 20px
  header-inner-inner:
    textColor: "#A1A0AB"
  header-inner-icon:
    size: 12px
  header-inner-button:
    backgroundColor: transparent
    textColor: "#FFFFFF"
    rounded: 6px
  header-inner-nav-link:
    textColor: "#DCDCE0"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 500
      lineHeight: 20px
  header-inner-nav-link-hover:
    textColor: "#F2F1F3"
  button-secondary-5:
    backgroundColor: transparent
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 500
      lineHeight: 20px
    rounded: 6px
    height: 40px
  button-secondary-5-hover:
    backgroundColor: "#FFFFFF0D"
  input:
    backgroundColor: "#00000040"
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 24px
    rounded: 6px
    height: 42px
    width: 768px
  card-7:
    backgroundColor: "#181622CC"
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 26px
    rounded: 8px
    height: 224px
  card-7-link:
    textColor: "#FFFFFF"
  card-7-text:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 26px
  card-7-media:
    size: 32px
  card-7-text-2:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 600
      lineHeight: 24px
  card-7-text-3:
    textColor: "#878593"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 400
      lineHeight: 20px
  card-7-group-7:
    rounded: 9999px
  card-7-group-8:
    rounded: 9999px
  card-7-text-4:
    textColor: "#878593"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 12px
      fontWeight: 400
      lineHeight: 18px
  card-7-text-5:
    textColor: "#878593"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 12px
      fontWeight: 400
      lineHeight: 18px
  card-7-hover:
    backgroundColor: "#211F2D"
  card-8:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 26px
    height: 224px
  card-8-group:
    backgroundColor: "#181622CC"
    rounded: 8px
  card-8-link:
    textColor: "#FFFFFF"
  card-8-text:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 26px
  card-8-media:
    size: 32px
  card-8-text-2:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 600
      lineHeight: 24px
  card-8-text-3:
    textColor: "#878593"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 400
      lineHeight: 20px
  card-8-group-8:
    rounded: 9999px
  card-8-text-4:
    textColor: "#878593"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 12px
      fontWeight: 400
      lineHeight: 18px
  button-primary-5:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 18px
      fontWeight: 500
      lineHeight: 29.25px
    rounded: 8px
    height: 55px
  button-secondary-6:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 18px
      fontWeight: 500
      lineHeight: 29.25px
    rounded: 8px
    height: 55px
  button-secondary-6-hover:
    backgroundColor: "#FFFFFF0D"
  card-9:
    backgroundColor: "#FFFFFF04"
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 26px
    rounded: 8px
    padding: 32px
  card-9-group:
    backgroundColor: "#C2298A40"
    rounded: 8px
    padding: 10px
  card-9-icon:
    height: 40px
    width: 18px
  card-9-body:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 18px
      fontWeight: 600
      lineHeight: 27px
  card-9-body-2:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 24px
  card-9-icon-2:
    size: 20px
  card-9-body-3:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 400
      lineHeight: 20px
  card-10:
    backgroundColor: "#FFFFFF04"
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 26px
    rounded: 8px
    padding: 32px
    height: 302px
  card-10-group:
    backgroundColor: "#8145B540"
    rounded: 8px
    padding: 10px
  card-10-icon:
    height: 40px
    width: 18px
  card-10-body:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 18px
      fontWeight: 600
      lineHeight: 27px
  card-10-body-2:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 24px
  card-10-icon-2:
    size: 20px
  card-10-body-3:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 400
      lineHeight: 20px
  card-11:
    backgroundColor: "#FFFFFF04"
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 26px
    rounded: 8px
    padding: 32px
    height: 347px
  card-11-group:
    backgroundColor: "#0D74CE40"
    rounded: 8px
    padding: 10px
  card-11-icon:
    height: 40px
    width: 18px
  card-11-body:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 18px
      fontWeight: 600
      lineHeight: 27px
  card-11-body-2:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 24px
  card-11-icon-2:
    size: 20px
  card-11-body-3:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 400
      lineHeight: 20px
  feature-section-header:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 26px
    height: 313px
  feature-section-header-media:
    height: 313px
    width: 376px
  feature-section-header-title:
    textColor: "#FFFFFF"
    typography:
      fontFamily: InterDisplay, sans-serif
      fontSize: 32px
      fontWeight: 500
      lineHeight: 48px
  feature-section-header-body:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 18px
      fontWeight: 400
      lineHeight: 27px
  feature-section-header-2:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 26px
    height: 315px
  feature-section-header-2-media:
    height: 315px
    width: 376px
  feature-section-header-2-title:
    textColor: "#FFFFFF"
    typography:
      fontFamily: InterDisplay, sans-serif
      fontSize: 32px
      fontWeight: 500
      lineHeight: 48px
  feature-section-header-2-body:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 18px
      fontWeight: 400
      lineHeight: 27px
  feature-section-header-3:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 26px
    height: 317px
  feature-section-header-3-media:
    height: 317px
    width: 376px
  feature-section-header-3-title:
    textColor: "#FFFFFF"
    typography:
      fontFamily: InterDisplay, sans-serif
      fontSize: 32px
      fontWeight: 500
      lineHeight: 48px
  feature-section-header-3-body:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 18px
      fontWeight: 400
      lineHeight: 27px
  hero:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 26px
    height: 234px
  hero-title:
    textColor: "#FFFFFF"
    typography:
      fontFamily: "\"IBM Plex Serif\", serif, ui-serif, Georgia, Cambria, \"Times New Roman\", Times, serif"
      fontSize: 56px
      fontWeight: 500
      lineHeight: 91px
      letterSpacing: -1.4px
  hero-title-2:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 20px
      fontWeight: 400
      lineHeight: 32px
      letterSpacing: -0.25px
  hero-cta:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 18px
      fontWeight: 500
      lineHeight: 29.25px
    rounded: 8px
  hero-cta-2:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 18px
      fontWeight: 500
      lineHeight: 29.25px
    rounded: 8px
  logo-wall:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 26px
    height: 120px
  logo-wall-title:
    textColor: "#FFFFFF"
    typography:
      fontFamily: "\"Inter Tight\", Inter, -apple-system, system-ui, \"Segoe UI\", sans-serif, Inter, -apple-system, system-ui, \"Segoe UI\", sans-serif, -apple-system, system-ui, \"Segoe UI\", Roboto, Oxygen-Sans, Ubuntu, Cantarell, \"Helvetica Neue\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\""
      fontSize: 40px
      fontWeight: 500
      lineHeight: 50px
  logo-wall-body:
    textColor: "#878593"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 18px
      fontWeight: 400
      lineHeight: 27px
  nav-menu-item:
    backgroundColor: transparent
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 26px
    rounded: 6px
    height: 32px
  nav-menu-item-text:
    textColor: "#DCDCE0"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 500
      lineHeight: 20px
  nav-menu-item-group:
    textColor: "#A1A0AB"
  nav-menu-item-icon:
    size: 12px
  nav-menu-item-2:
    backgroundColor: transparent
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 26px
    rounded: 6px
    height: 32px
  nav-menu-item-2-text:
    textColor: "#DCDCE0"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 500
      lineHeight: 20px
  nav-menu-item-2-group:
    textColor: "#A1A0AB"
  nav-menu-item-2-icon:
    size: 12px
  nav-menu-item-3:
    backgroundColor: transparent
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 26px
    rounded: 6px
    height: 32px
  nav-menu-item-3-text:
    textColor: "#DCDCE0"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 500
      lineHeight: 20px
  nav-menu-item-3-group:
    textColor: "#A1A0AB"
  nav-menu-item-3-icon:
    size: 12px
  section-tab:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 16px
      fontWeight: 400
      lineHeight: 26px
    height: 45px
  section-tab-link:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 400
      lineHeight: 20px
  section-tab-link-2:
    textColor: "#FFFFFF"
    typography:
      fontFamily: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
      fontSize: 14px
      fontWeight: 500
      lineHeight: 20px
  section-tab-group:
    backgroundColor: "#FFFFFF"
---

# Railway

## Overview

Railway reads as a calm, nocturnal developer cloud. The canvas is a deep violet-black, **Night Canvas** (`surface`, #13111C). On top of it sit plum-tinted panels, hairline-framed cards and a painterly twilight illustration in the hero, which gives the infrastructure pitch a soft, human register. The product speaks to engineers with understated confidence: almost everything is set in Inter at modest sizes. The large moments are reserved for an editorial IBM Plex Serif headline, tightly tracked at `hero-display` (56px, -1.4px).

Density is moderate to airy. Sections are separated by generous vertical whitespace. Inside them, the UI is compact: 14px labels, 32px nav controls, 12px gaps in feature grids. Hierarchy comes from **text-tone stepping**, not from size jumps or color. White headings sit over a ladder of cool grays (`body` → `muted` → `muted-2` → `muted-3` → `subtle`), so secondary content recedes into the dark rather than shrinking.

Color is rationed. Purple is the single brand voice: **Railway Purple** (`primary`, #853BCE) and its lighter sibling (`primary-light`, #A667E4) carry CTAs, focus rings and glows. Blue and green appear only as plan and status cues. Depth comes from two sources: 1px translucent-white hairlines, and a small set of glow and long-diffuse shadows used on hover and on hero mockups.

**Key Characteristics:**
- Dark-first violet-black canvas (`surface`, #13111C) with plum-tinted raised panels (`surface-raised`, #1F132A).
- Serif display headlines (IBM Plex Serif, `hero-display`/`display-lg`) over a utilitarian Inter UI; JetBrains Mono / ui-monospace for code, tabs and status strings.
- One accent hue, purple, used for primary actions, focus rings and hover glows; blue and green are functional only.
- Hierarchy by gray-tone ladder: `ink` → `body` → `muted` → `muted-2` → `muted-3` → `subtle`.
- Hairline borders in translucent white (#FFFFFF1A, #FFFFFF14) instead of solid gray strokes on cards.
- Soft geometry: 6px on small controls, 8px on CTAs and content cards, 12px on feature tiles, pills for status chips.
- Hover lift is a colored glow (`button-primary-2`), never a drop shadow.
- Generous section rhythm (`section-padding-y`, 96px) around compact, information-dense modules.

## Colors

A violet-black base, a gray text ladder with seven steps, and one purple accent. Every neutral is cool and slightly blue-violet; there are no warm grays in the core palette.

### Brand & Accent
- **Railway Purple** (`primary`, #853BCE): the signature accent. Use it for highlighted links, the Pro plan CTA fill (`plan-button-2` uses it as its background) and interactive emphasis. Use it sparingly; it should be the only saturated hue in most viewports.
- **Lilac** (`primary-light`, #A667E4): the hover state of purple fills (`plan-button-2-hover`) and the 2px focus ring on buttons (`button-primary-2`, `button-secondary-2`, `plan-button`). Also used for accent text.
- **Deep Amethyst** (#553F83, `button-primary` fill only): the hero's main CTA fill, a muted, desaturated purple with a 1px #FFFFFF26 border. It is a component color, not a palette token.

### Surface
- **Night Canvas** (`surface`, #13111C): the page background on every captured page. Headers and footers are transparent over it.
- **Plum Panel** (`surface-raised`, #1F132A): tinted raised panels and interactive containers. It also shows up as a border and interactive tone, so treat it as the purple-tinted container layer.
- Component fills (not tokens): `card-6` sits on #1C1A28. Tag and chip fills step up to #211F2D (`tag-link`), and the hover lifts that to #33323E (`tag-link-hover`). Translucent cards use #181622CC (`card-8-group`) or #FFFFFF04 (`card-9`, `card-10`, `card-11`).

### Text
- **Pure White** (`ink`, #FFFFFF): headings, button labels, primary copy. It is by far the most used text color.
- **Mist** (`ink-soft`, #F2F1F3): the nav-link hover color (`header-landing-nav-link-hover`) and long-form card copy (`card-2-body-2`).
- **Fog** (`body`, #DCDCE0): nav labels (`header-landing-nav-link`) and list items in pricing.
- **Silver** (`muted-strong`, #C4C4CA): secondary footer headings (`footer-group-2`).
- **Slate** (`muted`, #A1A0AB): footer links, captions, the chevrons in nav dropdowns, and `cta-section-body`.
- **Dusk** (`muted-2`, #878593): card meta text (`card-8-text-3`) and `logo-wall-body`.
- **Haze** (`muted-3`, #6C6B7B): table headers (`table-header-cell`), low-emphasis card copy (`card-6-body`), resting icons (`info-tooltip-button`).
- **Ember Gray** (`subtle`, #545260): the faintest text (`tag-link` label) and the fill of compact secondary buttons (`button-secondary-2`).

### Hairlines & Borders
- **Charcoal Line** (`hairline`, #33323E): solid borders on inputs (`input`) and the hover border of tiles. Card hairlines are mostly translucent white instead:
  - #FFFFFF1A on `card-6` and `button-secondary-2`.
  - #FFFFFF14 on `card-9`.
  - #FFFFFF0D for internal dividers.

### Status & Info
- **Signal Green** (`success`, #367859): status text such as the online indicator in table rows.
- **Deep Moss** (`success-surface`, #26543F): fills behind success chips.
- **Mint Wash** (`success-tint`, #DFF1E9): light text on green chips.
- **Cobalt** (`info`, #306EE8): info emphasis. It is also the hover fill of blue plan CTAs (`plan-button-hover`); the resting fill of `plan-button` is #2057C5.

### Component & State Colors (measured on recipes only)
These colors never appeared in page sampling. They belong to specific components and states, not the page palette.
- **Live Green** (`success-bright`, #42946E): monospace status strings in the footer.
- **Sky Indicator** (`info-light`, #82AAFF): the active-tab underline fill (`tab-4-group`).
- **Focus Blue** (`focus-ring`, #99C8FF): reserved focus/info ring color.
- `muted-strong` (#C4C4CA) is also recipe-only.

### Gradients
The screenshots show tinted gradient fills on the pricing plan cards: blue for Hobby, purple for Pro, neutral for Enterprise. They also show a painterly illustrated hero. No gradient values were extracted, so treat gradients as plan-card decoration only and never as a UI fill.

The site declares a dark color scheme, but the overrides are effectively an identity mapping. The dark capture keeps:
- the same canvas (#13111C),
- the same white and gray text tiers (#FFFFFF, #DCDCE0, #A1A0AB),
- the same hairline (#33323E),
- the same purple (#853BCE).

No surface, text or border role flips. Railway is dark by default, and its "dark theme" is simply the default theme. The only addition is a warm #D97757 text accent seen on one page.

### Dark Mode

The dark values below were measured with the dark color scheme forced on the page; the light values are the page's normal render.

| Role | Light | Dark |
| --- | --- | --- |
| Surface | `surface` | #13111C |
| Surface (secondary) | `hairline` | #33323E |
| Text | `ink` | #FFFFFF |
| Text (secondary) | `body` | #DCDCE0 |

## Typography

### Font Family
- **Inter**: the workhorse for nav, body, buttons, cards, tables and footer. Weights 400/500/600. Fallback stack: -apple-system, system-ui, "Segoe UI".
- **IBM Plex Serif**: editorial display only. Used for hero headlines (`hero-display`, `display-lg`) and serif section titles such as `cta-section-title` (32px / 500 / -0.8px). Always weight 500, always negatively tracked.
- **Inter Display**: the optical display cut of Inter, used for feature section headings (`heading-display`, 32px / 500).
- **JetBrains Mono / ui-monospace**: code, tab labels (`tab-4`, 12px / 500 / +0.6px), badges (`card-5-badge`) and status strings in the footer.
- An Inter Tight variant appears on the logo-wall heading (`logo-wall-title`, 40px / 500).

### Hierarchy
| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `hero-display` | 56px | 500 | 1.05 | -1.4px | IBM Plex Serif hero h1 |
| `display-lg` | 54px | 500 | 1.1 | -1.96px | IBM Plex Serif page h1 on inner pages |
| `display-md` | 40px | 600 | 1.25 | normal | Large numerals and prices (`card-2-text`, `pricing-plan-text`) |
| `heading-display` | 32px | 500 | 1.5 | normal | Inter Display feature section titles |
| `title-lg` | 24px | 400 | 1.35 | normal | Large light subheads |
| `title-md` | 20px | 600 | 1.4 | normal | Card and plan titles (`card-2-title`) |
| `title-sm` | 18px | 600 | 1.5 | normal | Feature card titles (`card-9-body`) |
| `lead` | 18px | 400 | 1.5 | normal | Section intro paragraphs (`cta-section-body`) |
| `lead-strong` | 18px | 500 | 1.5 | normal | Emphasized leads, tile titles (`card-6-title`) |
| `body` | 16px | 400 | 1.65 | normal | Default long-form copy |
| `body-compact` | 16px | 400 | 1.5 | normal | Inputs and dense paragraphs |
| `body-strong` | 16px | 500 | 1.5 | normal | Button labels (`plan-button`), table row names |
| `body-sm` | 14px | 400 | 1.45 | normal | Card body copy, footer links, meta |
| `nav-link` | 14px | 500 | 1.45 | normal | Nav labels, small button labels, table headers |
| `caption` | 12px | 400 | 1.5 | normal | Timestamps and fine print |
| `label` | 12px | 500 | 1.5 | normal | Chips and tags (`tag-link`) |

### Principles
- **Three weights only: 400, 500, 600.** Bold 700 is absent from the UI ladder. Weight 500 is the serif's only weight and the default for interactive labels. Weight 600 marks titles.
- **Tracking is negative only on display serif.** The serif uses -1.4px to -1.96px. Large Inter CTAs pick up a hair of negative tracking (`button-primary` at -0.2px, `hero-title-2` at -0.25px). Body text stays at normal. Monospace labels go positive (+0.6px on `tab-4`).
- **Line-height loosens as size drops.** Display sits at 1.05–1.25. Long-form `body` breathes at 1.65, and UI text tightens to 1.45–1.5. Note that the measured hero h1 renders at a 91px line box (`hero-title`), roomier than the `hero-display` ratio.
- **Hierarchy is carried by tone more than size.** A 14px `body-sm` line in `muted-3` reads as tertiary next to the same size in `ink`.
- **Serif is a voice, not a system font.** Never set UI controls, nav or body copy in IBM Plex Serif.

### Note on Font Substitutes
All families are open-source: Inter, Inter Display, IBM Plex Serif and JetBrains Mono are available on Google Fonts or from their foundries. If Inter Display is unavailable, use Inter at the same size and apply about -0.5px tracking to recover its tighter display fit.

## Layout

### Spacing System
No `base` step was published. The spacing tokens restate measured component internals plus one page-level rhythm value.

**Section rhythm.** `section-padding-y` (96px) is the vertical padding between the page's major sections. It was measured on the page itself, not on a component.

**Nav.** `header-landing-gap` and `header-inner-gap` are both 8px. They set the gap between items in the nav row of `header-landing` and `header-inner`.

**Large CTAs.** These all use 12px × 24px:
- `button-primary-padding-y` / `button-primary-padding-x`
- `button-secondary-padding-y` / `button-secondary-padding-x`
- `button-primary-2-padding-y` / `button-primary-2-padding-x`
- `button-primary-3-padding-y` / `button-primary-3-padding-x`
- `button-primary-5-padding-y` / `button-primary-5-padding-x`
- `button-secondary-6-padding-y` / `button-secondary-6-padding-x`

**Compact buttons.** `button-secondary-2-padding-y` / `button-secondary-2-padding-x` and `button-secondary-3-padding-y` / `button-secondary-3-padding-x` are 8px × 12px.

**Ghost and nav buttons.** `button-ghost-3-padding-y`, `button-ghost-4-padding-y` and `button-ghost-5-padding-y` are 6px vertical. Horizontal padding is 12px on all of these:
- `button-ghost-padding-x`, `button-ghost-2-padding-x`
- `button-ghost-3-padding-x`, `button-ghost-4-padding-x`, `button-ghost-5-padding-x`
- `button-primary-4-padding-x`, `button-secondary-5-padding-x`

**Input.** `input-padding-y` is 8px and `input-padding-left` is 12px. `input-padding-right` is 40px, which reserves room for a trailing icon.

The pattern: horizontal padding is either 12px (controls) or 24px (CTAs), and vertical padding is 6px, 8px or 12px depending on control weight.

### Grid & Container
- Content sits in a centered column inside a full-bleed dark canvas. No container max-width token was verified.
- The `header-landing-inner-max-width` and `header-inner-inner-max-width` tokens (12px) cap the small chevron row inside nav items. They are not a page container.
- Grid gaps step down as cards get denser:

| Token | Gap | Grid |
|---|---|---|
| `card-grid-gap` | 32px | Feature row of `card` |
| `card-6-grid-gap` | 24px | Hairline tiles |
| `card-8-grid-gap` | 16px | Template and agent cards |
| `card-9-grid-gap`, `card-10-grid-gap`, `card-11-grid-gap` | 12px | Benefit cards |

- The screenshots also show:
  - feature sections hung on a left-aligned vertical timeline rail;
  - a pricing row of plan cards;
  - a dense comparison table with row dividers;
  - a logo grid with hairline dividers under the hero.

### Whitespace Philosophy
The page is airy between sections and tight inside them. The 96px `section-padding-y` gives each feature chapter its own breathing room on the dark canvas. Inside a module, gaps collapse to 8–16px and controls pad at 6–12px, so modules read as dense, product-like panels floating in empty space. When adding a section, keep the generous outer rhythm. Never pad the inside of a card more loosely than the gap between cards.

### Measured Layout

Every spacing token restates a measurement of a verified component recipe, or the step those measurements share. `section-padding-y` is measured directly on the page sections and feeds no step.

- `section-padding-y`: 96px (vertical padding repeated on the page sections: 1 section edge on 1 page)
- `header-landing-gap`: 8px (`header-landing`, gap of `header-landing-nav`)
- `header-landing-inner-max-width`: 12px (`header-landing`, max width of `header-landing-inner`)
- `header-inner-gap`: 8px (`header-inner`, gap of `header-inner-nav`)
- `header-inner-inner-max-width`: 12px (`header-inner`, max width of `header-inner-inner`)
- `card-grid-gap`: 32px (`card`, column gap of the grid its instances sit in)
- `card-6-grid-gap`: 24px (`card-6`, column gap of the grid its instances sit in)
- `card-8-grid-gap`: 16px (`card-8`, column gap of the grid its instances sit in)
- `card-9-grid-gap`: 12px (`card-9`, column gap of the grid its instances sit in)
- `card-10-grid-gap`: 12px (`card-10`, column gap of the grid its instances sit in)
- `card-11-grid-gap`: 12px (`card-11`, column gap of the grid its instances sit in)
- `button-primary-padding-y`: 12px (`button-primary`, vertical padding of the root)
- `button-primary-padding-x`: 24px (`button-primary`, horizontal padding of the root)
- `button-secondary-padding-y`: 12px (`button-secondary`, vertical padding of the root)
- `button-secondary-padding-x`: 24px (`button-secondary`, horizontal padding of the root)
- `button-ghost-padding-x`: 12px (`button-ghost`, horizontal padding of the root)
- `button-primary-2-padding-y`: 12px (`button-primary-2`, vertical padding of the root)
- `button-primary-2-padding-x`: 24px (`button-primary-2`, horizontal padding of the root)
- `button-primary-3-padding-y`: 12px (`button-primary-3`, vertical padding of the root)
- `button-primary-3-padding-x`: 24px (`button-primary-3`, horizontal padding of the root)
- `button-secondary-2-padding-y`: 8px (`button-secondary-2`, vertical padding of the root)
- `button-secondary-2-padding-x`: 12px (`button-secondary-2`, horizontal padding of the root)
- `button-secondary-3-padding-y`: 8px (`button-secondary-3`, vertical padding of the root)
- `button-secondary-3-padding-x`: 12px (`button-secondary-3`, horizontal padding of the root)
- `button-ghost-2-padding-x`: 12px (`button-ghost-2`, horizontal padding of the root)
- `button-primary-4-padding-x`: 12px (`button-primary-4`, horizontal padding of the root)
- `button-ghost-3-padding-y`: 6px (`button-ghost-3`, vertical padding of the root)
- `button-ghost-3-padding-x`: 12px (`button-ghost-3`, horizontal padding of the root)
- `button-ghost-4-padding-y`: 6px (`button-ghost-4`, vertical padding of the root)
- `button-ghost-4-padding-x`: 12px (`button-ghost-4`, horizontal padding of the root)
- `button-ghost-5-padding-y`: 6px (`button-ghost-5`, vertical padding of the root)
- `button-ghost-5-padding-x`: 12px (`button-ghost-5`, horizontal padding of the root)
- `button-secondary-5-padding-x`: 12px (`button-secondary-5`, horizontal padding of the root)
- `input-padding-y`: 8px (`input`, vertical padding of the root)
- `input-padding-left`: 12px (`input`, left padding of the root)
- `input-padding-right`: 40px (`input`, right padding of the root)
- `button-primary-5-padding-y`: 12px (`button-primary-5`, vertical padding of the root)
- `button-primary-5-padding-x`: 24px (`button-primary-5`, horizontal padding of the root)
- `button-secondary-6-padding-y`: 12px (`button-secondary-6`, vertical padding of the root)
- `button-secondary-6-padding-x`: 24px (`button-secondary-6`, horizontal padding of the root)

The card grid lays out in 3 columns; the card-6 grid in 3 columns; the card-8 grid in 3 columns; the card-9 grid in 3 columns; the card-10 grid in 3 columns; the card-11 grid in 3 columns at desktop.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| 0: Canvas | `surface` (#13111C), no shadow, no border | Page background; header and footer are transparent over it |
| 1: Hairline | 1px translucent-white border: #FFFFFF1A (`card-6`, `button-secondary-2`, `plan-button`), #FFFFFF14 (`card-9`, `card-8-group`); solid `hairline` #33323E on `input` | Cards, tiles, compact buttons, inputs |
| 1: Ring | box-shadow `#FFFFFF 0px 0px 0px 0px, #FFFFFF1A 0px 0px 0px 1px, transparent 0px 0px 0px 0px` (`button-secondary-4`) | Icon buttons drawn with a shadow ring instead of a border |
| 1: Inset highlight | `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(255, 255, 255, 0.2) 0px 0px 0px 1.5px inset` (page sampling) | A bright inner edge on framed panels |
| 2: Hover glow | `transparent 0px 0px 0px 0px, transparent 0px 0px 0px 0px, #B428B459 0px 0px 8px 0px, #662BDF59 0px 0px 24px 0px` (`button-primary-2`, `button-primary-3` hover) | Magenta-violet bloom on purple CTAs |
| 2: Muted glow | `transparent 0px 0px 0px 0px, transparent 0px 0px 0px 0px, #59497A59 0px 0px 8px 0px, #59497A59 0px 0px 24px 0px` (`button-primary-5` hover) | Dusky glow on the hero CTA |
| 3: Long diffuse | Five-layer warm shadow starting `rgba(62, 45, 45, 0.24) 0px 100px 191px 0px` down to `rgba(62, 45, 45, 0.075) 0px 3.43489px 6.56065px 0px` (page sampling) | Large floating product mockups |
| 3: Upward bloom | Five-layer cool shadow starting `rgba(65, 78, 166, 0.1) 0px -12px 127px 0px` (page sampling) | Blue haze cast upward from a large panel |
| 3: Drop | `rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.25) 0px 25px 50px -12px` (page sampling) | Single deep drop for overlays |
| Focus | 2px ring: `#FFFFFF 0px 0px 0px 0px, #A667E4 0px 0px 0px 2px, transparent 0px 0px 0px 0px` on buttons; #BF93EC on links in `footer` (flagged: the `footer` height did not reproduce the measured 833px after 2 correction attempts); #A1A0AB on `button-secondary-6` | Keyboard focus, with a transparent 2px outline at 2px offset |
| Blur | None measured | — |

**Shadow philosophy.** Railway builds depth in two registers.

- **Resting surfaces.** These are separated by tone and hairline: a #1C1A28 or #FFFFFF04 card on the #13111C canvas, outlined at #FFFFFF1A or #FFFFFF14. Shadows on dark surfaces are mostly invisible, so the hairline does the work.
- **Interaction and spotlight moments.** Purple CTAs bloom with a colored glow on hover, never a gray drop. Hero mockups float on very long, multi-layer diffuse shadows that read as atmosphere rather than lift. Focus is always a 2px colored ring built in box-shadow.

Shadows are part of the system; reserve them for these two jobs. The translucent card fills (#181622CC on `card-8-group`) were not paired with any measured backdrop-filter. Do not add frosted-glass blur.

## Shapes

### Border Radius Scale
| Token | Value | Use |
|---|---|---|
| `rounded.xs` | 4px | Tiny monospace badges (`card-5-badge`, part of `card-5` (flagged: the `card-5-cta` height did not reproduce the measured 30px after 2 correction attempts)) |
| `rounded.sm` | 6px | The most common radius. Ghost buttons, nav dropdowns (`nav-dropdown`), compact buttons (`button-secondary-2`), plan CTAs (`plan-button`), tags (`tag-link`), inputs (`input`) |
| `rounded.md` | 8px | Large CTAs (`button-primary`, `button-primary-2`, `button-secondary-6`), content cards (`card-9`, `card-8-group`), icon tiles inside cards (`card-9-group`) |
| `rounded.lg` | 10px | Rare. Seen once in sampling; no component recipe uses it |
| `rounded.xl` | 12px | Feature tiles (`card-6`), icon buttons (`button-secondary-4`), footer link pills |
| `rounded.2xl` | 16px | Large framed containers (hero frame and section panels in the screenshots); rare |
| `rounded.full` | 9999px | Status pills and avatar dots (`card-8-group-8`), check badges in comparison and pricing lists |

The geometry is soft but never bubbly, and the radius grows with the size of the object:
- 6px on anything you click inside a panel;
- 8px on hero-scale buttons and standard cards;
- 12px on feature tiles;
- 16px only on the largest frames.

Pill and circle shapes (`rounded.full`) are reserved for status chips, avatars and small indicator dots. Buttons are rounded rectangles, not pills. Nested elements keep a smaller radius than their container: an 8px icon tile inside a 12px `card-6`.

## Components

Each component below was distilled from the live page: the recipe is a standalone, placeholder-filled reproduction with literal values, and every frontmatter key named in the anatomy carries the same measurements. A verified component reproduced the original in every check; a flagged one is shipped with the reason it did not; one marked not verifiable could not be compared with the original, which says nothing about the recipe.



### Button, primary

**Verification**: verified against the live page at desktop.

**Anatomy**

- `button-primary`: the component root, a `<a>` (`.c-button-primary`), 8-character label

**Recipe**

```html
<div class="c-button-primary-scope">
  <a class="c-button-primary" href="#">lorem ip</a>
</div>
```

```css
.c-button-primary-scope {
  background-color: #13111C;
  color: #F7F7F8;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-button-primary {
  display: inline-block;
  border-spacing: 0px;
  box-sizing: border-box;
  padding: 12px 24px;
  background-color: #553F83;
  color: #FFFFFF;
  border: 1px solid #FFFFFF26;
  border-radius: 8px;
  cursor: pointer;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 20px;
  font-weight: 500;
  line-height: 32px;
  letter-spacing: -0.2px;
  text-decoration-line: none;
  text-align: center;
  transition: filter 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}
```

**States**

- No hover or focus change was observed.

### Button, secondary

**Verification**: verified against the live page at desktop.

**Anatomy**

- `button-secondary`: the component root, a `<a>` (`.c-button-secondary`), 6-character label

**Recipe**

```html
<div class="c-button-secondary-scope">
  <a class="c-button-secondary" href="#">lorem</a>
</div>
```

```css
.c-button-secondary-scope {
  background-color: #13111C;
  color: #F7F7F8;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-button-secondary {
  display: inline-block;
  border-spacing: 0px;
  box-sizing: border-box;
  padding: 12px 24px;
  background-color: #00000059;
  color: #FFFFFF;
  border: 1px solid #FFFFFF40;
  border-radius: 8px;
  cursor: pointer;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 20px;
  font-weight: 500;
  line-height: 32px;
  letter-spacing: -0.2px;
  text-decoration-line: none;
  text-align: center;
  transition-duration: 0.15s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
}
```

**States**

- No hover or focus change was observed.

### Button, ghost

**Verification**: verified against the live page at desktop.

**Anatomy**

- `button-ghost`: the component root, a `<button>` (`.c-button-ghost`), 7-character label

**Recipe**

```html
<div class="c-button-ghost-scope">
  <button class="c-button-ghost" type="button">lorem i</button>
</div>
```

```css
.c-button-ghost-scope {
  background-color: #13111C;
  color: #F7F7F8;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-button-ghost {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-spacing: 0px;
  box-sizing: border-box;
  width: 80px;
  height: 40px;
  padding: 0px 12px;
  background-color: transparent;
  color: #F7F7F8;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: normal;
  text-transform: none;
  text-align: center;
  appearance: button;
}

.c-button-ghost:hover {
  background-color: #FFFFFF0D;
}
```

**States**

- hover (`button-ghost-hover`): background-color #FFFFFF0D

### Card

**Verification**: verified against the live page at desktop.

**Anatomy**

- Group: 3 instances in a 3-column grid, 32px gap; the recipe carries the values they all share
- `card`: the component root, a `<div>` (`.c-card`)
- `card-group`: inner flex row (`.c-card__group`)
- `card-icon`: icon placeholder, 20px (`.c-card__icon`)
- `card-group-2`: inner block (`.c-card__group-2`)
- `card-text`: label text, 23 characters (`.c-card__text`)
- `card-text-2`: label text, 74 characters (`.c-card__text-2`)

**Recipe**

```html
<div class="c-card-scope">
  <div class="c-card">
    <div class="c-card__group">
      <span class="c-card__icon" aria-hidden="true"></span>
    </div>
    <div class="c-card__group-2">
      <div class="c-card__text">lorem ipsum dolor sit a</div>
      <div class="c-card__text-2">lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod temp</div>
    </div>
  </div>
</div>
```

```css
.c-card-scope {
  background-color: #1B2132;
  color: #F7F7F8;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-card {
  display: inline-block;
  border-spacing: 0px;
  box-sizing: border-box;
  color: #F7F7F8;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  padding-top: 64px;
  padding-bottom: 64px;
}

.c-card__group {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 20px;
  height: 20px;
  max-width: 20px;
  max-height: 20px;
  color: #FFFFFF;
  font-size: 24px;
  line-height: 32px;
}

.c-card__icon {
  display: block;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 20px;
  height: 20px;
  max-width: 20px;
  max-height: 20px;
  overflow-x: hidden;
  overflow-y: hidden;
  vertical-align: middle;
  background-color: currentcolor;
}

.c-card__group-2 {
  display: block;
  box-sizing: border-box;
  margin-top: 16px;
}

.c-card__text {
  display: block;
  box-sizing: border-box;
  color: #FFFFFF;
  font-weight: 600;
  line-height: 24px;
}

.c-card__text-2 {
  display: block;
  box-sizing: border-box;
  color: #FFFFFF80;
  line-height: 24px;
  margin-top: 4px;
}
```

**States**

- No hover or focus change was observed.

### Nav dropdown

**Verification**: verified against the live page at desktop.

**Anatomy**

- `nav-dropdown`: the component root, a `<button>` (`.c-nav-dropdown`)
- `nav-dropdown-text`: label text, 7 characters (`.c-nav-dropdown__text`)
- `nav-dropdown-group`: inner flex row (`.c-nav-dropdown__group`)
- `nav-dropdown-icon`: icon placeholder, 12px (`.c-nav-dropdown__icon`)

**Recipe**

```html
<div class="c-nav-dropdown-scope">
  <button class="c-nav-dropdown" type="button">
    <span class="c-nav-dropdown__text">lorem i</span>
    <div class="c-nav-dropdown__group">
      <span class="c-nav-dropdown__icon" aria-hidden="true"></span>
    </div>
  </button>
</div>
```

```css
.c-nav-dropdown-scope {
  background-color: #13111C;
  color: #F7F7F8;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-nav-dropdown {
  display: flex;
  align-items: center;
  gap: 8px;
  border-spacing: 0px;
  box-sizing: border-box;
  padding: 6px 12px;
  background-color: transparent;
  color: #F7F7F8;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: normal;
  text-transform: none;
  text-align: center;
  list-style-type: none;
  appearance: button;
}

.c-nav-dropdown__text {
  display: block;
  box-sizing: border-box;
  color: #DCDCE0;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
}

.c-nav-dropdown__group {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 12px;
  height: 12px;
  max-width: 12px;
  max-height: 12px;
  position: relative;
  color: #A1A0AB;
  font-size: 18px;
  line-height: 27px;
  transition: transform 0.15s cubic-bezier(0.4, 0, 1, 1);
}

.c-nav-dropdown__icon {
  display: block;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 12px;
  height: 12px;
  max-width: 12px;
  max-height: 12px;
  overflow-x: hidden;
  overflow-y: hidden;
  vertical-align: middle;
  background-color: currentcolor;
}
```

**States**

- No hover or focus change was observed.

### Nav dropdown (2)

**Verification**: verified against the live page at desktop.

**Anatomy**

- `nav-dropdown-2`: the component root, a `<button>` (`.c-nav-dropdown-2`)
- `nav-dropdown-2-text`: label text, 10 characters (`.c-nav-dropdown-2__text`)
- `nav-dropdown-2-group`: inner flex row (`.c-nav-dropdown-2__group`)
- `nav-dropdown-2-icon`: icon placeholder, 12px (`.c-nav-dropdown-2__icon`)

**Recipe**

```html
<div class="c-nav-dropdown-2-scope">
  <button class="c-nav-dropdown-2" type="button">
    <span class="c-nav-dropdown-2__text">lorem ipsu</span>
    <div class="c-nav-dropdown-2__group">
      <span class="c-nav-dropdown-2__icon" aria-hidden="true"></span>
    </div>
  </button>
</div>
```

```css
.c-nav-dropdown-2-scope {
  background-color: #13111C;
  color: #F7F7F8;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-nav-dropdown-2 {
  display: flex;
  align-items: center;
  gap: 8px;
  border-spacing: 0px;
  box-sizing: border-box;
  padding: 6px 12px;
  background-color: transparent;
  color: #F7F7F8;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: normal;
  text-transform: none;
  text-align: center;
  list-style-type: none;
  appearance: button;
}

.c-nav-dropdown-2__text {
  display: block;
  box-sizing: border-box;
  color: #DCDCE0;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
}

.c-nav-dropdown-2__group {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 12px;
  height: 12px;
  max-width: 12px;
  max-height: 12px;
  position: relative;
  color: #A1A0AB;
  font-size: 18px;
  line-height: 27px;
  transition: transform 0.15s cubic-bezier(0.4, 0, 1, 1);
}

.c-nav-dropdown-2__icon {
  display: block;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 12px;
  height: 12px;
  max-width: 12px;
  max-height: 12px;
  overflow-x: hidden;
  overflow-y: hidden;
  vertical-align: middle;
  background-color: currentcolor;
}
```

**States**

- No hover or focus change was observed.

### Nav dropdown (3)

**Verification**: verified against the live page at desktop.

**Anatomy**

- `nav-dropdown-3`: the component root, a `<button>` (`.c-nav-dropdown-3`)
- `nav-dropdown-3-text`: label text, 10 characters (`.c-nav-dropdown-3__text`)
- `nav-dropdown-3-group`: inner flex row (`.c-nav-dropdown-3__group`)
- `nav-dropdown-3-icon`: icon placeholder, 12px (`.c-nav-dropdown-3__icon`)

**Recipe**

```html
<div class="c-nav-dropdown-3-scope">
  <button class="c-nav-dropdown-3" type="button">
    <span class="c-nav-dropdown-3__text">lorem ipsu</span>
    <div class="c-nav-dropdown-3__group">
      <span class="c-nav-dropdown-3__icon" aria-hidden="true"></span>
    </div>
  </button>
</div>
```

```css
.c-nav-dropdown-3-scope {
  background-color: #13111C;
  color: #F7F7F8;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-nav-dropdown-3 {
  display: flex;
  align-items: center;
  gap: 8px;
  border-spacing: 0px;
  box-sizing: border-box;
  padding: 6px 12px;
  background-color: transparent;
  color: #F7F7F8;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: normal;
  text-transform: none;
  text-align: center;
  list-style-type: none;
  appearance: button;
}

.c-nav-dropdown-3__text {
  display: block;
  box-sizing: border-box;
  color: #DCDCE0;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
}

.c-nav-dropdown-3__group {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 12px;
  height: 12px;
  max-width: 12px;
  max-height: 12px;
  position: relative;
  color: #A1A0AB;
  font-size: 18px;
  line-height: 27px;
  transition: transform 0.15s cubic-bezier(0.4, 0, 1, 1);
}

.c-nav-dropdown-3__icon {
  display: block;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 12px;
  height: 12px;
  max-width: 12px;
  max-height: 12px;
  overflow-x: hidden;
  overflow-y: hidden;
  vertical-align: middle;
  background-color: currentcolor;
}
```

**States**

- No hover or focus change was observed.

### Header (landing)

**Verification**: verified against the live page at desktop.

Variant observed on https://railway.com/.

**Anatomy**

- `header-landing`: the component root, a `<nav>` (`.c-header-landing`)
- `header-landing-group`: inner block (`.c-header-landing__group`)
- `header-landing-nav`: inner flex row (`.c-header-landing__nav`)
- `header-landing-button`: button (`.c-header-landing__button`, 4 instances)
- `header-landing-text`: label text, 7 characters (`.c-header-landing__text`, 4 instances)
- `header-landing-inner`: inner flex row (`.c-header-landing__inner`, 4 instances)
- `header-landing-icon`: icon placeholder, 12px (`.c-header-landing__icon`, 4 instances)
- `header-landing-nav-item`: inner group (`.c-header-landing__nav-item`)
- `header-landing-nav-link`: link, 7-character label (`.c-header-landing__nav-link`)

**Recipe**

```html
<div class="c-header-landing-scope">
  <nav class="c-header-landing">
    <div class="c-header-landing__group">
      <ul class="c-header-landing__nav">
        <button class="c-header-landing__button" type="button">
          <span class="c-header-landing__text">lorem i</span>
          <div class="c-header-landing__inner">
            <span class="c-header-landing__icon" aria-hidden="true"></span>
          </div>
        </button>
        <button class="c-header-landing__button" type="button">
          <span class="c-header-landing__text">lorem ipsu</span>
          <div class="c-header-landing__inner">
            <span class="c-header-landing__icon" aria-hidden="true"></span>
          </div>
        </button>
        <button class="c-header-landing__button" type="button">
          <span class="c-header-landing__text">lorem ipsu</span>
          <div class="c-header-landing__inner">
            <span class="c-header-landing__icon" aria-hidden="true"></span>
          </div>
        </button>
        <button class="c-header-landing__button" type="button">
          <span class="c-header-landing__text">lorem i</span>
          <div class="c-header-landing__inner">
            <span class="c-header-landing__icon" aria-hidden="true"></span>
          </div>
        </button>
        <li class="c-header-landing__nav-item">
          <a class="c-header-landing__nav-link" href="#">lorem i</a>
        </li>
      </ul>
    </div>
  </nav>
</div>
```

```css
.c-header-landing-scope {
  background-color: #13111C;
  color: #F7F7F8;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-header-landing {
  display: flex;
  justify-content: center;
  border-spacing: 0px;
  box-sizing: border-box;
  position: relative;
  z-index: 50;
  color: #F7F7F8;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-header-landing__group {
  display: block;
  box-sizing: border-box;
  position: relative;
}

.c-header-landing__nav {
  display: flex;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
  padding: 0px;
  margin: 0px;
  list-style-type: none;
}

.c-header-landing__button {
  display: flex;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
  padding: 6px 12px;
  background-color: transparent;
  color: #F7F7F8;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: normal;
  text-transform: none;
  text-align: center;
  appearance: button;
}

.c-header-landing__text {
  display: block;
  box-sizing: border-box;
  color: #DCDCE0;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
}

.c-header-landing__inner {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 12px;
  height: 12px;
  max-width: 12px;
  max-height: 12px;
  position: relative;
  color: #A1A0AB;
  font-size: 18px;
  line-height: 27px;
  transition: transform 0.15s cubic-bezier(0.4, 0, 1, 1);
}

.c-header-landing__icon {
  display: block;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 12px;
  height: 12px;
  max-width: 12px;
  max-height: 12px;
  overflow-x: hidden;
  overflow-y: hidden;
  vertical-align: middle;
  background-color: currentcolor;
}

.c-header-landing__nav-item {
  display: list-item;
  box-sizing: border-box;
}

.c-header-landing__nav-link {
  display: inline;
  box-sizing: border-box;
  color: #DCDCE0;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  text-decoration-line: none;
  padding-right: 12px;
  padding-left: 12px;
}

.c-header-landing__nav-link:hover {
  color: #F2F1F3;
}
```

**States**

- `header-landing-nav-link` hover (`header-landing-nav-link-hover`): color #F2F1F3

### Footer

**Verification**: desktop flagged, the `footer` height did not reproduce the measured 833px after 2 correction attempts; mobile flagged, the render came out 4 px narrower than the original after 2 correction attempts.

**Anatomy**

- `footer`: the component root, a `<footer>` (`.c-footer`)
- `footer-columns`: inner grid (`.c-footer__columns`)
- `footer-column`: inner flex column (`.c-footer__column`)
- `footer-columns-2`: inner grid (`.c-footer__columns-2`)
- `footer-text`: label text, 8 characters (`.c-footer__text`, 7 instances)
- `footer-link`: link (`.c-footer__link`, 2 instances)
- `footer-group`: inner flex column (`.c-footer__group`, 2 instances)
- `footer-group-2`: inner group (`.c-footer__group-2`, 2 instances)
- `footer-text-2`: label text, 33 characters (`.c-footer__text-2`, 9 instances)
- `footer-text-3`: label text, 7 characters (`.c-footer__text-3`, 2 instances)
- `footer-text-4`: label text, 0 characters (`.c-footer__text-4`, 2 instances)
- `footer-group-3`: inner block (`.c-footer__group-3`)
- `footer-link-2`: link (`.c-footer__link-2`)
- `footer-icon`: icon placeholder, 74x40px (`.c-footer__icon`)
- `footer-icon-2`: icon placeholder, 41x40px (`.c-footer__icon-2`)
- `footer-column-2`: inner grid (`.c-footer__column-2`)
- `footer-group-4`: inner flex column (`.c-footer__group-4`, 6 instances)
- `footer-group-5`: inner flex column (`.c-footer__group-5`, 6 instances)
- `footer-link-3`: link (`.c-footer__link-3`, 6 instances)
- `footer-text-5`: label text, 8 characters (`.c-footer__text-5`, 35 instances)
- `footer-link-4`: link (`.c-footer__link-4`, 29 instances)
- `footer-button`: button, 18-character label (`.c-footer__button`)
- `footer-group-6`: inner group (`.c-footer__group-6`)
- `footer-columns-3`: inner flex row (`.c-footer__columns-3`)
- `footer-columns-4`: inner flex row (`.c-footer__columns-4`)
- `footer-link-5`: link (`.c-footer__link-5`)
- `footer-logo`: icon placeholder, 32px (`.c-footer__logo`)
- `footer-link-6`: link (`.c-footer__link-6`)
- `footer-text-6`: label text, 23 characters (`.c-footer__text-6`)
- `footer-text-7`: label text, 1 characters (`.c-footer__text-7`)
- `footer-text-8`: label text, 0 characters (`.c-footer__text-8`)

**Desktop recipe**

```html
<div class="c-footer-scope">
  <footer class="c-footer">
    <div class="c-footer__columns">
      <div class="c-footer__column">
        <div class="c-footer__columns-2">
          <p class="c-footer__text">lorem ip</p>
          <a class="c-footer__link" href="#">
            <div class="c-footer__group">
              <p class="c-footer__group-2">
                <span class="c-footer__text-2">lorem ipsum dolor sit amet consec</span>
                <span class="c-footer__text-3">lorem i</span>
              </p>
              <p class="c-footer__text-4">
                <span class="c-footer__text-2">lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor lorem ipsum dolor sit amet cons</span>
                <span class="c-footer__text-2">lorem ipsum dolo</span>
              </p>
            </div>
          </a>
          <a class="c-footer__link" href="#">
            <div class="c-footer__group">
              <p class="c-footer__group-2">
                <span class="c-footer__text-2">lorem ipsum dolor sit</span>
                <span class="c-footer__text-3">lorem ipsum dolor sit amet consectet</span>
              </p>
              <p class="c-footer__text-4">
                <span class="c-footer__text-2">lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor lorem ipsum dolor sit amet c</span>
                <span class="c-footer__text-2">lorem ipsum do</span>
              </p>
            </div>
          </a>
        </div>
        <div class="c-footer__group-3">
          <a class="c-footer__link-2" href="#">
            <span class="c-footer__icon" aria-hidden="true"></span>
            <span class="c-footer__icon-2" aria-hidden="true"></span>
          </a>
        </div>
      </div>
      <div class="c-footer__column-2">
        <div class="c-footer__group-4">
          <p class="c-footer__text">lorem i</p>
          <div class="c-footer__group-5">
            <a class="c-footer__link-3" href="#">
              <p class="c-footer__text-5">lorem ip</p>
            </a>
            <a class="c-footer__link-4" href="#">
              <p class="c-footer__text-5">lorem ipsu</p>
            </a>
            <a class="c-footer__link-4" href="#">
              <p class="c-footer__text-5">lorem i</p>
            </a>
            <a class="c-footer__link-4" href="#">
              <p class="c-footer__text-5">lorem</p>
            </a>
            <a class="c-footer__link-4" href="#">
              <p class="c-footer__text-5">lorem ips</p>
            </a>
            <a class="c-footer__link-4" href="#">
              <p class="c-footer__text-5">lorem ips</p>
            </a>
            <a class="c-footer__link-4" href="#">
              <p class="c-footer__text-5">lorem ips</p>
            </a>
            <a class="c-footer__link-4" href="#">
              <p class="c-footer__text-5">lorem ipsum dolor</p>
            </a>
          </div>
        </div>
        <div class="c-footer__group-4">
          <p class="c-footer__text">lorem i</p>
          <div class="c-footer__group-5">
            <a class="c-footer__link-3" href="#">
              <p class="c-footer__text-5">lorem</p>
            </a>
            <a class="c-footer__link-4" href="#">
              <p class="c-footer__text-5">lorem</p>
            </a>
            <a class="c-footer__link-4" href="#">
              <p class="c-footer__text-5">lorem</p>
            </a>
            <a class="c-footer__link-4" href="#">
              <p class="c-footer__text-5">lorem</p>
            </a>
          </div>
        </div>
        <div class="c-footer__group-4">
          <p class="c-footer__text">lorem i</p>
          <div class="c-footer__group-5">
            <a class="c-footer__link-3" href="#">
              <p class="c-footer__text-5">lorem i</p>
            </a>
            <a class="c-footer__link-4" href="#">
              <p class="c-footer__text-5">lorem</p>
            </a>
            <a class="c-footer__link-4" href="#">
              <p class="c-footer__text-5">lorem</p>
            </a>
          </div>
        </div>
        <div class="c-footer__group-4">
          <p class="c-footer__text">lorem ips</p>
          <div class="c-footer__group-5">
            <a class="c-footer__link-3" href="#">
              <p class="c-footer__text-5">lorem ips</p>
            </a>
            <a class="c-footer__link-4" href="#">
              <p class="c-footer__text-5">lorem ipsu</p>
            </a>
            <a class="c-footer__link-4" href="#">
              <p class="c-footer__text-5">lore</p>
            </a>
            <a class="c-footer__link-4" href="#">
              <p class="c-footer__text-5">lorem ipsum dol</p>
            </a>
            <a class="c-footer__link-4" href="#">
              <p class="c-footer__text-5">lore</p>
            </a>
            <a class="c-footer__link-4" href="#">
              <p class="c-footer__text-5">lorem ipsum</p>
            </a>
            <a class="c-footer__link-4" href="#">
              <p class="c-footer__text-5">lorem ipsum dolor</p>
            </a>
          </div>
        </div>
        <div class="c-footer__group-4">
          <p class="c-footer__text">lorem i</p>
          <div class="c-footer__group-5">
            <a class="c-footer__link-3" href="#">
              <p class="c-footer__text-5">lorem</p>
            </a>
            <a class="c-footer__link-4" href="#">
              <p class="c-footer__text-5">lorem ipsu</p>
            </a>
            <a class="c-footer__link-4" href="#">
              <p class="c-footer__text-5">lorem i</p>
            </a>
            <a class="c-footer__link-4" href="#">
              <p class="c-footer__text-5">lore</p>
            </a>
            <a class="c-footer__link-4" href="#">
              <p class="c-footer__text-5">lorem</p>
            </a>
            <a class="c-footer__link-4" href="#">
              <p class="c-footer__text-5">lore</p>
            </a>
            <a class="c-footer__link-4" href="#">
              <p class="c-footer__text-5">lorem</p>
            </a>
          </div>
        </div>
        <div class="c-footer__group-4">
          <p class="c-footer__text">lorem</p>
          <div class="c-footer__group-5">
            <a class="c-footer__link-3" href="#">
              <p class="c-footer__text-5">lor</p>
            </a>
            <a class="c-footer__link-4" href="#">
              <p class="c-footer__text-5">lorem ipsum do</p>
            </a>
            <a class="c-footer__link-4" href="#">
              <p class="c-footer__text-5">lorem ipsum do</p>
            </a>
            <a class="c-footer__link-4" href="#">
              <p class="c-footer__text-5">lorem ipsum dolo</p>
            </a>
            <a class="c-footer__link-4" href="#">
              <p class="c-footer__text-5">lorem ipsum dolor si</p>
            </a>
            <a class="c-footer__link-4" href="#">
              <p class="c-footer__text-5">lorem ipsum dolor</p>
            </a>
            <button class="c-footer__button" type="button">lorem ipsum dolor</button>
          </div>
        </div>
      </div>
    </div>
    <div class="c-footer__group-6"></div>
    <div class="c-footer__columns-3">
      <div class="c-footer__columns-4">
        <a class="c-footer__link-5" href="#">
          <span class="c-footer__logo" aria-hidden="true"></span>
        </a>
        <a class="c-footer__link-6" href="#">
          <span class="c-footer__text-6">lorem ipsum dolor sit a</span>
          <span class="c-footer__text-7">l</span>
        </a>
      </div>
      <div class="c-footer__text-8">
        <span class="c-footer__text-2">l</span>
        <span class="c-footer__text-2">lore</span>
        <span class="c-footer__text-2">lorem ipsum dolor sit amet consect</span>
      </div>
    </div>
  </footer>
</div>
```

```css
.c-footer-scope {
  background-color: #13111C;
  color: #F7F7F8;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-footer {
  display: block;
  border-spacing: 0px;
  box-sizing: border-box;
  max-width: 1280px;
  padding: 48px 48px 96px;
  color: #F7F7F8;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-footer__columns {
  display: grid;
  column-gap: 128px;
  grid-template-columns: repeat(5, minmax(0px, 1fr));
  box-sizing: border-box;
}

.c-footer__column {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
}

.c-footer__columns-2 {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(1, minmax(0px, 1fr));
  box-sizing: border-box;
}

.c-footer__text {
  display: block;
  box-sizing: border-box;
  margin: 0px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
}

.c-footer__link {
  display: block;
  box-sizing: border-box;
  padding: 16px 24px;
  position: relative;
  background-color: #1C1A28;
  color: #F7F7F8;
  border: 1px solid #FFFFFF1A;
  border-radius: 12px;
  cursor: pointer;
  text-decoration-line: none;
}

.c-footer__group {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  position: relative;
  z-index: 10;
}

.c-footer__group-2 {
  display: block;
  box-sizing: border-box;
  margin: 0px;
  color: #C4C4CA;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
}

.c-footer__text-3 {
  display: inline;
  box-sizing: border-box;
  color: #A78BFA;
}

.c-footer__text-4 {
  display: block;
  box-sizing: border-box;
  margin: 4px 0px 0px;
  color: #A1A0AB;
  font-size: 14px;
  line-height: 20px;
}

.c-footer__group-3 {
  display: block;
  box-sizing: border-box;
}

.c-footer__link-2 {
  display: flex;
  align-items: center;
  gap: 16px;
  box-sizing: border-box;
  max-width: max-content;
  color: #F7F7F8;
  opacity: 0.4;
  cursor: pointer;
  text-decoration-line: none;
}

.c-footer__icon {
  display: block;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 74px;
  height: 40px;
  overflow-x: hidden;
  overflow-y: hidden;
  vertical-align: middle;
  background-color: currentcolor;
}

.c-footer__icon-2 {
  display: block;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 41px;
  height: 40px;
  overflow-x: hidden;
  overflow-y: hidden;
  vertical-align: middle;
  background-color: currentcolor;
}

.c-footer__column-2 {
  display: grid;
  gap: 48px 32px;
  grid-template-columns: repeat(3, minmax(0px, 1fr));
  box-sizing: border-box;
}

.c-footer__group-4 {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.c-footer__group-5 {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin-top: 16px;
}

.c-footer__link-3 {
  display: block;
  box-sizing: border-box;
  max-width: max-content;
  color: #A1A0AB;
  cursor: pointer;
  text-decoration-line: none;
}

.c-footer__text-5 {
  display: block;
  box-sizing: border-box;
  margin: 0px;
  font-size: 14px;
  line-height: 20px;
}

.c-footer__link-4 {
  display: block;
  box-sizing: border-box;
  max-width: max-content;
  color: #A1A0AB;
  cursor: pointer;
  text-decoration-line: none;
  margin-top: 12px;
}

.c-footer__button {
  display: block;
  box-sizing: border-box;
  max-width: max-content;
  padding: 0px;
  background-color: transparent;
  color: #A1A0AB;
  border: 0;
  cursor: pointer;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: normal;
  text-transform: none;
  text-align: left;
  appearance: button;
  margin-top: 12px;
}

.c-footer__group-6 {
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 0px;
  overflow-x: hidden;
  overflow-y: hidden;
  margin-top: 48px;
  margin-bottom: 32px;
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: #FFFFFF1A;
}

.c-footer__columns-3 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}

.c-footer__columns-4 {
  display: flex;
  align-items: center;
  column-gap: 32px;
  box-sizing: border-box;
}

.c-footer__link-5 {
  display: block;
  box-sizing: border-box;
  color: #F7F7F8;
  cursor: pointer;
  text-decoration-line: none;
}

.c-footer__logo {
  display: flex;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 32px;
  height: 32px;
  overflow-x: hidden;
  overflow-y: hidden;
  vertical-align: middle;
  background-color: currentcolor;
}

.c-footer__link-6 {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  color: #F7F7F8;
  cursor: pointer;
  text-decoration-line: none;
}

.c-footer__text-6 {
  display: block;
  box-sizing: border-box;
  color: #42946E;
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
  font-size: 12px;
  line-height: 18px;
}

.c-footer__text-7 {
  display: block;
  box-sizing: border-box;
  color: #A1A0AB;
  font-size: 12px;
  line-height: 18px;
  margin-left: 8px;
}

.c-footer__text-8 {
  display: block;
  box-sizing: border-box;
  color: #878593;
  font-size: 12px;
  line-height: 18px;
}

.c-footer__link:focus {
  box-shadow: #FFFFFF 0px 0px 0px 0px, #BF93EC 0px 0px 0px 2px, transparent 0px 0px 0px 0px;
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.c-footer__link-2:focus {
  box-shadow: #FFFFFF 0px 0px 0px 0px, #BF93EC 0px 0px 0px 2px, transparent 0px 0px 0px 0px;
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.c-footer__link-3:hover {
  color: #F7F7F8;
}

.c-footer__link-4:hover {
  color: #F7F7F8;
}

.c-footer__button:hover {
  color: #F7F7F8;
}

.c-footer__link-6:focus {
  box-shadow: #FFFFFF 0px 0px 0px 0px, #BF93EC 0px 0px 0px 2px, transparent 0px 0px 0px 0px;
  outline: 2px solid transparent;
  outline-offset: 2px;
}
```

**Mobile anatomy**

- `footer-mobile`: the component root, a `<footer>` (`.c-footer-mobile`)
- `footer-mobile-columns`: inner grid (`.c-footer-mobile__columns`)
- `footer-mobile-column`: inner grid (`.c-footer-mobile__column`)
- `footer-mobile-group`: inner flex column (`.c-footer-mobile__group`, 6 instances)
- `footer-mobile-text`: label text, 7 characters (`.c-footer-mobile__text`, 6 instances)
- `footer-mobile-group-2`: inner flex column (`.c-footer-mobile__group-2`, 6 instances)
- `footer-mobile-link`: link (`.c-footer-mobile__link`, 6 instances)
- `footer-mobile-text-2`: label text, 8 characters (`.c-footer-mobile__text-2`, 35 instances)
- `footer-mobile-link-2`: link (`.c-footer-mobile__link-2`, 29 instances)
- `footer-mobile-button`: button, 18-character label (`.c-footer-mobile__button`)
- `footer-mobile-group-3`: inner group (`.c-footer-mobile__group-3`)
- `footer-mobile-group-4`: inner flex column (`.c-footer-mobile__group-4`)
- `footer-mobile-group-5`: inner flex column (`.c-footer-mobile__group-5`)
- `footer-mobile-link-3`: link (`.c-footer-mobile__link-3`)
- `footer-mobile-logo`: icon placeholder, 24px (`.c-footer-mobile__logo`)
- `footer-mobile-link-4`: link (`.c-footer-mobile__link-4`)
- `footer-mobile-text-3`: label text, 23 characters (`.c-footer-mobile__text-3`)
- `footer-mobile-text-4`: label text, 1 characters (`.c-footer-mobile__text-4`)
- `footer-mobile-text-5`: label text, 0 characters (`.c-footer-mobile__text-5`)
- `footer-mobile-text-6`: label text, 1 characters (`.c-footer-mobile__text-6`, 3 instances)

**Mobile recipe**

```html
<div class="c-footer-mobile-scope">
  <footer class="c-footer-mobile">
    <div class="c-footer-mobile__columns">
      <div class="c-footer-mobile__column">
        <div class="c-footer-mobile__group">
          <p class="c-footer-mobile__text">lorem i</p>
          <div class="c-footer-mobile__group-2">
            <a class="c-footer-mobile__link" href="#">
              <p class="c-footer-mobile__text-2">lorem ip</p>
            </a>
            <a class="c-footer-mobile__link-2" href="#">
              <p class="c-footer-mobile__text-2">lorem ipsu</p>
            </a>
            <a class="c-footer-mobile__link-2" href="#">
              <p class="c-footer-mobile__text-2">lorem i</p>
            </a>
            <a class="c-footer-mobile__link-2" href="#">
              <p class="c-footer-mobile__text-2">lorem</p>
            </a>
            <a class="c-footer-mobile__link-2" href="#">
              <p class="c-footer-mobile__text-2">lorem ips</p>
            </a>
            <a class="c-footer-mobile__link-2" href="#">
              <p class="c-footer-mobile__text-2">lorem ips</p>
            </a>
            <a class="c-footer-mobile__link-2" href="#">
              <p class="c-footer-mobile__text-2">lorem ips</p>
            </a>
            <a class="c-footer-mobile__link-2" href="#">
              <p class="c-footer-mobile__text-2">lorem ipsum dolor</p>
            </a>
          </div>
        </div>
        <div class="c-footer-mobile__group">
          <p class="c-footer-mobile__text">lorem i</p>
          <div class="c-footer-mobile__group-2">
            <a class="c-footer-mobile__link" href="#">
              <p class="c-footer-mobile__text-2">lorem</p>
            </a>
            <a class="c-footer-mobile__link-2" href="#">
              <p class="c-footer-mobile__text-2">lorem</p>
            </a>
            <a class="c-footer-mobile__link-2" href="#">
              <p class="c-footer-mobile__text-2">lorem</p>
            </a>
            <a class="c-footer-mobile__link-2" href="#">
              <p class="c-footer-mobile__text-2">lorem</p>
            </a>
          </div>
        </div>
        <div class="c-footer-mobile__group">
          <p class="c-footer-mobile__text">lorem i</p>
          <div class="c-footer-mobile__group-2">
            <a class="c-footer-mobile__link" href="#">
              <p class="c-footer-mobile__text-2">lorem i</p>
            </a>
            <a class="c-footer-mobile__link-2" href="#">
              <p class="c-footer-mobile__text-2">lorem</p>
            </a>
            <a class="c-footer-mobile__link-2" href="#">
              <p class="c-footer-mobile__text-2">lorem</p>
            </a>
          </div>
        </div>
        <div class="c-footer-mobile__group">
          <p class="c-footer-mobile__text">lorem ips</p>
          <div class="c-footer-mobile__group-2">
            <a class="c-footer-mobile__link" href="#">
              <p class="c-footer-mobile__text-2">lorem ips</p>
            </a>
            <a class="c-footer-mobile__link-2" href="#">
              <p class="c-footer-mobile__text-2">lorem ipsu</p>
            </a>
            <a class="c-footer-mobile__link-2" href="#">
              <p class="c-footer-mobile__text-2">lore</p>
            </a>
            <a class="c-footer-mobile__link-2" href="#">
              <p class="c-footer-mobile__text-2">lorem ipsum dol</p>
            </a>
            <a class="c-footer-mobile__link-2" href="#">
              <p class="c-footer-mobile__text-2">lore</p>
            </a>
            <a class="c-footer-mobile__link-2" href="#">
              <p class="c-footer-mobile__text-2">lorem ipsum</p>
            </a>
            <a class="c-footer-mobile__link-2" href="#">
              <p class="c-footer-mobile__text-2">lorem ipsum dolor</p>
            </a>
          </div>
        </div>
        <div class="c-footer-mobile__group">
          <p class="c-footer-mobile__text">lorem i</p>
          <div class="c-footer-mobile__group-2">
            <a class="c-footer-mobile__link" href="#">
              <p class="c-footer-mobile__text-2">lorem</p>
            </a>
            <a class="c-footer-mobile__link-2" href="#">
              <p class="c-footer-mobile__text-2">lorem ipsu</p>
            </a>
            <a class="c-footer-mobile__link-2" href="#">
              <p class="c-footer-mobile__text-2">lorem i</p>
            </a>
            <a class="c-footer-mobile__link-2" href="#">
              <p class="c-footer-mobile__text-2">lore</p>
            </a>
            <a class="c-footer-mobile__link-2" href="#">
              <p class="c-footer-mobile__text-2">lorem</p>
            </a>
            <a class="c-footer-mobile__link-2" href="#">
              <p class="c-footer-mobile__text-2">lore</p>
            </a>
            <a class="c-footer-mobile__link-2" href="#">
              <p class="c-footer-mobile__text-2">lorem</p>
            </a>
          </div>
        </div>
        <div class="c-footer-mobile__group">
          <p class="c-footer-mobile__text">lorem</p>
          <div class="c-footer-mobile__group-2">
            <a class="c-footer-mobile__link" href="#">
              <p class="c-footer-mobile__text-2">lor</p>
            </a>
            <a class="c-footer-mobile__link-2" href="#">
              <p class="c-footer-mobile__text-2">lorem ipsum do</p>
            </a>
            <a class="c-footer-mobile__link-2" href="#">
              <p class="c-footer-mobile__text-2">lorem ipsum do</p>
            </a>
            <a class="c-footer-mobile__link-2" href="#">
              <p class="c-footer-mobile__text-2">lorem ipsum dolo</p>
            </a>
            <a class="c-footer-mobile__link-2" href="#">
              <p class="c-footer-mobile__text-2">lorem ipsum dolor si</p>
            </a>
            <a class="c-footer-mobile__link-2" href="#">
              <p class="c-footer-mobile__text-2">lorem ipsum dolor</p>
            </a>
            <button class="c-footer-mobile__button" type="button">lorem ipsum dolor</button>
          </div>
        </div>
      </div>
    </div>
    <div class="c-footer-mobile__group-3"></div>
    <div class="c-footer-mobile__group-4">
      <div class="c-footer-mobile__group-5">
        <a class="c-footer-mobile__link-3" href="#">
          <span class="c-footer-mobile__logo" aria-hidden="true"></span>
        </a>
        <a class="c-footer-mobile__link-4" href="#">
          <span class="c-footer-mobile__text-3">lorem ipsum dolor sit a</span>
          <span class="c-footer-mobile__text-4">l</span>
        </a>
      </div>
      <div class="c-footer-mobile__text-5">
        <span class="c-footer-mobile__text-6">l</span>
        <span class="c-footer-mobile__text-6">lore</span>
        <span class="c-footer-mobile__text-6">lorem ipsum dolor sit amet consect</span>
      </div>
    </div>
  </footer>
</div>
```

```css
.c-footer-mobile-scope {
  background-color: #13111C;
  color: #F7F7F8;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-footer-mobile {
  display: block;
  border-spacing: 0px;
  box-sizing: border-box;
  max-width: 1280px;
  padding: 48px 48px 96px;
  color: #F7F7F8;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-footer-mobile__columns {
  display: grid;
  row-gap: 48px;
  grid-template-columns: repeat(1, minmax(0px, 1fr));
  box-sizing: border-box;
}

.c-footer-mobile__column {
  display: grid;
  gap: 48px 32px;
  grid-template-columns: repeat(2, minmax(0px, 1fr));
  box-sizing: border-box;
  margin-right: auto;
  margin-left: auto;
}

.c-footer-mobile__group {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.c-footer-mobile__text {
  display: block;
  box-sizing: border-box;
  margin: 0px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
}

.c-footer-mobile__group-2 {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin-top: 16px;
}

.c-footer-mobile__link {
  display: block;
  box-sizing: border-box;
  max-width: max-content;
  color: #A1A0AB;
  cursor: pointer;
  text-decoration-line: none;
}

.c-footer-mobile__text-2 {
  display: block;
  box-sizing: border-box;
  margin: 0px;
  font-size: 14px;
  line-height: 20px;
}

.c-footer-mobile__link-2 {
  display: block;
  box-sizing: border-box;
  max-width: max-content;
  color: #A1A0AB;
  cursor: pointer;
  text-decoration-line: none;
  margin-top: 12px;
}

.c-footer-mobile__button {
  display: block;
  box-sizing: border-box;
  max-width: max-content;
  padding: 0px;
  background-color: transparent;
  color: #A1A0AB;
  border: 0;
  cursor: pointer;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: normal;
  text-transform: none;
  text-align: left;
  appearance: button;
  margin-top: 12px;
}

.c-footer-mobile__group-3 {
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 0px;
  overflow-x: hidden;
  overflow-y: hidden;
  margin-top: 48px;
  margin-bottom: 32px;
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: #FFFFFF1A;
}

.c-footer-mobile__group-4 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  row-gap: 16px;
  box-sizing: border-box;
}

.c-footer-mobile__group-5 {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 16px;
  box-sizing: border-box;
}

.c-footer-mobile__link-3 {
  display: block;
  box-sizing: border-box;
  color: #F7F7F8;
  cursor: pointer;
  text-decoration-line: none;
}

.c-footer-mobile__logo {
  display: flex;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 24px;
  height: 24px;
  overflow-x: hidden;
  overflow-y: hidden;
  vertical-align: middle;
  background-color: currentcolor;
}

.c-footer-mobile__link-4 {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  color: #F7F7F8;
  cursor: pointer;
  text-decoration-line: none;
}

.c-footer-mobile__text-3 {
  display: block;
  box-sizing: border-box;
  color: #42946E;
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
  font-size: 12px;
  line-height: 18px;
}

.c-footer-mobile__text-4 {
  display: block;
  box-sizing: border-box;
  color: #A1A0AB;
  font-size: 12px;
  line-height: 18px;
  margin-left: 8px;
}

.c-footer-mobile__text-5 {
  display: block;
  box-sizing: border-box;
  color: #878593;
  font-size: 12px;
  line-height: 18px;
}

.c-footer-mobile__link:hover {
  color: #F7F7F8;
}

.c-footer-mobile__link-2:hover {
  color: #F7F7F8;
}

.c-footer-mobile__button:hover {
  color: #F7F7F8;
}

.c-footer-mobile__link-4:focus {
  box-shadow: #FFFFFF 0px 0px 0px 0px, #BF93EC 0px 0px 0px 2px, transparent 0px 0px 0px 0px;
  outline: 2px solid transparent;
  outline-offset: 2px;
}
```

**States**

- `footer-link` focus: box-shadow #FFFFFF 0px 0px 0px 0px, #BF93EC 0px 0px 0px 2px, transparent 0px 0px 0px 0px, outline 2px solid transparent, outline-offset 2px
- `footer-link-2` focus: box-shadow #FFFFFF 0px 0px 0px 0px, #BF93EC 0px 0px 0px 2px, transparent 0px 0px 0px 0px, outline 2px solid transparent, outline-offset 2px
- `footer-link-3` hover (`footer-link-3-hover`): color #F7F7F8
- `footer-link-4` hover (`footer-link-4-hover`): color #F7F7F8
- `footer-button` hover (`footer-button-hover`): color #F7F7F8
- `footer-link-6` focus: box-shadow #FFFFFF 0px 0px 0px 0px, #BF93EC 0px 0px 0px 2px, transparent 0px 0px 0px 0px, outline 2px solid transparent, outline-offset 2px
- mobile, `footer-mobile-link` hover (`footer-mobile-link-hover`): color #F7F7F8
- mobile, `footer-mobile-link-2` hover (`footer-mobile-link-2-hover`): color #F7F7F8
- mobile, `footer-mobile-button` hover (`footer-mobile-button-hover`): color #F7F7F8
- mobile, `footer-mobile-link-4` focus: box-shadow #FFFFFF 0px 0px 0px 0px, #BF93EC 0px 0px 0px 2px, transparent 0px 0px 0px 0px, outline 2px solid transparent, outline-offset 2px

### Button, primary (2)

**Verification**: verified against the live page at desktop.

**Anatomy**

- `button-primary-2`: the component root, a `<a>` (`.c-button-primary-2`), 20-character label

**Recipe**

```html
<div class="c-button-primary-2-scope">
  <a class="c-button-primary-2" href="#">lorem ipsum dolor si</a>
</div>
```

```css
.c-button-primary-2-scope {
  background-color: #181622;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-button-primary-2 {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-spacing: 0px;
  box-sizing: border-box;
  min-width: max-content;
  padding: 12px 24px;
  position: relative;
  background-image: radial-gradient(134.26% 244.64% at 42.92% -80.36%, #B301B3 25.45%, #381DBD 100%);
  background-size: 100% 100%;
  color: #FFFFFF;
  border: 1px solid #8043C8;
  border-radius: 8px;
  cursor: pointer;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  text-decoration-line: none;
  transition-duration: 0.15s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-property: background-size, box-shadow;
}

.c-button-primary-2:hover {
  background-size: 100% 200%;
  box-shadow: transparent 0px 0px 0px 0px, transparent 0px 0px 0px 0px, #B428B459 0px 0px 8px 0px, #662BDF59 0px 0px 24px 0px;
}

.c-button-primary-2:focus {
  box-shadow: #FFFFFF 0px 0px 0px 0px, #A667E4 0px 0px 0px 2px, transparent 0px 0px 0px 0px;
  outline: 2px solid transparent;
  outline-offset: 2px;
}
```

**States**

- hover: background-size 100% 200%, box-shadow transparent 0px 0px 0px 0px, transparent 0px 0px 0px 0px, #B428B459 0px 0px 8px 0px, #662BDF59 0px 0px 24px 0px
- focus: box-shadow #FFFFFF 0px 0px 0px 0px, #A667E4 0px 0px 0px 2px, transparent 0px 0px 0px 0px, outline 2px solid transparent, outline-offset 2px

### Button, primary (3)

**Verification**: verified against the live page at desktop.

**Anatomy**

- `button-primary-3`: the component root, a `<a>` (`.c-button-primary-3`), 10-character label

**Recipe**

```html
<div class="c-button-primary-3-scope">
  <a class="c-button-primary-3" href="#">lorem ipsu</a>
</div>
```

```css
.c-button-primary-3-scope {
  background-color: #181622;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-button-primary-3 {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-spacing: 0px;
  box-sizing: border-box;
  min-width: max-content;
  padding: 12px 24px;
  position: relative;
  background-image: radial-gradient(134.26% 244.64% at 42.92% -80.36%, #B301B3 25.45%, #381DBD 100%);
  background-size: 100% 100%;
  color: #FFFFFF;
  border: 1px solid #8043C8;
  border-radius: 8px;
  cursor: pointer;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  text-decoration-line: none;
  transition-duration: 0.15s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-property: background-size, box-shadow;
}

.c-button-primary-3:hover {
  background-size: 100% 200%;
  box-shadow: transparent 0px 0px 0px 0px, transparent 0px 0px 0px 0px, #B428B459 0px 0px 8px 0px, #662BDF59 0px 0px 24px 0px;
}

.c-button-primary-3:focus {
  box-shadow: #FFFFFF 0px 0px 0px 0px, #A667E4 0px 0px 0px 2px, transparent 0px 0px 0px 0px;
  outline: 2px solid transparent;
  outline-offset: 2px;
}
```

**States**

- hover: background-size 100% 200%, box-shadow transparent 0px 0px 0px 0px, transparent 0px 0px 0px 0px, #B428B459 0px 0px 8px 0px, #662BDF59 0px 0px 24px 0px
- focus: box-shadow #FFFFFF 0px 0px 0px 0px, #A667E4 0px 0px 0px 2px, transparent 0px 0px 0px 0px, outline 2px solid transparent, outline-offset 2px

### Button, secondary (2)

**Verification**: verified against the live page at desktop.

**Anatomy**

- `button-secondary-2`: the component root, a `<a>` (`.c-button-secondary-2`)
- `button-secondary-2-label`: label text, 13 characters (`.c-button-secondary-2__label`)

**Recipe**

```html
<div class="c-button-secondary-2-scope">
  <a class="c-button-secondary-2" href="#">
    <span class="c-button-secondary-2__label">lorem ipsum d</span>
  </a>
</div>
```

```css
.c-button-secondary-2-scope {
  background-color: #181622;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-button-secondary-2 {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-spacing: 0px;
  box-sizing: border-box;
  height: 42px;
  padding: 8px 12px;
  background-color: #545260;
  color: #FFFFFF;
  border: 1px solid #FFFFFF1A;
  border-radius: 6px;
  cursor: pointer;
  transform: matrix(1, 0, 0, 1, 0, 0);
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  text-decoration-line: none;
  transition: transform 0.05s cubic-bezier(0.4, 0, 0.2, 1);
}

.c-button-secondary-2__label {
  display: block;
  box-sizing: border-box;
}

.c-button-secondary-2:hover {
  background-color: #6C6B7B;
}

.c-button-secondary-2:focus {
  box-shadow: #FFFFFF 0px 0px 0px 0px, #A667E4 0px 0px 0px 2px, transparent 0px 0px 0px 0px;
  outline: 2px solid transparent;
  outline-offset: 2px;
}
```

**States**

- hover (`button-secondary-2-hover`): background-color #6C6B7B
- focus: box-shadow #FFFFFF 0px 0px 0px 0px, #A667E4 0px 0px 0px 2px, transparent 0px 0px 0px 0px, outline 2px solid transparent, outline-offset 2px

### Button, secondary (3)

**Verification**: verified against the live page at desktop.

**Anatomy**

- `button-secondary-3`: the component root, a `<a>` (`.c-button-secondary-3`)
- `button-secondary-3-label`: label text, 13 characters (`.c-button-secondary-3__label`)

**Recipe**

```html
<div class="c-button-secondary-3-scope">
  <a class="c-button-secondary-3" href="#">
    <span class="c-button-secondary-3__label">lorem ipsum d</span>
  </a>
</div>
```

```css
.c-button-secondary-3-scope {
  background-color: #181622;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-button-secondary-3 {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-spacing: 0px;
  box-sizing: border-box;
  height: 42px;
  padding: 8px 12px;
  background-color: #545260;
  color: #FFFFFF;
  border: 1px solid #FFFFFF1A;
  border-radius: 6px;
  cursor: pointer;
  transform: matrix(1, 0, 0, 1, 0, 0);
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  text-decoration-line: none;
  transition: transform 0.05s cubic-bezier(0.4, 0, 0.2, 1);
}

.c-button-secondary-3__label {
  display: block;
  box-sizing: border-box;
}

.c-button-secondary-3:hover {
  background-color: #6C6B7B;
}

.c-button-secondary-3:focus {
  box-shadow: #FFFFFF 0px 0px 0px 0px, #A667E4 0px 0px 0px 2px, transparent 0px 0px 0px 0px;
  outline: 2px solid transparent;
  outline-offset: 2px;
}
```

**States**

- hover (`button-secondary-3-hover`): background-color #6C6B7B
- focus: box-shadow #FFFFFF 0px 0px 0px 0px, #A667E4 0px 0px 0px 2px, transparent 0px 0px 0px 0px, outline 2px solid transparent, outline-offset 2px

### Button, ghost (2)

**Verification**: verified against the live page at desktop.

**Anatomy**

- `button-ghost-2`: the component root, a `<button>` (`.c-button-ghost-2`), 7-character label

**Recipe**

```html
<div class="c-button-ghost-2-scope">
  <button class="c-button-ghost-2" type="button">lorem i</button>
</div>
```

```css
.c-button-ghost-2-scope {
  background-color: #13111C;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-button-ghost-2 {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-spacing: 0px;
  box-sizing: border-box;
  width: 80px;
  height: 40px;
  padding: 0px 12px;
  background-color: transparent;
  color: #FFFFFF;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: normal;
  text-transform: none;
  text-align: center;
  appearance: button;
}

.c-button-ghost-2:hover {
  background-color: #FFFFFF0D;
}
```

**States**

- hover (`button-ghost-2-hover`): background-color #FFFFFF0D

### Card (2)

**Verification**: verified against the live page at desktop.

**Anatomy**

- `card-2`: the component root, a `<header>` (`.c-card-2`)
- `card-2-group`: inner flex column (`.c-card-2__group`)
- `card-2-group-2`: inner flex row (`.c-card-2__group-2`)
- `card-2-title`: heading, 5 characters (`.c-card-2__title`)
- `card-2-body`: inner flex row (`.c-card-2__body`)
- `card-2-text`: label text, 0 characters (`.c-card-2__text`)
- `card-2-text-2`: label text, 1 characters (`.c-card-2__text-2`, 2 instances)
- `card-2-text-3`: label text, 13 characters (`.c-card-2__text-3`)
- `card-2-body-2`: label text, 46 characters (`.c-card-2__body-2`)

**Recipe**

```html
<div class="c-card-2-scope">
  <header class="c-card-2">
    <div class="c-card-2__group">
      <div class="c-card-2__group-2">
        <h3 class="c-card-2__title">lorem</h3>
      </div>
      <p class="c-card-2__body">
        <span class="c-card-2__text">
          <span class="c-card-2__text-2">l</span>
          <span class="c-card-2__text-2">l</span>
        </span>
        <span class="c-card-2__text-3">lorem ipsum d</span>
      </p>
    </div>
    <p class="c-card-2__body-2">lorem ipsum dolor sit amet consectetur adipisc</p>
  </header>
</div>
```

```css
.c-card-2-scope {
  background-color: #0B1428;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-card-2 {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  border-spacing: 0px;
  box-sizing: border-box;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-card-2__group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  box-sizing: border-box;
}

.c-card-2__group-2 {
  display: flex;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
}

.c-card-2__title {
  display: block;
  box-sizing: border-box;
  margin: 0px;
  color: #F3F6FC;
  font-size: 20px;
  font-weight: 600;
  line-height: 27.5px;
}

.c-card-2__body {
  display: flex;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
  margin: 0px;
}

.c-card-2__text {
  display: block;
  box-sizing: border-box;
  font-size: 40px;
  font-weight: 600;
  line-height: 50px;
}

.c-card-2__text-3 {
  display: block;
  box-sizing: border-box;
  color: #A1A0AB;
  font-size: 14px;
  line-height: 20px;
}

.c-card-2__body-2 {
  display: block;
  box-sizing: border-box;
  margin: 0px;
  color: #F2F1F3;
}
```

**States**

- No hover or focus change was observed.

### Card (3)

**Verification**: flagged, the render came out 2 px wider than the original after 2 correction attempts.

**Anatomy**

- `card-3`: the component root, a `<header>` (`.c-card-3`)
- `card-3-group`: inner flex column (`.c-card-3__group`)
- `card-3-group-2`: inner flex row (`.c-card-3__group-2`)
- `card-3-title`: heading, 3 characters (`.c-card-3__title`)
- `card-3-body`: inner flex row (`.c-card-3__body`)
- `card-3-text`: label text, 0 characters (`.c-card-3__text`)
- `card-3-text-2`: label text, 1 characters (`.c-card-3__text-2`, 2 instances)
- `card-3-text-3`: label text, 13 characters (`.c-card-3__text-3`)
- `card-3-body-2`: label text, 70 characters (`.c-card-3__body-2`)

**Recipe**

```html
<div class="c-card-3-scope">
  <header class="c-card-3">
    <div class="c-card-3__group">
      <div class="c-card-3__group-2">
        <h3 class="c-card-3__title">lor</h3>
      </div>
      <p class="c-card-3__body">
        <span class="c-card-3__text">
          <span class="c-card-3__text-2">l</span>
          <span class="c-card-3__text-2">lo</span>
        </span>
        <span class="c-card-3__text-3">lorem ipsum d</span>
      </p>
    </div>
    <p class="c-card-3__body-2">lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod</p>
  </header>
</div>
```

```css
.c-card-3-scope {
  background-color: #1E132A;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-card-3 {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  border-spacing: 0px;
  box-sizing: border-box;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-card-3__group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  box-sizing: border-box;
}

.c-card-3__group-2 {
  display: flex;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
}

.c-card-3__title {
  display: block;
  box-sizing: border-box;
  margin: 0px;
  color: #FAF6FD;
  font-size: 20px;
  font-weight: 600;
  line-height: 27.5px;
}

.c-card-3__body {
  display: flex;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
  margin: 0px;
}

.c-card-3__text {
  display: block;
  box-sizing: border-box;
  font-size: 40px;
  font-weight: 600;
  line-height: 50px;
}

.c-card-3__text-3 {
  display: block;
  box-sizing: border-box;
  color: #A1A0AB;
  font-size: 14px;
  line-height: 20px;
}

.c-card-3__body-2 {
  display: block;
  box-sizing: border-box;
  margin: 0px;
  color: #F2F1F3;
}
```

**States**

- No hover or focus change was observed.

### Card (4)

**Verification**: verified against the live page at desktop.

**Anatomy**

- `card-4`: the component root, a `<header>` (`.c-card-4`)
- `card-4-group`: inner flex column (`.c-card-4__group`)
- `card-4-title`: heading, 10 characters (`.c-card-4__title`)
- `card-4-body`: label text, 6 characters (`.c-card-4__body`)
- `card-4-body-2`: label text, 61 characters (`.c-card-4__body-2`)

**Recipe**

```html
<div class="c-card-4-scope">
  <header class="c-card-4">
    <div class="c-card-4__group">
      <h3 class="c-card-4__title">lorem ipsu</h3>
      <p class="c-card-4__body">lorem</p>
    </div>
    <p class="c-card-4__body-2">lorem ipsum dolor sit amet consectetur adipiscing elit sed do</p>
  </header>
</div>
```

```css
.c-card-4-scope {
  background-color: #181622;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-card-4 {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  border-spacing: 0px;
  box-sizing: border-box;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-card-4__group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  box-sizing: border-box;
}

.c-card-4__title {
  display: block;
  box-sizing: border-box;
  margin: 0px;
  color: #F7F7F8;
  font-size: 20px;
  font-weight: 600;
  line-height: 27.5px;
}

.c-card-4__body {
  display: block;
  box-sizing: border-box;
  margin: 0px;
  font-size: 40px;
  font-weight: 600;
  line-height: 50px;
}

.c-card-4__body-2 {
  display: block;
  box-sizing: border-box;
  margin: 0px;
  color: #F2F1F3;
}
```

**States**

- No hover or focus change was observed.

### Pricing plan

**Verification**: verified against the live page at desktop.

**Anatomy**

- `pricing-plan`: the component root, a `<header>` (`.c-pricing-plan`)
- `pricing-plan-group`: inner flex column (`.c-pricing-plan__group`)
- `pricing-plan-group-2`: inner flex row (`.c-pricing-plan__group-2`)
- `pricing-plan-title`: heading, 4 characters (`.c-pricing-plan__title`)
- `pricing-plan-body`: inner flex row (`.c-pricing-plan__body`)
- `pricing-plan-text`: label text, 0 characters (`.c-pricing-plan__text`)
- `pricing-plan-text-2`: label text, 1 characters (`.c-pricing-plan__text-2`, 2 instances)
- `pricing-plan-text-3`: label text, 9 characters (`.c-pricing-plan__text-3`)
- `pricing-plan-body-2`: label text, 63 characters (`.c-pricing-plan__body-2`)

**Recipe**

```html
<div class="c-pricing-plan-scope">
  <header class="c-pricing-plan">
    <div class="c-pricing-plan__group">
      <div class="c-pricing-plan__group-2">
        <h3 class="c-pricing-plan__title">lore</h3>
      </div>
      <p class="c-pricing-plan__body">
        <span class="c-pricing-plan__text">
          <span class="c-pricing-plan__text-2">l</span>
          <span class="c-pricing-plan__text-2">l</span>
        </span>
        <span class="c-pricing-plan__text-3">lorem ips</span>
      </p>
    </div>
    <p class="c-pricing-plan__body-2">lorem ipsum dolor sit amet consectetur adipiscing elit sed do e</p>
  </header>
</div>
```

```css
.c-pricing-plan-scope {
  background-color: #181622;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-pricing-plan {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  flex-grow: 1;
  flex-basis: 0%;
  gap: 16px;
  border-spacing: 0px;
  box-sizing: border-box;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-pricing-plan__group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  box-sizing: border-box;
}

.c-pricing-plan__group-2 {
  display: flex;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
}

.c-pricing-plan__title {
  display: block;
  box-sizing: border-box;
  margin: 0px;
  color: #F7F7F8;
  font-size: 20px;
  font-weight: 600;
  line-height: 27.5px;
}

.c-pricing-plan__body {
  display: flex;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
  margin: 0px;
}

.c-pricing-plan__text {
  display: block;
  box-sizing: border-box;
  font-size: 40px;
  font-weight: 600;
  line-height: 50px;
}

.c-pricing-plan__text-3 {
  display: block;
  box-sizing: border-box;
  color: #A1A0AB;
  font-size: 14px;
  line-height: 20px;
}

.c-pricing-plan__body-2 {
  display: block;
  box-sizing: border-box;
  margin: 0px;
  color: #F2F1F3;
}
```

**States**

- No hover or focus change was observed.

### Pricing plan (2)

**Verification**: flagged, the `pricing-plan-2-group` height did not reproduce the measured 154px after 2 correction attempts.

**Anatomy**

- Group: 3 instances in a 1-column grid; the recipe carries the values they all share
- `pricing-plan-2`: the component root, a `<div>` (`.c-pricing-plan-2`), content not captured
- `pricing-plan-2-group`: inner flex column (`.c-pricing-plan-2__group`)
- `pricing-plan-2-group-2`: inner flex column (`.c-pricing-plan-2__group-2`)
- `pricing-plan-2-group-3`: inner flex row (`.c-pricing-plan-2__group-3`)
- `pricing-plan-2-title`: heading, 5 characters (`.c-pricing-plan-2__title`)
- `pricing-plan-2-body`: inner group (`.c-pricing-plan-2__body`)
- `pricing-plan-2-text`: label text, 1 characters (`.c-pricing-plan-2__text`), content not captured
- `pricing-plan-2-text-2`: label text, 13 characters (`.c-pricing-plan-2__text-2`)
- `pricing-plan-2-body-2`: label text, 46 characters (`.c-pricing-plan-2__body-2`)
- `pricing-plan-2-list`: inner flex column (`.c-pricing-plan-2__list`), content not captured
- `pricing-plan-2-item`: inner grid (`.c-pricing-plan-2__item`, 8 instances), content not captured
- `pricing-plan-2-group-4`: inner flex row (`.c-pricing-plan-2__group-4`, 8 instances), content not captured
- `pricing-plan-2-icon`: icon placeholder, 10px (`.c-pricing-plan-2__icon`, 7 instances)
- `pricing-plan-2-body-3`: label text, 36 characters (`.c-pricing-plan-2__body-3`, 7 instances)

**Recipe**

```html
<div class="c-pricing-plan-2-scope">
  <div class="c-pricing-plan-2">
    <header class="c-pricing-plan-2__group">
      <div class="c-pricing-plan-2__group-2">
        <div class="c-pricing-plan-2__group-3">
          <h3 class="c-pricing-plan-2__title">lorem</h3>
        </div>
        <p class="c-pricing-plan-2__body">
          <span class="c-pricing-plan-2__text">l</span>
          <span class="c-pricing-plan-2__text-2">lorem ipsum d</span>
        </p>
      </div>
      <p class="c-pricing-plan-2__body-2">lorem ipsum dolor sit amet consectetur adipisc</p>
    </header>
    <ul class="c-pricing-plan-2__list">
      <li class="c-pricing-plan-2__item">
        <div class="c-pricing-plan-2__group-4">
          <span class="c-pricing-plan-2__icon" aria-hidden="true"></span>
        </div>
        <p class="c-pricing-plan-2__body-3">lorem ipsum dolor sit amet consectet</p>
      </li>
      <li class="c-pricing-plan-2__item">
        <div class="c-pricing-plan-2__group-4">
          <span class="c-pricing-plan-2__icon" aria-hidden="true"></span>
        </div>
        <p class="c-pricing-plan-2__body-3">lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod t</p>
      </li>
      <li class="c-pricing-plan-2__item">
        <div class="c-pricing-plan-2__group-4">
          <span class="c-pricing-plan-2__icon" aria-hidden="true"></span>
        </div>
        <p class="c-pricing-plan-2__body-3">lorem ipsum dolor sit amet consectetu</p>
      </li>
      <li class="c-pricing-plan-2__item">
        <div class="c-pricing-plan-2__group-4">
          <span class="c-pricing-plan-2__icon" aria-hidden="true"></span>
        </div>
        <p class="c-pricing-plan-2__body-3">lorem ipsum dolor sit amet consectetur adipiscing</p>
      </li>
      <li class="c-pricing-plan-2__item">
        <div class="c-pricing-plan-2__group-4">
          <span class="c-pricing-plan-2__icon" aria-hidden="true"></span>
        </div>
        <p class="c-pricing-plan-2__body-3">lorem ipsum dolor</p>
      </li>
      <li class="c-pricing-plan-2__item">
        <div class="c-pricing-plan-2__group-4">
          <span class="c-pricing-plan-2__icon" aria-hidden="true"></span>
        </div>
        <p class="c-pricing-plan-2__body-3">lorem ipsum dolor sit amet</p>
      </li>
      <li class="c-pricing-plan-2__item">
        <div class="c-pricing-plan-2__group-4">
          <span class="c-pricing-plan-2__icon" aria-hidden="true"></span>
        </div>
        <p class="c-pricing-plan-2__body-3">lorem ipsum dolor</p>
      </li>
      <li class="c-pricing-plan-2__item">
        <div class="c-pricing-plan-2__group-4"></div>
      </li>
    </ul>
  </div>
</div>
```

```css
.c-pricing-plan-2-scope {
  background-color: #13111C;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-pricing-plan-2 {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  flex-grow: 1;
  flex-basis: 0%;
  gap: 32px;
  border-spacing: 0px;
  box-sizing: border-box;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  padding-right: 32px;
  padding-left: 32px;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-top-style: solid;
  border-bottom-style: solid;
}

.c-pricing-plan-2__group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  box-sizing: border-box;
}

.c-pricing-plan-2__group-2 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  box-sizing: border-box;
}

.c-pricing-plan-2__group-3 {
  display: flex;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
}

.c-pricing-plan-2__title {
  display: block;
  box-sizing: border-box;
  margin: 0px;
  font-size: 20px;
  font-weight: 600;
  line-height: 27.5px;
}

.c-pricing-plan-2__body {
  box-sizing: border-box;
  margin: 0px;
}

.c-pricing-plan-2__text {
  display: block;
  box-sizing: border-box;
  font-size: 40px;
  font-weight: 600;
  line-height: 50px;
}

.c-pricing-plan-2__text-2 {
  display: block;
  box-sizing: border-box;
  color: #A1A0AB;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
}

.c-pricing-plan-2__body-2 {
  display: block;
  box-sizing: border-box;
  margin: 0px;
  color: #F2F1F3;
}

.c-pricing-plan-2__list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  box-sizing: border-box;
  padding: 0px;
  margin: 0px;
  list-style-type: none;
}

.c-pricing-plan-2__item {
  display: grid;
  gap: 12px;
  grid-template-columns: auto 1fr;
  box-sizing: border-box;
}

.c-pricing-plan-2__group-4 {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 18px;
  height: 18px;
  border-radius: 9999px;
}

.c-pricing-plan-2__icon {
  display: block;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 10px;
  height: 10px;
  overflow-x: hidden;
  overflow-y: hidden;
  vertical-align: middle;
  background-color: currentcolor;
}

.c-pricing-plan-2__body-3 {
  display: block;
  box-sizing: border-box;
  margin: 0px;
  color: #DCDCE0;
  font-size: 14px;
  line-height: 20px;
}

.c-pricing-plan-2:hover {
  justify-content: flex-start;
  padding: 32px;
  margin: 16px 0px;
  background-color: #0B1428;
  background-image: radial-gradient(73.39% 80.7% at 7.24% 0.44%, #306EE814 0%, transparent 100%);
  border-radius: 12px 0px 0px 12px;
  border-top: 1px solid #183367;
  border-right: 0;
  border-bottom: 1px solid #183367;
  border-left: 1px solid #183367;
}

.c-pricing-plan-2:focus {
  justify-content: flex-start;
  padding: 32px;
  margin: 16px 0px;
  background-color: #0B1428;
  background-image: radial-gradient(73.39% 80.7% at 7.24% 0.44%, #306EE814 0%, transparent 100%);
  border-radius: 12px 0px 0px 12px;
  border-top: 1px solid #183367;
  border-right: 0;
  border-bottom: 1px solid #183367;
  border-left: 1px solid #183367;
}
```

**States**

- hover (`pricing-plan-2-hover`): justify-content flex-start, padding 32px, margin 16px 0px, background-color #0B1428, background-image radial-gradient(73.39% 80.7% at 7.24% 0.44%, #306EE814 0%, transparent 100%), border-radius 12px 0px 0px 12px, border-top 1px solid #183367, border-right 0, border-bottom 1px solid #183367, border-left 1px solid #183367
- focus (`pricing-plan-2-focus`): justify-content flex-start, padding 32px, margin 16px 0px, background-color #0B1428, background-image radial-gradient(73.39% 80.7% at 7.24% 0.44%, #306EE814 0%, transparent 100%), border-radius 12px 0px 0px 12px, border-top 1px solid #183367, border-right 0, border-bottom 1px solid #183367, border-left 1px solid #183367

### Pricing plan (3)

**Verification**: flagged, the render matched 56% of the original pixels, below the 96% required (instance 1) after 2 correction attempts.

**Anatomy**

- Group: 4 instances in a 4-column grid, 32px gap; the recipe carries the values they all share
- `pricing-plan-3`: the component root, a `<div>` (`.c-pricing-plan-3`)
- `pricing-plan-3-body`: label text, 4 characters (`.c-pricing-plan-3__body`)
- `pricing-plan-3-cta`: link, 10-character label (`.c-pricing-plan-3__cta`)

**Recipe**

```html
<div class="c-pricing-plan-3-scope">
  <div class="c-pricing-plan-3">
    <p class="c-pricing-plan-3__body">lore</p>
    <a class="c-pricing-plan-3__cta" href="#">lorem ipsu</a>
  </div>
</div>
```

```css
.c-pricing-plan-3-scope {
  background-color: #181622;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-pricing-plan-3 {
  display: inline-grid;
  gap: 12px;
  border-spacing: 0px;
  box-sizing: border-box;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-pricing-plan-3__body {
  display: block;
  box-sizing: border-box;
  margin: 0px;
  color: #F7F7F8;
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  text-align: center;
}

.c-pricing-plan-3__cta {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  color: #FFFFFF;
  border-width: 1px;
  border-style: solid;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  text-decoration-line: none;
}
```

**States**

- No hover or focus change was observed.

### Cta section

**Verification**: verified against the live page at desktop.

**Anatomy**

- `cta-section`: the component root, a `<header>` (`.c-cta-section`)
- `cta-section-title`: heading, 23 characters (`.c-cta-section__title`)
- `cta-section-body`: label text, 74 characters (`.c-cta-section__body`)

**Recipe**

```html
<div class="c-cta-section-scope">
  <header class="c-cta-section">
    <h2 class="c-cta-section__title">lorem ipsum dolor sit a</h2>
    <p class="c-cta-section__body">lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod temp</p>
  </header>
</div>
```

```css
.c-cta-section-scope {
  background-color: #13111C;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-cta-section {
  display: block;
  border-spacing: 0px;
  box-sizing: border-box;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  text-align: center;
}

.c-cta-section__title {
  display: block;
  box-sizing: border-box;
  margin: 0px 0px 16px;
  color: #F7F7F8;
  font-family: "IBM Plex Serif", serif, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  font-size: 32px;
  font-weight: 500;
  line-height: 44px;
  letter-spacing: -0.8px;
}

.c-cta-section__body {
  display: block;
  box-sizing: border-box;
  margin: 0px;
  color: #A1A0AB;
  font-size: 18px;
  line-height: 27px;
}
```

**States**

- No hover or focus change was observed.

### Nav dropdown (4)

**Verification**: verified against the live page at desktop.

**Anatomy**

- `nav-dropdown-4`: the component root, a `<button>` (`.c-nav-dropdown-4`)
- `nav-dropdown-4-text`: label text, 7 characters (`.c-nav-dropdown-4__text`)
- `nav-dropdown-4-group`: inner flex row (`.c-nav-dropdown-4__group`)
- `nav-dropdown-4-icon`: icon placeholder, 12px (`.c-nav-dropdown-4__icon`)

**Recipe**

```html
<div class="c-nav-dropdown-4-scope">
  <button class="c-nav-dropdown-4" type="button">
    <span class="c-nav-dropdown-4__text">lorem i</span>
    <div class="c-nav-dropdown-4__group">
      <span class="c-nav-dropdown-4__icon" aria-hidden="true"></span>
    </div>
  </button>
</div>
```

```css
.c-nav-dropdown-4-scope {
  background-color: #13111C;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-nav-dropdown-4 {
  display: flex;
  align-items: center;
  gap: 8px;
  border-spacing: 0px;
  box-sizing: border-box;
  padding: 6px 12px;
  background-color: transparent;
  color: #FFFFFF;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: normal;
  text-transform: none;
  text-align: center;
  list-style-type: none;
  appearance: button;
}

.c-nav-dropdown-4__text {
  display: block;
  box-sizing: border-box;
  color: #DCDCE0;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
}

.c-nav-dropdown-4__group {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 12px;
  height: 12px;
  max-width: 12px;
  max-height: 12px;
  position: relative;
  color: #A1A0AB;
  font-size: 18px;
  line-height: 27px;
  transition: transform 0.15s cubic-bezier(0.4, 0, 1, 1);
}

.c-nav-dropdown-4__icon {
  display: block;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 12px;
  height: 12px;
  max-width: 12px;
  max-height: 12px;
  overflow-x: hidden;
  overflow-y: hidden;
  vertical-align: middle;
  background-color: currentcolor;
}
```

**States**

- No hover or focus change was observed.

### Nav dropdown (5)

**Verification**: verified against the live page at desktop.

**Anatomy**

- `nav-dropdown-5`: the component root, a `<button>` (`.c-nav-dropdown-5`)
- `nav-dropdown-5-text`: label text, 10 characters (`.c-nav-dropdown-5__text`)
- `nav-dropdown-5-group`: inner flex row (`.c-nav-dropdown-5__group`)
- `nav-dropdown-5-icon`: icon placeholder, 12px (`.c-nav-dropdown-5__icon`)

**Recipe**

```html
<div class="c-nav-dropdown-5-scope">
  <button class="c-nav-dropdown-5" type="button">
    <span class="c-nav-dropdown-5__text">lorem ipsu</span>
    <div class="c-nav-dropdown-5__group">
      <span class="c-nav-dropdown-5__icon" aria-hidden="true"></span>
    </div>
  </button>
</div>
```

```css
.c-nav-dropdown-5-scope {
  background-color: #13111C;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-nav-dropdown-5 {
  display: flex;
  align-items: center;
  gap: 8px;
  border-spacing: 0px;
  box-sizing: border-box;
  padding: 6px 12px;
  background-color: transparent;
  color: #FFFFFF;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: normal;
  text-transform: none;
  text-align: center;
  list-style-type: none;
  appearance: button;
}

.c-nav-dropdown-5__text {
  display: block;
  box-sizing: border-box;
  color: #DCDCE0;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
}

.c-nav-dropdown-5__group {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 12px;
  height: 12px;
  max-width: 12px;
  max-height: 12px;
  position: relative;
  color: #A1A0AB;
  font-size: 18px;
  line-height: 27px;
  transition: transform 0.15s cubic-bezier(0.4, 0, 1, 1);
}

.c-nav-dropdown-5__icon {
  display: block;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 12px;
  height: 12px;
  max-width: 12px;
  max-height: 12px;
  overflow-x: hidden;
  overflow-y: hidden;
  vertical-align: middle;
  background-color: currentcolor;
}
```

**States**

- No hover or focus change was observed.

### Nav dropdown (6)

**Verification**: verified against the live page at desktop.

**Anatomy**

- `nav-dropdown-6`: the component root, a `<button>` (`.c-nav-dropdown-6`)
- `nav-dropdown-6-text`: label text, 10 characters (`.c-nav-dropdown-6__text`)
- `nav-dropdown-6-group`: inner flex row (`.c-nav-dropdown-6__group`)
- `nav-dropdown-6-icon`: icon placeholder, 12px (`.c-nav-dropdown-6__icon`)

**Recipe**

```html
<div class="c-nav-dropdown-6-scope">
  <button class="c-nav-dropdown-6" type="button">
    <span class="c-nav-dropdown-6__text">lorem ipsu</span>
    <div class="c-nav-dropdown-6__group">
      <span class="c-nav-dropdown-6__icon" aria-hidden="true"></span>
    </div>
  </button>
</div>
```

```css
.c-nav-dropdown-6-scope {
  background-color: #13111C;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-nav-dropdown-6 {
  display: flex;
  align-items: center;
  gap: 8px;
  border-spacing: 0px;
  box-sizing: border-box;
  padding: 6px 12px;
  background-color: transparent;
  color: #FFFFFF;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: normal;
  text-transform: none;
  text-align: center;
  list-style-type: none;
  appearance: button;
}

.c-nav-dropdown-6__text {
  display: block;
  box-sizing: border-box;
  color: #DCDCE0;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
}

.c-nav-dropdown-6__group {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 12px;
  height: 12px;
  max-width: 12px;
  max-height: 12px;
  position: relative;
  color: #A1A0AB;
  font-size: 18px;
  line-height: 27px;
  transition: transform 0.15s cubic-bezier(0.4, 0, 1, 1);
}

.c-nav-dropdown-6__icon {
  display: block;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 12px;
  height: 12px;
  max-width: 12px;
  max-height: 12px;
  overflow-x: hidden;
  overflow-y: hidden;
  vertical-align: middle;
  background-color: currentcolor;
}
```

**States**

- No hover or focus change was observed.

### Plan button

**Verification**: verified against the live page at desktop.

**Anatomy**

- `plan-button`: the component root, a `<a>` (`.c-plan-button`)
- `plan-button-text`: label text, 17 characters (`.c-plan-button__text`)

**Recipe**

```html
<div class="c-plan-button-scope">
  <a class="c-plan-button" href="#">
    <span class="c-plan-button__text">lorem ipsum dolor</span>
  </a>
</div>
```

```css
.c-plan-button-scope {
  background-color: #0B1428;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-plan-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-spacing: 0px;
  box-sizing: border-box;
  height: 42px;
  padding: 8px 12px;
  background-color: #2057C5;
  color: #FFFFFF;
  border: 1px solid #FFFFFF1A;
  border-radius: 6px;
  cursor: pointer;
  transform: matrix(1, 0, 0, 1, 0, 0);
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  text-decoration-line: none;
  transition: transform 0.05s cubic-bezier(0.4, 0, 0.2, 1);
}

.c-plan-button__text {
  display: block;
  box-sizing: border-box;
}

.c-plan-button:hover {
  background-color: #306EE8;
}

.c-plan-button:focus {
  box-shadow: #FFFFFF 0px 0px 0px 0px, #A667E4 0px 0px 0px 2px, transparent 0px 0px 0px 0px;
  outline: 2px solid transparent;
  outline-offset: 2px;
}
```

**States**

- hover (`plan-button-hover`): background-color #306EE8
- focus: box-shadow #FFFFFF 0px 0px 0px 0px, #A667E4 0px 0px 0px 2px, transparent 0px 0px 0px 0px, outline 2px solid transparent, outline-offset 2px

### Plan button (2)

**Verification**: verified against the live page at desktop.

**Anatomy**

- `plan-button-2`: the component root, a `<a>` (`.c-plan-button-2`)
- `plan-button-2-text`: label text, 15 characters (`.c-plan-button-2__text`)

**Recipe**

```html
<div class="c-plan-button-2-scope">
  <a class="c-plan-button-2" href="#">
    <span class="c-plan-button-2__text">lorem ipsum dol</span>
  </a>
</div>
```

```css
.c-plan-button-2-scope {
  background-color: #1E132A;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-plan-button-2 {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-spacing: 0px;
  box-sizing: border-box;
  height: 42px;
  padding: 8px 12px;
  background-color: #853BCE;
  color: #FFFFFF;
  border: 1px solid #FFFFFF1A;
  border-radius: 6px;
  cursor: pointer;
  transform: matrix(1, 0, 0, 1, 0, 0);
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  text-decoration-line: none;
  transition: transform 0.05s cubic-bezier(0.4, 0, 0.2, 1);
}

.c-plan-button-2__text {
  display: block;
  box-sizing: border-box;
}

.c-plan-button-2:hover {
  background-color: #A667E4;
}

.c-plan-button-2:focus {
  box-shadow: #FFFFFF 0px 0px 0px 0px, #A667E4 0px 0px 0px 2px, transparent 0px 0px 0px 0px;
  outline: 2px solid transparent;
  outline-offset: 2px;
}
```

**States**

- hover (`plan-button-2-hover`): background-color #A667E4
- focus: box-shadow #FFFFFF 0px 0px 0px 0px, #A667E4 0px 0px 0px 2px, transparent 0px 0px 0px 0px, outline 2px solid transparent, outline-offset 2px

### Plan button (3)

**Verification**: verified against the live page at desktop.

**Anatomy**

- `plan-button-3`: the component root, a `<a>` (`.c-plan-button-3`)
- `plan-button-3-text`: label text, 17 characters (`.c-plan-button-3__text`)

**Recipe**

```html
<div class="c-plan-button-3-scope">
  <a class="c-plan-button-3" href="#">
    <span class="c-plan-button-3__text">lorem ipsum dolor</span>
  </a>
</div>
```

```css
.c-plan-button-3-scope {
  background-color: #181622;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-plan-button-3 {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-spacing: 0px;
  box-sizing: border-box;
  height: 42px;
  padding: 8px 12px;
  background-color: #2057C5;
  color: #FFFFFF;
  border: 1px solid #FFFFFF1A;
  border-radius: 6px;
  cursor: pointer;
  transform: matrix(1, 0, 0, 1, 0, 0);
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  text-decoration-line: none;
  transition: transform 0.05s cubic-bezier(0.4, 0, 0.2, 1);
}

.c-plan-button-3__text {
  display: block;
  box-sizing: border-box;
}

.c-plan-button-3:hover {
  background-color: #306EE8;
}

.c-plan-button-3:focus {
  box-shadow: #FFFFFF 0px 0px 0px 0px, #A667E4 0px 0px 0px 2px, transparent 0px 0px 0px 0px;
  outline: 2px solid transparent;
  outline-offset: 2px;
}
```

**States**

- hover (`plan-button-3-hover`): background-color #306EE8
- focus: box-shadow #FFFFFF 0px 0px 0px 0px, #A667E4 0px 0px 0px 2px, transparent 0px 0px 0px 0px, outline 2px solid transparent, outline-offset 2px

### Info tooltip button

**Verification**: verified against the live page at desktop.

**Anatomy**

- `info-tooltip-button`: the component root, a `<button>` (`.c-info-tooltip-button`)
- `info-tooltip-button-group`: inner flex row (`.c-info-tooltip-button__group`)
- `info-tooltip-button-icon`: icon placeholder, 16px (`.c-info-tooltip-button__icon`)

**Recipe**

```html
<div class="c-info-tooltip-button-scope">
  <button class="c-info-tooltip-button" type="button">
    <div class="c-info-tooltip-button__group">
      <span class="c-info-tooltip-button__icon" aria-hidden="true"></span>
    </div>
  </button>
</div>
```

```css
.c-info-tooltip-button-scope {
  background-color: #181622;
  color: #DCDCE0;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
}

.c-info-tooltip-button {
  display: inline-flex;
  border-spacing: 0px;
  box-sizing: border-box;
  padding: 0px;
  background-color: transparent;
  color: #6C6B7B;
  border: 0;
  cursor: help;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: normal;
  text-transform: none;
  text-align: center;
  appearance: button;
}

.c-info-tooltip-button__group {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 16px;
  height: 16px;
  max-width: 16px;
  max-height: 16px;
  font-size: 18px;
  line-height: 27px;
}

.c-info-tooltip-button__icon {
  display: block;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 16px;
  height: 16px;
  max-width: 16px;
  max-height: 16px;
  overflow-x: hidden;
  overflow-y: hidden;
  vertical-align: middle;
  background-color: currentcolor;
}

.c-info-tooltip-button:hover {
  color: #545260;
}
```

**States**

- hover (`info-tooltip-button-hover`): color #545260

### Button, primary (4)

**Verification**: verified against the live page at desktop.

**Anatomy**

- `button-primary-4`: the component root, a `<button>` (`.c-button-primary-4`), 7-character label

**Recipe**

```html
<div class="c-button-primary-4-scope">
  <button class="c-button-primary-4" type="button">lorem i</button>
</div>
```

```css
.c-button-primary-4-scope {
  background-color: #13111C;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-button-primary-4 {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-spacing: 0px;
  box-sizing: border-box;
  width: 80px;
  height: 40px;
  padding: 0px 12px;
  background-color: transparent;
  color: #FFFFFF;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: normal;
  text-transform: none;
  text-align: center;
  appearance: button;
}

.c-button-primary-4:hover {
  background-color: #FFFFFF0D;
}
```

**States**

- hover (`button-primary-4-hover`): background-color #FFFFFF0D

### Button, secondary (4)

**Verification**: verified against the live page at desktop.

**Anatomy**

- `button-secondary-4`: the component root, a `<button>` (`.c-button-secondary-4`)
- `button-secondary-4-icon`: icon placeholder, 26px (`.c-button-secondary-4__icon`)

**Recipe**

```html
<div class="c-button-secondary-4-scope">
  <button class="c-button-secondary-4" type="button">
    <span class="c-button-secondary-4__icon" aria-hidden="true"></span>
  </button>
</div>
```

```css
.c-button-secondary-4-scope {
  background-color: #13111C;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-button-secondary-4 {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-spacing: 0px;
  box-sizing: border-box;
  width: 48px;
  height: 48px;
  padding: 0px;
  background-color: transparent;
  color: #FFFFFF;
  border: 0;
  border-radius: 12px;
  box-shadow: #FFFFFF 0px 0px 0px 0px, #FFFFFF1A 0px 0px 0px 1px, transparent 0px 0px 0px 0px;
  cursor: pointer;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: normal;
  text-transform: none;
  text-align: center;
  appearance: button;
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.c-button-secondary-4__icon {
  display: block;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 26px;
  height: 26px;
  overflow-x: hidden;
  overflow-y: hidden;
  vertical-align: middle;
  background-color: currentcolor;
}

.c-button-secondary-4:hover {
  transform: matrix(1.1, 0, 0, 1.1, 0, 0);
}
```

**States**

- hover: transform matrix(1.1, 0, 0, 1.1, 0, 0)

### Button, ghost (3)

**Verification**: verified against the live page at desktop.

**Anatomy**

- `button-ghost-3`: the component root, a `<button>` (`.c-button-ghost-3`)
- `button-ghost-3-label`: label text, 7 characters (`.c-button-ghost-3__label`)
- `button-ghost-3-group`: inner flex row (`.c-button-ghost-3__group`)
- `button-ghost-3-icon`: icon placeholder, 12px (`.c-button-ghost-3__icon`)

**Recipe**

```html
<div class="c-button-ghost-3-scope">
  <button class="c-button-ghost-3" type="button">
    <span class="c-button-ghost-3__label">lorem i</span>
    <div class="c-button-ghost-3__group">
      <span class="c-button-ghost-3__icon" aria-hidden="true"></span>
    </div>
  </button>
</div>
```

```css
.c-button-ghost-3-scope {
  background-color: #13111C;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-button-ghost-3 {
  display: flex;
  align-items: center;
  gap: 8px;
  border-spacing: 0px;
  box-sizing: border-box;
  padding: 6px 12px;
  background-color: transparent;
  color: #FFFFFF;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: normal;
  text-transform: none;
  text-align: center;
  list-style-type: none;
  appearance: button;
}

.c-button-ghost-3__label {
  display: block;
  box-sizing: border-box;
  color: #DCDCE0;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
}

.c-button-ghost-3__group {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 12px;
  height: 12px;
  max-width: 12px;
  max-height: 12px;
  position: relative;
  color: #A1A0AB;
  font-size: 18px;
  line-height: 27px;
  transition: transform 0.15s cubic-bezier(0.4, 0, 1, 1);
}

.c-button-ghost-3__icon {
  display: block;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 12px;
  height: 12px;
  max-width: 12px;
  max-height: 12px;
  overflow-x: hidden;
  overflow-y: hidden;
  vertical-align: middle;
  background-color: currentcolor;
}
```

**States**

- No hover or focus change was observed.

### Button, ghost (4)

**Verification**: verified against the live page at desktop.

**Anatomy**

- `button-ghost-4`: the component root, a `<button>` (`.c-button-ghost-4`)
- `button-ghost-4-label`: label text, 10 characters (`.c-button-ghost-4__label`)
- `button-ghost-4-group`: inner flex row (`.c-button-ghost-4__group`)
- `button-ghost-4-icon`: icon placeholder, 12px (`.c-button-ghost-4__icon`)

**Recipe**

```html
<div class="c-button-ghost-4-scope">
  <button class="c-button-ghost-4" type="button">
    <span class="c-button-ghost-4__label">lorem ipsu</span>
    <div class="c-button-ghost-4__group">
      <span class="c-button-ghost-4__icon" aria-hidden="true"></span>
    </div>
  </button>
</div>
```

```css
.c-button-ghost-4-scope {
  background-color: #13111C;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-button-ghost-4 {
  display: flex;
  align-items: center;
  gap: 8px;
  border-spacing: 0px;
  box-sizing: border-box;
  padding: 6px 12px;
  background-color: transparent;
  color: #FFFFFF;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: normal;
  text-transform: none;
  text-align: center;
  list-style-type: none;
  appearance: button;
}

.c-button-ghost-4__label {
  display: block;
  box-sizing: border-box;
  color: #DCDCE0;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
}

.c-button-ghost-4__group {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 12px;
  height: 12px;
  max-width: 12px;
  max-height: 12px;
  position: relative;
  color: #A1A0AB;
  font-size: 18px;
  line-height: 27px;
  transition: transform 0.15s cubic-bezier(0.4, 0, 1, 1);
}

.c-button-ghost-4__icon {
  display: block;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 12px;
  height: 12px;
  max-width: 12px;
  max-height: 12px;
  overflow-x: hidden;
  overflow-y: hidden;
  vertical-align: middle;
  background-color: currentcolor;
}
```

**States**

- No hover or focus change was observed.

### Button, ghost (5)

**Verification**: verified against the live page at desktop.

**Anatomy**

- `button-ghost-5`: the component root, a `<button>` (`.c-button-ghost-5`)
- `button-ghost-5-label`: label text, 10 characters (`.c-button-ghost-5__label`)
- `button-ghost-5-group`: inner flex row (`.c-button-ghost-5__group`)
- `button-ghost-5-icon`: icon placeholder, 12px (`.c-button-ghost-5__icon`)

**Recipe**

```html
<div class="c-button-ghost-5-scope">
  <button class="c-button-ghost-5" type="button">
    <span class="c-button-ghost-5__label">lorem ipsu</span>
    <div class="c-button-ghost-5__group">
      <span class="c-button-ghost-5__icon" aria-hidden="true"></span>
    </div>
  </button>
</div>
```

```css
.c-button-ghost-5-scope {
  background-color: #13111C;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-button-ghost-5 {
  display: flex;
  align-items: center;
  gap: 8px;
  border-spacing: 0px;
  box-sizing: border-box;
  padding: 6px 12px;
  background-color: transparent;
  color: #FFFFFF;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: normal;
  text-transform: none;
  text-align: center;
  list-style-type: none;
  appearance: button;
}

.c-button-ghost-5__label {
  display: block;
  box-sizing: border-box;
  color: #DCDCE0;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
}

.c-button-ghost-5__group {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 12px;
  height: 12px;
  max-width: 12px;
  max-height: 12px;
  position: relative;
  color: #A1A0AB;
  font-size: 18px;
  line-height: 27px;
  transition: transform 0.15s cubic-bezier(0.4, 0, 1, 1);
}

.c-button-ghost-5__icon {
  display: block;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 12px;
  height: 12px;
  max-width: 12px;
  max-height: 12px;
  overflow-x: hidden;
  overflow-y: hidden;
  vertical-align: middle;
  background-color: currentcolor;
}
```

**States**

- No hover or focus change was observed.

### Card (5)

**Verification**: flagged, the `card-5-cta` height did not reproduce the measured 30px after 2 correction attempts.

**Anatomy**

- Group: 6 instances in a 4-column grid, 16px gap; the recipe carries the values they all share
- `card-5`: the component root, a `<a>` (`.c-card-5`)
- `card-5-group`: inner flex row (`.c-card-5__group`)
- `card-5-group-2`: inner flex row (`.c-card-5__group-2`)
- `card-5-icon`: icon placeholder, 32px (`.c-card-5__icon`)
- `card-5-group-3`: inner block (`.c-card-5__group-3`)
- `card-5-title`: heading, 10 characters (`.c-card-5__title`)
- `card-5-body`: label text, 3 characters (`.c-card-5__body`)
- `card-5-group-4`: inner flex row (`.c-card-5__group-4`)
- `card-5-group-5`: inner flex row (`.c-card-5__group-5`, 2 instances)
- `card-5-icon-2`: icon placeholder, 14px (`.c-card-5__icon-2`, 5 instances)
- `card-5-text`: label text, 8 characters (`.c-card-5__text`, 7 instances)
- `card-5-body-2`: label text, 75 characters (`.c-card-5__body-2`)
- `card-5-list`: inner group (`.c-card-5__list`)
- `card-5-item`: inner flex row (`.c-card-5__item`)
- `card-5-icon-3`: icon placeholder, 16px (`.c-card-5__icon-3`, 5 instances)
- `card-5-group-6`: inner group (`.c-card-5__group-6`)
- `card-5-badge`: label text, 5 characters (`.c-card-5__badge`)
- `card-5-item-2`: inner flex row (`.c-card-5__item-2`, 3 instances)
- `card-5-text-2`: label text, 16 characters (`.c-card-5__text-2`, 3 instances)
- `card-5-group-7`: inner block (`.c-card-5__group-7`)
- `card-5-body-3`: label text, 16 characters (`.c-card-5__body-3`)
- `card-5-group-8`: inner flex row (`.c-card-5__group-8`)
- `card-5-cta`: link (`.c-card-5__cta`, 3 instances)
- `card-5-group-9`: inner flex row (`.c-card-5__group-9`), content not captured

**Recipe**

```html
<div class="c-card-5-scope">
  <a class="c-card-5" href="#">
    <div class="c-card-5__group">
      <div class="c-card-5__group-2">
        <span class="c-card-5__icon" aria-hidden="true"></span>
      </div>
      <div class="c-card-5__group-3">
        <h3 class="c-card-5__title">lorem ipsu</h3>
        <p class="c-card-5__body">lor</p>
      </div>
    </div>
    <div class="c-card-5__group-4">
      <span class="c-card-5__group-5">
        <span class="c-card-5__icon-2" aria-hidden="true"></span>
        <span class="c-card-5__text">lorem ip</span>
      </span>
      <span class="c-card-5__group-5">
        <span class="c-card-5__icon-2" aria-hidden="true"></span>
        <span class="c-card-5__text">lorem ipsu</span>
      </span>
    </div>
    <p class="c-card-5__body-2">lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempo</p>
    <ul class="c-card-5__list">
      <li class="c-card-5__item">
        <span class="c-card-5__icon-3" aria-hidden="true"></span>
        <span class="c-card-5__group-6">
          <code class="c-card-5__badge">lorem</code>
          <span class="c-card-5__text">lorem i</span>
        </span>
      </li>
      <li class="c-card-5__item-2">
        <span class="c-card-5__icon-3" aria-hidden="true"></span>
        <span class="c-card-5__text-2">lorem ipsum dolo</span>
      </li>
      <li class="c-card-5__item-2">
        <span class="c-card-5__icon-3" aria-hidden="true"></span>
        <span class="c-card-5__text-2">lorem ipsum dolor</span>
      </li>
      <li class="c-card-5__item-2">
        <span class="c-card-5__icon-3" aria-hidden="true"></span>
        <span class="c-card-5__text-2">lorem ipsum dolor sit</span>
      </li>
    </ul>
    <div class="c-card-5__group-7">
      <p class="c-card-5__body-3">lorem ipsum dolo</p>
      <div class="c-card-5__group-8">
        <a class="c-card-5__cta" href="#">
          <span class="c-card-5__icon-2" aria-hidden="true"></span>
          <span class="c-card-5__text">lorem</span>
        </a>
        <a class="c-card-5__cta" href="#">
          <span class="c-card-5__icon-2" aria-hidden="true"></span>
          <span class="c-card-5__text">lorem ipsu</span>
        </a>
        <a class="c-card-5__cta" href="#">
          <span class="c-card-5__icon-2" aria-hidden="true"></span>
          <span class="c-card-5__text">lor</span>
        </a>
      </div>
    </div>
    <div class="c-card-5__group-9">
      <span class="c-card-5__text">lorem ipsu</span>
      <span class="c-card-5__icon-3" aria-hidden="true"></span>
    </div>
  </a>
</div>
```

```css
.c-card-5-scope {
  background-color: #13111C;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-card-5 {
  display: inline-flex;
  flex-direction: column;
  border-spacing: 0px;
  box-sizing: border-box;
  padding: 24px;
  background-color: #1C1A28;
  color: #FFFFFF;
  border-width: 1px;
  border-style: solid;
  border-radius: 12px;
  cursor: pointer;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  text-decoration-line: none;
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}

.c-card-5__group {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  box-sizing: border-box;
  margin-bottom: 16px;
}

.c-card-5__group-2 {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 48px;
  height: 48px;
  border-radius: 8px;
}

.c-card-5__icon {
  display: block;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 32px;
  height: 32px;
  overflow-x: hidden;
  overflow-y: hidden;
  vertical-align: middle;
  background-color: currentcolor;
}

.c-card-5__group-3 {
  display: block;
  flex-grow: 1;
  flex-basis: 0%;
  box-sizing: border-box;
}

.c-card-5__title {
  display: block;
  box-sizing: border-box;
  margin: 0px;
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
}

.c-card-5__body {
  display: block;
  box-sizing: border-box;
  margin: 0px;
  color: #6C6B7B;
  font-size: 14px;
  line-height: 20px;
}

.c-card-5__group-4 {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  box-sizing: border-box;
  margin-bottom: 16px;
}

.c-card-5__group-5 {
  display: flex;
  align-items: center;
  gap: 4px;
  box-sizing: border-box;
  padding: 4px 8px;
  background-color: #211F2D;
  color: #6C6B7B;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
}

.c-card-5__icon-2 {
  display: block;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 14px;
  height: 14px;
  overflow-x: hidden;
  overflow-y: hidden;
  vertical-align: middle;
  background-color: currentcolor;
}

.c-card-5__body-2 {
  display: flow-root;
  box-sizing: border-box;
  margin: 0px 0px 16px;
  overflow-x: hidden;
  overflow-y: hidden;
  color: #6C6B7B;
  font-size: 14px;
  line-height: 20px;
}

.c-card-5__list {
  display: block;
  box-sizing: border-box;
  padding: 0px;
  margin: 0px 0px 20px;
  list-style-type: none;
}

.c-card-5__item {
  display: flex;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
  color: #6C6B7B;
  font-size: 14px;
  line-height: 20px;
}

.c-card-5__icon-3 {
  display: block;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 16px;
  height: 16px;
  overflow-x: hidden;
  overflow-y: hidden;
  vertical-align: middle;
  background-color: currentcolor;
}

.c-card-5__group-6 {
  display: block;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.c-card-5__badge {
  display: inline;
  box-sizing: border-box;
  padding: 2px 4px;
  background-color: #FFFFFF1A;
  color: #FFFFFF;
  border-radius: 4px;
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
  font-size: 11.9px;
}

.c-card-5__item-2 {
  display: flex;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
  color: #6C6B7B;
  font-size: 14px;
  line-height: 20px;
  margin-top: 6px;
}

.c-card-5__text-2 {
  display: block;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.c-card-5__group-7 {
  display: block;
  box-sizing: border-box;
  padding-top: 16px;
  margin-top: auto;
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: #FFFFFF0D;
}

.c-card-5__body-3 {
  display: block;
  box-sizing: border-box;
  margin: 0px 0px 12px;
  color: #6C6B7B;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0.3px;
  text-transform: uppercase;
}

.c-card-5__group-8 {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  box-sizing: border-box;
}

.c-card-5__cta {
  display: flex;
  align-items: center;
  gap: 6px;
  box-sizing: border-box;
  padding: 6px 10px;
  background-color: #211F2D;
  color: #545260;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  text-decoration-line: none;
  transition-duration: 0.15s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
}

.c-card-5__group-9 {
  display: flex;
  align-items: center;
  gap: 4px;
  box-sizing: border-box;
  color: #6C6B7B;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  margin-top: 16px;
  transition-duration: 0.15s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
}

.c-card-5:hover {
  background-color: #211F2D;
  border: 1px solid #33323E;
}

.c-card-5:focus {
  border: 1px solid #33323E;
}
```

**States**

- hover (`card-5-hover`): background-color #211F2D, border 1px solid #33323E
- focus: border 1px solid #33323E

### Card (6)

**Verification**: verified against the live page at desktop.

**Anatomy**

- Group: 6 instances in a 3-column grid, 24px gap; the recipe carries the values they all share
- `card-6`: the component root, a `<div>` (`.c-card-6`)
- `card-6-group`: inner flex row (`.c-card-6__group`)
- `card-6-icon`: icon placeholder, 20px (`.c-card-6__icon`)
- `card-6-title`: heading, 15 characters (`.c-card-6__title`)
- `card-6-body`: label text, 72 characters (`.c-card-6__body`)

**Recipe**

```html
<div class="c-card-6-scope">
  <div class="c-card-6">
    <div class="c-card-6__group">
      <span class="c-card-6__icon" aria-hidden="true"></span>
    </div>
    <h3 class="c-card-6__title">lorem ipsum dol</h3>
    <p class="c-card-6__body">lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod te</p>
  </div>
</div>
```

```css
.c-card-6-scope {
  background-color: #13111C;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-card-6 {
  display: inline-block;
  border-spacing: 0px;
  box-sizing: border-box;
  padding: 24px;
  background-color: #1C1A28;
  color: #FFFFFF;
  border: 1px solid #FFFFFF1A;
  border-radius: 12px;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-card-6__group {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  margin-bottom: 16px;
}

.c-card-6__icon {
  display: block;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 20px;
  height: 20px;
  overflow-x: hidden;
  overflow-y: hidden;
  vertical-align: middle;
  background-color: currentcolor;
}

.c-card-6__title {
  display: block;
  box-sizing: border-box;
  margin: 0px 0px 8px;
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
}

.c-card-6__body {
  display: block;
  box-sizing: border-box;
  margin: 0px;
  color: #6C6B7B;
  font-size: 14px;
  line-height: 20px;
}
```

**States**

- No hover or focus change was observed.

### Tag link

**Verification**: verified against the live page at desktop.

**Anatomy**

- `tag-link`: the component root, a `<a>` (`.c-tag-link`)
- `tag-link-icon`: icon placeholder, 14px (`.c-tag-link__icon`)
- `tag-link-text`: label text, 6 characters (`.c-tag-link__text`)

**Recipe**

```html
<div class="c-tag-link-scope">
  <a class="c-tag-link" href="#">
    <span class="c-tag-link__icon" aria-hidden="true"></span>
    <span class="c-tag-link__text">lorem</span>
  </a>
</div>
```

```css
.c-tag-link-scope {
  background-color: #1C1A28;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-tag-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-spacing: 0px;
  box-sizing: border-box;
  padding: 6px 10px;
  background-color: #211F2D;
  color: #545260;
  border-radius: 6px;
  cursor: pointer;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  text-decoration-line: none;
  transition-duration: 0.15s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
}

.c-tag-link__icon {
  display: block;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 14px;
  height: 14px;
  overflow-x: hidden;
  overflow-y: hidden;
  vertical-align: middle;
  background-color: currentcolor;
}

.c-tag-link:hover {
  background-color: #33323E;
}
```

**States**

- hover (`tag-link-hover`): background-color #33323E

### Table

**Verification**: flagged, the `table-row-2` height did not reproduce the measured 65px after 2 correction attempts.

**Anatomy**

- `table`: the component root, a `<table>` (`.c-table`)
- `table-head`: inner group (`.c-table__head`)
- `table-row`: inner group (`.c-table__row`)
- `table-header-cell`: label text, 5 characters (`.c-table__header-cell`)
- `table-header-cell-2`: label text, 3 characters (`.c-table__header-cell-2`, 6 instances)
- `table-body`: inner group (`.c-table__body`), content not captured
- `table-row-2`: inner group (`.c-table__row-2`, 2 instances)
- `table-cell`: inner group (`.c-table__cell`, 2 instances)
- `table-link`: link (`.c-table__link`, 2 instances), content not captured
- `table-cell-2`: inner group (`.c-table__cell-2`, 12 instances), content not captured
- `table-group`: inner flex row (`.c-table__group`, 11 instances), content not captured

**Recipe**

```html
<div class="c-table-scope">
  <table class="c-table">
    <thead class="c-table__head">
      <tr class="c-table__row">
        <th class="c-table__header-cell">lorem</th>
        <th class="c-table__header-cell-2">lor</th>
        <th class="c-table__header-cell-2">lorem ip</th>
        <th class="c-table__header-cell-2">lorem</th>
        <th class="c-table__header-cell-2">lorem ips</th>
        <th class="c-table__header-cell-2">lorem ipsu</th>
        <th class="c-table__header-cell-2">lorem ipsum</th>
      </tr>
    </thead>
    <tbody class="c-table__body">
      <tr class="c-table__row-2">
        <td class="c-table__cell">
          <a class="c-table__link" href="#"></a>
        </td>
        <td class="c-table__cell-2">
          <div class="c-table__group"></div>
        </td>
        <td class="c-table__cell-2">
          <div class="c-table__group"></div>
        </td>
        <td class="c-table__cell-2">
          <div class="c-table__group"></div>
        </td>
        <td class="c-table__cell-2">
          <div class="c-table__group"></div>
        </td>
        <td class="c-table__cell-2">
          <div class="c-table__group"></div>
        </td>
        <td class="c-table__cell-2">
          <div class="c-table__group"></div>
        </td>
      </tr>
      <tr class="c-table__row-2">
        <td class="c-table__cell">
          <a class="c-table__link" href="#"></a>
        </td>
        <td class="c-table__cell-2">
          <div class="c-table__group"></div>
        </td>
        <td class="c-table__cell-2">
          <div class="c-table__group"></div>
        </td>
        <td class="c-table__cell-2">
          <div class="c-table__group"></div>
        </td>
        <td class="c-table__cell-2">
          <div class="c-table__group"></div>
        </td>
        <td class="c-table__cell-2">
          <div class="c-table__group"></div>
        </td>
        <td class="c-table__cell-2"></td>
      </tr>
    </tbody>
  </table>
</div>
```

```css
.c-table-scope {
  background-color: #13111C;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-table {
  display: table;
  border-collapse: collapse;
  border-spacing: 2px;
  box-sizing: border-box;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-table__head {
  display: table-header-group;
  box-sizing: border-box;
  vertical-align: middle;
}

.c-table__row {
  display: table-row;
  box-sizing: border-box;
  vertical-align: middle;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #FFFFFF1A;
}

.c-table__header-cell {
  display: table-cell;
  box-sizing: border-box;
  padding: 16px;
  vertical-align: middle;
  color: #6C6B7B;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;
}

.c-table__header-cell-2 {
  display: table-cell;
  box-sizing: border-box;
  width: 12.5%;
  padding: 16px 12px;
  vertical-align: middle;
  color: #6C6B7B;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  text-align: center;
}

.c-table__body {
  display: table-row-group;
  box-sizing: border-box;
  vertical-align: middle;
}

.c-table__row-2 {
  display: table-row;
  box-sizing: border-box;
  vertical-align: middle;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #FFFFFF0D;
}

.c-table__cell {
  display: table-cell;
  box-sizing: border-box;
  padding: 16px;
  vertical-align: middle;
}

.c-table__link {
  display: flex;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  text-decoration-line: none;
}

.c-table__cell-2 {
  display: table-cell;
  box-sizing: border-box;
  padding: 16px 12px;
  vertical-align: middle;
}

.c-table__group {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  height: 32px;
}
```

**States**

- No hover or focus change was observed.

### Table row

**Verification**: flagged, the recipe could not be rendered on its own.

**Anatomy**

- Group: 6 instances in a 1-column grid; the recipe carries the values they all share
- `table-row`: the component root, a `<tr>` (`.c-table-row`)
- `table-row-cell`: inner group (`.c-table-row__cell`)
- `table-row-link`: link (`.c-table-row__link`)
- `table-row-group`: inner flex row (`.c-table-row__group`)
- `table-row-group-2`: inner block (`.c-table-row__group-2`), content not captured
- `table-row-text`: label text, 11 characters (`.c-table-row__text`)
- `table-row-cell-2`: inner group (`.c-table-row__cell-2`, 6 instances)
- `table-row-group-3`: inner flex row (`.c-table-row__group-3`, 6 instances)
- `table-row-group-4`: inner flex row (`.c-table-row__group-4`, 4 instances)
- `table-row-icon`: icon placeholder, 16px (`.c-table-row__icon`, 6 instances)
- `table-row-group-5`: inner flex row (`.c-table-row__group-5`)
- `table-row-group-6`: inner flex row (`.c-table-row__group-6`)

**Recipe**

```html
<div class="c-table-row-scope">
  <tr class="c-table-row">
    <td class="c-table-row__cell">
      <a class="c-table-row__link" href="#">
        <div class="c-table-row__group">
          <div class="c-table-row__group-2"></div>
        </div>
        <span class="c-table-row__text">lorem ipsum</span>
      </a>
    </td>
    <td class="c-table-row__cell-2">
      <div class="c-table-row__group-3">
        <span class="c-table-row__group-4">
          <span class="c-table-row__icon" aria-hidden="true"></span>
        </span>
      </div>
    </td>
    <td class="c-table-row__cell-2">
      <div class="c-table-row__group-3">
        <span class="c-table-row__group-5">
          <span class="c-table-row__icon" aria-hidden="true"></span>
        </span>
      </div>
    </td>
    <td class="c-table-row__cell-2">
      <div class="c-table-row__group-3">
        <span class="c-table-row__group-6">
          <span class="c-table-row__icon" aria-hidden="true"></span>
        </span>
      </div>
    </td>
    <td class="c-table-row__cell-2">
      <div class="c-table-row__group-3">
        <span class="c-table-row__group-4">
          <span class="c-table-row__icon" aria-hidden="true"></span>
        </span>
      </div>
    </td>
    <td class="c-table-row__cell-2">
      <div class="c-table-row__group-3">
        <span class="c-table-row__group-4">
          <span class="c-table-row__icon" aria-hidden="true"></span>
        </span>
      </div>
    </td>
    <td class="c-table-row__cell-2">
      <div class="c-table-row__group-3">
        <span class="c-table-row__group-4">
          <span class="c-table-row__icon" aria-hidden="true"></span>
        </span>
      </div>
    </td>
  </tr>
</div>
```

```css
.c-table-row-scope {
  background-color: #13111C;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-table-row {
  display: table-row;
  border-collapse: collapse;
  border-spacing: 2px;
  box-sizing: border-box;
  vertical-align: middle;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #FFFFFF0D;
}

.c-table-row__cell {
  display: table-cell;
  box-sizing: border-box;
  padding: 16px;
  vertical-align: middle;
}

.c-table-row__link {
  display: flex;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  text-decoration-line: none;
}

.c-table-row__group {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 32px;
  height: 32px;
  border-radius: 6px;
}

.c-table-row__group-2 {
  display: block;
  box-sizing: border-box;
  width: 20px;
  height: 20px;
}

.c-table-row__text {
  display: block;
  box-sizing: border-box;
  font-weight: 500;
  line-height: 24px;
}

.c-table-row__cell-2 {
  display: table-cell;
  box-sizing: border-box;
  padding: 16px 12px;
  vertical-align: middle;
}

.c-table-row__group-3 {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  height: 32px;
}

.c-table-row__group-4 {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 24px;
  height: 24px;
  border-radius: 9999px;
}

.c-table-row__icon {
  display: block;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 16px;
  height: 16px;
  overflow-x: hidden;
  overflow-y: hidden;
  vertical-align: middle;
  background-color: currentcolor;
}

.c-table-row__group-5 {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 24px;
  height: 24px;
  color: #367859;
  border-radius: 9999px;
}

.c-table-row__group-6 {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 24px;
  height: 24px;
  color: #878593;
  border-radius: 9999px;
}

.c-table-row:hover {
  background-color: #FFFFFF05;
}
```

**States**

- hover (`table-row-hover`): background-color #FFFFFF05

### Table cell

**Verification**: flagged, the recipe could not be rendered on its own.

**Anatomy**

- Group: 6 instances in a 7-column grid; the recipe carries the values they all share
- `table-cell`: the component root, a `<td>` (`.c-table-cell`)
- `table-cell-group`: inner flex row (`.c-table-cell__group`)
- `table-cell-group-2`: inner flex row (`.c-table-cell__group-2`)
- `table-cell-icon`: icon placeholder, 16px (`.c-table-cell__icon`)

**Recipe**

```html
<div class="c-table-cell-scope">
  <td class="c-table-cell">
    <div class="c-table-cell__group">
      <span class="c-table-cell__group-2">
        <span class="c-table-cell__icon" aria-hidden="true"></span>
      </span>
    </div>
  </td>
</div>
```

```css
.c-table-cell-scope {
  background-color: #13111C;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-table-cell {
  display: table-cell;
  border-collapse: collapse;
  border-spacing: 2px;
  box-sizing: border-box;
  padding: 16px 12px;
  vertical-align: middle;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-table-cell__group {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  height: 32px;
}

.c-table-cell__group-2 {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  width: 24px;
  height: 24px;
  border-radius: 9999px;
}

.c-table-cell__icon {
  display: block;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 16px;
  height: 16px;
  overflow-x: hidden;
  overflow-y: hidden;
  vertical-align: middle;
  background-color: currentcolor;
}
```

**States**

- No hover or focus change was observed.

### Tab (4)

**Verification**: verified against the live page at desktop.

**Anatomy**

- `tab-4`: the component root, a `<button>` (`.c-tab-4`)
- `tab-4-text`: label text, 3 characters (`.c-tab-4__text`)
- `tab-4-group`: inner group (`.c-tab-4__group`)

**Recipe**

```html
<div class="c-tab-4-scope">
  <button class="c-tab-4" type="button">
    <span class="c-tab-4__text">lor</span>
    <span class="c-tab-4__group"></span>
  </button>
</div>
```

```css
.c-tab-4-scope {
  background-color: #FFFFFF08;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-tab-4 {
  display: inline-block;
  border-spacing: 0px;
  box-sizing: border-box;
  padding: 12px 16px;
  position: relative;
  background-color: transparent;
  color: #FFFFFF;
  border: 0;
  cursor: pointer;
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  text-align: center;
  appearance: button;
  transition-duration: 0.15s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
}

.c-tab-4__group {
  display: block;
  box-sizing: border-box;
  height: 2px;
  position: absolute;
  right: 8px;
  bottom: -1px;
  left: 8px;
  background-color: #82AAFF;
}
```

**States**

- No hover or focus change was observed.

### Tab (5)

**Verification**: verified against the live page at desktop.

**Anatomy**

- `tab-5`: the component root, a `<button>` (`.c-tab-5`), 6-character label

**Recipe**

```html
<div class="c-tab-5-scope">
  <button class="c-tab-5" type="button">lorem</button>
</div>
```

```css
.c-tab-5-scope {
  background-color: #FFFFFF08;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-tab-5 {
  display: inline-block;
  border-spacing: 0px;
  box-sizing: border-box;
  padding: 12px 16px;
  position: relative;
  background-color: transparent;
  color: #FFFFFF66;
  border: 0;
  cursor: pointer;
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  text-align: center;
  appearance: button;
  transition-duration: 0.15s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
}

.c-tab-5:hover {
  color: #FFFFFFB3;
}
```

**States**

- hover (`tab-5-hover`): color #FFFFFFB3

### Scroll button

**Verification**: verified against the live page at desktop.

**Anatomy**

- `scroll-button`: the component root, a `<button>` (`.c-scroll-button`)
- `scroll-button-text`: label text, 16 characters (`.c-scroll-button__text`)
- `scroll-button-icon`: icon placeholder, 20px (`.c-scroll-button__icon`)

**Recipe**

```html
<div class="c-scroll-button-scope">
  <button class="c-scroll-button" type="button">
    <span class="c-scroll-button__text">lorem ipsum dolo</span>
    <span class="c-scroll-button__icon" aria-hidden="true"></span>
  </button>
</div>
```

```css
.c-scroll-button-scope {
  background-color: #13111C;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-scroll-button {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  border-spacing: 0px;
  box-sizing: border-box;
  padding: 0px;
  background-color: transparent;
  color: #6C6B7B;
  border: 0;
  cursor: pointer;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: normal;
  text-transform: none;
  text-align: center;
  appearance: button;
  transition-duration: 0.15s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
}

.c-scroll-button__text {
  display: block;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
}

.c-scroll-button__icon {
  display: block;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 20px;
  height: 20px;
  overflow-x: hidden;
  overflow-y: hidden;
  vertical-align: middle;
  background-color: currentcolor;
  transform: matrix(1, 0, 0, 1, 0, -0.869851);
}
```

**States**

- No hover or focus change was observed.

### Header (inner)

**Verification**: verified against the live page at desktop.

Variant observed on https://railway.com/agents.

**Anatomy**

- `header-inner`: the component root, a `<nav>` (`.c-header-inner`)
- `header-inner-group`: inner block (`.c-header-inner__group`)
- `header-inner-nav`: inner flex row (`.c-header-inner__nav`)
- `header-inner-cta`: the `button-ghost-3` button (`.c-header-inner__cta`, 3 instances)
- `header-inner-text`: label text, 7 characters (`.c-header-inner__text`, 4 instances)
- `header-inner-inner`: inner flex row (`.c-header-inner__inner`, 4 instances)
- `header-inner-icon`: icon placeholder, 12px (`.c-header-inner__icon`, 4 instances)
- `header-inner-button`: button (`.c-header-inner__button`)
- `header-inner-nav-item`: inner group (`.c-header-inner__nav-item`)
- `header-inner-nav-link`: link, 7-character label (`.c-header-inner__nav-link`)

**Recipe**

```html
<div class="c-header-inner-scope">
  <nav class="c-header-inner">
    <div class="c-header-inner__group">
      <ul class="c-header-inner__nav">
        <button class="c-header-inner__cta" type="button">
          <span class="c-header-inner__text">lorem i</span>
          <div class="c-header-inner__inner">
            <span class="c-header-inner__icon" aria-hidden="true"></span>
          </div>
        </button>
        <button class="c-header-inner__cta" type="button">
          <span class="c-header-inner__text">lorem ipsu</span>
          <div class="c-header-inner__inner">
            <span class="c-header-inner__icon" aria-hidden="true"></span>
          </div>
        </button>
        <button class="c-header-inner__cta" type="button">
          <span class="c-header-inner__text">lorem ipsu</span>
          <div class="c-header-inner__inner">
            <span class="c-header-inner__icon" aria-hidden="true"></span>
          </div>
        </button>
        <button class="c-header-inner__button" type="button">
          <span class="c-header-inner__text">lorem i</span>
          <div class="c-header-inner__inner">
            <span class="c-header-inner__icon" aria-hidden="true"></span>
          </div>
        </button>
        <li class="c-header-inner__nav-item">
          <a class="c-header-inner__nav-link" href="#">lorem i</a>
        </li>
      </ul>
    </div>
  </nav>
</div>
```

```css
.c-header-inner-scope {
  background-color: #13111C;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-header-inner {
  display: flex;
  justify-content: center;
  border-spacing: 0px;
  box-sizing: border-box;
  position: relative;
  z-index: 50;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-header-inner__group {
  display: block;
  box-sizing: border-box;
  position: relative;
}

.c-header-inner__nav {
  display: flex;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
  padding: 0px;
  margin: 0px;
  list-style-type: none;
}

.c-header-inner__cta {
  display: flex;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
  padding: 6px 12px;
  background-color: transparent;
  color: #FFFFFF;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: normal;
  text-transform: none;
  text-align: center;
  appearance: button;
}

.c-header-inner__text {
  display: block;
  box-sizing: border-box;
  color: #DCDCE0;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
}

.c-header-inner__inner {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 12px;
  height: 12px;
  max-width: 12px;
  max-height: 12px;
  position: relative;
  color: #A1A0AB;
  font-size: 18px;
  line-height: 27px;
  transition: transform 0.15s cubic-bezier(0.4, 0, 1, 1);
}

.c-header-inner__icon {
  display: block;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 12px;
  height: 12px;
  max-width: 12px;
  max-height: 12px;
  overflow-x: hidden;
  overflow-y: hidden;
  vertical-align: middle;
  background-color: currentcolor;
}

.c-header-inner__button {
  display: flex;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
  padding: 6px 12px;
  background-color: transparent;
  color: #FFFFFF;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: normal;
  text-transform: none;
  text-align: center;
  appearance: button;
}

.c-header-inner__nav-item {
  display: list-item;
  box-sizing: border-box;
}

.c-header-inner__nav-link {
  display: inline;
  box-sizing: border-box;
  color: #DCDCE0;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  text-decoration-line: none;
  padding-right: 12px;
  padding-left: 12px;
}

.c-header-inner__nav-link:hover {
  color: #F2F1F3;
}
```

**States**

- `header-inner-nav-link` hover (`header-inner-nav-link-hover`): color #F2F1F3

### Button, secondary (5)

**Verification**: verified against the live page at desktop.

**Anatomy**

- `button-secondary-5`: the component root, a `<button>` (`.c-button-secondary-5`), 7-character label

**Recipe**

```html
<div class="c-button-secondary-5-scope">
  <button class="c-button-secondary-5" type="button">lorem i</button>
</div>
```

```css
.c-button-secondary-5-scope {
  background-color: #13111C;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-button-secondary-5 {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-spacing: 0px;
  box-sizing: border-box;
  width: 80px;
  height: 40px;
  padding: 0px 12px;
  background-color: transparent;
  color: #FFFFFF;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: normal;
  text-transform: none;
  text-align: center;
  appearance: button;
}

.c-button-secondary-5:hover {
  background-color: #FFFFFF0D;
}
```

**States**

- hover (`button-secondary-5-hover`): background-color #FFFFFF0D

### Input

**Verification**: verified against the live page at desktop.

**Anatomy**

- `input`: the component root, a `<input>` (`.c-input`), 36-character placeholder

**Recipe**

```html
<div class="c-input-scope">
  <input class="c-input" type="text" placeholder="lorem ipsum dolor sit amet consectet">
</div>
```

```css
.c-input-scope {
  background-color: #13111C;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-input {
  display: block;
  border-spacing: 0px;
  box-sizing: border-box;
  width: 768px;
  height: 42px;
  padding: 8px 40px 8px 12px;
  position: relative;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  z-index: 10;
  overflow-x: clip;
  overflow-y: clip;
  background-color: #00000040;
  color: #FFFFFF;
  border: 1px solid #33323E;
  border-radius: 6px;
  cursor: text;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: normal;
  text-transform: none;
  text-align: start;
}

.c-input:hover {
  min-height: 0px;
  top: auto;
  right: auto;
  bottom: auto;
  left: auto;
  border: 1px solid #6C6B7B;
}

.c-input:focus {
  min-height: 0px;
  top: auto;
  right: auto;
  bottom: auto;
  left: auto;
  border: 1px solid #6E31AA;
  outline: 2px solid transparent;
  outline-offset: 2px;
}
```

**States**

- hover: min-height 0px, top auto, right auto, bottom auto, left auto, border 1px solid #6C6B7B
- focus: min-height 0px, top auto, right auto, bottom auto, left auto, border 1px solid #6E31AA, outline 2px solid transparent, outline-offset 2px

### Card (7)

**Verification**: flagged, the render matched 94% of the original pixels, below the 96% required (instance 2) after 2 correction attempts.

**Anatomy**

- Group: 6 instances in a 4-column grid, 16px gap; the recipe carries the values they all share
- `card-7`: the component root, a `<div>` (`.c-card-7`)
- `card-7-link`: link (`.c-card-7__link`)
- `card-7-text`: label text, 13 characters (`.c-card-7__text`)
- `card-7-group`: inner flex row (`.c-card-7__group`, 2 instances)
- `card-7-group-2`: inner flex row (`.c-card-7__group-2`)
- `card-7-media`: image placeholder, 32px (`.c-card-7__media`)
- `card-7-group-3`: inner flex column (`.c-card-7__group-3`)
- `card-7-group-4`: inner flex row (`.c-card-7__group-4`)
- `card-7-text-2`: label text, 16 characters (`.c-card-7__text-2`)
- `card-7-text-3`: label text, 56 characters (`.c-card-7__text-3`)
- `card-7-group-5`: inner group (`.c-card-7__group-5`)
- `card-7-group-6`: inner flex row (`.c-card-7__group-6`)
- `card-7-group-7`: inner group (`.c-card-7__group-7`)
- `card-7-group-8`: inner block (`.c-card-7__group-8`)
- `card-7-text-4`: label text, 4 characters (`.c-card-7__text-4`)
- `card-7-group-9`: inner flex row (`.c-card-7__group-9`, 2 instances)
- `card-7-group-10`: inner flex row (`.c-card-7__group-10`), content not captured
- `card-7-text-5`: label text, 4 characters (`.c-card-7__text-5`)

**Recipe**

```html
<div class="c-card-7-scope">
  <div class="c-card-7">
    <a class="c-card-7__link" href="#">
      <span class="c-card-7__text">lorem ipsum d</span>
    </a>
    <div class="c-card-7__group">
      <div class="c-card-7__group-2">
        <span class="c-card-7__media" aria-hidden="true"></span>
      </div>
    </div>
    <div class="c-card-7__group-3">
      <div class="c-card-7__group-4">
        <div class="c-card-7__text-2">lorem ipsum dolo</div>
      </div>
      <div class="c-card-7__text-3">lorem ipsum dolor sit amet consectetur adipiscing elit s</div>
    </div>
    <div class="c-card-7__group-5"></div>
    <div class="c-card-7__group">
      <div class="c-card-7__group-6">
        <span class="c-card-7__group-7">
          <div class="c-card-7__group-8"></div>
        </span>
        <div class="c-card-7__text-4">lore</div>
      </div>
      <div class="c-card-7__group-9">
        <div class="c-card-7__group-9">
          <div class="c-card-7__group-10"></div>
          <div class="c-card-7__text-5">lore</div>
        </div>
      </div>
    </div>
  </div>
</div>
```

```css
.c-card-7-scope {
  background-color: #13111C;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-card-7 {
  display: inline-flex;
  flex-direction: column;
  border-spacing: 0px;
  box-sizing: border-box;
  height: 224px;
  padding: 24px 24px 16px;
  position: relative;
  background-color: #181622CC;
  color: #FFFFFF;
  border: 1px solid #FFFFFF14;
  border-radius: 8px;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-card-7__link {
  display: block;
  box-sizing: border-box;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  color: #FFFFFF;
  cursor: pointer;
  text-decoration-line: none;
}

.c-card-7__text {
  display: block;
  box-sizing: border-box;
  width: 1px;
  height: 1px;
  margin: -1px;
  position: absolute;
  overflow-x: hidden;
  overflow-y: hidden;
  white-space: nowrap;
}

.c-card-7__group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}

.c-card-7__group-2 {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 32px;
  height: 32px;
  max-width: 32px;
  max-height: 32px;
  position: relative;
  font-size: 24px;
  line-height: 32px;
}

.c-card-7__media {
  display: block;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 32px;
  height: 32px;
  max-width: 100%;
  overflow-x: clip;
  overflow-y: clip;
  vertical-align: middle;
  background-color: currentcolor;
}

.c-card-7__group-3 {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  box-sizing: border-box;
  margin-top: 16px;
}

.c-card-7__group-4 {
  display: flex;
  align-items: flex-start;
  box-sizing: border-box;
}

.c-card-7__text-2 {
  display: flow-root;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: hidden;
  font-weight: 600;
  line-height: 24px;
}

.c-card-7__text-3 {
  display: flow-root;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: hidden;
  color: #878593;
  font-size: 14px;
  line-height: 20px;
  margin-top: 4px;
}

.c-card-7__group-5 {
  display: block;
  box-sizing: border-box;
  height: 0px;
  overflow-x: hidden;
  overflow-y: hidden;
  margin-top: 24px;
  margin-bottom: 12px;
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: #FFFFFF0F;
}

.c-card-7__group-6 {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: hidden;
}

.c-card-7__group-7 {
  display: block;
  box-sizing: border-box;
  width: 24px;
  height: 24px;
  min-width: 24px;
  min-height: 24px;
  overflow-x: hidden;
  overflow-y: hidden;
  border-radius: 9999px;
}

.c-card-7__group-8 {
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 9999px;
}

.c-card-7__text-4 {
  display: block;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: hidden;
  color: #878593;
  font-size: 12px;
  line-height: 18px;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-left: 8px;
}

.c-card-7__group-9 {
  display: flex;
  align-items: center;
  box-sizing: border-box;
}

.c-card-7__group-10 {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 16px;
  height: 16px;
  max-width: 16px;
  max-height: 16px;
  opacity: 0.5;
  font-size: 18px;
  line-height: 27px;
}

.c-card-7__text-5 {
  display: block;
  box-sizing: border-box;
  color: #878593;
  font-size: 12px;
  line-height: 18px;
  margin-left: 8px;
}

.c-card-7:hover {
  background-color: #211F2D;
}
```

**States**

- hover (`card-7-hover`): background-color #211F2D

### Card (8)

**Verification**: verified against the live page at desktop.

**Anatomy**

- Group: 3 instances in a 3-column grid, 16px gap; the recipe carries the values they all share
- `card-8`: the component root, a `<div>` (`.c-card-8`)
- `card-8-group`: inner flex column (`.c-card-8__group`)
- `card-8-link`: link (`.c-card-8__link`)
- `card-8-text`: label text, 13 characters (`.c-card-8__text`)
- `card-8-group-2`: inner flex row (`.c-card-8__group-2`, 2 instances)
- `card-8-group-3`: inner flex row (`.c-card-8__group-3`)
- `card-8-media`: image placeholder, 32px (`.c-card-8__media`)
- `card-8-group-4`: inner flex column (`.c-card-8__group-4`)
- `card-8-group-5`: inner flex row (`.c-card-8__group-5`)
- `card-8-text-2`: label text, 10 characters (`.c-card-8__text-2`)
- `card-8-text-3`: label text, 27 characters (`.c-card-8__text-3`)
- `card-8-group-6`: inner group (`.c-card-8__group-6`)
- `card-8-group-7`: inner flex row (`.c-card-8__group-7`)
- `card-8-group-8`: inner group (`.c-card-8__group-8`), content not captured
- `card-8-text-4`: label text, 17 characters (`.c-card-8__text-4`)
- `card-8-group-9`: inner flex row (`.c-card-8__group-9`, 2 instances), content not captured

**Recipe**

```html
<div class="c-card-8-scope">
  <div class="c-card-8">
    <div class="c-card-8__group">
      <a class="c-card-8__link" href="#">
        <span class="c-card-8__text">lorem ipsum d</span>
      </a>
      <div class="c-card-8__group-2">
        <div class="c-card-8__group-3">
          <span class="c-card-8__media" aria-hidden="true"></span>
        </div>
      </div>
      <div class="c-card-8__group-4">
        <div class="c-card-8__group-5">
          <div class="c-card-8__text-2">lorem ipsu</div>
        </div>
        <div class="c-card-8__text-3">lorem ipsum dolor sit amet</div>
      </div>
      <div class="c-card-8__group-6"></div>
      <div class="c-card-8__group-2">
        <div class="c-card-8__group-7">
          <span class="c-card-8__group-8"></span>
          <div class="c-card-8__text-4">lorem ipsum dolor</div>
        </div>
        <div class="c-card-8__group-9">
          <div class="c-card-8__group-9"></div>
        </div>
      </div>
    </div>
  </div>
</div>
```

```css
.c-card-8-scope {
  background-color: #13111C;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-card-8 {
  display: inline-block;
  border-spacing: 0px;
  box-sizing: border-box;
  position: relative;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-card-8__group {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  height: 224px;
  padding: 24px 24px 16px;
  position: relative;
  background-color: #181622CC;
  border: 1px solid #FFFFFF14;
  border-radius: 8px;
}

.c-card-8__link {
  display: block;
  box-sizing: border-box;
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  color: #FFFFFF;
  cursor: pointer;
  text-decoration-line: none;
}

.c-card-8__text {
  display: block;
  box-sizing: border-box;
  width: 1px;
  height: 1px;
  margin: -1px;
  position: absolute;
  overflow-x: hidden;
  overflow-y: hidden;
  white-space: nowrap;
}

.c-card-8__group-2 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}

.c-card-8__group-3 {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 32px;
  height: 32px;
  max-width: 32px;
  max-height: 32px;
  position: relative;
  font-size: 24px;
  line-height: 32px;
}

.c-card-8__media {
  display: block;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 32px;
  height: 32px;
  max-width: 100%;
  overflow-x: clip;
  overflow-y: clip;
  vertical-align: middle;
  background-color: currentcolor;
}

.c-card-8__group-4 {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  box-sizing: border-box;
  margin-top: 16px;
}

.c-card-8__group-5 {
  display: flex;
  align-items: flex-start;
  box-sizing: border-box;
}

.c-card-8__text-2 {
  display: flow-root;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: hidden;
  font-weight: 600;
  line-height: 24px;
}

.c-card-8__text-3 {
  display: flow-root;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: hidden;
  color: #878593;
  font-size: 14px;
  line-height: 20px;
  margin-top: 4px;
}

.c-card-8__group-6 {
  display: block;
  box-sizing: border-box;
  height: 0px;
  overflow-x: hidden;
  overflow-y: hidden;
  margin-top: 24px;
  margin-bottom: 12px;
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: #FFFFFF0F;
}

.c-card-8__group-7 {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: hidden;
}

.c-card-8__group-8 {
  display: block;
  box-sizing: border-box;
  width: 24px;
  height: 24px;
  min-width: 24px;
  min-height: 24px;
  overflow-x: hidden;
  overflow-y: hidden;
  border-radius: 9999px;
}

.c-card-8__text-4 {
  display: block;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: hidden;
  color: #878593;
  font-size: 12px;
  line-height: 18px;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-left: 8px;
}

.c-card-8__group-9 {
  display: flex;
  align-items: center;
  box-sizing: border-box;
}
```

**States**

- No hover or focus change was observed.

### Button, primary (5)

**Verification**: verified against the live page at desktop.

**Anatomy**

- `button-primary-5`: the component root, a `<a>` (`.c-button-primary-5`), 20-character label

**Recipe**

```html
<div class="c-button-primary-5-scope">
  <a class="c-button-primary-5" href="#">lorem ipsum dolor si</a>
</div>
```

```css
.c-button-primary-5-scope {
  background-color: #13111C;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-button-primary-5 {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-spacing: 0px;
  box-sizing: border-box;
  min-width: max-content;
  padding: 12px 24px;
  position: relative;
  background-image: radial-gradient(134.26% 244.64% at 42.92% -80.36%, #59497A 25.45%, #59497A 100%);
  color: #FFFFFF;
  border: 1px solid #59497A;
  border-radius: 8px;
  cursor: pointer;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 18px;
  font-weight: 500;
  line-height: 29.25px;
  text-decoration-line: none;
  text-align: center;
  transition-duration: 0.15s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-property: background-size, box-shadow;
}

.c-button-primary-5:hover {
  box-shadow: transparent 0px 0px 0px 0px, transparent 0px 0px 0px 0px, #59497A59 0px 0px 8px 0px, #59497A59 0px 0px 24px 0px;
}

.c-button-primary-5:focus {
  box-shadow: #FFFFFF 0px 0px 0px 0px, #A667E4 0px 0px 0px 2px, transparent 0px 0px 0px 0px;
  outline: 2px solid transparent;
  outline-offset: 2px;
}
```

**States**

- hover: box-shadow transparent 0px 0px 0px 0px, transparent 0px 0px 0px 0px, #59497A59 0px 0px 8px 0px, #59497A59 0px 0px 24px 0px
- focus: box-shadow #FFFFFF 0px 0px 0px 0px, #A667E4 0px 0px 0px 2px, transparent 0px 0px 0px 0px, outline 2px solid transparent, outline-offset 2px

### Button, secondary (6)

**Verification**: verified against the live page at desktop.

**Anatomy**

- `button-secondary-6`: the component root, a `<a>` (`.c-button-secondary-6`), 11-character label

**Recipe**

```html
<div class="c-button-secondary-6-scope">
  <a class="c-button-secondary-6" href="#">lorem ipsum</a>
</div>
```

```css
.c-button-secondary-6-scope {
  background-color: #13111C;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-button-secondary-6 {
  display: inline-block;
  justify-content: center;
  align-items: center;
  border-spacing: 0px;
  box-sizing: border-box;
  min-width: max-content;
  padding: 12px 24px;
  position: relative;
  color: #FFFFFF;
  border: 1px solid #FFFFFF1F;
  border-radius: 8px;
  cursor: pointer;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 18px;
  font-weight: 500;
  line-height: 29.25px;
  text-decoration-line: none;
  text-align: center;
  white-space: nowrap;
  transition-duration: 0.15s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
}

.c-button-secondary-6:hover {
  background-color: #FFFFFF0D;
}

.c-button-secondary-6:focus {
  box-shadow: #FFFFFF 0px 0px 0px 0px, #A1A0AB 0px 0px 0px 2px, transparent 0px 0px 0px 0px;
  outline: 2px solid transparent;
  outline-offset: 2px;
}
```

**States**

- hover (`button-secondary-6-hover`): background-color #FFFFFF0D
- focus: box-shadow #FFFFFF 0px 0px 0px 0px, #A1A0AB 0px 0px 0px 2px, transparent 0px 0px 0px 0px, outline 2px solid transparent, outline-offset 2px

### Card (9)

**Verification**: verified against the live page at desktop.

**Anatomy**

- Group: 6 instances in a 3-column grid, 12px gap; the recipe carries the values they all share
- `card-9`: the component root, a `<div>` (`.c-card-9`)
- `card-9-group`: inner flex row (`.c-card-9__group`)
- `card-9-icon`: icon placeholder, 18x40px (`.c-card-9__icon`)
- `card-9-body`: label text, 8 characters (`.c-card-9__body`)
- `card-9-body-2`: label text, 65 characters (`.c-card-9__body-2`)
- `card-9-list`: inner flex column (`.c-card-9__list`)
- `card-9-item`: inner grid (`.c-card-9__item`, 3 instances)
- `card-9-group-2`: inner flex row (`.c-card-9__group-2`, 3 instances)
- `card-9-icon-2`: icon placeholder, 20px (`.c-card-9__icon-2`, 3 instances)
- `card-9-body-3`: label text, 12 characters (`.c-card-9__body-3`, 3 instances)
- `card-9-group-3`: inner block (`.c-card-9__group-3`, 2 instances)

**Recipe**

```html
<div class="c-card-9-scope">
  <div class="c-card-9">
    <div class="c-card-9__group">
      <span class="c-card-9__icon" aria-hidden="true"></span>
    </div>
    <p class="c-card-9__body">lorem ip</p>
    <p class="c-card-9__body-2">lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiu</p>
    <ul class="c-card-9__list">
      <li class="c-card-9__item">
        <div class="c-card-9__group-2">
          <span class="c-card-9__icon-2" aria-hidden="true"></span>
        </div>
        <p class="c-card-9__body-3">lorem ipsum</p>
      </li>
      <div class="c-card-9__group-3"></div>
      <li class="c-card-9__item">
        <div class="c-card-9__group-2">
          <span class="c-card-9__icon-2" aria-hidden="true"></span>
        </div>
        <p class="c-card-9__body-3">lorem ipsum dolor</p>
      </li>
      <div class="c-card-9__group-3"></div>
      <li class="c-card-9__item">
        <div class="c-card-9__group-2">
          <span class="c-card-9__icon-2" aria-hidden="true"></span>
        </div>
        <p class="c-card-9__body-3">lorem ipsum dolo</p>
      </li>
    </ul>
  </div>
</div>
```

```css
.c-card-9-scope {
  background-color: #13111C;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-card-9 {
  display: inline-block;
  border-spacing: 0px;
  box-sizing: border-box;
  padding: 32px;
  position: relative;
  background-color: #FFFFFF04;
  color: #FFFFFF;
  border: 1px solid #FFFFFF14;
  border-radius: 8px;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-card-9__group {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 40px;
  height: 40px;
  max-width: 40px;
  max-height: 40px;
  padding: 10px;
  background-color: #C2298A40;
  border: 1px solid #FFFFFF1A;
  border-radius: 8px;
  font-size: 24px;
  line-height: 32px;
}

.c-card-9__icon {
  display: block;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 18px;
  height: 40px;
  max-width: 40px;
  max-height: 40px;
  overflow-x: hidden;
  overflow-y: hidden;
  vertical-align: middle;
  background-color: currentcolor;
}

.c-card-9__body {
  display: block;
  box-sizing: border-box;
  margin: 16px 0px 8px;
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
}

.c-card-9__body-2 {
  display: block;
  box-sizing: border-box;
  margin: 0px;
  opacity: 0.75;
  line-height: 24px;
}

.c-card-9__list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-sizing: border-box;
  padding: 0px;
  margin: 32px 0px 0px;
  list-style-type: none;
}

.c-card-9__item {
  display: grid;
  align-items: center;
  gap: 12px;
  grid-template-columns: auto 1fr;
  box-sizing: border-box;
  opacity: 0.5;
}

.c-card-9__group-2 {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 20px;
  height: 20px;
  max-width: 20px;
  max-height: 20px;
  font-size: 24px;
  line-height: 32px;
  margin-left: 12px;
}

.c-card-9__icon-2 {
  display: block;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 20px;
  height: 20px;
  max-width: 20px;
  max-height: 20px;
  overflow-x: hidden;
  overflow-y: hidden;
  vertical-align: middle;
  background-color: currentcolor;
}

.c-card-9__body-3 {
  display: block;
  box-sizing: border-box;
  margin: 0px;
  font-size: 14px;
  line-height: 20px;
}

.c-card-9__group-3 {
  display: block;
  box-sizing: border-box;
  height: 1px;
  background-image: linear-gradient(to right, #FFFFFF1A, transparent);
  margin-left: 40px;
}
```

**States**

- No hover or focus change was observed.

### Card (10)

**Verification**: verified against the live page at desktop.

**Anatomy**

- Group: 6 instances in a 3-column grid, 12px gap; the recipe carries the values they all share
- `card-10`: the component root, a `<div>` (`.c-card-10`)
- `card-10-group`: inner flex row (`.c-card-10__group`)
- `card-10-icon`: icon placeholder, 18x40px (`.c-card-10__icon`)
- `card-10-body`: label text, 17 characters (`.c-card-10__body`)
- `card-10-body-2`: label text, 47 characters (`.c-card-10__body-2`)
- `card-10-list`: inner flex column (`.c-card-10__list`)
- `card-10-item`: inner grid (`.c-card-10__item`, 2 instances)
- `card-10-group-2`: inner flex row (`.c-card-10__group-2`, 2 instances)
- `card-10-icon-2`: icon placeholder, 20px (`.c-card-10__icon-2`, 2 instances)
- `card-10-body-3`: label text, 31 characters (`.c-card-10__body-3`, 2 instances)
- `card-10-group-3`: inner block (`.c-card-10__group-3`)

**Recipe**

```html
<div class="c-card-10-scope">
  <div class="c-card-10">
    <div class="c-card-10__group">
      <span class="c-card-10__icon" aria-hidden="true"></span>
    </div>
    <p class="c-card-10__body">lorem ipsum dolor</p>
    <p class="c-card-10__body-2">lorem ipsum dolor sit amet consectetur adipisci</p>
    <ul class="c-card-10__list">
      <li class="c-card-10__item">
        <div class="c-card-10__group-2">
          <span class="c-card-10__icon-2" aria-hidden="true"></span>
        </div>
        <p class="c-card-10__body-3">lorem ipsum dolor sit amet cons</p>
      </li>
      <div class="c-card-10__group-3"></div>
      <li class="c-card-10__item">
        <div class="c-card-10__group-2">
          <span class="c-card-10__icon-2" aria-hidden="true"></span>
        </div>
        <p class="c-card-10__body-3">lorem ipsum dolor sit amet consectet</p>
      </li>
    </ul>
  </div>
</div>
```

```css
.c-card-10-scope {
  background-color: #13111C;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-card-10 {
  display: inline-block;
  border-spacing: 0px;
  box-sizing: border-box;
  padding: 32px;
  position: relative;
  background-color: #FFFFFF04;
  color: #FFFFFF;
  border: 1px solid #FFFFFF14;
  border-radius: 8px;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-card-10__group {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 40px;
  height: 40px;
  max-width: 40px;
  max-height: 40px;
  padding: 10px;
  background-color: #8145B540;
  border: 1px solid #FFFFFF1A;
  border-radius: 8px;
  font-size: 24px;
  line-height: 32px;
}

.c-card-10__icon {
  display: block;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 18px;
  height: 40px;
  max-width: 40px;
  max-height: 40px;
  overflow-x: hidden;
  overflow-y: hidden;
  vertical-align: middle;
  background-color: currentcolor;
}

.c-card-10__body {
  display: block;
  box-sizing: border-box;
  margin: 16px 0px 8px;
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
}

.c-card-10__body-2 {
  display: block;
  box-sizing: border-box;
  margin: 0px;
  opacity: 0.75;
  line-height: 24px;
}

.c-card-10__list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-sizing: border-box;
  padding: 0px;
  margin: 32px 0px 0px;
  list-style-type: none;
}

.c-card-10__item {
  display: grid;
  align-items: center;
  gap: 12px;
  grid-template-columns: auto 1fr;
  box-sizing: border-box;
  opacity: 0.5;
}

.c-card-10__group-2 {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 20px;
  height: 20px;
  max-width: 20px;
  max-height: 20px;
  font-size: 24px;
  line-height: 32px;
  margin-left: 12px;
}

.c-card-10__icon-2 {
  display: block;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 20px;
  height: 20px;
  max-width: 20px;
  max-height: 20px;
  overflow-x: hidden;
  overflow-y: hidden;
  vertical-align: middle;
  background-color: currentcolor;
}

.c-card-10__body-3 {
  display: block;
  box-sizing: border-box;
  margin: 0px;
  font-size: 14px;
  line-height: 20px;
}

.c-card-10__group-3 {
  display: block;
  box-sizing: border-box;
  height: 1px;
  background-image: linear-gradient(to right, #FFFFFF1A, transparent);
  margin-left: 40px;
}
```

**States**

- No hover or focus change was observed.

### Card (11)

**Verification**: verified against the live page at desktop.

**Anatomy**

- Group: 3 instances in a 3-column grid, 12px gap; the recipe carries the values they all share
- `card-11`: the component root, a `<div>` (`.c-card-11`)
- `card-11-group`: inner flex row (`.c-card-11__group`)
- `card-11-icon`: icon placeholder, 18x40px (`.c-card-11__icon`)
- `card-11-body`: label text, 16 characters (`.c-card-11__body`)
- `card-11-body-2`: label text, 56 characters (`.c-card-11__body-2`)
- `card-11-list`: inner flex column (`.c-card-11__list`)
- `card-11-item`: inner grid (`.c-card-11__item`, 2 instances)
- `card-11-group-2`: inner flex row (`.c-card-11__group-2`, 2 instances)
- `card-11-icon-2`: icon placeholder, 20px (`.c-card-11__icon-2`, 2 instances)
- `card-11-body-3`: label text, 25 characters (`.c-card-11__body-3`, 2 instances)
- `card-11-group-3`: inner block (`.c-card-11__group-3`)

**Recipe**

```html
<div class="c-card-11-scope">
  <div class="c-card-11">
    <div class="c-card-11__group">
      <span class="c-card-11__icon" aria-hidden="true"></span>
    </div>
    <p class="c-card-11__body">lorem ipsum dolo</p>
    <p class="c-card-11__body-2">lorem ipsum dolor sit amet consectetur adipiscing elit s</p>
    <ul class="c-card-11__list">
      <li class="c-card-11__item">
        <div class="c-card-11__group-2">
          <span class="c-card-11__icon-2" aria-hidden="true"></span>
        </div>
        <p class="c-card-11__body-3">lorem ipsum dolor sit ame</p>
      </li>
      <div class="c-card-11__group-3"></div>
      <li class="c-card-11__item">
        <div class="c-card-11__group-2">
          <span class="c-card-11__icon-2" aria-hidden="true"></span>
        </div>
        <p class="c-card-11__body-3">lorem ipsum dolor sit amet con</p>
      </li>
    </ul>
  </div>
</div>
```

```css
.c-card-11-scope {
  background-color: #13111C;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-card-11 {
  display: inline-block;
  border-spacing: 0px;
  box-sizing: border-box;
  padding: 32px;
  position: relative;
  background-color: #FFFFFF04;
  color: #FFFFFF;
  border: 1px solid #FFFFFF14;
  border-radius: 8px;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-card-11__group {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 40px;
  height: 40px;
  max-width: 40px;
  max-height: 40px;
  padding: 10px;
  background-color: #0D74CE40;
  border: 1px solid #FFFFFF1A;
  border-radius: 8px;
  font-size: 24px;
  line-height: 32px;
}

.c-card-11__icon {
  display: block;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 18px;
  height: 40px;
  max-width: 40px;
  max-height: 40px;
  overflow-x: hidden;
  overflow-y: hidden;
  vertical-align: middle;
  background-color: currentcolor;
}

.c-card-11__body {
  display: block;
  box-sizing: border-box;
  margin: 16px 0px 8px;
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
}

.c-card-11__body-2 {
  display: block;
  box-sizing: border-box;
  margin: 0px;
  opacity: 0.75;
  line-height: 24px;
}

.c-card-11__list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-sizing: border-box;
  padding: 0px;
  margin: 32px 0px 0px;
  list-style-type: none;
}

.c-card-11__item {
  display: grid;
  align-items: center;
  gap: 12px;
  grid-template-columns: auto 1fr;
  box-sizing: border-box;
  opacity: 0.5;
}

.c-card-11__group-2 {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 20px;
  height: 20px;
  max-width: 20px;
  max-height: 20px;
  font-size: 24px;
  line-height: 32px;
  margin-left: 12px;
}

.c-card-11__icon-2 {
  display: block;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 20px;
  height: 20px;
  max-width: 20px;
  max-height: 20px;
  overflow-x: hidden;
  overflow-y: hidden;
  vertical-align: middle;
  background-color: currentcolor;
}

.c-card-11__body-3 {
  display: block;
  box-sizing: border-box;
  margin: 0px;
  font-size: 14px;
  line-height: 20px;
}

.c-card-11__group-3 {
  display: block;
  box-sizing: border-box;
  height: 1px;
  background-image: linear-gradient(to right, #FFFFFF1A, transparent);
  margin-left: 40px;
}
```

**States**

- No hover or focus change was observed.

### Feature section header

**Verification**: flagged, the `feature-section-header` height did not reproduce the measured 313px after 2 correction attempts.

**Anatomy**

- `feature-section-header`: the component root, a `<header>` (`.c-feature-section-header`)
- `feature-section-header-group`: inner block (`.c-feature-section-header__group`)
- `feature-section-header-media`: image placeholder, 376x313px (`.c-feature-section-header__media`)
- `feature-section-header-group-2`: inner block (`.c-feature-section-header__group-2`)
- `feature-section-header-title`: heading, 16 characters (`.c-feature-section-header__title`)
- `feature-section-header-body`: label text, 140 characters (`.c-feature-section-header__body`)
- `feature-section-header-group-3`: inner block (`.c-feature-section-header__group-3`)
- `feature-section-header-group-4`: inner flex row (`.c-feature-section-header__group-4`)
- `feature-section-header-group-5`: inner flex row (`.c-feature-section-header__group-5`), content not captured

**Recipe**

```html
<div class="c-feature-section-header-scope">
  <header class="c-feature-section-header">
    <div class="c-feature-section-header__group">
      <span class="c-feature-section-header__media" aria-hidden="true"></span>
    </div>
    <div class="c-feature-section-header__group-2">
      <h1 class="c-feature-section-header__title">lorem ipsum dolo</h1>
      <p class="c-feature-section-header__body">lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor lorem ipsum dolor sit amet consectetur adipiscing elit sed do e</p>
      <div class="c-feature-section-header__group-3">
        <div class="c-feature-section-header__group-4">
          <div class="c-feature-section-header__group-5"></div>
        </div>
      </div>
    </div>
  </header>
</div>
```

```css
.c-feature-section-header-scope {
  background-color: #13111C;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-feature-section-header {
  display: grid;
  align-items: center;
  gap: 48px 16px;
  grid-template-columns: repeat(12, minmax(0px, 1fr));
  border-spacing: 0px;
  box-sizing: border-box;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-feature-section-header__group {
  display: block;
  box-sizing: border-box;
}

.c-feature-section-header__media {
  display: block;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 376px;
  height: 313px;
  max-width: 100%;
  aspect-ratio: auto 384 / 320;
  overflow-x: clip;
  overflow-y: clip;
  vertical-align: middle;
  background-color: currentcolor;
}

.c-feature-section-header__group-2 {
  display: block;
  box-sizing: border-box;
  max-width: 580px;
  padding-right: 32px;
  padding-left: 32px;
}

.c-feature-section-header__title {
  display: block;
  box-sizing: border-box;
  margin: 0px 0px 8px;
  font-family: InterDisplay, sans-serif;
  font-size: 32px;
  font-weight: 500;
  line-height: 48px;
}

.c-feature-section-header__body {
  display: block;
  box-sizing: border-box;
  max-width: 710px;
  margin: 0px;
  opacity: 0.5;
  font-size: 18px;
  line-height: 27px;
}

.c-feature-section-header__group-3 {
  display: block;
  box-sizing: border-box;
  margin-top: 32px;
}

.c-feature-section-header__group-4 {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 16px;
  box-sizing: border-box;
}

.c-feature-section-header__group-5 {
  display: flex;
  align-items: center;
  box-sizing: border-box;
}
```

**States**

- No hover or focus change was observed.

### Feature section header (2)

**Verification**: flagged, the `feature-section-header-2` height did not reproduce the measured 315px after 2 correction attempts.

**Anatomy**

- `feature-section-header-2`: the component root, a `<header>` (`.c-feature-section-header-2`)
- `feature-section-header-2-group`: inner block (`.c-feature-section-header-2__group`)
- `feature-section-header-2-media`: image placeholder, 376x315px (`.c-feature-section-header-2__media`)
- `feature-section-header-2-group-2`: inner block (`.c-feature-section-header-2__group-2`)
- `feature-section-header-2-title`: heading, 19 characters (`.c-feature-section-header-2__title`)
- `feature-section-header-2-body`: label text, 120 characters (`.c-feature-section-header-2__body`)
- `feature-section-header-2-group-3`: inner block (`.c-feature-section-header-2__group-3`)
- `feature-section-header-2-group-4`: inner flex row (`.c-feature-section-header-2__group-4`)
- `feature-section-header-2-group-5`: inner flex row (`.c-feature-section-header-2__group-5`), content not captured

**Recipe**

```html
<div class="c-feature-section-header-2-scope">
  <header class="c-feature-section-header-2">
    <div class="c-feature-section-header-2__group">
      <span class="c-feature-section-header-2__media" aria-hidden="true"></span>
    </div>
    <div class="c-feature-section-header-2__group-2">
      <h1 class="c-feature-section-header-2__title">lorem ipsum dolor s</h1>
      <p class="c-feature-section-header-2__body">lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor lorem ipsum dolor sit amet consectetur adip</p>
      <div class="c-feature-section-header-2__group-3">
        <div class="c-feature-section-header-2__group-4">
          <div class="c-feature-section-header-2__group-5"></div>
        </div>
      </div>
    </div>
  </header>
</div>
```

```css
.c-feature-section-header-2-scope {
  background-color: #13111C;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-feature-section-header-2 {
  display: grid;
  align-items: center;
  gap: 48px 16px;
  grid-template-columns: repeat(12, minmax(0px, 1fr));
  border-spacing: 0px;
  box-sizing: border-box;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-feature-section-header-2__group {
  display: block;
  box-sizing: border-box;
}

.c-feature-section-header-2__media {
  display: block;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 376px;
  height: 315px;
  max-width: 100%;
  overflow-x: clip;
  overflow-y: clip;
  vertical-align: middle;
  background-color: currentcolor;
}

.c-feature-section-header-2__group-2 {
  display: block;
  box-sizing: border-box;
  max-width: 580px;
  padding-right: 32px;
  padding-left: 32px;
}

.c-feature-section-header-2__title {
  display: block;
  box-sizing: border-box;
  margin: 0px 0px 8px;
  font-family: InterDisplay, sans-serif;
  font-size: 32px;
  font-weight: 500;
  line-height: 48px;
}

.c-feature-section-header-2__body {
  display: block;
  box-sizing: border-box;
  max-width: 710px;
  margin: 0px;
  opacity: 0.5;
  font-size: 18px;
  line-height: 27px;
}

.c-feature-section-header-2__group-3 {
  display: block;
  box-sizing: border-box;
  margin-top: 32px;
}

.c-feature-section-header-2__group-4 {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 16px;
  box-sizing: border-box;
}

.c-feature-section-header-2__group-5 {
  display: flex;
  align-items: center;
  box-sizing: border-box;
}
```

**States**

- No hover or focus change was observed.

### Feature section header (3)

**Verification**: flagged, the `feature-section-header-3` height did not reproduce the measured 317px after 2 correction attempts.

**Anatomy**

- `feature-section-header-3`: the component root, a `<header>` (`.c-feature-section-header-3`)
- `feature-section-header-3-group`: inner block (`.c-feature-section-header-3__group`)
- `feature-section-header-3-media`: image placeholder, 376x317px (`.c-feature-section-header-3__media`)
- `feature-section-header-3-group-2`: inner block (`.c-feature-section-header-3__group-2`)
- `feature-section-header-3-title`: heading, 14 characters (`.c-feature-section-header-3__title`)
- `feature-section-header-3-body`: label text, 152 characters (`.c-feature-section-header-3__body`)
- `feature-section-header-3-group-3`: inner block (`.c-feature-section-header-3__group-3`)
- `feature-section-header-3-group-4`: inner flex row (`.c-feature-section-header-3__group-4`)
- `feature-section-header-3-group-5`: inner flex row (`.c-feature-section-header-3__group-5`), content not captured

**Recipe**

```html
<div class="c-feature-section-header-3-scope">
  <header class="c-feature-section-header-3">
    <div class="c-feature-section-header-3__group">
      <span class="c-feature-section-header-3__media" aria-hidden="true"></span>
    </div>
    <div class="c-feature-section-header-3__group-2">
      <h1 class="c-feature-section-header-3__title">lorem ipsum do</h1>
      <p class="c-feature-section-header-3__body">lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempo</p>
      <div class="c-feature-section-header-3__group-3">
        <div class="c-feature-section-header-3__group-4">
          <div class="c-feature-section-header-3__group-5"></div>
        </div>
      </div>
    </div>
  </header>
</div>
```

```css
.c-feature-section-header-3-scope {
  background-color: #13111C;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-feature-section-header-3 {
  display: grid;
  align-items: center;
  gap: 48px 16px;
  grid-template-columns: repeat(12, minmax(0px, 1fr));
  border-spacing: 0px;
  box-sizing: border-box;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-feature-section-header-3__group {
  display: block;
  box-sizing: border-box;
}

.c-feature-section-header-3__media {
  display: block;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 376px;
  height: 317px;
  max-width: 100%;
  overflow-x: clip;
  overflow-y: clip;
  vertical-align: middle;
  background-color: currentcolor;
}

.c-feature-section-header-3__group-2 {
  display: block;
  box-sizing: border-box;
  max-width: 580px;
  padding-right: 32px;
  padding-left: 32px;
}

.c-feature-section-header-3__title {
  display: block;
  box-sizing: border-box;
  margin: 0px 0px 8px;
  font-family: InterDisplay, sans-serif;
  font-size: 32px;
  font-weight: 500;
  line-height: 48px;
}

.c-feature-section-header-3__body {
  display: block;
  box-sizing: border-box;
  max-width: 710px;
  margin: 0px;
  opacity: 0.5;
  font-size: 18px;
  line-height: 27px;
}

.c-feature-section-header-3__group-3 {
  display: block;
  box-sizing: border-box;
  margin-top: 32px;
}

.c-feature-section-header-3__group-4 {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 16px;
  box-sizing: border-box;
}

.c-feature-section-header-3__group-5 {
  display: flex;
  align-items: center;
  box-sizing: border-box;
}
```

**States**

- No hover or focus change was observed.

### Hero

**Verification**: verified against the live page at desktop.

**Anatomy**

- `hero`: the component root, a `<header>` (`.c-hero`)
- `hero-title`: heading, 17 characters (`.c-hero__title`)
- `hero-title-2`: heading, 95 characters (`.c-hero__title-2`)
- `hero-group`: inner flex row (`.c-hero__group`)
- `hero-cta`: link, 20-character label (`.c-hero__cta`)
- `hero-cta-2`: link, 11-character label (`.c-hero__cta-2`)

**Recipe**

```html
<div class="c-hero-scope">
  <header class="c-hero">
    <h1 class="c-hero__title">lorem ipsum dolor</h1>
    <h2 class="c-hero__title-2">lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor lorem ipsum dolor</h2>
    <div class="c-hero__group">
      <a class="c-hero__cta" href="#">lorem ipsum dolor si</a>
      <a class="c-hero__cta-2" href="#">lorem ipsum</a>
    </div>
  </header>
</div>
```

```css
.c-hero-scope {
  background-color: #13111C;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-hero {
  display: block;
  border-spacing: 0px;
  box-sizing: border-box;
  max-width: 1160px;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  text-align: center;
}

.c-hero__title {
  display: block;
  box-sizing: border-box;
  margin: 0px;
  font-family: "IBM Plex Serif", serif, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  font-size: 56px;
  font-weight: 500;
  line-height: 91px;
  letter-spacing: -1.4px;
}

.c-hero__title-2 {
  display: block;
  box-sizing: border-box;
  max-width: 640px;
  margin: 0px auto 24px;
  opacity: 0.45;
  font-size: 20px;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: -0.25px;
}

.c-hero__group {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  box-sizing: border-box;
}

.c-hero__cta {
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  min-width: max-content;
  padding: 12px 24px;
  position: relative;
  background-image: radial-gradient(134.26% 244.64% at 42.92% -80.36%, #59497A 25.45%, #59497A 100%);
  color: #FFFFFF;
  border: 1px solid #59497A;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 500;
  line-height: 29.25px;
  text-decoration-line: none;
  transition-duration: 0.15s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-property: background-size, box-shadow;
}

.c-hero__cta-2 {
  display: block;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  min-width: max-content;
  padding: 12px 24px;
  position: relative;
  color: #FFFFFF;
  border: 1px solid #FFFFFF1F;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 500;
  line-height: 29.25px;
  text-decoration-line: none;
  white-space: nowrap;
  transition-duration: 0.15s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
}
```

**States**

- No hover or focus change was observed.

### Logo wall

**Verification**: verified against the live page at desktop.

**Anatomy**

- `logo-wall`: the component root, a `<header>` (`.c-logo-wall`)
- `logo-wall-title`: heading, 31 characters (`.c-logo-wall__title`)
- `logo-wall-body`: label text, 120 characters (`.c-logo-wall__body`)

**Recipe**

```html
<div class="c-logo-wall-scope">
  <header class="c-logo-wall">
    <h2 class="c-logo-wall__title">lorem ipsum dolor sit amet cons</h2>
    <p class="c-logo-wall__body">lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor lorem ipsum dolor sit amet consectetur adip</p>
  </header>
</div>
```

```css
.c-logo-wall-scope {
  background-color: #13111C;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-logo-wall {
  display: block;
  border-spacing: 0px;
  box-sizing: border-box;
  max-width: 620px;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  text-align: center;
}

.c-logo-wall__title {
  display: block;
  box-sizing: border-box;
  margin: 0px;
  font-family: "Inter Tight", Inter, -apple-system, system-ui, "Segoe UI", sans-serif, Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 40px;
  font-weight: 500;
  line-height: 50px;
}

.c-logo-wall__body {
  display: block;
  box-sizing: border-box;
  max-width: 544px;
  margin: 16px auto 48px;
  color: #878593;
  font-size: 18px;
  line-height: 27px;
}
```

**States**

- No hover or focus change was observed.

### Nav menu item

**Verification**: verified against the live page at desktop.

**Anatomy**

- `nav-menu-item`: the component root, a `<button>` (`.c-nav-menu-item`)
- `nav-menu-item-text`: label text, 7 characters (`.c-nav-menu-item__text`)
- `nav-menu-item-group`: inner flex row (`.c-nav-menu-item__group`)
- `nav-menu-item-icon`: icon placeholder, 12px (`.c-nav-menu-item__icon`)

**Recipe**

```html
<div class="c-nav-menu-item-scope">
  <button class="c-nav-menu-item" type="button">
    <span class="c-nav-menu-item__text">lorem i</span>
    <div class="c-nav-menu-item__group">
      <span class="c-nav-menu-item__icon" aria-hidden="true"></span>
    </div>
  </button>
</div>
```

```css
.c-nav-menu-item-scope {
  background-color: #13111C;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-nav-menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  border-spacing: 0px;
  box-sizing: border-box;
  padding: 6px 12px;
  background-color: transparent;
  color: #FFFFFF;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: normal;
  text-transform: none;
  text-align: center;
  list-style-type: none;
  appearance: button;
}

.c-nav-menu-item__text {
  display: block;
  box-sizing: border-box;
  color: #DCDCE0;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
}

.c-nav-menu-item__group {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 12px;
  height: 12px;
  max-width: 12px;
  max-height: 12px;
  position: relative;
  color: #A1A0AB;
  font-size: 18px;
  line-height: 27px;
  transition: transform 0.15s cubic-bezier(0.4, 0, 1, 1);
}

.c-nav-menu-item__icon {
  display: block;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 12px;
  height: 12px;
  max-width: 12px;
  max-height: 12px;
  overflow-x: hidden;
  overflow-y: hidden;
  vertical-align: middle;
  background-color: currentcolor;
}
```

**States**

- No hover or focus change was observed.

### Nav menu item (2)

**Verification**: verified against the live page at desktop.

**Anatomy**

- `nav-menu-item-2`: the component root, a `<button>` (`.c-nav-menu-item-2`)
- `nav-menu-item-2-text`: label text, 10 characters (`.c-nav-menu-item-2__text`)
- `nav-menu-item-2-group`: inner flex row (`.c-nav-menu-item-2__group`)
- `nav-menu-item-2-icon`: icon placeholder, 12px (`.c-nav-menu-item-2__icon`)

**Recipe**

```html
<div class="c-nav-menu-item-2-scope">
  <button class="c-nav-menu-item-2" type="button">
    <span class="c-nav-menu-item-2__text">lorem ipsu</span>
    <div class="c-nav-menu-item-2__group">
      <span class="c-nav-menu-item-2__icon" aria-hidden="true"></span>
    </div>
  </button>
</div>
```

```css
.c-nav-menu-item-2-scope {
  background-color: #13111C;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-nav-menu-item-2 {
  display: flex;
  align-items: center;
  gap: 8px;
  border-spacing: 0px;
  box-sizing: border-box;
  padding: 6px 12px;
  background-color: transparent;
  color: #FFFFFF;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: normal;
  text-transform: none;
  text-align: center;
  list-style-type: none;
  appearance: button;
}

.c-nav-menu-item-2__text {
  display: block;
  box-sizing: border-box;
  color: #DCDCE0;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
}

.c-nav-menu-item-2__group {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 12px;
  height: 12px;
  max-width: 12px;
  max-height: 12px;
  position: relative;
  color: #A1A0AB;
  font-size: 18px;
  line-height: 27px;
  transition: transform 0.15s cubic-bezier(0.4, 0, 1, 1);
}

.c-nav-menu-item-2__icon {
  display: block;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 12px;
  height: 12px;
  max-width: 12px;
  max-height: 12px;
  overflow-x: hidden;
  overflow-y: hidden;
  vertical-align: middle;
  background-color: currentcolor;
}
```

**States**

- No hover or focus change was observed.

### Nav menu item (3)

**Verification**: verified against the live page at desktop.

**Anatomy**

- `nav-menu-item-3`: the component root, a `<button>` (`.c-nav-menu-item-3`)
- `nav-menu-item-3-text`: label text, 10 characters (`.c-nav-menu-item-3__text`)
- `nav-menu-item-3-group`: inner flex row (`.c-nav-menu-item-3__group`)
- `nav-menu-item-3-icon`: icon placeholder, 12px (`.c-nav-menu-item-3__icon`)

**Recipe**

```html
<div class="c-nav-menu-item-3-scope">
  <button class="c-nav-menu-item-3" type="button">
    <span class="c-nav-menu-item-3__text">lorem ipsu</span>
    <div class="c-nav-menu-item-3__group">
      <span class="c-nav-menu-item-3__icon" aria-hidden="true"></span>
    </div>
  </button>
</div>
```

```css
.c-nav-menu-item-3-scope {
  background-color: #13111C;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-nav-menu-item-3 {
  display: flex;
  align-items: center;
  gap: 8px;
  border-spacing: 0px;
  box-sizing: border-box;
  padding: 6px 12px;
  background-color: transparent;
  color: #FFFFFF;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: normal;
  text-transform: none;
  text-align: center;
  list-style-type: none;
  appearance: button;
}

.c-nav-menu-item-3__text {
  display: block;
  box-sizing: border-box;
  color: #DCDCE0;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
}

.c-nav-menu-item-3__group {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 12px;
  height: 12px;
  max-width: 12px;
  max-height: 12px;
  position: relative;
  color: #A1A0AB;
  font-size: 18px;
  line-height: 27px;
  transition: transform 0.15s cubic-bezier(0.4, 0, 1, 1);
}

.c-nav-menu-item-3__icon {
  display: block;
  flex-shrink: 0;
  box-sizing: border-box;
  width: 12px;
  height: 12px;
  max-width: 12px;
  max-height: 12px;
  overflow-x: hidden;
  overflow-y: hidden;
  vertical-align: middle;
  background-color: currentcolor;
}
```

**States**

- No hover or focus change was observed.

### Section tabs

**Verification**: verified against the live page at desktop.

**Anatomy**

- `section-tab`: the component root, a `<nav>` (`.c-section-tab`)
- `section-tab-list`: inner flex row (`.c-section-tab__list`)
- `section-tab-item`: inner group (`.c-section-tab__item`, 6 instances)
- `section-tab-link`: link, 6-character label (`.c-section-tab__link`, 5 instances)
- `section-tab-link-2`: link, 6-character label (`.c-section-tab__link-2`)
- `section-tab-group`: inner block (`.c-section-tab__group`)

**Recipe**

```html
<div class="c-section-tab-scope">
  <nav class="c-section-tab">
    <ul class="c-section-tab__list">
      <li class="c-section-tab__item">
        <a class="c-section-tab__link" href="#">lorem</a>
      </li>
      <li class="c-section-tab__item">
        <a class="c-section-tab__link" href="#">lorem i</a>
      </li>
      <li class="c-section-tab__item">
        <a class="c-section-tab__link" href="#">lorem</a>
      </li>
      <li class="c-section-tab__item">
        <a class="c-section-tab__link" href="#">lorem i</a>
      </li>
      <li class="c-section-tab__item">
        <a class="c-section-tab__link-2" href="#">lorem</a>
        <div class="c-section-tab__group"></div>
      </li>
      <li class="c-section-tab__item">
        <a class="c-section-tab__link" href="#">lorem</a>
      </li>
    </ul>
  </nav>
</div>
```

```css
.c-section-tab-scope {
  background-color: #13111C;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
}

.c-section-tab {
  display: block;
  border-spacing: 0px;
  box-sizing: border-box;
  max-width: 1160px;
  overflow-x: auto;
  overflow-y: auto;
  color: #FFFFFF;
  font-family: Inter, -apple-system, system-ui, "Segoe UI", sans-serif, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #FFFFFF1A;
}

.c-section-tab__list {
  display: flex;
  gap: 32px;
  box-sizing: border-box;
  padding: 0px;
  margin: 0px;
  list-style-type: none;
}

.c-section-tab__item {
  display: list-item;
  box-sizing: border-box;
  position: relative;
}

.c-section-tab__link {
  display: block;
  box-sizing: border-box;
  color: #FFFFFF;
  opacity: 0.5;
  cursor: pointer;
  font-size: 14px;
  line-height: 20px;
  text-decoration-line: none;
  padding-bottom: 24px;
}

.c-section-tab__link-2 {
  display: block;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  text-decoration-line: none;
  padding-bottom: 24px;
}

.c-section-tab__group {
  display: block;
  box-sizing: border-box;
  width: 100%;
  height: 1px;
  position: absolute;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background-color: #FFFFFF;
}
```

**States**

- No hover or focus change was observed.

## Do's and Don'ts

### Do
- **Do keep purple fills on primary actions.** The hero's main CTA uses the #553F83 fill (`button-primary`), and no other measured component uses it. The Pro plan CTA is the one place `primary` (#853BCE) becomes a solid fill (`plan-button-2`), hovering to `primary-light`.
- **Do match button radius to variant.** Large CTAs use `rounded.md`: `button-primary`, `button-secondary`, `button-primary-2`, `button-primary-3`, `button-primary-5` and `button-secondary-6` at 8px. In-panel and nav buttons use `rounded.sm`: `button-ghost`, `button-secondary-2`, `button-ghost-3` and `button-secondary-5` at 6px. Icon buttons use `rounded.xl` (`button-secondary-4` at 12px).
- **Do respect the measured control heights.**
  - Hero CTAs: 58px (`button-primary`, `button-secondary`), 55px (`button-primary-5`), 50px (`button-primary-2`).
  - In-page controls: 42px (`button-secondary-2`, `input`, `plan-button`), 40px (`button-ghost`).
  - Nav items: 32px (`nav-dropdown`, `button-ghost-3`).
- **Do use the observed shadow tiers for lift.** Purple CTAs glow on hover with `transparent 0px 0px 0px 0px, transparent 0px 0px 0px 0px, #B428B459 0px 0px 8px 0px, #662BDF59 0px 0px 24px 0px` (`button-primary-2`). Icon buttons use the ring `#FFFFFF 0px 0px 0px 0px, #FFFFFF1A 0px 0px 0px 1px, transparent 0px 0px 0px 0px` (`button-secondary-4`).
- **Do separate sections with the 96px rhythm** (`section-padding-y`). Tighten card grids to their measured gaps: `card-grid-gap` 32px, `card-6-grid-gap` 24px, `card-8-grid-gap` 16px, `card-9-grid-gap` 12px.
- **Do step text down the gray ladder for hierarchy.** Use `ink` for titles, `body` for nav, `muted` for footer links, `muted-3` for table headers and card body (`card-6-body`).
- **Do outline cards with translucent white hairlines.** Use #FFFFFF1A on `card-6` and #FFFFFF14 on `card-9`. Reserve solid `hairline` (#33323E) for inputs and hover borders.
- **Do render focus as a 2px `primary-light` ring** with a transparent 2px outline at 2px offset, as every verified button does.

### Don't
- **Don't describe or build the system as flat.** Hover glows and the hero's long diffuse shadows are part of it. But never put a gray drop shadow on a resting card.
- **Don't set UI in IBM Plex Serif.** It is for `hero-display`, `display-lg` and serif section titles only. Nav, buttons and body copy stay in Inter.
- **Don't introduce weight 700** or positive tracking on Inter. The ladder is 400/500/600, and only monospace labels track wider.
- **Don't add a second accent hue to CTAs.**
  - Blue (`info`, with the plan CTA fill on `plan-button`) marks the Hobby plan.
  - Green (`success`, `success-surface`) marks status.
  - Purple stays the brand voice.
- **Don't make buttons pill-shaped.** `rounded.full` belongs to status chips and avatars (`card-8-group-8`).
- **Don't lighten the canvas.** Pages sit on `surface` (#13111C). Raised panels go to `surface-raised` or a #1C1A28 card fill, never to mid-gray.
- **Don't add backdrop blur.** No recipe or page sample carries a backdrop-filter.

## Responsive Behavior

### Scope
This analysis is **two-viewport**: one desktop capture and one mobile capture. No breakpoint values were observed, so none are stated here.

### What changes on mobile
- **Navigation.** The desktop row of dropdown nav buttons (`nav-dropdown`, 32px tall) and the Sign in / Book a demo actions collapse into a hamburger menu.
- **Hero.** The serif headline stays large and centered. The two CTAs stack vertically instead of sitting side by side.
- **Grids.** Feature rows, card grids and pricing plan cards collapse to a single column. The logo wall reflows to a narrower grid.
- **Footer.** The multi-column link footer becomes a long stacked list. `footer-mobile` measures 1249px tall against 833px for desktop `footer`. The logo shrinks from 32px (`footer-logo`) to 24px (`footer-mobile-logo`). Both footer recipes are flagged:
  - `footer-mobile` (flagged: the render came out 4 px narrower than the original after 2 correction attempts);
  - `footer` (flagged: the `footer` height did not reproduce the measured 833px after 2 correction attempts).
- **Rhythm.** Vertical section spacing appears unchanged in the screenshots, so mobile pages are long and airy.

### Touch targets
Primary actions are comfortably sized: 58px (`button-primary`), 50px (`button-primary-2`), 42px (`button-secondary-2`, `input`, `plan-button`), 40px (`button-ghost`). The 32px nav controls (`nav-dropdown`, `button-ghost-3`) fall below a 44px touch target. On mobile they live behind the hamburger, where a taller row should be used.

## Iteration Guide

1. **Reference tokens, never raw hex.** Write `surface`, `ink`, `muted-3`, `primary`, `rounded.sm`. Component-only fills (#553F83 on `button-primary`, #1C1A28 on `card-6`, #211F2D on `tag-link`) stay inside their component recipes. Do not promote them to page colors.
2. **Keep purple singular.** Any new emphasis uses `primary` / `primary-light`. Blue (`info`, `info-light`) is for plan and tab cues, green (`success*`) is for status, and no other hue becomes a CTA.
3. **Add variants by pairing size with radius.**
   - A new large CTA copies `button-primary-2`: 8px radius, 12px × 24px padding, purple glow on hover, `primary-light` focus ring.
   - A new in-panel button copies `button-secondary-2`: 6px radius, 8px × 12px padding, #FFFFFF1A hairline.
4. **Serif is display-only.** IBM Plex Serif at weight 500 with negative tracking (`hero-display`, `display-lg`) is the only place it appears. Everything else goes through the Inter ladder, using only weights 400/500/600.
5. **Depth rules.**
   - Resting cards get a translucent-white hairline and a tonal fill.
   - Hover gets a colored glow or a border step to `hairline`.
   - Hero mockups may use the long diffuse multi-layer shadow.
   - Never add blur or gray drop shadows to cards.
6. **Preserve the rhythm contrast.** Keep 96px (`section-padding-y`) between sections and 8–32px gaps inside them (`card-8-grid-gap`, `card-grid-gap`). Don't inflate card internals.
7. **Text hierarchy moves along the gray ladder** (`ink` → `body` → `muted` → `muted-2` → `muted-3` → `subtle`) before it moves in size. Check contrast before using `subtle` for anything a user must read.

## Known Gaps

- **Flagged recipes (did not reproduce exactly):**
  - `footer` (flagged: the `footer` height did not reproduce the measured 833px after 2 correction attempts)
  - `footer-mobile` (flagged: the render came out 4 px narrower than the original after 2 correction attempts)
  - `card-3` (flagged: the render came out 2 px wider than the original after 2 correction attempts)
  - `card-5` (flagged: the `card-5-cta` height did not reproduce the measured 30px after 2 correction attempts)
  - `card-7` (flagged: the render matched 94% of the original pixels, below the 96% required (instance 2) after 2 correction attempts)
  - `pricing-plan-2` (flagged: the `pricing-plan-2-group` height did not reproduce the measured 154px after 2 correction attempts)
  - `pricing-plan-3` (flagged: the render matched 56% of the original pixels, below the 96% required (instance 1) after 2 correction attempts)
  - `table` (flagged: the `table-row-2` height did not reproduce the measured 65px after 2 correction attempts)
  - `table-row` (flagged: the recipe could not be rendered on its own)
  - `table-cell` (flagged: the recipe could not be rendered on its own)
  - `feature-section-header`, `feature-section-header-2` and `feature-section-header-3` (flagged: their root heights did not reproduce the measured 313px, 315px and 317px after 2 correction attempts)
- **No container max-width was measured.** The only max-width tokens (`header-landing-inner-max-width`, `header-inner-inner-max-width`, 12px) describe a nav chevron row, not the page column.
- **Gradients were not extracted.** Pricing-card gradient fills and the illustrated hero are visible in screenshots, but no gradient stops or angles were captured.
- **Page-level shadows are unattributed.** The long diffuse, upward-bloom, inset and drop shadows came from page sampling, and the elements they sit on were not identified.
- **Partial typography coverage.**
  - JetBrains Mono and Inter Tight appear in the evidence but have no typography tokens.
  - A 40px/700 Inter style was sampled from SVG text only.
  - A warm #D97757 text color appears in the dark-scheme capture on one page and has no token.
- **Interaction coverage is partial.** Hover and focus were captured on buttons, nav links, inputs and some cards. The following were not reached:
  - active/pressed states;
  - dropdown menu panels;
  - the mobile hamburger drawer;
  - toasts and modals;
  - animations and transitions.
- **Authenticated product surfaces were not captured.** This covers the dashboard and project canvas; only marketing pages (home, pricing, agents, deploy, features) were.
- **Responsive analysis covers only two viewports.** No breakpoint values are known.
