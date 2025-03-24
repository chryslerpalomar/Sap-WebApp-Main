export interface Device {
  id: string;
  ph: number;
  temperature: number;
  type: "sugar" | "vinegar" | "wine";
}
