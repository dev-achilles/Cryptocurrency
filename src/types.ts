export interface IDialog {
  open: boolean;
  role: string;
  name: string;
}

export interface EventHandlerProps {
  onClick: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  target: any;
}
