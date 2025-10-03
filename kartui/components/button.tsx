import useTheme, { ColorScheme } from "@/hooks/use-theme";
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
    const { colors } = useTheme();
    const styles = useMemo(() => createStyles(variant, colors, !!disabled), [variant, colors, disabled]);

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

function createStyles(variant: ButtonVariant, colors: ColorScheme, disabled: boolean) {
    const variantStyles = {
        primary: {
            backgroundColor: disabled
                ? colors.backgrounds.disabled
                : colors.primary,
        },
        secondary: {
            backgroundColor: disabled
                ? colors.backgrounds.disabled
                : colors.secondary,
        },
        outlined: {
            backgroundColor: "transparent",
            borderWidth: 1,
            borderColor: colors.border,
        },
        ghost: {
            backgroundColor: "transparent",
        }
    }

    const textVariantStyles = {
        primary: {
            color: disabled ? colors.textMuted : "white",
        },
        secondary: {
            color: disabled ? colors.textMuted : "white",
        },
        outlined: {
            color: disabled ? colors.textMuted : colors.text,
        },
        ghost: {
            color: disabled ? colors.textMuted : colors.text,
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
