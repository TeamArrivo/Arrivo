import {
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  TouchableOpacity,
} from "react-native";

import type { InputFieldProps } from "@/types/type";
import { Ionicons } from "@expo/vector-icons";

const InputField = ({
  label,
  icon,
  secureTextEntry = false,
  labelStyle,
  containerStyle,
  inputStyle,
  iconStyle,
  placeholderClassName,
  className,
    showPasswordToggle = false,
  onTogglePassword,
  isPasswordVisible = false,
 
  ...props
}: InputFieldProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          <Text className={`text-lg  mb-3 text-white ${labelStyle}`}>
            {label}
          </Text>
          <View
            className={`flex flex-row justify-start items-center relative bg-white rounded-xl border border-[#54555F] focus:border-blue-500 bg-[#54555F]  ${containerStyle}`}
          >
            {icon && (
              <Image source={icon} className={`w-6 h-6 ml-4  text-black ${iconStyle}`} />
            )}
  <TextInput
    className={`rounded-full p-4 text-[15px] flex-1 text-black ${inputStyle} text-left`}
    secureTextEntry={secureTextEntry}
     placeholderTextColor="#000"
    {...props}
  />
  
  {showPasswordToggle && onTogglePassword && (
    <TouchableOpacity 
      onPress={onTogglePassword} 
      className="mr-4"
      activeOpacity={0.7}
    >
  <Ionicons
    name={isPasswordVisible ? "eye-off" : "eye"}
    size={24}
    color="black" // or white, gray, etc.
  />
    </TouchableOpacity>
  )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
