import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0B0616"
    },
    background: {
        flex: 1,
        width: "100%",
        height: "100%"
    },
    safeArea: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(11, 6, 22, 0.88)", // Moody solid overlay letting background glow through
        paddingHorizontal: 24,
        paddingBottom: 24,
    },
    header: {
        alignItems: "center",
        marginTop: 40,
        marginBottom: 30,
    },
    logoContainer: {
        marginBottom: 16,
        padding: 12,
        borderRadius: 20,
        backgroundColor: "#160F22", // Solid background
        borderWidth: 1,
        borderColor: "#281D3B",
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
        color: "#FFFFFF",
        textAlign: "center",
        letterSpacing: 0.5,
    },
    highlightText: {
        color: "#FF9F9F", // Peach accent
    },
    subtitle: {
        fontSize: 14,
        color: "#C0B7E8", // Soft lavender
        textAlign: "center",
        marginTop: 10,
        lineHeight: 20,
        paddingHorizontal: 20,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 20,
    },
    permissionCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#160F22", // Solid dark card background
        borderWidth: 1,
        borderColor: "#281D3B",
        borderRadius: 20,
        padding: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 4,
    },
    iconWrapper: {
        width: 48,
        height: 48,
        borderRadius: 14,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
    },
    // Solid background colors for category icons (Moody colors)
    cameraIconWrapper: {
        backgroundColor: "#221936", // Solid dark purple
        borderColor: "#3D2B5E",
    },
    micIconWrapper: {
        backgroundColor: "#311C2B", // Solid dark peach/pink
        borderColor: "#5A2C49",
    },
    locationIconWrapper: {
        backgroundColor: "#122335", // Solid dark blue
        borderColor: "#1E3D5C",
    },
    storageIconWrapper: {
        backgroundColor: "#10281F", // Solid dark green
        borderColor: "#1B4734",
    },
    textContainer: {
        flex: 1,
        marginLeft: 16,
        marginRight: 8,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: "#FFFFFF",
        marginBottom: 4,
    },
    cardDescription: {
        fontSize: 12,
        color: "rgba(255, 255, 255, 0.6)",
        lineHeight: 16,
    },
    actionButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    allowButton: {
        backgroundColor: "#241A35", // Solid dark purple button
        borderWidth: 1,
        borderColor: "#3D2B5E",
    },
    allowButtonText: {
        fontSize: 12,
        fontWeight: "700",
        color: "#FF9F9F", // Peach color
    },
    grantedBadge: {
        backgroundColor: "#10281F", // Solid dark green
        borderWidth: 1,
        borderColor: "#1B4734",
    },
    grantedText: {
        fontSize: 12,
        fontWeight: "700",
        color: "#4ADE80", // Green
    },
    footer: {
        marginTop: 12,
        alignItems: "center",
    },
    continueButton: {
        width: "100%",
        marginTop: 8,
    },
    skipText: {
        fontSize: 14,
        fontWeight: "600",
        color: "rgba(255, 255, 255, 0.4)",
        marginTop: 18,
        textDecorationLine: "underline",
    },
})

export default styles