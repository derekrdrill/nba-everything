type NBAGameStat = {
  type: string;
  player: {
    id: number;
    first_name: string;
    last_name: string;
    position: string;
    height: string;
    weight: string;
    jersey_number: string;
    college: string;
    country: string;
    draft_year: number;
    draft_round: number;
    draft_number: number;
    team_id: number;
    proper_last_name: string;
    head_shot: string;
  };
  total: number;
};

export default NBAGameStat;
