import { ReactNode } from "react"

export type TModal = {
  children?: ReactNode;
  onClose(): void;
}