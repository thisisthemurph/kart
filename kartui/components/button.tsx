import useTheme, { ShadcnTheme } from "@/hooks/use-theme";
import React, { useMemo } from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableOpacityProps
} from "react-native";

type ButtonVariant = "primary" | "secondary" | "outlined" | "ghost";

interface ButtonProps extends TouchableOpacityProps {
    title?: string;
    variant?: ButtonVariant;
}

const Button: React.FC<ButtonProps> = ({
    title,
    style,
    disabled,
    variant = "primary",
    children,
    ...props
}) => {
    const { theme } = useTheme();
    const styles = useMemo(() => createStyles(variant, theme, !!disabled), [variant, theme, disabled]);

    return (
        <TouchableOpacity
            style={[styles.button, style]}
            disabled={disabled}
            accessibilityRole="button"
            accessibilityLabel={title}
            {...props}
        >
            {title ? <Text style={styles.text}>{title}</Text> : children}
        </TouchableOpacity>
    );
};

function createStyles(variant: ButtonVariant, theme: ShadcnTheme, disabled: boolean) {
    const opacity = disabled ? 0.5 : 1;

    const variantStyles = {
        primary: {
            backgroundColor: theme.colors.primary,
            opacity: opacity,
        },
        secondary: {
            backgroundColor: theme.colors.secondary,
            borderWidth: 1,
            borderColor: theme.colors.border,
            opacity: opacity,
        },
        outlined: {
            backgroundColor: theme.colors.background,
            borderWidth: 1,
            borderColor: theme.colors.border,
            opacity: opacity,
        },
        ghost: {
            backgroundColor: theme.colors.background,
            opacity: opacity,
        }
    }

    const textVariantStyles = {
        primary: {
            color: disabled ? theme.colors.secondaryForeground : theme.colors.primaryForeground,
        },
        secondary: {
            color: disabled ? "black" : theme.colors.secondaryForeground,
        },
        outlined: {
            color: disabled ? theme.colors.secondaryForeground : theme.colors.mutedForeground,
        },
        ghost: {
            color: disabled ? theme.colors.secondaryForeground : theme.colors.mutedForeground,
        }
    }

    return StyleSheet.create({
        button: {
            paddingVertical: 12,
            borderRadius: 8,
            alignItems: "center",
            justifyContent: "center",
            ...variantStyles[variant]
        },
        text: {
            fontSize: 16,
            fontWeight: disabled ? "normal" : "600",
            letterSpacing: 0.5,
            ...textVariantStyles[variant]
        },
    });

}

export default Button;
