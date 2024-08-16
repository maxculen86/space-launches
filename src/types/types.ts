export interface Launch {
  id: string;
  site: string;
  mission: {
    name: string;
  };
  rocket: {
    name: string;
  };
}