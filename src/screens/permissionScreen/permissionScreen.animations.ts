import { Easing, FadeIn, FadeInDown, FadeInUp, LinearTransition } from 'react-native-reanimated'

export const SMOOTH_EASING = Easing.bezier(0.22, 1, 0.36, 1)

export const SPRING_SMOOTH = {
    damping: 26,
    stiffness: 140,
    mass: 0.85,
}

export const SPRING_SNAPPY = {
    damping: 22,
    stiffness: 220,
    mass: 0.7,
}

export const ENTRANCE = {
    header: FadeInDown.duration(900).easing(SMOOTH_EASING),
    logo: FadeIn.duration(800).delay(120).easing(SMOOTH_EASING),
    title: FadeInUp.duration(850).delay(180).easing(SMOOTH_EASING),
    subtitle: FadeInUp.duration(850).delay(260).easing(SMOOTH_EASING),
    card: (index: number) =>
        FadeInUp
            .delay(320 + index * 90)
            .duration(750)
            .easing(SMOOTH_EASING),
    footer: (cardCount: number) =>
        FadeInUp
            .delay(320 + cardCount * 90 + 140)
            .duration(800)
            .easing(SMOOTH_EASING),
}

export const CARD_LAYOUT = LinearTransition.springify()
    .damping(SPRING_SMOOTH.damping)
    .stiffness(SPRING_SMOOTH.stiffness)
