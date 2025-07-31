import { TextInputProps, TouchableOpacityProps } from "react-native";

declare interface InputFieldProps extends TextInputProps {
  label: string;
  icon?: any;
  secureTextEntry?: boolean;
  labelStyle?: string;
  containerStyle?: string;
  inputStyle?: string;
  iconStyle?: string;
  className?: string;
  placeholderClassName?: string;
  showPasswordToggle?: boolean;
  onTogglePassword?: () => void;
  isPasswordVisible?: boolean;
 

}

declare module 'react-native-svg-charts' {
  import * as React from 'react';
  import { ViewStyle } from 'react-native';

  export interface BarChartProps {
    style?: ViewStyle | ViewStyle[];
    data: number[] | object[];
    svg?: object;
    contentInset?: { top?: number; bottom?: number; left?: number; right?: number };
    spacingInner?: number;
    spacingOuter?: number;
    gridMin?: number;
    gridMax?: number;
    yAccessor?: (props: { item: any; index: number }) => number;
    xAccessor?: (props: { item: any; index: number }) => number;
    animate?: boolean;
    animationDuration?: number;
    numberOfTicks?: number;
    children?: React.ReactNode;
  }

  export class BarChart extends React.Component<BarChartProps> {}

  export namespace Grid {
    export enum Direction {
      VERTICAL = 'VERTICAL',
      HORIZONTAL = 'HORIZONTAL'
    }
  }

  export class Grid extends React.Component<{ direction?: Grid.Direction }> {}
}