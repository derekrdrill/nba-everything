import NBAStadium from '../NBAStadium/NBAStadium';

type NBATeam = {
  id: number;
  conference: string;
  division: string;
  city: string;
  name: string;
  full_name: string;
  abbreviation: string;
  coach: string;
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
    quaternary: string;
  };
  logo: string;
  stadium: NBAStadium;
};

export default NBATeam;
