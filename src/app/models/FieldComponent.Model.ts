export interface FieldComponentModel {
  fIndex: number;
  fStyle: { height: string; width: string };
  fClass: string;
  bomb: boolean;
  nearBombs: number;
  activated: boolean;
}
