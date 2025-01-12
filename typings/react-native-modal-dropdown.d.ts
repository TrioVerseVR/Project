declare module 'react-native-modal-dropdown' {
    import { Component } from 'react';
    import { ViewStyle, TextStyle } from 'react-native';
  
    interface ModalDropdownProps {
      options: string[];
      defaultIndex?: number;
      defaultValue?: string;
      animated?: boolean;
      style?: ViewStyle;
      textStyle?: TextStyle;
      dropdownStyle?: ViewStyle;
      dropdownTextStyle?: TextStyle;
      dropdownTextHighlightStyle?: TextStyle;
      adjustFrame?: (style: ViewStyle) => ViewStyle;
      renderRow?: (option: string, index: number, isSelected: boolean) => JSX.Element;
      renderSeparator?: (sectionID: number, index: number, adjacentRowHighlighted: boolean) => JSX.Element;
      onDropdownWillShow?: () => boolean;
      onDropdownWillHide?: () => boolean;
      onSelect?: (index: string, option: string) => void;
    }
  
    export default class ModalDropdown extends Component<ModalDropdownProps> {}
  }