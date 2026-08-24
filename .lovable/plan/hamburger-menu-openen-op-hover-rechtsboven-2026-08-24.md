# Hamburger-menu openen op hover (rechtsboven)

## Doel
Het huidige hamburger-menu (3 strepen) rechtsboven in de header moet niet alleen openen bij een klik, maar ook bij hover. Het uitklapmenu toont daarbij alleen de hoofdnavigatie-items.

## Aanpassingen

1. **`src/components/SiteHeader.tsx`**
   - Verpak de hamburger-knop en het mobiele menu in een `group` container.
   - Zorg dat het menu zichtbaar wordt bij `group-hover` (desktop met muis).
   - Behoud het bestaande klik-gedrag via `useState` zodat het op touch apparaten blijft werken.
   - Vereenvoudig het mobiele menu zodat het alleen de hoofd-items toont:
     - Oplossingen
     - Voor wie
     - Cases
     - Hoe we werken
     - Over LoopWerk
     - Contact (CTA)
   - Verwijder de uitklapbare sublijsten voor Oplossingen en Sectoren uit deze hover/klik dropdown.
   - Zorg dat het menu sluit wanneer de gebruiker buiten het menu-gebied beweegt (hover out) of een link aanklikt.

## Technische details

- Gebruik een combinatie van React state (voor klik/touch) en CSS `group-hover` (voor muis-hover).
- Plaats een kleine vertraging op het sluiten bij hover-out zodat het menu niet meteen verdwijnt bij het bewegen naar een link.
- Behoud toegankelijkheid: `aria-label`, `aria-expanded`, focus management en sluiten bij klik op een link.
- Geen backend of datawijzigingen nodig.

## Niet in scope

- Verplaatsen van het menu naar linksboven.
- Toevoegen van subitems onder Oplossingen/Voor wie in dit menu.
- Aanpassingen aan de desktop mega-menu's.
