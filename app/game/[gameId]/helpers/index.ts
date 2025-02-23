const isHomeWin = ({
  homeOrVisitor,
  homeTeamScore,
  visitorTeamScore,
}: {
  homeOrVisitor: 'home' | 'visitor';
  homeTeamScore: number | undefined;
  visitorTeamScore: number | undefined;
}) => {
  return (
    homeOrVisitor === 'home' &&
    homeTeamScore &&
    visitorTeamScore &&
    homeTeamScore > visitorTeamScore
  );
};

const isVisitorWin = ({
  homeOrVisitor,
  homeTeamScore,
  visitorTeamScore,
}: {
  homeOrVisitor: 'home' | 'visitor';
  homeTeamScore: number | undefined;
  visitorTeamScore: number | undefined;
}) => {
  return (
    homeOrVisitor === 'visitor' &&
    homeTeamScore &&
    visitorTeamScore &&
    homeTeamScore < visitorTeamScore
  );
};

export { isHomeWin, isVisitorWin };
