export interface FirebaseEvent {
  name: string;
  parameters: { playerID: string; param1?: any };
}
