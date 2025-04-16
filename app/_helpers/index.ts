const getTeamModeMainColor = ({
  primaryColor,
  secondaryColor,
}: {
  primaryColor: string;
  secondaryColor: string;
}) => {
  switch (secondaryColor) {
    case 'FFFFFF':
      switch (primaryColor) {
        case 'FFFFFF':
          return secondaryColor;
        default:
          return primaryColor;
      }
    case '000000':
      switch (primaryColor) {
        case '000000':
          return secondaryColor;
        default:
          return primaryColor;
      }
    default:
      return secondaryColor;
  }
};

const getTeamModeSecondaryColor = ({
  primaryColor,
  secondaryColor,
}: {
  primaryColor?: string;
  secondaryColor?: string;
}) => {
  switch (secondaryColor) {
    case 'FFFFFF':
      switch (primaryColor) {
        case 'FFFFFF':
          return primaryColor;
        default:
          return secondaryColor;
      }
    case '000000':
      switch (primaryColor) {
        case '000000':
          return primaryColor;
        default:
          return secondaryColor;
      }
    default:
      return primaryColor;
  }
};

const getTeamModeSearchBarTextColor = ({
  primaryColor,
  secondaryColor,
}: {
  primaryColor?: string;
  secondaryColor?: string;
}) => {
  switch (secondaryColor) {
    case 'FFFFFF':
      return primaryColor;
    case '000000':
      return primaryColor;
    default:
      return secondaryColor;
  }
};

export { getTeamModeMainColor, getTeamModeSecondaryColor, getTeamModeSearchBarTextColor };
