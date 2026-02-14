# Effets Hero - Documentation

## ✨ Nouveaux effets visuels appliqués

### 1. **Logos flottants en arrière-plan**
- 3 instances de votre logo `/newlogo.png` positionnées stratégiquement
- Opacité très faible (0.02-0.04) pour un effet subtil
- Animation de flottement douce sur 20 secondes
- Positions :
  - Logo 1 : Haut-droite (300px)
  - Logo 2 : Bas-gauche (250px)
  - Logo 3 : Centre (400px, opacité 0.02)

### 2. **Particules flottantes**
- 5 particules cyan qui montent lentement
- Animation de 15 secondes avec fade in/out
- Positionnées aléatoirement sur toute la section
- Effet de profondeur et de dynamisme

### 3. **Badge premium animé**
- Badge "Agence Web Premium" avec icône Sparkles
- Effet glassmorphism avec backdrop-blur
- Icône qui pulse et tourne légèrement
- Box-shadow cyan pour cohérence visuelle

### 4. **Titre amélioré avec effets**
#### Titre principal
- Font-weight: 900 (ultra-bold)
- Text-shadow cyan subtil
- Taille responsive: clamp(2.5rem, 6vw, 5rem)

#### Highlight (site web performant)
- Taille augmentée: clamp(2rem, 6vw, 4rem)
- Drop-shadow lumineux cyan
- **Effet de brillance** : Lumière qui traverse le texte toutes les 3s
- **Soulignement animé** : Ligne gradient avec glow
- Box-shadow pour effet néon subtil

### 5. **Animations ajoutées**

#### `float` - Logos
```scss
- Mouvement vertical ondulant
- Rotation légère (-3° à 5°)
- Durée : 20s
```

#### `particleFloat` - Particules
```scss
- Montée de 100px
- Fade in/out progressif
- Scale de 0 à 1
- Durée : 15s
```

#### `sparkle` - Badge icône
```scss
- Scale pulse (1 à 1.2)
- Rotation 180°
- Opacité pulse
- Durée : 2s
```

#### `shine` - Brillance titre
```scss
- Effet de lumière traversant
- Gauche à droite
- Durée : 3s (répète)
```

## 🎨 Palette de couleurs utilisée

- **Accent primaire** : #00d4ff (cyan)
- **Opacités logos** : 0.02 - 0.04
- **Opacités particules** : 0 - 0.6
- **Box-shadows** : rgba(0, 212, 255, 0.15-0.6)

## 📱 Responsive

### Desktop (>768px)
- Logos à taille pleine (250-400px)
- Toutes les animations actives
- Particules visibles

### Tablet (768px)
- Logos réduits (180-300px)
- Animations conservées

### Mobile (<768px)
- Logos compacts (120-200px)
- Logos légèrement décalés hors écran pour ne pas gêner
- Particules masquées via CSS si nécessaire
- Titre et highlight responsive

## ⚡ Performance

- `will-change: transform` sur éléments animés
- `pointer-events: none` sur décorations
- `prefers-reduced-motion` respecté
- Blur limité à 2px pour les logos
- GPU acceleration via transform3d

## 🎯 Impact UX

1. **Profondeur visuelle** : Logos créent du depth
2. **Mouvement subtil** : Attire l'œil sans distraire
3. **Identité de marque** : Logo omniprésent subtilement
4. **Premium feel** : Effets lumineux et animations fluides
5. **Call-to-action renforcé** : Le titre capte l'attention

## 🔧 Personnalisation facile

Pour ajuster les effets, modifiez dans [_hero.scss](src/styles/components/_hero.scss) :

- **Opacité logos** : ligne 59-60
- **Vitesse float** : ligne 65 (20s)
- **Nombre de particules** : Ajouter `.hero__particle` dans JSX
- **Couleur brillance** : ligne 148 rgba()
